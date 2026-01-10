# UIX recipes and patterns (local)

This document distills UIX tutorial outputs and Root-level example patterns into reusable recipes.

## Recipes (tutorial-derived)
### Base UIX canvas
- Slot scale: (0.001, 0.001, 0.001) with `RectTransform`, `Canvas`, `Image`, `Grabbable`.
- Material: separate slot with `UI_UnlitMaterial`; bind `Image.Material` to it.
- Canvas Size used in examples: (512, 256).

### Simple vertical layout container
- Child slot `Layout` under canvas:
  - `RectTransform` + `Image` + `VerticalLayout`.
- Child slots for elements:
  - `RectTransform` + `Image` + `LayoutElement`.

### Button (simple)
- Canvas root as above.
- Button slot (child of canvas):
  - `RectTransform` (anchors inset), `Image`, `Button`.
- Text slot (child of button):
  - `RectTransform`, `Text` (centered).

### Scrollable text
- Canvas root as above.
- Mask slot:
  - `RectTransform`, `Image`, `Mask` (ShowMaskGraphic = true).
- ScrollRect slot (child of Mask):
  - `RectTransform`, `ScrollRect`, `ContentSizeFitter` (VerticalFit = MinSize), `VerticalLayout`.
- Content slot (child of ScrollRect):
  - `RectTransform`, `Text` (multi-line).

## Root example patterns (observed)

### Shared building blocks
- Many UIX samples use:
  - Root `ValueField<bool>` on the example slot.
  - `PlatformColorPalette` on a "Color palette source" child.
  - Multiple `ValueCopy<colorX>` in a "Color drives" child.
  - `Canvas` with `RectTransform`, `OverlappingLayout`, and often `ContentSizeFitter`.
  - Background `Image` with `IgnoreLayout` on a Background child.

## Design notes (pragmatic guidance)
- Root `ValueField<bool>` often acts as a scaffolded drive target for bool UI examples (e.g., checkbox/toggle), not strictly required for all UIX.
- `PlatformColorPalette` + multiple `ValueCopy<colorX>` appears in official samples, but can be overkill for ad-hoc UIX.
  - For user/agent builds, it can be reasonable to use known palette values directly from the wiki.
  - Optional: create a temporary `PlatformColorPalette`, read its fields, then delete it to keep colors current.
  - Following the palette is not mandatory; it mainly guarantees platform-consistent readability.
- `OverlappingLayout` is heavily used in samples.
  - If the parent has no Layout component, `RectTransform.OffsetMin/Max` can often substitute.
  - If children have Layout components, their Padding can be functionally similar.
  - Note: `RectTransform.OffsetMin/Max` may interact poorly with `ContentSizeFitter` (needs verification).
- Background `Image` is recommended. Without it, render ordering can become unstable; samples often add a special material or backing icon.

### Rocker
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Rocker element: `HorizontalLayout` + `LayoutElement`.
- Switch area: `Image` + `Button` + `ButtonToggle` + `LayoutElement`.
- Left/Right icon: `Image` + `LayoutElement`.

### Checkbox
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout` + `ContentSizeFitter`.
- Checkbox element: `OverlappingLayout`.
- Button child: `Image` + `Button` + `Checkbox` + `LayoutElement`.

### Icon button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `OverlappingLayout`, plus Icon child.

### Labeled button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `OverlappingLayout`.
- Text child: `Text`.

### Labeled icon button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `HorizontalLayout`.
- Text + Icon as children.

### Scroll area
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Scroll element: `Image` + `OverlappingLayout`.
- Mask child: `RectTransform` + `Mask` + `Image`.

### Slider (horizontal/vertical, bar/fader)
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout` (+ `ContentSizeFitter` on some).
- Background: `Image` + `IgnoreLayout`.
- Slider element:
  - Bar sliders: `Image` + `LayoutElement`.
  - Fader sliders: `OverlappingLayout` with `Slider<float>` + `LayoutElement`.
- Padding slot often uses `VerticalLayout`.

### Text field
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- TextField element: `Image` + `Button` + `TextField`.
- Text child: `Text`.

