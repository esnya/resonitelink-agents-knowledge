# Slot updates (ResoniteLink)

## UpdateSlot shape
`updateSlot` expects slot fields at the top level of `data`, not inside `members`.

Works:
```json
{
  "$type": "updateSlot",
  "data": {
    "id": "<SlotId>",
    "position": { "$type": "float3", "value": { "x": 0, "y": 0, "z": 0 } }
  }
}
```

Does not apply (returns success but no change):
```json
{
  "$type": "updateSlot",
  "data": {
    "id": "<SlotId>",
    "members": {
      "position": { "$type": "float3", "value": { "x": 0, "y": 0, "z": 0 } }
    }
  }
}
```
