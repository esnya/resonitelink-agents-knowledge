# Grabbable

Notes about `Grabbable` behavior and transform changes during grab/release.

## Observed behavior

- When a user grabs a `Grabbable` slot, it becomes a child of the user's
  holder slot under the hand.
- The parent-child relationship and local coordinate space change at grab time
  and again on release.
- `Grabbable` provides settings that control which parent is chosen on release.
- Grab requires hit detection: any descendant collider that does not have
  `IgnoreRaycast` set to `true` can be used for grabbing within its bounds.

## Implications

- Do not assume local transforms remain stable across grab/release.
- If a system depends on stable local space, capture or reapply transforms when
  the grab state changes.

## Related

- Object semantics: `notes/resonite/components/object-root.md`
- Interaction modes: `notes/resonite/components/interaction-modes.md`
