# User Tracking and Following

This guide shows how to make objects follow or track user position.

## Basic following

### ObjectRoot component

ObjectRoot attaches a slot hierarchy to a user's body part:

- Side: None, Left, or Right
- Node: Head, LeftHand, RightHand, etc.

### Example: Head-following text

Slot: `FollowingText`

- Components:
  - TextRenderer (display text)
  - ObjectRoot
    - Side: None
    - Node: Head

This makes text follow user's head position.

## Distance-based following

### ObjectRootPositionDriver

Drives slot position based on user position with offset:

- PositionReference: target slot to follow
- PositionOffset: offset from target
- RotationReference: target rotation
- RotationOffset: rotation offset

### Example: Floating UI panel

Slot: `FloatingPanel`

- Position offset: (0, 0.3, 0.5) - in front and above head
- Components:
  - Canvas, Image (UI structure)
  - ObjectRoot or PositionDriver

## Smooth following

### SmoothTransform component

Smoothly interpolates position/rotation toward target:

- Target: slot to follow
- Speed: interpolation speed
- PositionSmooth: enable position smoothing
- RotationSmooth: enable rotation smoothing

Prevents jittery movement.

## LookAt behavior

### Billboard component

Makes slot face toward camera/user:

- Mode options:
  - YawOnly: rotate only on Y axis (vertical)
  - Full: full rotation toward camera
  - Locked: fixed rotation

### Example: Nameplate above object

Slot: `Nameplate`

- Parent to object slot
- Local position: (0, 0.5, 0) - above object
- Components:
  - TextRenderer (name text)
  - Billboard (Mode: YawOnly)

## Advanced: Custom follow logic

### Via ProtoFlux

Use ProtoFlux to create custom tracking:

1. Read user position (LocalUser + GetSlot)
2. Calculate target position (add offset)
3. Write to follower slot position

### Example nodes

- LocalUser → Get local user
- Get Slot → Get user's head/hand slot
- Get Global Position → Read world position
- Add float3 → Apply offset
- Set Global Position → Update follower

## Common patterns

### HUD elements

Attach to user's head with small forward offset:

- ObjectRoot: Head
- Position offset: (0, 0, 0.3)
- Billboard for text visibility

### Hand-attached tools

Follow hand position exactly:

- ObjectRoot: LeftHand or RightHand
- No position offset
- Add interaction components

### Orbiting camera

Smooth follow at distance:

- SmoothTransform target = user head
- Position offset = desired camera distance
- RotationSmooth enabled

## Performance considerations

### Update frequency

- ObjectRoot: native fast tracking
- ProtoFlux position update: triggers on change
- Prefer native components for simple following

### Multiple followers

Many ObjectRoot components are efficient.

Avoid heavy ProtoFlux logic in update loops.

## Related

- User input: `notes/resonite/protoflux/INDEX.md`
- UIX positioning: `notes/resonite/uix/INDEX.md`
- Billboard text: `notes/resonite/tutorials/world-text.md`
