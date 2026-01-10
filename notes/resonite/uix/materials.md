# UIX materials

## UI_UnlitMaterial defaults (observed)

- Shader: unlit UI shader.
- `Sidedness: Double`, `BlendMode: Alpha`, `ZWrite: On`, `ZTest: LessOrEqual`.
- `RectClip: false`, `AlphaClip: true`, `AlphaCutoff: 0.01`, `TextureMode: DirectColor`.
- `Tint: (1,1,1,1 sRGB)`, `Overlay: false`, `OverlayTint: (1,1,1,0.73 sRGB)`.
- `OffsetFactor: 10`, `OffsetUnits: 4000` (prevents depth fighting in UI).
- `Texture` and `MaskTexture` are null by default; use `SpriteProvider` for sprites.

## Variants (panel vs root)

- Root has multiple `UI_UnlitMaterial` assets with different offsets and modes.
- A common background variant uses large offsets and `Sidedness: Double`.
- Other variants use `OffsetFactor/Units: 0/0` and different `Sidedness`, `TextureMode`, `ZWrite`, `BlendMode`, and `RenderQueue`.
- Local panel materials created from templates used `OffsetFactor/Units: 1/1`, but this is not universal.
- Offsets vary by material; pick the material that matches the UI asset you are mirroring or leave `Material` unset.

## Kokoa UIX template material (observed)

Observed on `KokoaUix*_Material` slots (`UI_UnlitMaterial`):

- `BlendMode: Alpha`, `TextureMode: DirectColor`, `ZWrite: On`, `ZTest: LessOrEqual`.
- `Sidedness: Front`.
- `AlphaClip: true`, `AlphaCutoff: 0.01`, `RectClip: false`.
- `OffsetFactor: 1`, `OffsetUnits: 1`, `RenderQueue: -1`.
- `Overlay: false`, `OverlayTint: (1,1,1,0.73 sRGB)`.
- `MaskMode: MultiplyAlpha`, `MaskTexture: null`, `Texture: null`.

## Image material usage

- Most UIX `Image` components do not need a custom material.
- Use a custom material only when a specific shader feature is required.
