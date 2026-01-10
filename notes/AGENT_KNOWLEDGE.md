# Resonite agent knowledge (local)

This file stores Resonite-specific guidance for agent workflows, grouped by domain.

## ResoniteLink (transport + API)
### Connectivity
- Prefer direct ResoniteLink WebSocket endpoints when proxy is on hold.
- Docker host alias can be reachable at `ws://host.docker.internal:40864/` (verified locally).

### ComponentType syntax (ResoniteLink AddComponent)
- Generic components can use angle-bracket notation with simple type names, e.g. `[FrooxEngine]FrooxEngine.ValueCopy<float3>` (verified).
- UIX components and UI materials resolved reliably with `[FrooxEngine]` prefix (e.g. `[FrooxEngine]FrooxEngine.UIX.Canvas`, `[FrooxEngine]FrooxEngine.UI_UnlitMaterial`).
- ProtoFlux CoreNodes `ValueFieldDrive<T>` must be added via `[ProtoFluxBindings]FrooxEngine.FrooxEngine.ProtoFlux.CoreNodes.ValueFieldDrive<T>` (double `FrooxEngine` namespace), then connect `Value` to an `INodeValueOutput<T>`.
- For generic arguments that are **FrooxEngine types**, use an **inner assembly qualifier** inside the generic argument. Examples:
  - `RefObjectInput<[FrooxEngine]FrooxEngine.Camera>` works (plain `RefObjectInput<FrooxEngine.Camera>` fails in ResoniteLink).
  - `ObjectWrite<[FrooxEngine]FrooxEngine.ProtoFlux.FrooxEngineContext,Uri>` works (plain `ObjectWrite<FrooxEngine.ProtoFlux.FrooxEngineContext,Uri>` fails).

### Slot updates (ResoniteLink UpdateSlot)
- `updateSlot` expects **slot fields at the top level** of `data`, not in `members`.
  - Works: `{ "$type": "updateSlot", "data": { "id": "<SlotId>", "position": { "$type": "float3", "value": {...} } } }`
  - Does **not** apply: `data.members.position` (returns success but no change).

### Drive/binding quirks observed through ResoniteLink
- ValueCopy<float3> Target bind can fail if multiple ValueCopy components exist; removing duplicates allowed Target -> BoxCollider.Size.
- ValueCopy<colorX> Target rejects PBS_Metallic color fields (Target stays null even with explicit `targetType`).

## Resonite (world + components)
### Rendering preferences
- Start TextRenderer `Size` at 1.0 for status displays unless instructed otherwise.

### UIX recipes
- See `experiments/resonitelink/notes/UIX_RECIPES.md` for reusable UIX patterns distilled from tutorials and Root examples.
### Resdb asset catalog
- See `experiments/resonitelink/notes/RESDB_ASSET_CATALOG.md` for observed resdb URLs with descriptions and typical component settings.
- Full official mapping list: `experiments/resonitelink/notes/OFFICIAL_ASSETS_CATALOG.tsv` (asset name → resdb URL).
### Button interactions
- See `experiments/resonitelink/notes/BUTTON_INTERACTIONS.md` for Common UI/Button Interactions component fields and ResoniteLink wiring notes.

### UI materials (Root assets)
- Root `UI_UnlitMaterial` default settings observed in this session:
  - Shader: unlit UI shader, `Sidedness: Double`, `BlendMode: Alpha`, `ZWrite: On`, `ZTest: LessOrEqual`.
  - `RectClip: false`, `AlphaClip: true`, `AlphaCutoff: 0.01`, `TextureMode: DirectColor`.
  - `Tint: (1,1,1,1 sRGB)`, `Overlay: false`, `OverlayTint: (1,1,1,0.73 sRGB)`.
  - `OffsetFactor: 10`, `OffsetUnits: 4000` (prevents depth fighting in UI).
  - `Texture` and `MaskTexture` are null by default; use `SpriteProvider` to supply sprite if needed.
  - Inspector background Images reference this material, so treat these parameters as the **standard background material** in the current session.

