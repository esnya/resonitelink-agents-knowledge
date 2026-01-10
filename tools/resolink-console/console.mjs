#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_ENDPOINT = 'ws://kokoa-resolink.neos.love/';
const DEFAULT_RELAY_SERVER = 'wss://wsproxy.kokoa.dev/ws';
const RELAY_SERVER = process.env.RESONITELINK_RELAY_SERVER ?? DEFAULT_RELAY_SERVER;
const DEFAULT_STATE_FILE = path.resolve(process.cwd(), 'experiments/resonitelink/tools/resolink-console/state.json');

function nowIsoSeconds() {
  const d = new Date();
  const iso = d.toISOString();
  return iso.replace(/\.\d{3}Z$/, 'Z');
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

function readArg(args, key) {
  const idx = args.indexOf(key);
  if (idx === -1) return null;
  if (idx + 1 >= args.length) throw new Error(`Missing value for ${key}`);
  return args[idx + 1];
}

async function readState(stateFile) {
  try {
    const raw = await fs.readFile(stateFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e && (e.code === 'ENOENT')) return null;
    throw e;
  }
}

async function writeState(stateFile, state) {
  await fs.mkdir(path.dirname(stateFile), { recursive: true });
  await fs.writeFile(stateFile, JSON.stringify(state, null, 2) + '\n', 'utf8');
}

async function sendOnceDirect({ endpoint, payload, timeoutMs = 12000 }) {
  const ws = new WebSocket(endpoint);

  const connectPromise = new Promise((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) resolve();
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('WebSocket error before open')), { once: true });
  });

  await Promise.race([
    connectPromise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: connect')), 8000)),
  ]);

  const respPromise = new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`Timeout waiting for response to ${payload.messageId}`)), timeoutMs);

    ws.addEventListener('message', (event) => {
      const raw = typeof event.data === 'string' ? event.data : String(event.data);
      if (!raw || raw.length === 0) return;
      let msg;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      clearTimeout(t);
      resolve(msg);
    });
  });

  ws.send(JSON.stringify(payload));
  const resp = await respPromise;
  ws.close();
  return resp;
}

async function waitForRelayMessage(ws, timeoutMs) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('Timeout waiting for relay message')), timeoutMs);

    const onMessage = (event) => {
      const raw = typeof event.data === 'string' ? event.data : String(event.data);
      if (!raw || raw.length === 0) return;
      let msg;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }
      clearTimeout(t);
      resolve(msg);
    };

    const onError = () => {
      clearTimeout(t);
      reject(new Error('WebSocket error during relay'));
    };

    ws.addEventListener('message', onMessage, { once: true });
    ws.addEventListener('error', onError, { once: true });
  });
}

function encodeRelayPayload(payloadBytes) {
  return Buffer.from(payloadBytes).toString('base64');
}

function decodeRelayPayload(payload) {
  return Buffer.from(payload, 'base64');
}

async function sendOnceViaRelayRaw({ accessKey, payloadBytes, binary = false, timeoutMs = 12000 }) {
  const ws = new WebSocket(RELAY_SERVER);

  const connectPromise = new Promise((resolve, reject) => {
    if (ws.readyState === WebSocket.OPEN) resolve();
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', () => reject(new Error('WebSocket error before open')), { once: true });
  });

  await Promise.race([
    connectPromise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: connect relay')), 8000)),
  ]);

  const sendRelay = (message) => ws.send(JSON.stringify(message));

  const waitForMeaningful = async (label, timeout) => {
    const deadline = Date.now() + timeout;
    while (true) {
      const remaining = Math.max(deadline - Date.now(), 1);
      const msg = await waitForRelayMessage(ws, remaining);
      if (!msg || typeof msg.type !== 'string') {
        throw new Error(`Relay protocol error during ${label}`);
      }
      if (msg.type === 'ping') {
        sendRelay({ type: 'pong' });
        continue;
      }
      return msg;
    }
  };

  try {
    sendRelay({ type: 'join_tunnel', access_key: accessKey });
    const joined = await waitForMeaningful('join_tunnel', 8000);
    if (joined.type === 'error') {
      throw new Error(`${joined.code}: ${joined.message}`);
    }
    if (joined.type !== 'tunnel_joined') {
      throw new Error(`Unexpected relay response: ${joined.type}`);
    }

    const payloadB64 = encodeRelayPayload(payloadBytes);
    sendRelay({ type: 'data', payload: payloadB64, binary });

    while (true) {
      const msg = await waitForMeaningful('data', timeoutMs);
      if (msg.type === 'error') {
        throw new Error(`${msg.code}: ${msg.message}`);
      }
      if (msg.type === 'tunnel_closed') {
        throw new Error(`Tunnel closed: ${msg.reason ?? 'unknown'}`);
      }
      if (msg.type !== 'data') {
        continue;
      }

      if (typeof msg.payload !== 'string') {
        throw new Error('Relay data payload missing');
      }
      return decodeRelayPayload(msg.payload);
    }
  } finally {
    ws.close();
  }
}

