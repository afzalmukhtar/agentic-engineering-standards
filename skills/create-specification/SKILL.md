---
name: create-specification
description: Use when confirmed Context facts and decisions must become a testable feature specification before delivery slicing.
disable-model-invocation: true
---

# Create a Feature Specification

Turn confirmed repository Context and approved feature intent into one
testable specification. This stage defines behavior and test seams; it does
not plan tickets, write tests, or choose an implementation.

## Inputs and Boundary

Required inputs:

- confirmed facts and decisions in `docs/agentic/CONTEXT.md`;
- a confirmed feature name and `<feature-slug>`;
- confirmed scope, interfaces, constraints, and exclusions relevant to it.

Read `references/artifact-templates.md` and write only
`docs/agentic/features/<feature-slug>/SPECIFICATION.md`.

Do not re-interview the user about facts already confirmed in Context. Do not
invent product, interface, implementation, test, or ownership choices. If a
required fact or decision is absent, conflicting, or ambiguous, report
`NEEDS_CONTEXT` with the exact decision needed; do not write the
specification.

## Produce the Specification

1. Start with the canonical `SPECIFICATION.md` template. Preserve its required
   sections and link each Context constraint or decision that governs the
   feature.
2. Give each confirmed requirement a stable ID (`R-001`, `R-002`, …). State
   observable user or system behavior, not a proposed implementation.
3. Give each acceptance criterion a stable ID (`AC-001`, `AC-002`, …). Make it
   verifiable from an end-to-end boundary, including expected errors where
   applicable. Add a concrete input/output example only when it removes
   ambiguity about expected behavior.
4. After `## Acceptance Criteria`, add `## Requirement Traceability`:

   | Requirement | Acceptance criteria | Expected test type and seam | Slicing status |
   | --- | --- | --- | --- |
   | R-001 | AC-001, AC-002 | `<acceptance/integration/...>` at `<real boundary>` | ready to slice |

   Every requirement needs at least one acceptance criterion and one expected
   test type/seam. Use `needs decision` or `blocked` rather than guessing when
   a requirement cannot yet be sliced.
5. Record unresolved decisions verbatim under `## Open Decisions`. An open
   decision that changes behavior, acceptance, interface, or test seam keeps
   the related traceability row out of `ready to slice`.

## Approval Handoff

Present the proposed specification to the user for approval. Only an approved
specification with all in-scope requirements traceable and ready to slice may
be handed to `create-kanban`.

Do not create `KANBAN.md`, ticket cards, test locks, acceptance-test files, or
implementation work in this stage.
