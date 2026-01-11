# User Following (ObjectRoot)

Minimal pattern for attaching an object to a user or user space.

## Intent

- Keep a slot aligned with the local user (head/body or user space).

## Components

- `ObjectRoot` for user-relative parenting.
- `CopyGlobalTransform` or `ReferenceCopy<Slot>` for following a target slot.

## Wiring

- Set the target slot (head, body, or user space).
- Apply offset in local space for positioning.

## Verification

- Created `Agent_UserFollow` parented under the current user slot with
  `ObjectRoot` + `TextRenderer` via ResoniteLink.
- Visual tracking needs in-world confirmation.
