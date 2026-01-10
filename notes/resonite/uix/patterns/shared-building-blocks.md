# UIX shared building blocks

## Common root components
Many UIX samples use:
- Root `ValueField<bool>` on the example slot.
- `PlatformColorPalette` on a color palette child.
- Multiple `ValueCopy<colorX>` in a color drives child.
- `Canvas` with `RectTransform`, `OverlappingLayout`, and often `ContentSizeFitter`.
- Background `Image` with `IgnoreLayout` on a background child.
