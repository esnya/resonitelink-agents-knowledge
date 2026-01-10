# ResoniteLink experiment

This directory is a local scratchpad for experimenting with **ResoniteLink** (WebSocket + JSON) using raw JSON messages.

## Endpoint
- `ws://kokoa-resolink.neos.love/`
- Optional relay/proxy: `experiments/resonitelink/notes/WS_PROXY.md`

## Upstream source of truth
- Repository: `experiments/resonitelink/_upstream/ResoniteLink`
- Commit pinned locally: `0cbce06d47fc111be374e9f9177924f1380f87ae` (2026-01-07)

If something here disagrees with upstream models/docs, treat upstream as correct.

## Layout
- `experiments/resonitelink/notes/PROTOCOL.md`: protocol notes + message shapes
- `experiments/resonitelink/notes/AGENT_KNOWLEDGE.md`: Resonite-specific agent guidance
- `experiments/resonitelink/notes/WS_PROXY.md`: relay/proxy notes (wsproxy.kokoa.dev)
- `experiments/resonitelink/notes/RESO_SOURCES.md`: trusted external info sources
- `experiments/resonitelink/notes/RGB_CUBE_TUTORIAL.md`: RGB Cube tutorial experiment notes
- `experiments/resonitelink/samples/*.json`: copy/paste JSON examples
- `experiments/resonitelink/samples/button_interactions/*.json`: button interaction sample set
- `experiments/resonitelink/_upstream/ResoniteLink`: cloned upstream reference

## Related local Resonite assemblies
- The local Resonite assemblies appear to be under `Resonite/` (e.g. many `.dll` files).
