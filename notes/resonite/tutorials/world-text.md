# World-space Text Display

This guide shows how to display 3D text floating in world space.

## Basic world text

### Required components

- Slot (container for text)
- TextRenderer (renders text)

### TextRenderer key fields

- `Text` (string): the text content to display
- `Size` (float): text height in meters
- `Color` (colorX): text color
- `Font` (AssetRef<Font>): font asset

## Example structure

Slot: `MyText`

- Position: (0, 1.5, 2.0) - in front of spawn point
- Components:
  - TextRenderer
    - Text: "Hello World"
    - Size: 0.1
    - Color: white (1, 1, 1, 1)

## Common patterns

### Billboard text (faces user)

Add BillboardComponent to make text always face the camera:

- Slot: `MyText`
- Components:
  - TextRenderer (as above)
  - Billboard
    - Mode: YawOnly (rotates only on Y axis)

### Styled text

Use rich text markup in the Text field:

- Bold: `<b>bold text</b>`
- Italic: `<i>italic text</i>`
- Color: `<color=red>red text</color>`
- Size: `<size=150%>larger text</size>`

## Integration with ResoniteLink

Create world text via ResoniteLink:

1. Add slot at desired position
2. Add TextRenderer component
3. Update TextRenderer.Text field with content

Component type: `[FrooxEngine]FrooxEngine.TextRenderer`

Key fields to set:

- Text (member field)
- Size (member field)
- Color (member field)

## Related

- UIX text: `notes/resonite/uix/INDEX.md`
- Text component in UI: `notes/resonite/tutorials/uix.md`
