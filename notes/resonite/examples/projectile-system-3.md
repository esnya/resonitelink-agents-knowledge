# Projectile System 3 (I0065)

Observed via ResoniteLink from `Projectile System 3 (I0065)`.
Slot names are recorded only for navigation; the reusable patterns are in component wiring.

## Top-level layout

- `Raycast Root`: placeholder roots for laser-guided and target-painter rays.
- `ProtoFlux`: multiple subgraphs for firing, movement, collision, and decals.
- `Dynamic Variables`: shared tuning via dynamic variables (prefix `ProjectileSys3/`).
- `Orientation Visual`: grab sphere + XYZ arrows (gizmo for direction).
- `Templates`: projectile, decals, painted target, embedded projectile, deletion FX.
- `Particle Styles`: trail/impact/spark styles.
- `Sound FX Clips`: `AudioClipPlayer` container.

## Dynamic variable namespace

All tuning is driven by `DynamicValueVariable` / `DynamicReferenceVariable` with
the `ProjectileSys3/` prefix. Key groups:

- Projectile:
  - `Projectile.Lifetime`, `Projectile.RootSlot`, `Projectile.VisualSlot`.
  - `Projectile.VisualUpdateRate`, `Projectile.LocalSpace`.
  - `Projectile.Velocity`, `Projectile.Drag`, `Projectile.Gravity Strength`.
  - `Projectile.Collision.Raycast.HitRange`.
  - `Projectile.Ricochet.Bounce.AngleThreshold`, `VelocityDecay`, `MaxCount`.
  - `Projectile.AttachProjectileToDecal`,
    `Projectile.Velocity.InitialMovementMagnitudeMultiplier`.
- Raycast:
  - `Raycast.MaxDistance`, `Raycast.PointBlankRange`, `Raycast.UserHitDistance`.
  - `Raycast.CanHitUser`, `Raycast.RaycastOnlyToggle`.
  - `Raycast.Ricochet.Count`, `Raycast.Ricochet.AngleThreshold`,
    `Raycast.Ricochet.OffsetMutiplier`.
  - `Raycast.EmbeddedDecalPlaceToggle`, `Raycast.DebugDuration`.
- Decal:
  - `Decal.Template.Default`, `Decal.Template.Ricochet`, `Decal.Template.UserHit`.
  - `Decal.Template.DefaultFlux`, `Decal.Template.RicochetFlux`,
    `Decal.Template.UserHitFlux`.
  - `Decal.Template.EmbeddedProjectile`, `Decal.Template.ProjectileDeathEffect`.
  - `Decal.ParentToHitSlot`, `Decal.AlignToHitNormal`, `Decal.FallbackLifetime`.
  - `Decal.ProjectileDeathEffect.Toggle`, `Decal.ProjectileDeathEffect.Lifetime`.
- Guidence:
  - `Guidence.Type`, `Guidence.DirectionWeight`.
  - `Guidence.LaserGuidence.RaycasterDistance`.
  - `Guidence.TargetPainter.RaycastDistance`, `TargetPainter.TemplateSlot`,
    `TargetPainter.OnlyTargetsUsers`,
    `TargetPainter.PaintedTargetSlot.Lifetime`.

## Projectile template structure

- `Templates/Projectile Template Holder/Projectile`:
  - `DynamicVariableSpace` plus `Projectile.*` variables:
    `PreviousPosition`, `NextPosition`, `BounceCount`, `SimulatedTime`,
    `MovementDeltaAddition`, `PaintedTargetSlot`, `VisualPositionField`.
  - `Visual/Crossbow Bolt Visuals` contains:
    `Emitter`, `Crossbow Bolt`, `Flyby SFX`, and `Trail Particles`.

## ProtoFlux subgraphs (high level)

- `Test Fire Flux`: controller inputs for quick firing tests.
- `Core Projectile Flux`: spawns projectiles, wires dynamic variables, and
  dispatches movement updates.
- `Projectile Set Position Flux` / `Projectile Set Direction Flux`:
  set transform position/forward from computed vectors.
- `Raycast System`: ray setup for guidance and target painting.
- `Projectile Collision Detection Flux`: collision checks, ricochet, hit handling.
- `Decal FX Flux`: spawns decals, plays audio, and manages visual effects.
- `Fallback Decal Delete system`: delayed cleanup (`Delay` -> `DestroySlot`).
- `Projectile/Decal Parent Slot Flux`: chooses the parent slot for spawned items.

## Reuse notes

- Keep dynamic variable names consistent; most graphs resolve them from
  `GlobalValue<string>` nodes.
- Template slots are referenced via dynamic variables rather than hard references,
  enabling multiple projectile systems in one world.
- The orientation gizmo matches the standard arrow + outline pattern used by
  other samples and can be reused for aiming tools.

## Related patterns

- Dynamic variable wiring: `notes/resonite/patterns/dynamic-variables.md`
- Orientation gizmo: `notes/resonite/patterns/orientation-gizmo.md`
