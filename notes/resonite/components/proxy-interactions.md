# Proxy and Reference Interactions

Notes on proxy-style components used for user-friendly reference assignment.

## Intent

- Provide grab-friendly handles that represent other components or assets.
- Enable reference assignment in UI without hunting for the underlying component.

## Components

- `AssetProxy<T>`: attach to an asset slot so grabbing it counts as grabbing the
  referenced asset (for example, `AssetProxy<AudioClip>` for audio clips).
- `ProxySource`: used alongside `UIX.Button` to spawn a slot that already
  includes the appropriate proxy, making grab-and-assign workflows faster.
- `ReferenceReceiver`: accepts references to target components/slots for UI
  interactions. Often paired with proxy workflows.

## Notes

- These components support interaction patterns; they do not directly change
  the underlying asset behavior.
- The proxy family includes additional variants; verify component names and
  behavior via inspector before relying on them in automation.