### Panel base
- Canvas: `VerticalLayout`.
- Background mask -> Backing (`Image`), plus Panel Icon child.
- Title layout: `HorizontalLayout` with spacers, text area, close button area.
- Main area: `LayoutElement`.
- Color palette + multiple `ValueCopy<colorX>` drivers.

### Reference Receiver Field
- Root: color palette + drives, `Canvas` with `OverlappingLayout`.
- Horizontal layout with:
  - Field element: `Image` + `Button` + `ReferenceReceiver` + `LayoutElement` + `Text`.
  - Labeled button element: `Image` + `Button` + `ButtonReferenceSet<IWorldElement>` + `LayoutElement` + `Text`.
- ProtoFlux helpers present: `ReferenceSource`/`ObjectCast`/`ObjectFieldDrive`/`ToString`.

### Arc Layout Example
- Canvas: `RectTransform` + `Canvas`.
- Arc layout: `ArcLayout` + `RectTransform` + `ValueField<int>`.
- Multiple `OutlinedArc` children:
  - `OutlinedArc` + `Button` + `ArcSegmentLayout` + `ValueRadio<int>`.

### TextDisplay / NoticeDisplay (panel-style)
- Root includes `TextDisplayInterface` or `NoticeDisplayInterface` plus `ValueFieldProxy<string>` and `TextExportable`.
- Canvas: `VerticalLayout` + `ContentSizeFitter`.
- Background: `Image` + `IgnoreLayout` with Backing image.
- Layout stack:
  - Header: `HorizontalLayout` with title area and close/icon area.
  - Body: `VerticalLayout` or `HorizontalLayout` for content.
  - Bottom controls: `HorizontalLayout` for actions (e.g., Dismiss).
- Large `PlatformColorPalette` + many `ValueCopy<colorX>` drivers.
- ProtoFlux often handles text scaling (ValueFieldDrive<float>).

### UrlDisplay (link panel)
- Root includes `HyperlinkDisplayInterface`, `ValueFieldProxy<Uri>`, `ValueCopy<Uri>` + `ValueCopy<string>`.
- Canvas: `VerticalLayout` + `ContentSizeFitter`.
- Horizontal layout with:
  - Background image (IgnoreLayout + Backing).
  - Copy link button (`ButtonClipboardCopyText` + `ButtonValueSet<float>`).
  - Link area (layout + link text).
  - Close button area.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers for theming.

### AudioPlayer (clip panel)
- Root includes `AudioPlayerInterface`, `AudioClip` proxy, `AudioExportable`.
- Canvas: `OverlappingLayout` with a main `HorizontalLayout` (Left/Center/Right areas).
- Center area uses `VerticalLayout` for title, background, and time controls.
- `AudioOutput` + `AudioClipPlayer` attached.
- `PlatformColorPalette` + many `ValueCopy<colorX>` drivers.
- Heavy ProtoFlux for scrubber, playback time formatting, hover effects, volume control.

### AudioStreamController (stream panel)
- Root includes `AudioStreamInterface`, `AudioStreamController`, `AudioOutput`.
- Canvas: `HorizontalLayout` with nested `VerticalLayout`.
- Volume area uses `Mask` + `Image` in a horizontal layout.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers.
- ProtoFlux handles volume label and state.

### VideoPlayer (media panel)
- Root includes `VideoPlayerInterface`, video/texture proxies, `VideoExportable`.
- Canvas: `VerticalLayout` with a background mask stack:
  - `HoverArea`, `Image`, `Mask`, Backing.
  - Play/Pause click area (`ButtonPlaybackAction`).
  - Video texture `Image` + `AspectRatioFitter`.
  - Overlay areas: drop shadow, title, volume, bottom controls.
- `AudioOutput` attached; panoramic viewer slots present.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers.
- ProtoFlux manages hover lerp, aspect ratio, playback, loading status.

### DocumentDisplay (document panel)
- Root includes `DocumentInterface`, `DocumentPageTexture`, metadata, asset proxy.
- Canvas: `VerticalLayout` + `ContentSizeFitter` with nested `HorizontalLayout`.
- Thumbnail area + vertical content layout.
- `PlatformColorPalette` present.
- ProtoFlux handles page navigation, size/zoom, selection bounds, and color tweaks.

