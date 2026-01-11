# Scene Inspector hack (read hidden component data)

Use a `SceneInspector` UI to surface data that ResoniteLink does not expose
directly (example: `SkinnedMeshRenderer` blendshape names).

## When to use

- ResoniteLink only exposes `BlendShapeWeights` (float list) but not names.
- Components with rich inspector UI (materials, mesh data, blendshapes).

## Recipe

1. Create an inspector slot.
2. Add the inspector UI components:
   - `[FrooxEngine]FrooxEngine.SceneInspector`
   - `[FrooxEngine]FrooxEngine.GenericUIContainer`
3. Set `SceneInspector.Root` to the target slot.
4. Set `SceneInspector.ComponentView` to the same target slot to populate the
   component list and details.
5. Read the inspector UI tree under the inspector slot:
   - Use `_componentsContentRoot` from the `SceneInspector` component.
   - The UI includes a `ComponentRoot` slot.
   - `UIX.Text` values under `ComponentRoot` include inspector labels.
6. Extract values following `BlendShapeWeights (list):` until the next action
   block (e.g., a `Task<...>` or `void ...` entry).

## Notes

- `SceneInspector` must use the assembly-qualified component type:
  `[FrooxEngine]FrooxEngine.SceneInspector`.
- `GenericUIContainer` must use:
  `[FrooxEngine]FrooxEngine.GenericUIContainer`.
- `updateComponent` should set fields through `members` for reliable updates.
- Remove the temporary inspector slot once the data is captured to avoid
  leaving debug UI in the world.
