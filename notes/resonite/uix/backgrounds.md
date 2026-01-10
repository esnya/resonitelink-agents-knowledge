# UIX backgrounds and backplates

## Background image defaults
- Tutorial/Scroll background `UIX.Image` components keep `Sprite: null` and rely on `UI_UnlitMaterial` + `Tint` for a solid fill.
- If a `Sprite` is assigned while `PreserveAspect` is true (default), the rendered fill can shrink to sprite aspect/padding.
- For solid panel backgrounds, keep `Sprite` unset. If you need a sprite, consider `PreserveAspect: false` or a 9-sliced sprite with proper padding.

## Panel background + backplate icon pattern
Panel-style UIX templates (Panel base, TextDisplay, UrlDisplay, NoticeDisplay, VideoPlayer) use two image layers:
- Front layer: `Background` / `Background mask`.
- Back layer: `Backing` (renders the backplate icon pattern).

Shared panel texture:
- `resdb:///cb7ba11c8a391d6c8b4b5c5122684888a6a719179996e88c954a49b6b031a845.png`

Front layer material:
- `UI_UnlitMaterial` with `BlendMode: Alpha`, `ZWrite: On`, `ZTest: LessOrEqual`, `TextureMode: DirectColor`.
- `Sidedness: Auto/Double`, `OffsetFactor: +1`, `OffsetUnits: 100`.

Back layer material:
- `UI_UnlitMaterial` with `Sidedness: Back` and `OffsetFactor: -1` (other settings match the front layer).

If you need a visible backface or the standard panel icon pattern, keep the backing layer with the back-sided material.
