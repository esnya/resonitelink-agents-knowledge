# Panel Base template library (observed)

Templates live under `Panel Base/Canvas/Templates`. This note records the observed structure and settings that are reusable.

## Field templates

### TextField

- Root: `RectTransform` + `HorizontalLayout` (spacing `4`, `Center/Middle`, no padding).
- Dynamic wiring: `DynamicField<string>` (`VariableName: TextField`) + `ValueCopy<string>` (WriteBack true) + `ReferenceMultiDriver`.
- Label `Text`: content `TextField`, size `64`, auto-size `0..16`, line height `0.8`, `Center/Middle`.
- Input (`TextField` child):
  - `Image` sprite `Reso_2B48B`, tint ~ `(0.1686, 0.1843, 0.2078, 1 sRGB)`, `NineSliceSizing: FixedSize`.
  - `LayoutElement`: `MinHeight: 24`, `PreferredWidth: 128`, `PreferredHeight: 24`.
- Clear button: `Image` sprite `Reso_2B48A`, `LayoutElement` `24 x 24`, label text `∅` (size `64`).

### FloatField

- Same layout as `TextField` (spacing `4`, center/middle).
- `DynamicField<float>` (`VariableName: FloatField`) + `ReferenceMultiDriver` for `IField<float>`.
- Label `FloatField`, size `64`.
- Input text default `0` (size `64`), `TextField` image uses sprite `Reso_2B48B`.
- Two buttons: `-` and `+` (size `64`) using sprite `Reso_2B48A`.

### IntField

- Same structure as `FloatField`.
- `DynamicField<int>` (`VariableName: IntField`).
- Input text default `0`, buttons `-` and `+`.

### SlotField

- `DynamicReferenceVariable<Slot>` (`VariableName: SlotField`).
- Label `SlotField`, size `64`.
- Input text default `<i>null</i>` (size `24.45`, rich text).
- Input `Image` uses sprite `Reso_2B48B` (same tint as other fields).
- Clear button label `∅` using sprite `Reso_2B48A`.

### ToggleField

- `DynamicField<bool>` (`VariableName: ToggleField`).
- Horizontal layout with the `Checkbox` template + label `ToggleField` (size `64`).

## Control templates

### Checkbox

- `Image` uses sprite `Reso_2B48A`, tint ~ `(0.0242, 0.0284, 0.0356, 1 Linear)`.
- `LayoutElement`: `32 x 32`.
- Animated state stack: `SmoothValue<colorX>` + `SmoothValue<float>` (speed `16`) + `ValueGradientDriver<colorX>` + `BooleanValueDriver<float>` + `ValueMultiDriver<float>`.
- Icon slot: `RectTransform` inset `8` on all sides.

### Slider

- `Slider<float>` value ~ `0.508` with `LayoutElement` `MinHeight: 24`.
- Base `Image` uses sprite `Reso_2B48A`, `NineSliceSizing: RectHeight`, dark tint (same as checkbox).
- `SmoothValue<colorX>` drives tint (speed `16`).
- Bar child:
  - `Image` sprite `Reso_2B48A`, light tint `(0.882, 0.882, 0.878, 1 sRGB)`.
  - `RectTransform`: `OffsetMin/Max = 4`, `AnchorMax.x` tracks slider value.

### DynamicImpulseTrigger

- `Image` uses sprite `Reso_2B48A`, tint ~ `(0.1686, 0.1843, 0.2078, 1 sRGB)`.
- `LayoutElement`: `MinWidth/Height: 24`.
- `ButtonDynamicImpulseTrigger`:
  - `PressedTag: DynamicImpulseTrigger`.
  - `Target` is driven by `DynamicReferenceVariableDriver<Slot>` (`VariableName: EventRoot`).
- Text label `DynamicImpulseTrigger`, size `32`.

## Layout templates

### Padding

- Root: `OverlappingLayout` with `PaddingLeft/Right = 32`, center/middle alignment.
- Child slider:
  - Rail and handle sprites `Reso_2B48A`, `NineSliceSizing: RectHeight`.
  - Handle anchored to slider value (`~0.6967`), size `40 x 24`.

### Horizontal Layout (composite)

- `HorizontalLayout` spacing `8`, align `Left/Top`.
- Children: a `Slider` and the `Padding` template.

### Vertical Layout (simple)

- `VerticalLayout` spacing `8`, align `Left/Top`, no padding, no force expand.

### Horizontal Layout (simple)

- `HorizontalLayout` spacing `8`, align `Left/Top`, no padding, no force expand.

## Shared assets

- Sprite `Reso_2B48A`: used for panel background, buttons, slider rails/bars.
- Sprite `Reso_2B48B`: used for text field input background.
- See `notes/resonite/assets/resdb-catalog.md` for URLs and sprite provider settings.
