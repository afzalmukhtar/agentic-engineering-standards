---
name: create-kanban
description: Use when an approved feature specification needs ownership-safe vertical delivery cards and a dependency-aware Kanban plan.
disable-model-invocation: true
---

# Create a Feature Kanban

Create independently testable vertical-slice cards. This stage declares future
test contracts and delivery order only: no tests, locks, production behavior,
or execution.

## Inputs and Boundary

Required inputs are an approved
`docs/agentic/features/<feature-slug>/SPECIFICATION.md`, its linked confirmed
`docs/agentic/CONTEXT.md`, and the Kanban and ticket-card templates in
`references/artifact-templates.md`.

Every in-scope requirement must have traceability to observable acceptance
criteria, an expected test type/seam, and `ready to slice` status. If the
specification is missing or unapproved, traceability is incomplete, a required
decision is unresolved, or a dependency/ownership conflict cannot be planned,
report `NEEDS_CONTEXT` before writing Kanban artifacts.

Write only these canonical planning artifacts after approval:

```text
docs/agentic/features/<feature-slug>/KANBAN.md
docs/agentic/features/<feature-slug>/tickets/T-<nnn>-<slug>.md
```

## Design Vertical Cards

Each card starts with one independently testable, user-visible or end-to-end
behavior. It may traverse boundaries as needed; never plan a database, API, UI,
adapter, empty scaffold, or other horizontal-only card.

For each card, copy and completely populate the canonical ticket-card template:

- map acceptance criteria to approved `R-###` and `AC-###` identifiers;
- declare concrete test path/command, expected RED failure and GREEN result;
- declare inputs, outputs, errors, production/test ownership, and exclusions;
- set lane/status, dependencies/blockers, review record/state, and
  consolidation wave/state.

The planned test contract is not an acceptance test. Do not create or change a
test file, record RED evidence, create a test lock, or claim a test is locked
in this stage.

## Compute Dependencies and Waves

Model every blocker as a directed prerequisite-to-dependent edge. The graph
must be a DAG: referenced tickets exist, no self-dependencies, and no cycles.

Assign a card only after each prerequisite will complete before its wave
begins. Cards in the same wave have no dependency edges between them and no
overlap in owned production or test paths (including parent/child containment).
Any overlap adds a serial dependency; recompute the DAG and separate waves.
Parallel cards use isolated worktrees. A consolidator follows each completed,
reviewed wave and runs the full suite before the next wave.

## Approval Gate and Artifact Order

Before creating `KANBAN.md` or any ticket card, present the user with:

1. the complete card breakdown: covered requirements/acceptance criteria,
   ownership, dependencies, blockers, and candidate waves;
2. the proposed Mermaid swimlane diagram.

Wait for explicit user approval. Revised breakdown, ownership, dependencies, or
diagram requires a new approval before writing final artifacts.

After approval, copy the canonical Kanban and ticket templates into the paths
above. In `KANBAN.md`, retain the template sections in order: source artifacts,
operating rules, cards, and wave plan. End the file with the Mermaid diagram:
no prose, headings, tables, or other content may follow its closing fence.

The final diagram must use planning, test-approval, and build/review swimlanes;
rectangular ticket nodes such as `T001["T-001: <vertical behavior>"]`; and an
edge for every dependency. Its ticket IDs, behavior labels, lanes, and edges
must match the cards and wave plan exactly.
