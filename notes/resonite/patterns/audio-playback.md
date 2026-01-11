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

- Created `Agent_AudioPlayback` with `AudioClipPlayer` via ResoniteLink.
- `Clip` set to the `User_Leave.wav` asset provider (`IAssetProvider<AudioClip>`).
- Spatial settings were not configured in this pass.
