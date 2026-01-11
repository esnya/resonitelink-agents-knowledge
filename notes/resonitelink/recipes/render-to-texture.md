# Render-to-texture capture (ResoniteLink)

Goal: spawn a reusable object that captures a camera frame to a local asset URL and writes it to a readable store.

## Required slots and components

### Capture root

- Slot name: `CaptureCamera`.
- Components:
  - `FrooxEngine.Camera` with `RenderTexture` bound to a `RenderTextureProvider`.
  - `FrooxEngine.Grabbable`.
  - `FrooxEngine.BoxCollider` (size `(1, 1, 0)` for a flat board).

### Render texture provider

- Child slot: `RenderTextureProvider`.
- Component: `FrooxEngine.RenderTextureProvider`.
- Suggested size: `(512, 512)`, depth `24`.

### Preview screen (optional)

- Child slot: `PreviewScreen`.
- Components:
  - `FrooxEngine.QuadMesh`.
  - `FrooxEngine.MeshRenderer` (single material).
  - `FrooxEngine.UnlitMaterial`.
- Bind `UnlitMaterial.Texture` to the same `RenderTextureProvider`.

### ProtoFlux nodes

- Parent slot: `ProtoFlux`.
- Child slots:
  - `RenderToTextureAsset` → `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Rendering.RenderToTextureAsset`
  - `RefObjectInput<Camera>` → `RefObjectInput<Camera>`
  - `ValueInput<bool>` → trigger input
  - `FireOnTrue` → `Actions.FireOnTrue`
  - `StartAsyncTask` → `FrooxEngine.Async.StartAsyncTask`
  - `ValueInput<int2>` → resolution
  - `ValueInput<int>` → quality
  - `ValueObjectInput<string>` → format (e.g., `PNG`)
  - `ObjectWrite<Uri>` → `ObjectWrite<FrooxEngineContext,Uri>`
  - `DataModelObjectFieldStore<Uri>` → store + store component (`+Store`)

## ComponentType prefix rules

- `ValueInput<T>` and `ValueObjectInput<T>` require `[ProtoFluxBindings]` prefix.
- `DataModelObjectFieldStore<Uri>` (node) uses `[ProtoFluxBindings]`.
- `DataModelObjectFieldStore<Uri>+Store` requires `[ProtoFlux.Nodes.FrooxEngine]`.

## Wiring summary

- `FireOnTrue.Condition` → `ValueInput<bool>.Value`.
- `FireOnTrue.OnChanged` → `StartAsyncTask.TaskStart`.
- `StartAsyncTask.TaskStart` → `RenderToTextureAsset`.
- `RenderToTextureAsset.Camera` → `RefObjectInput<Camera>`.
- `RenderToTextureAsset.Resolution` → `ValueInput<int2>`.
- `RenderToTextureAsset.Quality` → `ValueInput<int>`.
- `RenderToTextureAsset.Format` → `ValueObjectInput<string>`.
- `ObjectWrite.Variable` → `DataModelObjectFieldStore<Uri>` (IVariable).
- `ObjectWrite.Value` → `RenderToTextureAsset.RenderedAssetURL`.
- `DataModelObjectFieldStore<Uri>+Store.Node` → `DataModelObjectFieldStore<Uri>`.

## Trigger and URL retrieval

- Trigger capture by toggling `ValueInput<bool>.Value` from `false` to `true`.
- Read output from `DataModelObjectFieldStore<Uri>+Store.Value`.
- Local asset URL format: `local://<hash>/<filename>.PNG`.

## Pitfalls and fixes

- Store duplication: `DataModelObjectFieldStore<Uri>+Store` can appear multiple times on the slot.
  - The `+Store` component is auto-added with the node; avoid creating it twice.
  - Keep exactly one store; remove extras.
  - Validate the remaining store’s `Node` points to the `DataModelObjectFieldStore<Uri>` node.
- RenderedAssetURL wiring: ResoniteLink does not accept `memberName` indirections for `ObjectWrite.Value`.
  - Fetch the field id from `RenderToTextureAsset.RenderedAssetURL` via `getComponent`.
- ObjectWrite.Variable must be set, even if you wire `Value` later.
- Wrong camera reference: confirm `RenderToTextureAsset.Camera` points to the local `RefObjectInput<Camera>` node.
- Execution context: if nodes do not fire, the graph may not be attached to a ProtoFlux execution context.
  - Reuse an existing NodeGroup created by the ProtoFlux tool if needed.
