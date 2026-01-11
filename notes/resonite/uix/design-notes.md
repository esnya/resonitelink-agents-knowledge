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
  - Test: created `Agent_UIX_OffsetTest` with `RectTransform.OffsetMin/Max`
    and `ContentSizeFitter.VerticalFit = PreferredSize`. Offsets remained
    unchanged in field reads.
  - Visual observation: text respected the 10px inset but the content expanded
    vertically beyond the canvas, rendering outside the background. Without a
    mask, `ContentSizeFitter` does not clip to the offset bounds.
  - Behavior appears coupled with layout components; the exact rules likely
    require decompilation or engine source review.
  - Decompiled `ContentSizeFitter` notes:
    - Uses `RectTransform.ComputeMetrics()` for the chosen axis.
    - `ComputeMetrics()` aggregates `ILayoutElement` metrics by priority and
      falls back to raw `OffsetMax - OffsetMin` size when no metrics exist.
    - The fitter marks the RectTransform as "self size" but does not clamp or
      enforce masking. Layout + anchors determine final visual bounds.
- Background `Image` is recommended. Without it, render ordering can become unstable.
