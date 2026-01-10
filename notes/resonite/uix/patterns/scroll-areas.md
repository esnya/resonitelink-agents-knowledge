# UIX scroll area patterns (observed)

This note compares scroll-area structures from the official sample, the Kokoa UIX template, and the Panel Base templates.

## Official "Scroll area" sample (Root slot: `Scroll area`)

- Root slot:
  - `ValueField<bool>` + `Grabbable` on the root demo slot.
  - Color palette: `PlatformColorPalette` + `ValueCopy<colorX>` drives (palette neutrals feed background/scroll colors).
- Canvas:
  - `Canvas` size `512 x 256`, `RectTransform`, `BoxCollider`, `OverlappingLayout`.
- Background:
  - `Image` + `SpriteProvider` + `IgnoreLayout`.
  - `Tint` ~ `(0.0667, 0.0824, 0.1137, 1 sRGB)`, `PreserveAspect: true`, `NineSliceSizing: FixedSize`.
- Scroll element:
  - `Image` + `OverlappingLayout`.
  - Mask child (`Padding`): `Mask` (`ShowMaskGraphic: false`) + `Image` (sprite/material null, white tint).
- Text area:
  - `RectTransform` → child `Scroll rect` with `ScrollRect` + `ContentSizeFitter` + `OverlappingLayout`.
  - `ScrollRect`: `HorizontalAlign: Center`, `VerticalAlign: Middle`, `ViewportOverride` points to the text area.
  - `ContentSizeFitter`: `VerticalFit: PreferredSize`, `HorizontalFit: Disabled`.
  - Text child: `Text` size `24.44582`, `LineHeight: 1`, `Align: Center/Middle`, `ParseRichText: true`, `AutoSizeMin: 8`, `AutoSizeMax: 64`, auto-size disabled.

## Kokoa UIX scroll template (Root slot: `KokoaUixScroll_0`)

- Root canvas:
  - `Canvas` size `512 x 256`, `RectTransform`, `BoxCollider` size `512 x 256 x 0`, `Grabbable` (non-scalable).
  - Background `Image` uses `UI_UnlitMaterial` (`KokoaUixScroll_0_UIUnlit`).
  - Background tint ~ `(0.16, 0.16, 0.18, 1 sRGB)`.
- Mask:
  - `Mask` + `Image` (tint ~ `(0.1, 0.1, 0.12, 1 sRGB)`), `ShowMaskGraphic: true`.
- ScrollRect:
  - `ScrollRect` align `Left/Top`, `NormalizedPosition: (0, 1)`.
  - `ContentSizeFitter`: `VerticalFit: MinSize`.
  - `VerticalLayout`: spacing `4`, padding `4` all sides, `ForceExpandWidth/Height: true`.
- Text content:
  - `Text` size `48`, `LineHeight: 0.8`, `Align: Left/Top`, `Color: (0.9, 0.9, 0.9, 1 sRGB)`.

## Panel Base template: Scroll Area (simple)

Template slot: `Panel Base/Canvas/Templates/Scroll Area` (the first one).

- Root:
  - `Image` + `Mask` + `LayoutElement` on the scroll container.
  - `LayoutElement`: `MinHeight: 128`, `FlexibleWidth: 1`.
  - `Image`: sprite/material null, `PreserveAspect: false`, `NineSliceSizing: TextureSize`.
  - `Mask`: `ShowMaskGraphic: false`.
- Content:
  - `ScrollRect` (`Align: Left/Top`, `NormalizedPosition: (0,0)`), `VerticalLayout` (padding `4`, spacing `0`), `ContentSizeFitter` (`VerticalFit: MinSize`).
  - Text: size `24`, `LineHeight: 0.8`, `Align: Left/Top`, `ParseRichText: false`, `AutoSizeMin: 8`, `AutoSizeMax: 40`.

## Panel Base template: Scroll Area + Slider

Template slot: `Panel Base/Canvas/Templates/Scroll Area` (the second one).

- Scroll container:
  - Same `Image` + `Mask` + `LayoutElement` as the simple template.
  - `VerticalLayout` padding right `24` (space for the scroll bar).
- Slider (scroll bar):
  - Anchored to the right edge (`AnchorMin/Max.x = 1`), width `16` via `RectTransform` offset.
  - `Image` uses sprite `Reso_2B48A`, `NineSliceSizing: RectWidth`, dark tint.
  - Child `Offset` slot adds vertical inset (`OffsetMin.y = 20`, `OffsetMax.y = -20`).
