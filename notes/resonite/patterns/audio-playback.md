# Audio Playback (Spatial)

Minimal pattern for playing a clip in 3D space.

## Intent

- Play a short sound with spatial attenuation.

## Components

- `AudioClipPlayer` on the source slot.
- `AudioSource` if separate routing is required.

## Related components (asset/UI helpers)

- `AudioPlayerInterface` sits on the auto-generated UI root for imported audio
  assets; it is not a playback component.
- `AudioExportable` signals the asset can be exported by the user. Multiple
  `Exportable` components exist for different asset types.
- `AssetProxy<AudioClip>` lets users grab the proxy slot and assign it to
  `AudioClip` fields in UI (inspectors, buttons, etc.). Without it, users must
  locate the underlying `AudioClip` component and grab that directly.

## Wiring

- Assign `AudioClipPlayer.Clip`.
- Configure spatial settings (`Spatialize`, range, volume).

## Verification

- Created `Agent_AudioPlayback` with `AudioClipPlayer` via ResoniteLink.
- `Clip` set to the `User_Leave.wav` asset provider (`IAssetProvider<AudioClip>`).
- Spatial settings were not configured in this pass.

## Notes

- Audio playback paths are diverse; many `IPlayable` or one-shot components are
  better suited depending on context. Use the inspector to browse options.
- Related references:
  - `notes/resonite/audio/playback-model.md`
  - `notes/resonite/audio/components.md`
