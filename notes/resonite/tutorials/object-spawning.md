# Object Spawning and Instantiation

This guide covers creating new objects dynamically at runtime.

## Core concepts

### Spawning vs Duplicating

- Spawn: create from asset or prefab reference
- Duplicate: copy existing slot hierarchy
- Both create new instances in the world

## Method 1: Duplicate slot

### Via ProtoFlux

Use DuplicateSlot node:

- Input: Instance (slot to duplicate)
- Input: Parent (where to place copy)
- Input: PreserveNames (bool)
- Output: duplicated slot reference

### Example flow

1. Create template slot (original to copy)
2. Add ProtoFlux with DuplicateSlot node
3. Connect button press to DuplicateSlot impulse
4. Set Instance to template slot
5. Set Parent to spawn container slot

### Template pattern

Structure:

- SpawnSystem (slot)
  - Template (inactive slot with components)
  - SpawnPoint (where copies appear)
  - ProtoFlux (duplication logic)

Disable Template slot (set Active = false) so it's not visible.

## Method 2: Reference spawn

### For existing assets

Use SpawnItem or similar components:

- Reference asset from inventory
- Spawn at slot position

### Common spawn triggers

- Button press: connect button to spawn logic
- Timer: use TimeNode + Fire On True
- User action: grab, interact, proximity

## Button-triggered spawn example

### Structure

Slot: `SpawnButton`

- Components:
  - RectTransform, Image, Button (UIX button)
  - ButtonActionTrigger

Slot: `SpawnLogic` (sibling or child)

- Components:
  - ProtoFlux with DuplicateSlot node

### ProtoFlux setup

Nodes:

- ButtonEvents (source: SpawnButton Button component)
- DuplicateSlot
  - Instance: template slot
  - Parent: spawn location slot

Connections:

- ButtonEvents.Pressed → DuplicateSlot impulse

## Advanced patterns

### Spawn with data

Copy template and modify fields on the copy:

1. DuplicateSlot → get new slot reference
2. Use GetComponent or FindChild
3. Set field values on components

### Spawn pool

Reuse slots instead of creating new ones:

1. Create pool of inactive slots
2. Activate one when needed
3. Deactivate when done
4. Cycle through pool

### Networked spawning

Spawning is automatic synchronized across users.

Ensure spawned objects have:

- Unique slot names
- Proper ownership settings

## Limitations

### Performance

- Many spawns impact performance
- Use pools for frequent spawning
- Clean up unused slots

### Network

- Spawning creates network traffic
- Limit spawn rate in multiplayer
- Consider server-side spawn control

## Related

- Button interactions: `notes/resonite/components/button-interactions.md`
- ProtoFlux nodes: `notes/resonite/protoflux/INDEX.md`
- Slot hierarchy: `notes/resonite/getting-started.md`
