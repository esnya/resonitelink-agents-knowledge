# UIX recipes (tutorial-derived)

## Base UIX canvas
- Slot scale: `(0.001, 0.001, 0.001)` with `RectTransform`, `Canvas`, `Image`, `Grabbable`.
- Material: separate slot with `UI_UnlitMaterial`; bind `Image.Material` to it.
- Canvas size used in examples: `(512, 256)`.

## Simple vertical layout container
- Child slot `Layout` under canvas:
  - `RectTransform` + `Image` + `VerticalLayout`.
- Child slots for elements:
  - `RectTransform` + `Image` + `LayoutElement`.

## Button (simple)
- Canvas root as above.
- Button slot (child of canvas):
  - `RectTransform` (anchors inset), `Image`, `Button`.
- Text slot (child of button):
  - `RectTransform`, `Text` (centered).

## Scrollable text
- Canvas root as above.
- Mask slot:
  - `RectTransform`, `Image`, `Mask` (ShowMaskGraphic = true).
- ScrollRect slot (child of Mask):
  - `RectTransform`, `ScrollRect`, `ContentSizeFitter` (VerticalFit = MinSize), `VerticalLayout`.
- Content slot (child of ScrollRect):
  - `RectTransform`, `Text` (multi-line).