### UIX background Image defaults
- Tutorial/Scroll background `UIX.Image` components keep `Sprite: null` and rely on `UI_UnlitMaterial` + `Tint` for a solid fill.
- If a `Sprite` is assigned while `PreserveAspect` is true (default), the rendered fill can shrink to sprite aspect/padding, making child content look like it overflows the background.
- For solid panel backgrounds, keep `Sprite` unset (null). If you need a sprite, consider `PreserveAspect: false` or a 9-sliced sprite with proper padding.

### UI_UnlitMaterial variants (panel vs root)
- Root has multiple `UI_UnlitMaterial` assets with **different** offsets and modes (examples observed):
  - A standard background variant with large offsets and `Sidedness: Double`.
  - Variants with `OffsetFactor/Units: 0/0` and different `Sidedness`, `TextureMode`, `ZWrite`, `BlendMode`, and `RenderQueue`.
- Local panel materials created from UI templates used `OffsetFactor/Units: 1/1`, but **that is not a universal default**.
- **Observation:** offsets vary by material; do not assume `1/1` is universal. Pick a material that matches the specific UI asset you are mirroring, or leave `Material` unset for default behavior.

### UIX Image material usage
- Most UIX `Image` components do **not** need a custom material. Default material is fine for standard UI.
- Use a custom material only when a specific shader feature is required (e.g., special blending or mask behavior). Otherwise leave `Material` unset.

### UIX panel background + backplate icon pattern
- Panel-style UIX templates (Panel base, TextDisplay, UrlDisplay, NoticeDisplay, VideoPlayer) use **two** `UIX.Image` layers: a front `Background`/`Background mask` and a back `Backing`.
- Both layers use a sprite from the **same** panel texture (shared resdb URL: `resdb:///cb7ba11c8a391d6c8b4b5c5122684888a6a719179996e88c954a49b6b031a845.png`). Sprite providers use 9-slice borders `0.5` with fixed sizes around `48/64/80`.
- Front layer material: `UI_UnlitMaterial` with `BlendMode: Alpha`, `ZWrite: On`, `ZTest: LessOrEqual`, `TextureMode: DirectColor`, `Sidedness: Auto/Double`, `OffsetFactor: +1`, `OffsetUnits: 100`.
- Backing layer material: `UI_UnlitMaterial` with `Sidedness: Back` and `OffsetFactor: -1` (same other settings). This renders the backplate/icon pattern on the **back face** and avoids depth issues.
- If you need a visible backface or the standard panel icon pattern, keep the `Backing` image with the back-sided material; otherwise the panel can look flat or z-fight when viewed from behind.

### Common UIX sprite URLs (observed) + usage patterns
- **Panel background 9-slice**  
  - URL: `resdb:///cb7ba11c8a391d6c8b4b5c5122684888a6a719179996e88c954a49b6b031a845.png`  
  - Seen in: Panel base, TextDisplay, UrlDisplay, NoticeDisplay, VideoPlayer (Background/Backing)  
  - `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`, `Tint` set per panel  
  - `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 48/64/80`, `Scale: 1`  
- **Inspector/NodeBrowser 9-slice base**  
  - URL: `resdb:///cb6bd15c284f070b02dd72f02a790e1c58b3e12c2af229cc7c9323b7320739e4.png`  
  - Seen in: Inspector + NodeBrowser slots named `Image`  
  - `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`  
  - `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: ~80.33`, `Scale: 1`  
