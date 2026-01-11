# User Following

Minimal pattern for attaching an object to a user or user space.

## Intent

- Keep a slot aligned with the local user (head/body or user space).

## Components

- `CopyGlobalTransform` (verified) or `VirtualParent` (not yet verified) for
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

## Notes

- Parenting directly under the user slot is usually avoided unless required.
- Other user-relative helpers exist (for example, `PositionAtUser`,
  `LookAtUser`, and tracking controllers). Use the inspector to confirm
  the best fit for a given request.
- For object semantics, see `notes/resonite/components/object-root.md`.
