# WebSocket relay proxy notes (local)

This document records the **WebSocket relay proxy** used by the Resonite Love Launcher
for tunneling WebSocket traffic through a public relay.

## Endpoints
- Relay WebSocket: `wss://wsproxy.kokoa.dev/ws`
- Health check: `https://wsproxy.kokoa.dev/health`

## Roles
- **Host**: connects to the relay and exposes a target WebSocket (e.g. ResoniteLink).
- **Client**: connects to the relay with an access key and talks to the target through the tunnel.

## Message types
All relay messages are JSON objects with a `type` field.

- `create_tunnel` `{ "target": "ws://..." }`
- `tunnel_created` `{ "tunnel_id": "...", "access_key": "..." }`
- `join_tunnel` `{ "access_key": "..." }`
- `tunnel_joined` `{ "tunnel_id": "..." }`
- `client_connected` `{ "client_id": "..." }`
- `client_disconnected` `{ "client_id": "...", "reason": "..." }`
- `data` `{ "client_id"?: "...", "payload": "<base64>", "binary": true|false }`
- `close_tunnel` `{}`
- `tunnel_closed` `{ "reason": "..." }`
- `error` `{ "code": "...", "message": "..." }`
- `ping` / `pong`

## Data encoding
- `payload` is always **Base64** for the raw WebSocket frame bytes.
- `binary` indicates whether the original frame was binary.
- Text frames are still Base64-encoded (UTF-8 bytes).

## Connection flow

### Host flow (bridge to ResoniteLink)
1. Connect to the relay WebSocket.
2. Send `create_tunnel` with the target WS URL (ex: `ws://kokoa-resolink.neos.love/`).
3. Receive `tunnel_created` with an `access_key` to share with clients.
4. When `client_connected` arrives, open a WS connection to the target.
5. Forward Base64 `data` in both directions.

### Client flow (tunnel user)
1. Connect to the relay WebSocket.
2. Send `join_tunnel` with the `access_key`.
3. Receive `tunnel_joined`.
4. Forward Base64 `data` to the relay and decode responses.
5. If `tunnel_closed` or `error` arrives, stop and reconnect if needed.

## Local usage in this repo
- `experiments/resonitelink/tools/resolink-console/console.mjs` supports `--relayAccessKey`.
- The launcher defaults to opening a local port (example: `ws://localhost:33333`) for client mode.
- Override relay server for `console.mjs` via `RESONITELINK_RELAY_SERVER` if needed.
