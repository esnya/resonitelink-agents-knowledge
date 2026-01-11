# Audio Playback (Spatial)

Minimal pattern for playing a clip in 3D space.

## Intent

- Play a short sound with spatial attenuation.

## Components

- `AudioClipPlayer` on the source slot.
- `AudioSource` if separate routing is required.

## Wiring

- Assign `AudioClipPlayer.Clip`.
- Configure spatial settings (`Spatialize`, range, volume).

## Verification

- Needs in-world verification of attenuation and directionality.
