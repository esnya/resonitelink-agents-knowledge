# UIX tutorial experiment (local)

Source: official Resonite Wiki "UIX Tutorial" (Empty Canvas section).

## Status
- Completed: empty canvas created, styled, and assigned UI Unlit material.
- Completed: simple vertical layout added to canvas.
- Completed: button section implemented on a separate canvas to avoid overlap.
- Completed: scrollable text section implemented on a separate canvas to avoid overlap.

## What we executed via ResoniteLink
- Created root-level slots (offset to avoid RGB cube overlap):
  - `KokoaUixTutorial_0` at (0.8, 1.2, 2.2), scale (0.001, 0.001, 0.001).
  - `KokoaUixTutorial_0_Material` at (1.1, 1.2, 2.2).
- UIX components on `KokoaUixTutorial_0`:
  - `RectTransform` (`KokoaUixTutorial_0_RectTransform`)
  - `Canvas` (`KokoaUixTutorial_0_Canvas`) with Size (512, 256)
  - `Image` (`KokoaUixTutorial_0_Image`) with Tint (0.2, 0.2, 0.25, 1.0)
  - `Grabbable` (`KokoaUixTutorial_0_Grabbable`)
- Material slot `KokoaUixTutorial_0_Material`:
  - `UI_UnlitMaterial` (`KokoaUixTutorial_0_UIUnlit`)
  - ZWrite = On, OffsetFactor = 1, OffsetUnits = 1
- Image Material bound to `KokoaUixTutorial_0_UIUnlit`.

## Simple vertical layout (UIX Tutorial)
- Added layout container: `KokoaUixTutorial_0_Layout` (child of `KokoaUixTutorial_0`).
- Components on layout:
  - `RectTransform` (`KokoaUixTutorial_0_Layout_RectTransform`)
  - `Image` (`KokoaUixTutorial_0_Layout_Image`)
  - `VerticalLayout` (`KokoaUixTutorial_0_Layout_VerticalLayout`) with Padding 4 and Spacing 4
- Added 3 layout elements:
  - `KokoaUixTutorial_0_Element_0`..`2` with `RectTransform`, `Image`, `LayoutElement`.

## A button (UIX Tutorial)
- Created new canvas to avoid overlap with previous layout:
  - `KokoaUixButton_0` at (1.4, 1.2, 2.2), scale (0.001, 0.001, 0.001)
  - `KokoaUixButton_0_Material` at (1.7, 1.2, 2.2)
- Canvas components:
  - `RectTransform` (`KokoaUixButton_0_RectTransform`)
  - `Canvas` (`KokoaUixButton_0_Canvas`) size (512, 256)
  - `Image` (`KokoaUixButton_0_Image`) tint (0.18, 0.18, 0.2, 1.0)
  - `Grabbable` (`KokoaUixButton_0_Grabbable`)
  - `UI_UnlitMaterial` (`KokoaUixButton_0_UIUnlit`) and Image.Material bound to it
- Button structure:
  - Slot `KokoaUixButton_0_Button` with `RectTransform` (AnchorMin 0.05,0.05 / AnchorMax 0.95,0.95), `Image`, and `Button` component (`KokoaUixButton_0_Button_Component`).
  - Child `KokoaUixButton_0_Button_Text` with `RectTransform` and `Text` component (`KokoaUixButton_0_Button_Text_Component`) content "Button".

## Scrollable text (UIX Tutorial)
- Created new canvas to avoid overlap:
  - `KokoaUixScroll_0` at (2.0, 1.2, 2.2), scale (0.001, 0.001, 0.001)
  - `KokoaUixScroll_0_Material` at (2.3, 1.2, 2.2)
- Canvas components:
  - `RectTransform` (`KokoaUixScroll_0_RectTransform`)
  - `Canvas` (`KokoaUixScroll_0_Canvas`) size (512, 256)
  - `Image` (`KokoaUixScroll_0_Image`) tint (0.16, 0.16, 0.18, 1.0)
  - `Grabbable` (`KokoaUixScroll_0_Grabbable`)
  - `UI_UnlitMaterial` (`KokoaUixScroll_0_UIUnlit`) and Image.Material bound to it
- ScrollRect structure:
  - `KokoaUixScroll_0_Mask` with `RectTransform`, `Image`, and `Mask` (`ShowMaskGraphic = true`)
  - `KokoaUixScroll_0_ScrollRect` with `RectTransform`, `ScrollRect`, `ContentSizeFitter` (VerticalFit = MinSize), and `VerticalLayout` (Padding 4 / Spacing 4)
  - `KokoaUixScroll_0_Content` with `RectTransform` and `Text` (multi-line content)
