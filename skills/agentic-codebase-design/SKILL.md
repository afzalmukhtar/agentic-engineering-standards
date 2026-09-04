---
name: agentic-codebase-design
description: Shape Context, specifications, and Kanban cards around independently testable vertical module seams.
disable-model-invocation: true
---

# Design Testable Vertical Boundaries

Use this while establishing Context, writing a specification, or slicing
Kanban work. It refines those artifacts; it does not replace their approval,
test-lock, implementation, debugging, or review policies.

## Evaluate the Boundary

For each proposed behavior, identify the real consumer-visible interface, its
inputs, outputs, failures, owner, and an independently runnable test seam.
Prefer a deep module: substantial cohesive capability behind a small,
purposeful interface. Keep implementation details local to the module that
owns them, minimize cross-module coordination, and prefer seams that unlock
multiple future behaviors without widening the public surface unnecessarily.

Use leverage to prioritize a seam that simplifies adjacent work, and locality
to keep code, tests, contracts, and ownership near the behavior they serve.
Capture confirmed seams and constraints in `docs/agentic/CONTEXT.md`; express
observable behavior and interface expectations in the feature specification.

## Enforce Vertical Slices

Reject a ticket that delivers only a horizontal layer—such as an API, storage,
UI, adapter, schema, or empty scaffold—with no independently testable
user-visible behavior. Reslice it through its real interface so each card
owns a complete behavior, concrete test contract, production/test paths, and
dependencies as required by `create-kanban`.

Do not choose an unresolved architecture, interface, seam, or ownership
trade-off. Record it as a Context decision; when it affects feature behavior
or acceptance, add it verbatim to the specification's open decisions. Add a
blocked architecture-decision Kanban card with the required decision and
affected cards, then request explicit user input. No implementation, debug
fix, test, or test lock proceeds across that blocked boundary.
