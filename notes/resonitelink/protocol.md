# ResoniteLink protocol summary

These notes summarize the protocol shape as observed in the upstream ResoniteLink repository.

## Transport

- WebSocket.
- Payloads are JSON text frames.
- The upstream client library does not support binary frames.

## Message envelope (requests)

Requests are JSON objects with:

- `$type`: string discriminator for the command (e.g. `getSlot`, `addSlot`).
- `messageId`: string used to correlate with responses.

The upstream C# client always ensures `messageId` is present; responses include `sourceMessageId`.

## Response envelope

Responses are JSON objects with:

- `$type`: discriminator (e.g. `response`, `slotData`, `componentData`).
- `sourceMessageId`: echoes the request `messageId`.
- `success`: boolean.
- `errorInfo`: string (only meaningful when `success` is `false`).

## IDs

- IDs are strings.
- You may provide your own IDs for created objects to avoid an extra round-trip.
- Avoid collisions by prefixing (e.g. `MyTool_...`).
- Resonite-allocated IDs are prefixed with `Reso_` (do not use this prefix for your own IDs).
- IDs are not persistent across save/reload.

## Slot model (shape)

A `Slot` is a `Worker` with:

- `id`: string.
- `isReferenceOnly`: boolean.
- `parent`: reference member (`{ "$type": "reference", "targetId": "..." }`).
- `name`, `tag`: string fields (`{ "$type": "string", "value": "..." }`).
- `position`, `scale`: `float3` fields.
- `rotation`: `floatQ` field.
- `components`: array of `Component`.
- `children`: array of `Slot`.

Special slot ID:

- Root slot is addressed as `"Root"`.

## Component model (shape)

A `Component` is a `Worker` with:

- `id`: string.
- `isReferenceOnly`: boolean.
- `componentType`: string in Resonite/C# notation, e.g. `"[FrooxEngine]FrooxEngine.Grabbable"`.
- `members`: dictionary `{ "MemberName": <MemberValue> }`.

## Member / field encoding

Most values are encoded as tagged objects:

- Scalar-like fields: `{ "$type": "bool" | "string" | "int" | "float" | ... , "value": ... }`.
- Vector-like fields: `{ "$type": "float3", "value": {"x": 0, "y": 0, "z": 0} }`.
- References: `{ "$type": "reference", "targetId": "..." }`.

Upstream defines many `$type` values in `ResoniteLink/Models/DataModel/PrimitiveContainers.cs`.

## Commands (current upstream)

Slots:

- `getSlot`: `{ "$type": "getSlot", "slotId": "Root|...", "includeComponentData": false|true, "depth": 0|1|-1|... }`
- `addSlot`: `{ "$type": "addSlot", "data": <SlotPartial> }`
- `updateSlot`: `{ "$type": "updateSlot", "data": <SlotPartial> }` (requires `data.id`).
- `removeSlot`: `{ "$type": "removeSlot", "slotId": "..." }`.

Components:

- `getComponent`: `{ "$type": "getComponent", "componentId": "..." }`
- `addComponent`: `{ "$type": "addComponent", "containerSlotId": "...", "data": <ComponentPartial> }`
- `updateComponent`: `{ "$type": "updateComponent", "data": <ComponentPartial> }` (requires `data.id`).
- `removeComponent`: `{ "$type": "removeComponent", "componentId": "..." }`.

## Partial updates (patch semantics)

For `updateSlot` and `updateComponent`:

- Properties you omit (or leave null in typed clients) remain unchanged server-side.
- The target object ID must be included.
