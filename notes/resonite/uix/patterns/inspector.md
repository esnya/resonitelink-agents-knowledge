# UIX Inspector patterns

## Inspector container
- Root includes `GenericUIContainer` + `SceneInspector` with a large UIX tree.
- Uses `Canvas`, `RectTransform`, `Image`, `SpriteProvider`, `StaticTexture2D`, `BoxCollider`, `Grabbable`.
- Prefer full extraction (`depth = -1`) to capture field/editor subtrees; shallow inspection can miss patterns.

## Layout skeleton
- Frequent slot names: `Panel`, `Header`, `Content`, `Footer`, `Left`, `Right`, `Split`.
- `HorizontalLayout` and `VerticalLayout` dominate; `LayoutElement` used for sizing.
- Many text nodes use `LocaleStringDriver` for localization.

## Title line / header button group
- Header rows are typically `HorizontalLayout` with:
  - Title `Text` + `LayoutElement` for expansion.
  - Utility buttons implemented as `UIX.Button` + `UIX.Image` + `LayoutElement`.
  - Common actions: `ButtonParentUnderUser` (pin to user) and `ButtonDestroy` (close).
  - Icon `Image` children often use `StaticTexture2D` + `SpriteProvider`.

## Scroll + content pattern
- Scroll container often appears as:
  - `Scroll Area` slot: `RectTransform` + `Image` + `Mask`.
  - `Content` slot: `ScrollRect` + `RectTransform` + `VerticalLayout` + `ContentSizeFitter`.

## Layout patterns (general)
- `HorizontalLayout` and `VerticalLayout` are primary.
- `OverlappingLayout` appears for stacked overlays.
- `Split` sections commonly use `Left` / `Right` subpanels with `LayoutElement` to enforce widths.

## Field row patterns (typed binding)
- Editable field row (string/bool/float/float3/int/long/floatQ):
  - `UIX.Button` + `UIX.Image` + `UIX.RectTransform`.
  - `FieldDriveReceiver<T>` + `UIX.ValueReceiver<T>` + `ValueFieldProxySource<T>`.
  - `InspectorMemberActions` present when editing is enabled.
- Read-only/linked field row:
  - `UIX.Button` + `UIX.RectTransform` + `UIX.Text`.
  - `FieldDriveReceiver<T>` + `UIX.ValueReceiver<T>` + `ReferenceProxySource`.

## Value type matrix (observed)
- `FieldDriveReceiver<T>` appears with:
  - `string`, `bool`, `float`, `float3`, `floatQ`, `int`, `long`, `Uri`.
- Each type uses the same two row variants:
  - Editable: `ValueFieldProxySource<T>` + `InspectorMemberActions` + `Button/Image`.
  - Linked: `ReferenceProxySource` + `Text` display.