### ColorDialog (advanced panel)
- Root includes `ColorDialogInterface` and `DynamicVariableSpace`.
- Large ProtoFlux graph for RGB sliders, HSV conversion, hex input, swatches, color profile, undo, and external updates.
- Uses many `ValueFieldDrive<colorX>` / `ValueFieldHook<float>` components.
- Treat as advanced example; avoid deep replication unless needed.

### Inspector (large container)
- Root includes `GenericUIContainer` + `SceneInspector` with a large UIX tree.
- Uses `Canvas`, `RectTransform`, `Image`, `SpriteProvider`, `StaticTexture2D`, `BoxCollider`, `Grabbable`.
- Prefer full extraction when possible (`depth=-1`) to capture field/editor subtrees; otherwise shallow inspection can miss patterns.

#### Inspector layout skeleton (observed)
- Frequent slot names: `Panel`, `Header`, `Content`, `Footer`, `Left`, `Right`, `Split`.
- `HorizontalLayout` and `VerticalLayout` dominate; `LayoutElement` used for sizing.
- Many text nodes use `LocaleStringDriver` for localization.

#### Title line / header button group
- Header rows are typically `HorizontalLayout` with:
  - Title `Text` + `LayoutElement` for expansion.
  - Utility buttons implemented as `UIX.Button` + `UIX.Image` + `LayoutElement`.
  - Common actions: `ButtonParentUnderUser` (pin to user) and `ButtonDestroy` (close).
  - Icon `Image` children often use `StaticTexture2D` + `SpriteProvider`.

#### Scroll + content pattern
- Scroll container often appears as:
  - `Scroll Area` slot: `RectTransform` + `Image` + `Mask`.
  - `Content` slot: `ScrollRect` + `RectTransform` + `VerticalLayout` + `ContentSizeFitter`.
- This pairs a masked viewport with a vertically laid out content list.

#### Layout patterns (general)
- `HorizontalLayout` and `VerticalLayout` are primary; `OverlappingLayout` appears for stacked overlays.
- `Split` sections commonly use `Left` / `Right` subpanels with `LayoutElement` to enforce widths.

#### Field row patterns (typed binding)
- **Editable field row** (string/bool/float/float3/int/long/floatQ):
  - `UIX.Button` + `UIX.Image` + `UIX.RectTransform`
  - `FieldDriveReceiver<T>` + `UIX.ValueReceiver<T>` + `ValueFieldProxySource<T>`
  - `InspectorMemberActions` present when editing is enabled.
- **Read-only/linked field row**:
  - `UIX.Button` + `UIX.RectTransform` + `UIX.Text`
  - `FieldDriveReceiver<T>` + `UIX.ValueReceiver<T>` + `ReferenceProxySource`

#### Value type matrix (observed in Inspector)
- `FieldDriveReceiver<T>` appears with these `T` values:
  - `string`, `bool`, `float`, `float3`, `floatQ`, `int`, `long`, `Uri`.
- Each type uses the same two row variants:
  - **Editable**: `ValueFieldProxySource<T>` + `InspectorMemberActions` + `Button/Image`.
  - **Linked**: `ReferenceProxySource` + `Text` display.

#### Reference field patterns
- `ReferenceDriveReceiver<Slot/User>` paired with `ReferenceProxySource`.
- Editable variants include `InspectorMemberActions` and a background `Image`.
- **Reference source button** (slot/component picker style):
  - `ReferenceCopy<Slot>` + `SlotComponentReceiver` + `UIX.Button` + `RectTransform`.

#### Receiver + source pairing
- In many panels, a **receiver** (FieldDriveReceiver/ValueReceiver) is paired with a **source** (ReferenceProxySource/ReferenceCopy) to support both display and selection.
- Use this as a template when building inspector-like pickers or reference fields.

#### Member editors
- `PrimitiveMemberEditor` and `BooleanMemberEditor` commonly live on `HorizontalLayout` rows.
- `QuaternionMemberEditor` appears in the same row style for rotations.

