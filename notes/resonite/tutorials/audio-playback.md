# Audio Playback

This guide covers playing audio files in Resonite.

## Basic audio setup

### Required components

- Slot (audio source location)
- AudioClipPlayer (plays audio clips)
- AudioOutput (routes audio)

### Component structure

Slot: `MySoundPlayer`

- Components:
  - AudioClipPlayer
    - Clip: AssetRef to audio file
    - IsPlaying: bool (true to play)
    - Volume: float (0.0 to 1.0)
    - Pitch: float (1.0 = normal speed)
    - Loop: bool (repeat playback)
  - AudioOutput
    - Source: reference to AudioClipPlayer

## Loading audio files

### From URL

1. Use AudioClipPlayer.Clip field
2. Set URL to audio file
3. Supported formats: .ogg, .wav, .mp3

### From inventory

1. Spawn audio file from inventory
2. Reference the spawned asset
3. Assign to AudioClipPlayer.Clip

## Spatial audio

Add AudioListener to user's head slot for 3D positional audio.

AudioClipPlayer automatically uses spatial audio based on:

- Slot position (sound source location)
- Attenuation settings (falloff distance)

### Key spatial fields

- MaxDistance (float): max audible distance
- Rolloff (float): how fast volume decreases

## Triggering playback

### Via ProtoFlux

Use ProtoFlux nodes to control playback:

- PlayOneShot: play sound once
- Set IsPlaying field: start/stop playback

### Via button

Use ButtonPlaybackAction component:

- Attach to button slot
- Set Playback field to AudioClipPlayer
- Configure OnPress action (Play, Pause, Stop)

## Common use cases

### Background music

- Set Loop = true
- Set IsPlaying = true on start
- Place at world center with large MaxDistance

### UI sound effects

- Use ButtonAudioClipPlayer component
- Configure PressedClips list
- Sounds play on button press

### Triggered effects

- Use ProtoFlux impulse events
- Connect to PlayOneShot node
- Reference AudioClipPlayer

## Related

- Button interactions: `notes/resonite/components/button-interactions.md`
- ProtoFlux audio nodes: `notes/resonite/protoflux/INDEX.md`
