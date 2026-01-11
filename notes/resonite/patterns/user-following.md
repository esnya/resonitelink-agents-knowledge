# User Following

Minimal pattern for attaching an object to a user or user space.

## Intent

- Keep a slot aligned with the local user (head/body or user space).

## Components

- `CopyGlobalTransform` (verified) or `VirtualParent` (verified in-world) for
  following a target slot.
- `ObjectRoot` only when you must parent into user space.

## Wiring

- Set the target slot (head, view, or other user anchors).
- Apply offset in local space for positioning.
- Prefer keeping the follower outside the user slot and copying/virtual parenting.

## Verification

- Created `Agent_UserFollow_CGT` under Root with `CopyGlobalTransform`
  (`Source` set to the current user's head slot) and `TextRenderer`.
- Slot position matched the user head's global transform and tracked in-world.
- The slot was removed after verification.
- Created `Agent_UserFollow_VP` with `VirtualParent`, setting `OverrideParent`
  to the current user's head slot and `LocalPosition` to `(0, 0, 0.2)`.
  Slot fields did not change via ResoniteLink reads, but the object visibly
  followed the user in-world.
- Set `_targetPos`, `_targetRot`, and `_targetScl` to the slot's own
  `Position/Rotation/Scale` field IDs during the test.

## Notes

- Parenting directly under the user slot is usually avoided unless required.
- Other user-relative helpers exist (for example, `PositionAtUser`,
  `LookAtUser`, and tracking controllers). Use the inspector to confirm
  the best fit for a given request.
- For object semantics, see `notes/resonite/components/object-root.md`.
- Related list: `notes/resonite/components/transform-drivers.md`.
