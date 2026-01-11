# Object Root

Notes about `ObjectRoot` and how Resonite determines the root of an object.

## Intent

- Define the root of a cohesive object for interactions and tooling.
- Provide an explicit anchor for systems that need to resolve "the object."

## Current understanding

- `ObjectRoot` is the explicit component used to mark a slot as the object root.
- When an object is a single cohesive unit, adding `ObjectRoot` is the safest
  best practice.
- Some components expose `FindObjectRoot` flags, implying object-root discovery
  logic in the engine (see button interaction components).

## Open questions (needs implementation verification)

- Can object roots be inferred when `ObjectRoot` is missing?
- Does `Grabbable` implicitly define an object root, or does it only affect
  grab interactions without becoming the root?
- Which ProtoFlux nodes depend on object-root resolution, and what are the
  exact lookup rules?

## Related

- Grab parenting details: `notes/resonite/components/grabbable.md`

## Next steps

- Inspect engine implementation (FrooxEngine) to confirm root resolution rules.
- Record verified behavior once confirmed.