- **Small icon sprites (TextureSize)**  
  - URLs (observed in Inspector/NodeBrowser `Image` slots):  
    - `resdb:///e20ee64c91dcd4809d175a16418f9380f3c37c961d4db86368b7c78329b254db.png`  
    - `resdb:///1f4e90f99d5bea0640c7e223549f9985a658c84e32dacca233b779d5a41cae49.png`  
    - `resdb:///2ced9965ffa463f231551ce482ccca875d452e3596883876d42a4944e638e118.png`  
    - `resdb:///2d04e2e4ade14b0414d8190e55aba6380773394c6e6546e96d16fb7b74eb27ad.png`  
    - `resdb:///3213dcb0cb4471adb8fe5c920e306a46c44ef319c222fb6d80b9d23e553f6661.png`  
    - `resdb:///6428ac2e96d1fcb43a2cbdcc66bee208aebb3009f2a6b7cef9d54410dd8b6b6b.png`  
    - `resdb:///f6ebd9cbdc9f1998993625ab9932c0fcf098b3021c0b51af8d4eed25b6d12e91.png`  
    - `resdb:///e9fd7704d618615080fa070edc693c5aa13b467846d4fee63576d532b265370a.png`  
    - `resdb:///0f827887d101d31ba468b8cb89779b78783b39338e19f0a84035927a5d64ceb2.png`  
    - `resdb:///712fdf655825c22a40fb2b689e373d95fc74e504d8ef7b1b3a8cd9fa42dcd2cc.png`  
  - `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: TextureSize`  
  - `SpriteProvider`: `Borders: (0,0,0,0)`, `FixedSize: 8`, `Scale: 1`  

### ProtoFlux (runtime nodes and drives)
- ProtoFlux runtime nodes can be added via `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.*` componentType.
- `ProtoFlux.Driver<colorX>` did not update targets; nodes appear not evaluated without a built NodeGroup (Driver never propagates ValueInput changes).
- Practical workaround: `ValueInput<colorX>` (ProtoFlux node) + `ValueCopy<colorX>` (Source -> ValueInput.Value, Target -> PBS.AlbedoColor) to drive color from a node component without ProtoFlux tool.

### Render-to-texture capture recipe (ResoniteLink)
Goal: spawn a reusable object that captures a camera frame to a **local asset** URL and writes it to a readable store.

#### Required components (slot layout)
- `HandheldCamera` slot:
  - `Camera` with `RenderTexture` bound to a `RenderTextureProvider` (verified working; likely required for capture, needs more testing).
  - Optional preview board: `Screen` slot with `QuadMesh` + `MeshRenderer` + `UnlitMaterial` where `Texture` targets the same `RenderTextureProvider`.
- `ProtoFluxNodes` slot (children; names are for human lookup):
  - `RenderToTextureNode` → `FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Rendering.RenderToTextureAsset`
  - `BoolValueInputNode` → `ValueInput<bool>` (trigger control)
  - `OnTrueNode` → `Actions.FireOnTrue` (Condition → BoolValueInput)
  - `StartAsyncTaskNode` → `FrooxEngine.Async.StartAsyncTask` (TaskStart → RenderToTextureNode)
  - `ObjectWriteNode` → `ObjectWrite<FrooxEngineContext,Uri>` (Value → RenderToTexture.RenderedAssetURL)
  - `RenderResolution` → `ValueInput<int2>` (Resolution)
  - `RenderQuality` → `ValueInput<int>` (Quality)
  - `RenderFormat` → `ValueObjectInput<string>` (Format, e.g. `"PNG"`)
  - `RenderedUrlStore` → `DataModelObjectFieldStore<Uri>` + `DataModelObjectFieldStore<Uri>+Store` (URL sink)

#### ComponentType prefix rules (observed)
- `ValueInput<T>` / `ValueObjectInput<T>` require `[ProtoFluxBindings]` prefix.
  - Example: `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueInput<int2>`
  - Example: `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.ValueObjectInput<string>`
- `DataModelObjectFieldStore<Uri>` (node) can be added via `[ProtoFluxBindings]`.
- `DataModelObjectFieldStore<Uri>+Store` **requires** `[ProtoFlux.Nodes.FrooxEngine]` prefix.
  - Example: `[ProtoFlux.Nodes.FrooxEngine]ProtoFlux.Runtimes.Execution.Nodes.FrooxEngine.Variables.DataModelObjectFieldStore<Uri>+Store`

