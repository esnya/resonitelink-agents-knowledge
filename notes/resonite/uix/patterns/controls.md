# UIX control patterns

## Rocker
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Rocker element: `HorizontalLayout` + `LayoutElement`.
- Switch area: `Image` + `Button` + `ButtonToggle` + `LayoutElement`.
- Left/Right icon: `Image` + `LayoutElement`.

## Checkbox
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout` + `ContentSizeFitter`.
- Checkbox element: `OverlappingLayout`.
- Button child: `Image` + `Button` + `Checkbox` + `LayoutElement`.

## Icon button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `OverlappingLayout`, plus icon child.

## Labeled button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `OverlappingLayout`.
- Text child: `Text`.

## Labeled icon button
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Button: `Image` + `Button` + `HorizontalLayout`.
- Text + icon as children.

## Scroll area
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Scroll element: `Image` + `OverlappingLayout`.
- Mask child: `RectTransform` + `Mask` + `Image`.

## Slider (horizontal/vertical, bar/fader)
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- Background: `Image` + `IgnoreLayout`.
- Slider element:
  - Bar sliders: `Image` + `LayoutElement`.
  - Fader sliders: `OverlappingLayout` with `Slider<float>` + `LayoutElement`.
- Padding slot often uses `VerticalLayout`.

## Text field
- Root: `ValueField<bool>`, color palette + drives, `Canvas` with `OverlappingLayout`.
- TextField element: `Image` + `Button` + `TextField`.
- Text child: `Text`.

## Reference receiver field
- Root: color palette + drives, `Canvas` with `OverlappingLayout`.
- Horizontal layout with:
  - Field element: `Image` + `Button` + `ReferenceReceiver` + `LayoutElement` + `Text`.
  - Labeled button element: `Image` + `Button` + `ButtonReferenceSet<IWorldElement>` + `LayoutElement` + `Text`.
- ProtoFlux helpers present: `ReferenceSource`, `ObjectCast`, `ObjectFieldDrive`, `ToString`.

## Arc layout example
- Canvas: `RectTransform` + `Canvas`.
- Arc layout: `ArcLayout` + `RectTransform` + `ValueField<int>`.
- Multiple `OutlinedArc` children:
  - `OutlinedArc` + `Button` + `ArcSegmentLayout` + `ValueRadio<int>`.
