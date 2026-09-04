---
name: agentic-wayfinder
description: Map only large, foggy work as bounded decision cards before returning to the agentic feature lifecycle.
disable-model-invocation: true
---

# Wayfinder

Use decision cards only when an effort is too large or too foggy to write a
reliable feature specification in one session. If the feature scope,
constraints, interfaces, and acceptance seams are already clear enough for a
specification, do not create a map; use `grill-and-context` and
`create-specification` directly.

Wayfinding plans decisions, not delivery. It must not create implementation
tasks, write production code, create tests or locks, or claim delivery
completion.

## Map Decisions

Name the destination: the decision or specification that ends the exploration.
Use the repository's existing planning or tracker convention for a small map
and bounded decision cards. Each card states one answerable question, its
blocking decisions, and whether it needs research, a prototype, a user
conversation, or a human-only action.

Keep unknown-but-in-scope questions as fog rather than inventing premature
cards. Resolve only one decision card per session, except independent research
cards. Record the evidence, answer, trade-off, and newly surfaced questions;
close decisions that are outside the stated destination rather than treating
them as delivery work.

Route card work to the compatible supporting workflows:

- research question → `agentic-research`;
- design question needing a concrete artifact → `agentic-prototype`;
- human-only prerequisite → `agentic-wizard`;
- user decision or repository fact → `grill-and-context`.

## Exit to Delivery Planning

As decisions become clear, confirm and record the resulting facts,
constraints, and decisions in `docs/agentic/CONTEXT.md` through
`grill-and-context`. When enough is known for a feature, hand off strictly in
this order:

`grill-and-context → create-specification → create-kanban`

Do not start implementation directly from a decision card or map. Only an
approved Kanban card can enter `vertical-tdd` and its real, approval-locked
test lifecycle.
