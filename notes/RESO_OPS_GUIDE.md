# ResoniteLink operations guide (local)

This document is separate from the protocol reference and focuses on **how to operate Resonite** via ResoniteLink.
It is expected to evolve as we learn more.

Endpoint used in this workspace:
- `ws://kokoa-resolink.neos.love/`
- Relay/proxy option: `experiments/resonitelink/notes/WS_PROXY.md`

## Coordinate system (important)

Resonite uses `float3` from `Elements.Core` with basis:
- `Right` = `(+X)`
- `Up` = `(+Y)`
- `Forward` = `(+Z)`

Practical implication: if you parent an object to a head/eye slot, a local position with positive `z` should move it "in front".

## Recipe: show text in front of `Root` (+Z)

Goal:
- Place text relative to the session's top-level `Root` slot
- Do not parent to a user (no following/tracking)
- Attach a `FrooxEngine.TextRenderer`

### Notes on "in front"

This recipe interprets "in front" as the `Root` slot local `+Z` direction.

Because the created slot is parented to `Root`, its `position` is in `Root` local coordinates.

### Step 1: create a slot under Root, offset in +Z

Send `addSlot` with:
- `data.parent.targetId = "Root"`
- `data.position = float3(0, height, distance)`

Recommended starting values:
- `height = 1.5`
- `distance = 2.0`

You must provide a temporary known `data.id` so you can attach the TextRenderer next.

Sample JSON: `experiments/resonitelink/samples/root_step1_addSlot_rootForward.json`

### Step 2: attach a TextRenderer

Attach a `FrooxEngine.TextRenderer` component to the new slot.

Verified from local `Resonite/FrooxEngine.dll`:
- Component type: `[FrooxEngine]FrooxEngine.TextRenderer`
- Relevant sync member names: `Text`, `Size`, `Color`, `ParseRichText`, `HorizontalAlign`, `VerticalAlign`, ...

Minimal members to set:
- `Text` (string)
- `Size` (float)

Sample JSON: `experiments/resonitelink/samples/root_step2_addComponent_textRenderer.json`

### Step 3 (optional): cleanup

Remove the slot by ID when done:
- `removeSlot` with `slotId = "KokoaTmpTxt_0"`

Sample JSON: `experiments/resonitelink/samples/root_step3_removeSlot_cleanup.json`

## Using TextRenderer as a status console

We can treat the existing TextRenderer as a simple "console" by rewriting its `Text` each step.

Local helper:
- Script: `experiments/resonitelink/tools/resolink-console/console.mjs`

Initialize it once (binds to a specific TextRenderer component ID):
- `node experiments/resonitelink/tools/resolink-console/console.mjs init --componentId KokoaInstantTxt_xgjqh04c_TR`
- Relay access key variant:
  - `node experiments/resonitelink/tools/resolink-console/console.mjs init --componentId KokoaInstantTxt_xgjqh04c_TR --relayAccessKey ABC123`

Append a line:
- `node experiments/resonitelink/tools/resolink-console/console.mjs append --text "Step: ..."`

Clear:
- `node experiments/resonitelink/tools/resolink-console/console.mjs clear`