async function sendOnce({ endpoint, relayAccessKey, payload, timeoutMs = 12000 }) {
  if (relayAccessKey) {
    const payloadText = JSON.stringify(payload);
    const responseBytes = await sendOnceViaRelayRaw({
      accessKey: relayAccessKey,
      payloadBytes: Buffer.from(payloadText, 'utf8'),
      binary: false,
      timeoutMs,
    });
    const responseText = responseBytes.toString('utf8');
    try {
      return JSON.parse(responseText);
    } catch {
      throw new Error(`Relay response was not JSON: ${responseText.slice(0, 200)}`);
    }
  }
  return sendOnceDirect({ endpoint, payload, timeoutMs });
}

async function updateText({ endpoint, relayAccessKey, componentId, text, size, maxChars }) {
  const normalizedText = typeof maxChars === 'number' && maxChars > 0
    ? text.slice(-maxChars)
    : text;

  const members = {
    Text: { $type: 'string', value: normalizedText },
  };
  if (typeof size === 'number') {
    members.Size = { $type: 'float', value: size };
  }

  const payload = {
    $type: 'updateComponent',
    messageId: `kokoa_console_${randomId()}`,
    data: {
      id: componentId,
      members,
    },
  };

  const resp = await sendOnce({ endpoint, relayAccessKey, payload });
  if (!resp?.success) {
    throw new Error(resp?.errorInfo ?? 'updateComponent failed');
  }
}

async function formatAsConsole({ endpoint, relayAccessKey, componentId }) {
  const payload = {
    $type: 'updateComponent',
    messageId: `kokoa_console_fmt_${randomId()}`,
    data: {
      id: componentId,
      members: {
        HorizontalAlign: { $type: 'enum', enumType: 'Elements.Assets.TextHorizontalAlignment', value: 'Left' },
        VerticalAlign: { $type: 'enum', enumType: 'Elements.Assets.TextVerticalAlignment', value: 'Top' },
        Bounded: { $type: 'bool', value: true },
        BoundsAlignment: { $type: 'enum', enumType: 'Elements.Core.Alignment', value: 'TopLeft' },
        BoundsSize: { $type: 'float2', value: { x: 2.2, y: 1.2 } },
        HorizontalAutoSize: { $type: 'bool', value: false },
        VerticalAutoSize: { $type: 'bool', value: false },
        ParseRichText: { $type: 'bool', value: false },
      },
    },
  };

  const resp = await sendOnce({ endpoint, relayAccessKey, payload });
  if (!resp?.success) {
    throw new Error(resp?.errorInfo ?? 'updateComponent failed');
  }
}

