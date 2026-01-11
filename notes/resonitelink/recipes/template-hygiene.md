# Recipe/Template Hygiene (Auto-Added Components)

Some components automatically add supporting components when they are created.
Templates and recipes must account for this to avoid duplicates.

## Guidance

- After adding a component, call `getSlot` with `includeComponentData = true`
  to see what was auto-added.
- Avoid re-adding components that appear automatically (or remove the duplicate
  explicitly if a template has already added one).
- When a recipe relies on auto-added components, document the dependency so the
  template can stay in sync if engine behavior changes.
- If a duplicate appears, check whether it was auto-added before assuming a
  driver or wiring mistake.
