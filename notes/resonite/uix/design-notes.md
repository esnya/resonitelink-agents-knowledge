# UIX design notes

- Root `ValueField<bool>` often acts as a scaffolded drive target for bool UI examples; it is not required for all UIX.
- `PlatformColorPalette` + multiple `ValueCopy<colorX>` appears in official samples but can be overkill.
  - You can use known palette values directly from the wiki.
  - Optional: create a temporary `PlatformColorPalette`, read fields, then delete it.
  - Following the palette is not mandatory; it mainly guarantees platform-consistent readability.
- `OverlappingLayout` is heavily used in samples.
  - If the parent has no Layout component, `RectTransform.OffsetMin/Max` can often substitute.
  - If children have Layout components, their Padding can be functionally similar.
  - Note: `RectTransform.OffsetMin/Max` may interact poorly with `ContentSizeFitter` (needs verification).
- Background `Image` is recommended. Without it, render ordering can become unstable.
