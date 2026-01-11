# ResoniteLink operations guide

This document is separate from the protocol reference and focuses on how to operate Resonite via ResoniteLink.

## Endpoint references (local)

- `ws://kokoa-resolink.neos.love/`
- Relay/proxy option: `notes/resonitelink/ws-proxy.md`

## Coordinate system

Resonite uses `float3` from `Elements.Core` with basis:

- Right = +X
- Up = +Y
- Forward = +Z

Practical implication: if you parent an object to a head/eye slot, a local position with positive Z moves it forward.

## Recipe: show text in front of Root (+Z)

### Goal

- Place text relative to the session's top-level Root slot.
- Do not parent to a user (no following/tracking).
- Attach a `FrooxEngine.TextRenderer`.

### Step 1: create a slot under Root

Send `addSlot` with:

- `data.parent.targetId = "Root"`
- `data.position = float3(0, height, distance)`

Recommended starting values:

- `height = 1.5`
- `distance = 2.0`

Sample JSON: `samples/root_step1_addSlot_rootForward.json`

### Step 2: attach a TextRenderer

Attach a `FrooxEngine.TextRenderer` to the new slot.

Verified locally in `Resonite/FrooxEngine.dll`:

- Component type: `[FrooxEngine]FrooxEngine.TextRenderer`
- Sync members include: `Text`, `Size`, `Color`, `ParseRichText`, `HorizontalAlign`, `VerticalAlign`

Minimal members to set:

- `Text`
- `Size`

Sample JSON: `samples/root_step2_addComponent_textRenderer.json`

### Step 3 (optional): cleanup

Remove the slot by ID when done:

- `removeSlot` with `slotId = "KokoaTmpTxt_0"`

Sample JSON: `samples/root_step3_removeSlot_cleanup.json`

## Status text renderer (ResoniteLink procedure)

Concept and sizing guidance live in
`notes/resonite/patterns/status-text-renderer.md`. This section covers the
ResoniteLink procedure for updating a TextRenderer in place.

Local helper:

- `tools/resolink-console/console.mjs`

Initialize:

- `node tools/resolink-console/console.mjs init --componentId <TextRendererId>`
- Relay access key variant:
  - `node tools/resolink-console/console.mjs init --componentId <TextRendererId> --relayAccessKey <Key>`

Append a line:

- `node tools/resolink-console/console.mjs append --text "Step: ..."`

Clear:

- `node tools/resolink-console/console.mjs clear`
