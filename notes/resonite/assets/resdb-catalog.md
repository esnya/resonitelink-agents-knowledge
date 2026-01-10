# Resdb Asset Catalog (Observed)

This catalog is built from UIX template inspection in the current session.
It records **what the asset is used for** and the **typical component settings** observed alongside the URL.
It is not a complete official list.

For the full official name → URL mapping extracted from FrooxEngine, see:

- `notes/resonite/assets/official-assets.tsv`

## Panel textures (9-slice)

### Panel background texture

- URL: `resdb:///cb7ba11c8a391d6c8b4b5c5122684888a6a719179996e88c954a49b6b031a845.png`
- What it is: Standard UI panel background texture used for front and back faces.
- Official asset name (source): `OfficialAssets.Common.Particles.Disc`
- Seen in: Panel base, TextDisplay, UrlDisplay, NoticeDisplay, VideoPlayer.
- `UIX.Image` (typical): `PreserveAspect: true`, `NineSliceSizing: FixedSize`, `Tint` varies per panel.
- `SpriteProvider` (typical): `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 48/64/80`, `Scale: 1`.
- Notes: Usually paired with two layers (`Background`/`Background mask` + `Backing`) and two materials (front-sided + back-sided) to render a backplate.

### Panel Base template sprite (general UI blocks)

- URL: `resdb:///3ee5c0335455c19970d877e2b80f7869539df43fccb8fc64b38e320fc44c154f.png`
- What it is: 9-slice texture used by Panel Base templates (background mask, buttons, sliders).
- Seen in: Panel Base (`Background mask`, `Backing`), template buttons/checkboxes/sliders.
- `SpriteProvider` (observed): `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 16`, `Scale: 1`.
- `UIX.Image` (typical): `PreserveAspect: true`, `NineSliceSizing: FixedSize`, tint varies by control.

### Panel Base text field sprite

- URL: `resdb:///4cf46cd5ed44a69b35a62c1da231c44e10889bcf12d96f150e0688a5d8436feb.png`
- What it is: 9-slice texture used for text field input backgrounds in Panel Base templates.
- Seen in: TextField / FloatField / IntField / SlotField input backgrounds.
- `SpriteProvider` (observed): `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: 16`, `Scale: 1`.
- `UIX.Image` (typical): `PreserveAspect: true`, `NineSliceSizing: FixedSize`, tint ~ `(0.1686, 0.1843, 0.2078, 1 sRGB)`.

## Fonts

### Panel Base font chain (main font)

- URL: `resdb:///fcff04f4bec2b3636f05ed894dc1f9a752c4cb587ee49857ec7a82abaf6ca016.ttf`
- Seen in: Panel Base template labels (TextField / FloatField / IntField / SlotField / ToggleField).
- Notes: Provided via a `FontChain` with multiple fallback fonts.

## Inspector / NodeBrowser base 9-slice

### Inspector/NodeBrowser main 9-slice

- URL: `resdb:///cb6bd15c284f070b02dd72f02a790e1c58b3e12c2af229cc7c9323b7320739e4.png`
- What it is: Large 9-slice base used by Inspector and NodeBrowser in `Image` slots.
- Official asset name (source): `OfficialAssets.Graphics.UI.Circle.Light_Border.Circle_Phi2`
- Seen in: Inspector (multiple variants), NodeBrowser.
- `UIX.Image` (typical): `PreserveAspect: true`, `NineSliceSizing: FixedSize`.
- `SpriteProvider` (typical): `Borders: (0.5,0.5,0.5,0.5)`, `FixedSize: ~80.33`, `Scale: 1`.

## Small icon textures (TextureSize)

These appear as small icon sprites in Inspector/NodeBrowser `Image` slots. Meanings are inferred from **where** the icon is used (exact glyph should be verified visually if needed).

Shared component settings:

- `UIX.Image`: `PreserveAspect: true`, `NineSliceSizing: TextureSize`.
- `SpriteProvider`: `Borders: (0,0,0,0)`, `FixedSize: 8`, `Scale: 1`.

### Header action button icons (Inspector + NodeBrowser)

Used in the **header bar button icons** of Inspector and NodeBrowser (action buttons in the top header row).

- `resdb:///e20ee64c91dcd4809d175a16418f9380f3c37c961d4db86368b7c78329b254db.png` → `OfficialAssets.Graphics.Icons.Inspector.Pin`
- `resdb:///1f4e90f99d5bea0640c7e223549f9985a658c84e32dacca233b779d5a41cae49.png` → `OfficialAssets.Graphics.Icons.Inspector.Close` (also `OfficialAssets.Graphics.Icons.General.Cancel`)
Slot path pattern (observed):
- Inspector: `Header / Horizontal Layout / Button / Image`
- NodeBrowser: `Header / Horizontal Layout / Button / Image`

### Inspector split-panel header / row action icons

Used in **Inspector split panel header buttons** and **component row action buttons** (inside the main content scroll area).

- `resdb:///2ced9965ffa463f231551ce482ccca875d452e3596883876d42a4944e638e118.png` → `OfficialAssets.Graphics.Icons.Inspector.Destroy`
- `resdb:///f6ebd9cbdc9f1998993625ab9932c0fcf098b3021c0b51af8d4eed25b6d12e91.png` → `OfficialAssets.Graphics.Icons.Inspector.DestroyPreservingAssets`
- `resdb:///2d04e2e4ade14b0414d8190e55aba6380773394c6e6546e96d16fb7b74eb27ad.png` → `OfficialAssets.Graphics.Icons.Inspector.Duplicate`
- `resdb:///e9fd7704d618615080fa070edc693c5aa13b467846d4fee63576d532b265370a.png` → `OfficialAssets.Graphics.Icons.Inspector.InsertParent`
- `resdb:///0f827887d101d31ba468b8cb89779b78783b39338e19f0a84035927a5d64ceb2.png` → `OfficialAssets.Graphics.Icons.Inspector.AddChild`
- `resdb:///3213dcb0cb4471adb8fe5c920e306a46c44ef319c222fb6d80b9d23e553f6661.png` → `OfficialAssets.Graphics.Icons.Inspector.ObjectRoot`
- `resdb:///6428ac2e96d1fcb43a2cbdcc66bee208aebb3009f2a6b7cef9d54410dd8b6b6b.png` → `OfficialAssets.Graphics.Icons.Inspector.RootUp`
- `resdb:///712fdf655825c22a40fb2b689e373d95fc74e504d8ef7b1b3a8cd9fa42dcd2cc.png` → `OfficialAssets.Graphics.Icons.Inspector.SetRoot`
Slot path pattern (observed):
- Split panel header: `Content / Panel / Split / Image / Header / Horizontal Layout / Button / Image`
- Component row actions: `Content / Panel / Split / Image / Content / Content / Scroll Area / Content / ComponentRoot / Vertical Layout / Horizontal Layout / Button / Image`

## How to extend this catalog

- When you add a new URL, record:
  - What UI it appears in and the slot name(s).
  - `UIX.Image` settings (PreserveAspect, NineSliceSizing, Tint).
  - `SpriteProvider` settings (Borders, FixedSize, Scale).
  - Any special material usage (front/back sidedness or z-offsets).