#### Wiring summary (ProtoFlux members)
- `FireOnTrue.Condition` → `BoolValueInput.Value`
- `FireOnTrue.OnChanged` → `StartAsyncTask.TaskStart` (observed in this session; `OnTrue` was not present)
- `ObjectWrite.Variable` → `DataModelObjectFieldStore<Uri>` (must be set even if `ObjectWrite.Value` is wired later)
- `StartAsyncTask.TaskStart` → `RenderToTextureAsset` (node)
- `RenderToTextureAsset.Camera` → `RefObjectInput<Camera>` (or `ValueObjectInput<Camera>`)
- `RenderToTextureAsset.Resolution` → `ValueInput<int2>`
- `RenderToTextureAsset.Quality` → `ValueInput<int>`
- `RenderToTextureAsset.Format` → `ValueObjectInput<string>`
- `ObjectWrite.Value` → `RenderToTextureAsset.RenderedAssetURL`
- `ObjectWrite.Variable` → `DataModelObjectFieldStore<Uri>` (IVariable)
- `DataModelObjectFieldStore<Uri>+Store.Node` → `DataModelObjectFieldStore<Uri>`

#### Trigger + URL retrieval
- Trigger capture by toggling `BoolValueInput.Value` from `false` → `true` (FireOnTrue).
- Read output from `RenderedUrlStore` slot’s `DataModelObjectFieldStore<Uri>+Store.Value`.
- **Local asset URL format:** `local://<hash>/<filename>.PNG` (observed).
  - The filename portion after the last `/` is the saved image.
  - The asset content exists under Resonite’s Assets or Cache directories (environment-dependent).

#### Pitfalls observed (and fixes)
- **Store duplication:** `DataModelObjectFieldStore<Uri>+Store` can appear **multiple times** on the same slot. In practice, a second store may be auto-created, so explicitly adding a store can produce duplicates.  
  - Fix: keep **exactly one** `+Store` component. If multiple exist, remove the extras and keep the one that receives values.  
  - Validation: `getSlot` on `RenderedUrlStore` should show a single `+Store` whose `Node` points to the `DataModelObjectFieldStore<Uri>` node.
- **Wrong camera reference:** if a payload is copied from a previous object, `RenderToTextureAsset.Camera` can accidentally point to another object’s `RefObjectInput<Camera>`.  
  - Fix: after creation, always `getComponent` for `RenderToTextureAsset` and confirm `Camera.targetId` matches the **local** `RefObjectInput<Camera>` node id.
- **FireOnTrue add type:** `FireOnTrue` must be added with the **FrooxEngine namespace** and `[ProtoFluxBindings]` prefix.  
  - Working: `[ProtoFluxBindings]FrooxEngine.ProtoFlux.Runtimes.Execution.Nodes.Actions.FireOnTrue`  
  - Fails: `[ProtoFlux.Nodes.FrooxEngine]ProtoFlux.Runtimes.Execution.Nodes.Actions.FireOnTrue` (invalid cast to `IWorker`).
- **RenderedAssetURL wiring:** ResoniteLink does **not** accept `memberName` indirections for `ObjectWrite.Value`; you must reference the **field id** from `RenderToTextureAsset.RenderedAssetURL` (obtain via `getComponent`).
- **Execution not running:** `FireOnTrue`/`StartAsyncTask`/`RenderToTextureAsset` may never fire if the graph is **not attached to a ProtoFlux execution context**.  
  - Evidence: `OnRenderStarted`/`OnFailed`/`OnStarted` never trigger, stores remain null even after toggling `ValueInput hookup`.  
  - `FrooxEngine.ProtoFlux.ProtoFluxNodeGroup` exists but cannot be instantiated via ResoniteLink (no parameterless constructor).  
  - Likely fix: **clone or reuse** an existing NodeGroup created by the ProtoFlux tool or a template, then place nodes under it.

### Drive node structure (generic)
- Verified pattern: `ValueFieldDrive<T>` (ProtoFlux CoreNodes) outputs a drive value; `FieldDriveBase<T>+Proxy` binds `Node` -> the drive node and `Drive` -> target `IField<T>`.
- Example (Root/`ValueFieldDrive\`1`): `WorldTimeFloat` -> `Pack_Float3` (Y) -> `FromEuler_floatQ` -> `ValueFieldDrive<floatQ>`; `FieldDriveBase<floatQ>+Proxy.Drive` points to a slot Rotation field (`EmptyObject` slot Rotation id `Reso_13519`).
- Inference: other `*Drive` CoreNodes likely use the same pairing with `FieldDriveBase<T>+Proxy` for the actual field binding.
