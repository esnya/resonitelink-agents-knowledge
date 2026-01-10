# Fireworks Preset (PhotonDust sample)

Observed via ResoniteLink from `Fireworks Preset` root slot.
Slot names are recorded for navigation only; the reusable patterns are in the component wiring.

## Slot layout (top level)

- `Cone`: `ConeMesh` + `MeshRenderer` + `ConeCollider`, value copies sync mesh size to collider.
- Particle groups:
  - `Base Fireworks Particles`
  - `Secondary Fireworks Particles`
  - `Sparkly Fireworks Particles`
  - `Secondary Sparkly Fireworks Particles`
  - `Explosion Fireworks particles`
  - `Smoke Trail Particles`
  - `Smoke Puff Particles`
- `Point Emitter`: `PhotonDust.PointEmitter` driving the base system.
- `Shared Modules`: common forces and sub-emitters.
- `Color Presets`: four `ColorConstantInitializer` presets.
- `Smoke Particles Material`: `PBS_Metallic` used for smoke sheets.
- `Resolution Field`: UIX control that drives emission rate.

## Common particle system setup

Each particle group uses a `Particles Source` slot with:

- `PhotonDust.ParticleStyle`
- `PhotonDust.ParticleSystem` (`MaxParticleCount: 1000`, `SimulationSpace: WorldRoot`)
- `PhotonDust.BillboardParticleRenderer` (`Alignment: View`, `MaxBillboardScreenSize: 0.9`)

## Base fireworks particles

Modules under `Base Fireworks Particles / Modules`:

- `UniformSizeRangeInitializer`: `MinValue 0.05`, `MaxValue 0.1`.
- `LifetimeRangeInitializer`: `MinValue 2`, `MaxValue 3`.
- `SpeedRangeInitializer`: `MinValue 7`, `MaxValue 10`.
- `UniformSizeOverLifetimeStartEnd`: `StartSize 1`, `EndSize 0`.
- `ParticleTrailsModule`: `TrailsRatio 1`, `MinVertexDistance 0.1`, `MaxTrails 16384`.
- `ParticleLightsModule`: `TemplateLight` from `Light Template`, `LightsRatio 1`.
- Sub-emitters:
  - `ParticleDeathSubEmitter`: emits `Smoke Puff Particles` (emit `3..5`).
  - `ParticleDeathSubEmitter`: emits `Secondary Fireworks Particles` (emit `25..50`).
  - `ParticleDeathSubEmitter`: emits `Explosion Fireworks particles` (emit `1..1`).
  - `ParticleLifetimeSubEmitter`: emits `Sparkly Fireworks Particles` (`Rate 100`).

## Secondary fireworks particles

- Size: `0.04..0.075`.
- Lifetime: `0.25..1`.
- Speed: `7..10`.
- `ParticleTrailsModule` matches base.
- `GravityForce`: `Gravity 9.807`.
- `ParticleLifetimeSubEmitter`: emits `Secondary Sparkly Fireworks Particles` (`Rate 100`).
- `ParticleLightsModule`: `TemplateLight` from `Secondary Light Template`.

## Sparkly particles

Sparkly:

- Size: `0.02..0.05`.
- Lifetime: `0.1..0.5`.
- Speed: `-1..-1`.
- `ParticleTrailsModule` matches base.

Secondary Sparkly:

- Size: `0.04..0.075`.
- Lifetime: `0.1..0.25`.
- Speed: `-0.25..-0.25`.
- `ParticleTrailsModule` matches base.

## Explosion particles

- `UniformSizeRangeInitializer`: `MinValue 3`, `MaxValue 3`.
- `LifetimeRangeInitializer`: `0.1..0.15`.
- `RotationRangeInitializer`: `-90..90`.
- `UniformSizeOverLifetimeStartEnd`: `StartSize 0`, `EndSize 1`.
- `ColorOverLifetimeStartEnd`: `StartColor white (Linear)`, `EndColor transparent`.
- `ParticleLightsModule`: uses `Light Template` with `Range 35`.

## Smoke particles

Smoke Trail:

