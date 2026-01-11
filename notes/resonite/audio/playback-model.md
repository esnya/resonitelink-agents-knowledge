# Audio Playback Model (Interfaces)

Resonite audio playback revolves around two interface families:
`IWorldAudioDataSource` and `IPlayable`.

## IWorldAudioDataSource (providers)

Components that provide audio data into the world (assembly scan):

- `FrooxEngine.AudioClipPlayer`
- `FrooxEngine.AudioListener`
- `FrooxEngine.LerpingMultiClipPlayer`
- `FrooxEngine.LocalAudioDeviceStream`
- `FrooxEngine.MultiAudioClipPlayer`
- `FrooxEngine.OpusStream<T>`
- `FrooxEngine.TestSineWaveSource`
- `FrooxEngine.VideoTextureProvider`

## IPlayable (playback control)

Components that expose playback controls/state (assembly scan):

- `FrooxEngine.Animator`
- `FrooxEngine.AudioClipPlayer`
- `FrooxEngine.LegacyVideoPlayer`
- `FrooxEngine.MultiAudioClipPlayer`
- `FrooxEngine.SyncPlayback`
- `FrooxEngine.VideoTextureProvider`

## Overlap

These appear in both lists (provider + playback):

- `FrooxEngine.AudioClipPlayer`
- `FrooxEngine.MultiAudioClipPlayer`
- `FrooxEngine.VideoTextureProvider`

## Playback consumers (observed)

- `FrooxEngine.AudioOutput` consumes `IWorldAudioDataSource` via `Source`.

## Observed fields (ResoniteLink)

- `AudioClipPlayer`
  - `Clip`: `IAssetProvider<AudioClip>`
- `MultiAudioClipPlayer`
  - `Tracks`: list
- `LerpingMultiClipPlayer`
  - `Tracks`: list
  - `Lerp`: float
- `RandomAudioClipPlayer`
  - `Clips`: list
  - `ParentUnder`: `Slot`
  - `MinDistance` / `MaxDistance`: nullable float
  - `IgnoreAudioEffects`: bool
- `AudioOutput`
  - `Source`: `IWorldAudioDataSource`
  - Spatialization fields: `SpatialBlend`, `Spatialize`,
    `SpatializationStartDistance`, `SpatializationTransitionRange`
  - Range/rolloff: `MinDistance`, `MaxDistance`, `RolloffMode`
  - Other: `Volume`, `Pitch`, `AudioTypeGroup`, `DistanceSpace`

## Notes

- Lists are derived from local FrooxEngine assemblies; verify in-world if
  components are missing for a given build.
- Playback-related button components (`ButtonPlaybackAction`, `ButtonPlaybackSeeker`)
  target `IPlayable`.
