# UIX panel patterns

## Panel base

- Canvas: `VerticalLayout`.
- Background mask → Backing (`Image`) + panel icon child.
- Title layout: `HorizontalLayout` with spacers, text area, close button area.
- Main area: `LayoutElement`.
- Color palette + multiple `ValueCopy<colorX>` drivers.
- Title layout details (observed in template):
  - `HorizontalLayout` spacing `8`, padding `Top: 8`, `Bottom: 4`, `Left/Right: 8`, align `Center/Top`.
  - Header `LayoutElement` min height `48`, flexible width `1`.
  - Title text content `Panel Base`, size `64`, auto-size `0..40`, line height `1`.
- Background mask details:
  - Front image uses sprite `Reso_2B48A`, tint ~ `(0.0667, 0.0824, 0.1137, 1 sRGB)`, `NineSliceSizing: FixedSize`.
  - Backing uses the same sprite, plus a panel icon slot anchored to `0.4..0.6` in both axes.
- Template library under `Panel Base/Canvas/Templates` is documented separately:
  - `notes/resonite/uix/patterns/panel-base-templates.md`.

## TextDisplay / NoticeDisplay

- Root includes `TextDisplayInterface` or `NoticeDisplayInterface` plus `ValueFieldProxy<string>` and `TextExportable`.
- Canvas: `VerticalLayout` + `ContentSizeFitter`.
- Background: `Image` + `IgnoreLayout` with backing image.
- Layout stack:
  - Header: `HorizontalLayout` with title and close/icon area.
  - Body: `VerticalLayout` or `HorizontalLayout` for content.
  - Bottom controls: `HorizontalLayout` for actions.
- ProtoFlux often handles text scaling (`ValueFieldDrive<float>`).

## UrlDisplay (link panel)

- Root includes `HyperlinkDisplayInterface`, `ValueFieldProxy<Uri>`, `ValueCopy<Uri>` + `ValueCopy<string>`.
- Canvas: `VerticalLayout` + `ContentSizeFitter`.
- Horizontal layout with:
  - Background image (IgnoreLayout + backing).
  - Copy link button (`ButtonClipboardCopyText` + `ButtonValueSet<float>`).
  - Link area (layout + link text).
  - Close button area.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers.

## AudioPlayer (clip panel)

- Root includes `AudioPlayerInterface`, `AudioClip` proxy, `AudioExportable`.
- Canvas: `OverlappingLayout` with a main `HorizontalLayout` (left/center/right areas).
- Center area uses `VerticalLayout` for title, background, and time controls.
- `AudioOutput` + `AudioClipPlayer` attached.
- `PlatformColorPalette` + many `ValueCopy<colorX>` drivers.
- ProtoFlux handles scrubber, playback time formatting, hover effects, volume control.

## AudioStreamController (stream panel)

- Root includes `AudioStreamInterface`, `AudioStreamController`, `AudioOutput`.
- Canvas: `HorizontalLayout` with nested `VerticalLayout`.
- Volume area uses `Mask` + `Image` in a horizontal layout.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers.
- ProtoFlux handles volume label and state.

## VideoPlayer (media panel)

- Root includes `VideoPlayerInterface`, video/texture proxies, `VideoExportable`.
- Canvas: `VerticalLayout` with a background mask stack:
  - `HoverArea`, `Image`, `Mask`, backing.
  - Play/Pause click area (`ButtonPlaybackAction`).
  - Video texture `Image` + `AspectRatioFitter`.
  - Overlay areas: drop shadow, title, volume, bottom controls.
- `AudioOutput` attached; panoramic viewer slots present.
- `PlatformColorPalette` + `ValueCopy<colorX>` drivers.
- ProtoFlux manages hover lerp, aspect ratio, playback, loading status.

## DocumentDisplay (document panel)

- Root includes `DocumentInterface`, `DocumentPageTexture`, metadata, asset proxy.
- Canvas: `VerticalLayout` + `ContentSizeFitter` with nested `HorizontalLayout`.
- Thumbnail area + vertical content layout.
- `PlatformColorPalette` present.
- ProtoFlux handles page navigation, size/zoom, selection bounds, and color tweaks.

## ColorDialog (advanced panel)

- Root includes `ColorDialogInterface` and `DynamicVariableSpace`.
- Large ProtoFlux graph for RGB sliders, HSV conversion, hex input, swatches, color profile, undo, and external updates.
- Uses many `ValueFieldDrive<colorX>` / `ValueFieldHook<float>` components.
- Treat as advanced; avoid deep replication unless needed.