#### Text input
- `UIX.TextField` always paired with `TextEditor`.
- Typical node: `TextEditor` + `UIX.TextField` + `UIX.Button` + `UIX.Image` + `LayoutElement`.

#### Checkbox rows
- `UIX.Checkbox` paired with `UIX.Button` + `UIX.Image` + `AspectRatioFitter`.

#### Slot inspector subtree
- `SlotInspector` appears as a `VerticalLayout` container with its own `LayoutElement` children.

#### List / collection UI (observed patterns)
- No explicit `List`/`Collection` component types found in this Inspector snapshot.
- List-like areas are implemented as:
  - `ScrollRect` + `VerticalLayout` + `ContentSizeFitter` under a `Mask` viewport.
  - Content entries are `Button` rows using the same Field/Reference patterns above.
- Reference lists/pickers can appear as:
  - `SlotComponentReceiver` + `ReferenceCopy<Slot>` + `Button` on a `Content` slot.

#### Action buttons
- Utility actions include `ButtonParentUnderUser` (pin to user) and `ButtonDestroy` (close).

### ProtoFlux node visuals (scaffold)
- Node slots commonly include:
  - `ProtoFluxNodeVisual` + `Canvas` + `RectTransform` + `ContentSizeFitter`.
  - `BoxCollider`, `DestroyProxy`, and `UIX` sub-slots for labels/inputs/outputs.

### Node Browser (ComponentSelector UI)
- Root includes `GenericUIContainer` + `ComponentSelector` + `Canvas`.
- Visual shell:
  - Background `Image` with header + content areas.
  - Header: `HorizontalLayout` with title `Text` and utility buttons:
    - `ButtonParentUnderUser` (pin to user)
    - `ButtonDestroy` (close)
    - Icon `Image` children use `StaticTexture2D` + `SpriteProvider`.
- Content:
  - `VerticalLayout` containing a `HorizontalLayout` with a `TextField` (search) and an action `Button`.
  - `OverlappingLayout` with multiple `Scroll Area` panels (`Image` + `Mask`) for lists.

### Assets (UI materials & sprites)
- Appears as a large asset holder rather than an interactive UIX panel.
- Contains `StaticTexture2D`, `SpriteProvider`, `UI_UnlitMaterial`, and `UI_TextUnlitMaterial` entries for UI icons and materials.
- Useful as a palette/source of built-in UI assets when assembling custom UIX.

## Media display notes (observed)
### AudioPlayer waveform (static)
- No explicit waveform component type found in the current snapshot.
- UI uses `AudioClipPlayer` + `AudioOutput` and dynamic variables:
  - `waveform_layout_rect` (DynamicField<Rect>)
  - `waveform_hovering` (bool)
- Likely rendered via materials/shaders driven by these variables rather than a dedicated waveform component.

### AudioStreamController waveform (real-time)
- No explicit waveform component type found in the current snapshot.
- UI uses `UI_UnlitMaterial` / `UI_TextUnlitMaterial` and a masked volume area; waveform (if present) is not exposed as a distinct component.

### VideoPlayer display
- Video surface uses:
  - `UIX.Image` + `UIX.AspectRatioFitter` + `UIX.IgnoreLayout`
  - `DynamicReferenceVariableDriver<IAssetProvider<ITexture2D>>`
  - `Projection360Material` on the video texture slot
- Display is inside a `Mask` with overlay controls (play/pause button, title, volume, bottom controls).

### VideoTexture usage (non-UIX plumbing)
- `AssetProxy<VideoTexture>` on the player root.
- `VideoTextureProvider` on a `Video asset` child slot.
- References connect through:
  - `DynamicReference<IAssetProvider<ITexture2D>>`
  - `ReferenceCast<IAssetProvider<ITexture2D>, IAssetProvider<VideoTexture>>`
  - `ReferenceCopy<IAssetProvider<VideoTexture>>`
- Asset load progress tracked via `UsersAssetLoadProgress<VideoTexture>` and related dynamic references.
