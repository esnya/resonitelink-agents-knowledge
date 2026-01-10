# UIX sprite URLs (observed)

## Panel background 9-slice

- URL: `resdb:///cb7ba11c8a391d6c8b4b5c5122684888a6a719179996e88c954a49b6b031a845.png`
- Seen in: Panel base, TextDisplay, UrlDisplay, NoticeDisplay, VideoPlayer (Background/Backing).
- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`, `Tint` set per panel.
- `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 48/64/80`, `Scale: 1`.

## Panel Base template sprite (FixedSize 16)

- URL: `resdb:///3ee5c0335455c19970d877e2b80f7869539df43fccb8fc64b38e320fc44c154f.png`
- Seen in: Panel Base `Background mask`/`Backing`, buttons, checkboxes, sliders.
- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`.
- `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 16`, `Scale: 1`.

## Panel Base text field sprite (FixedSize 16)

- URL: `resdb:///4cf46cd5ed44a69b35a62c1da231c44e10889bcf12d96f150e0688a5d8436feb.png`
- Seen in: TextField / FloatField / IntField / SlotField input backgrounds.
- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`, `Tint` ~ `(0.1686, 0.1843, 0.2078, 1 sRGB)`.
- `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 16`, `Scale: 1`.

## Inspector / NodeBrowser 9-slice base

- URL: `resdb:///cb6bd15c284f070b02dd72f02a790e1c58b3e12c2af229cc7c9323b7320739e4.png`
- Seen in: Inspector + NodeBrowser slots named `Image`.
- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: FixedSize`.
- `SpriteProvider`: `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: ~80.33`, `Scale: 1`.

## Small icon sprites (TextureSize)

Observed URLs in Inspector/NodeBrowser `Image` slots:

- `resdb:///e20ee64c91dcd4809d175a16418f9380f3c37c961d4db86368b7c78329b254db.png`
- `resdb:///1f4e90f99d5bea0640c7e223549f9985a658c84e32dacca233b779d5a41cae49.png`
- `resdb:///2ced9965ffa463f231551ce482ccca875d452e3596883876d42a4944e638e118.png`
- `resdb:///2d04e2e4ade14b0414d8190e55aba6380773394c6e6546e96d16fb7b74eb27ad.png`
- `resdb:///3213dcb0cb4471adb8fe5c920e306a46c44ef319c222fb6d80b9d23e553f6661.png`
- `resdb:///6428ac2e96d1fcb43a2cbdcc66bee208aebb3009f2a6b7cef9d54410dd8b6b6b.png`
- `resdb:///f6ebd9cbdc9f1998993625ab9932c0fcf098b3021c0b51af8d4eed25b6d12e91.png`
- `resdb:///e9fd7704d618615080fa070edc693c5aa13b467846d4fee63576d532b265370a.png`
- `resdb:///0f827887d101d31ba468b8cb89779b78783b39338e19f0a84035927a5d64ceb2.png`
- `resdb:///712fdf655825c22a40fb2b689e373d95fc74e504d8ef7b1b3a8cd9fa42dcd2cc.png`

Common settings:

- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: TextureSize`.
- `SpriteProvider`: `Borders: (0,0,0,0)`, `FixedSize: 8`, `Scale: 1`.
