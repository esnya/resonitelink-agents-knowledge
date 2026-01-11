# Recipe/Template Hygiene (Auto-Added Components)

Some components automatically add supporting components when they are created.
Templates and recipes must account for this to avoid duplicates.

## Guidance

- After adding a component, call `getSlot` with `includeComponentData = true`
  to see what was auto-added.
- `getSlot` reports `componentType` without assembly/prefix strings; for
  `addComponent` you still need the full component type with the correct
  assembly or bindings prefix.
- Avoid re-adding components that appear automatically (or remove the duplicate
  explicitly if a template has already added one).
- When a recipe relies on auto-added components, document the dependency so the
  template can stay in sync if engine behavior changes.
- If a duplicate appears, check whether it was auto-added before assuming a
  driver or wiring mistake.

## Observed auto-added companions (verify when in doubt)

- `DataModelObjectFieldStore<Uri>+Store` appears after creating
  `DataModelObjectFieldStore<Uri>`; adding both manually can create duplicates.
  - Verified in-world: the `+Store` component was auto-added and its `Node`
    member referenced the created node id.
  - `getSlot` reports the component types without assembly prefixes.
- `DataModelValueFieldStore<bool>.Store` appears with
  `DataModelValueFieldStore<bool>` nodes in official graphs.
  - Verified in-world: the `+Store` component was auto-added and its `Node`
    member referenced the created node id.
  - `getSlot` reports the component types without assembly prefixes.

## Components that are not auto-added

- `ValueCopy<T>` is not auto-added; manage instances explicitly in templates.
