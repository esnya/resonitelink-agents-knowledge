# Getting Started with Resonite

This guide helps complete beginners understand basic Resonite concepts.

## What is Resonite?

Resonite is a social VR platform where you can:

- Create 3D objects and interactive experiences
- Build user interfaces
- Script logic with visual programming (ProtoFlux)
- Collaborate with others in real-time

## Core concepts

### Slots

- Slots are containers that organize your world
- Every object in Resonite is a slot
- Slots can have children (nested hierarchy)
- Position and rotation are properties of slots

### Components

- Components add functionality to slots
- Examples: BoxMesh (shape), Grabbable (interaction), Button (UI)
- One slot can have multiple components
- Components have fields you can configure

### Materials

- Materials define how surfaces look
- Common types: PBS_Metallic (realistic), UI_Unlit (flat UI)
- Attach materials to mesh renderers

### ProtoFlux

- Visual scripting system for logic and interaction
- Nodes process data and trigger actions
- Connect nodes to create behavior

## Common beginner tasks

See tutorials for step-by-step guides:

- Create 3D objects: `notes/resonite/tutorials/rgb-cube.md`
- Build UI buttons: `notes/resonite/tutorials/uix.md`
- Animate colors: `notes/resonite/tutorials/rgb-cube.md` (ProtoFlux section)
- Display text: `notes/resonite/tutorials/world-text.md`
- Play sounds: `notes/resonite/tutorials/audio-playback.md`

## What to explore next

- Learn ProtoFlux: `notes/resonite/protoflux/INDEX.md`
- Explore UI patterns: `notes/resonite/uix/INDEX.md`
- Find assets: `notes/resonite/assets/INDEX.md`
- Try button interactions: `notes/resonite/components/button-interactions.md`
