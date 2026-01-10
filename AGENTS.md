# ResoniteLink Knowledge Base Rules

This repository stores a structured knowledge base for ResoniteLink and Resonite.

## Scope
- These rules apply to all knowledge files under `notes/`.
- When a rule conflicts with another document, these rules take precedence for the knowledge base.

## Information architecture
- Two top-level categories only:
  - `ResoniteLink`
  - `Resonite`
- Place files under `notes/resonitelink/` or `notes/resonite/` accordingly.
- Use additional subdirectories to keep topics focused and discoverable.

## Indexing
- Every file must be reachable from `notes/INDEX.md`.
- Multi-level indices are allowed and encouraged.
- New files must be added to the nearest category index and to `notes/INDEX.md`.

## Topic and size limits
- One topic per file. Split broad subjects into multiple files.
- Markdown files must be 200 lines or fewer.
- Non-markdown artifacts (JSON, TSV) must have an index entry that explains the artifact.

## Markdown quality
- Use ATX headings (`#`, `##`, `###`).
- Keep a blank line between headings and content blocks.
- Use `-` for unordered lists with a single space after the dash.
- Do not use trailing whitespace.
- Prefer short paragraphs and consistent list formatting.

## Naming
- Use kebab-case filenames (e.g., `render-to-texture.md`).
- Keep file names descriptive and scoped to their category.

## Ignored workspace directory
- Use `ignored/` for temporary clones and scratch data that should not be tracked.
- Do not reference files inside `ignored/` from the knowledge indices.
- Keep `ignored/` out of commits; update `.gitignore` if new subfolders are added.