function usage() {
  const statePath = DEFAULT_STATE_FILE;
  console.log(`Usage:
  node experiments/resonitelink/tools/resolink-console/console.mjs init --componentId <ID> [--endpoint <ws://...> | --relayAccessKey <KEY>] [--state <file>]
  node experiments/resonitelink/tools/resolink-console/console.mjs format [--state <file>]
  node experiments/resonitelink/tools/resolink-console/console.mjs set  --text "..." [--state <file>]
  node experiments/resonitelink/tools/resolink-console/console.mjs summary  --text "..." [--state <file>]
  node experiments/resonitelink/tools/resolink-console/console.mjs append --text "..." [--state <file>] [--maxLines 20]
  node experiments/resonitelink/tools/resolink-console/console.mjs clear [--state <file>]

Default state file:
  ${statePath}
`);
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const stateFile = readArg(args, '--state') ?? DEFAULT_STATE_FILE;

  if (!cmd || cmd === '--help' || cmd === '-h') {
    usage();
    process.exitCode = 2;
    return;
  }

  if (cmd === 'init') {
    const componentId = readArg(args, '--componentId');
    if (!componentId) throw new Error('init requires --componentId');

    const endpointArg = readArg(args, '--endpoint');
    const relayAccessKey = readArg(args, '--relayAccessKey');
    if (endpointArg && relayAccessKey) {
      throw new Error('Use either --endpoint or --relayAccessKey, not both');
    }
    const endpoint = relayAccessKey ? null : (endpointArg ?? DEFAULT_ENDPOINT);
    const sizeRaw = readArg(args, '--size');
    const size = sizeRaw ? Number(sizeRaw) : null;
    if (sizeRaw && !Number.isFinite(size)) throw new Error('--size must be a number');

    const state = {
      endpoint: endpoint ?? undefined,
      relayAccessKey: relayAccessKey ?? undefined,
      componentId,
      size: size ?? undefined,
      text: '',
      maxChars: 2000,
    };
    await writeState(stateFile, state);
    console.log(`Initialized state: ${stateFile}`);
    return;
  }

  const state = await readState(stateFile);
  if (!state) {
    throw new Error(`State file not found. Run init first: ${stateFile}`);
  }

  const relayAccessKey = readArg(args, '--relayAccessKey') ?? state.relayAccessKey ?? null;
  const endpoint = relayAccessKey ? null : (state.endpoint ?? DEFAULT_ENDPOINT);
  const componentId = state.componentId;
  if (!componentId) throw new Error('state.componentId missing');

  if (cmd === 'format') {
    await formatAsConsole({ endpoint, relayAccessKey, componentId });
    return;
  }

  if (cmd === 'set') {
    const text = readArg(args, '--text');
    if (text === null) throw new Error('set requires --text');

    state.text = text;
    await updateText({
      endpoint,
      relayAccessKey,
      componentId,
      text: state.text,
      size: state.size,
      maxChars: state.maxChars,
    });
    await writeState(stateFile, state);
    return;
  }

  if (cmd === 'summary') {
    const text = readArg(args, '--text');
    if (text === null) throw new Error('summary requires --text');

    state.text = text;
    await updateText({
      endpoint,
      relayAccessKey,
      componentId,
      text: state.text,
      size: state.size,
      maxChars: state.maxChars,
    });
    await writeState(stateFile, state);
    return;
  }

  if (cmd === 'append') {
    const text = readArg(args, '--text');
    if (text === null) throw new Error('append requires --text');

    const maxLinesRaw = readArg(args, '--maxLines');
    const maxLines = maxLinesRaw ? Number(maxLinesRaw) : 30;
    if (!Number.isFinite(maxLines) || maxLines <= 0) throw new Error('--maxLines must be a positive number');

    const next = state.text.length === 0
      ? `[${nowIsoSeconds()}] ${text}`
      : `${state.text}\n[${nowIsoSeconds()}] ${text}`;

    const lines = next.split('\n');
    state.text = lines.slice(-maxLines).join('\n');

    await updateText({
      endpoint,
      relayAccessKey,
      componentId,
      text: state.text,
      size: state.size,
      maxChars: state.maxChars,
    });
    await writeState(stateFile, state);
    return;
  }

  if (cmd === 'clear') {
    state.text = '';
    await updateText({ endpoint, relayAccessKey, componentId, text: '', size: state.size, maxChars: state.maxChars });
    await writeState(stateFile, state);
    return;
  }

  throw new Error(`Unknown command: ${cmd}`);
}

main().catch((err) => {
  console.error(err?.message ?? String(err));
  process.exitCode = 1;
});