- `ColorConstantInitializer`: white (Linear).
- `TextureSheetAnimator`: grid `8x5`, `WholeSheet`, random row.
- `RotationRangeInitializer`: `-180..180`.
- `SpeedRangeInitializer`: `-0.1..-0.25`.
- `LifetimeRangeInitializer`: `1.5..2`.
- `UniformSizeRangeInitializer`: `0.75..1`.
- `PositionSimulatorModule` with collisions disabled.

Smoke Puff:

- `ColorConstantInitializer`: white (Linear).
- `TextureSheetAnimator`: grid `8x5`, `WholeSheet`, random row.
- `RotationRangeInitializer`: `-180..180`.
- `SpeedRangeInitializer`: `-0.05..-0.1`.
- `LifetimeRangeInitializer`: `1.5..4`.
- `UniformSizeRangeInitializer`: `10..15`.
- `PositionSimulatorModule` with collisions disabled.

## Shared Modules

`Shared Modules` slot contains reusable PhotonDust components:

- `TrailWidthRangeInitializer`: `0.25..0.6`.
- `SimplexTurbulentForce` (x3): strengths `24.25`, `6.79`, `0.95` (additive), shared noise offsets.
- `PositionSimulatorModule` (collisions off).
- `ParticleLifetimeSubEmitter`: emits `Smoke Trail Particles` (`Rate 75`, inherit orientation).
- `GravityForce`: `-0.5`.

## Emission control

- `Point Emitter`:
  - `System`: `Base Fireworks Particles`.
  - `Rate`: default `0.5`, driven from `Resolution Field` via `ValueCopy<float>`.
  - `Direction`: `(0, 1, 0)` with `RandomDirectionWeight 0.025`.

## Color presets

`Color Presets` contains four `ColorConstantInitializer` slots used by the particle modules:

- `Primary Color`: `(0.838, 0.564, 1, 1 sRGB)`.
- `Primary Sparkle Color`: `(0.93, 1, 0.651, 1 Linear)`.
- `Secondary Color`: `(0.295, 0.63, 1, 1 Linear)`.
- `Secondary Sparkle Color`: `(0.725, 0.546, 1, 0.867 sRGB)`.

## Materials and textures

Particle Unlit materials (additive, vertex-color driven):

- Base particles texture: `resdb:///657941e0c33499fc50049888c6d1153f06bd1ba9a5375d086edf1fa864b5f8e6`.
- Trail particles texture: `resdb:///e69ca01a2d0bb0f5d48475a64f0aeabbd2a1b72ad3d7a051c1ee0b19f7b0b422.exr`.
- Explosion particles texture: `resdb:///e189c153f8435293737c711ed0585fa471b1704011d9fc452b2e2caec551b4cf.png`.

Smoke uses `PBS_Metallic`:

- Albedo texture: `resdb:///7415672b4ef76ac44a9ded20d03b64fca4a1a13700325a9f1023e14dbfa7657f.png`.
- `BlendMode: Alpha`, `AlbedoColor.a: 0.125`.

Note: these URLs are **observed** and may change if they are not backed by `OfficialAssets`.

## Light templates

- Base/Secondary: `Point` lights, `Range 3`.
- Explosion: `Point` light, `Range 35`.
- Lights modules multiply color by particle for Base and Explosion; Secondary disables multipliers.

## Resolution Field UIX

`Resolution Field` is a small UIX control that exposes a float input:

- `FloatTextEditorParser`: `ParsedValue` in `0..10`, `ParseContinuously: true`.
- `ParsedValue` drives `PointEmitter.Rate` via `ValueCopy<float>`.
- Label text shows the current numeric value (`Text` content `0.5` in the sample).

## Pattern takeaways

- Layered emitters: a base system spawns secondary, sparkle, and explosion systems via sub-emitters.
- Trails + lights: a trail module plus a light follower module give streaks and bloom highlights.
- Texture sheets for smoke: smoke trail and puff are separate systems with sheet animation and large size ranges.
- Shared forces: common turbulence and gravity live in a shared modules slot and are reused.
- UI-driven tuning: a small UI field drives the emitter rate for interactive adjustments.
