---
name: agentic-research
description: Investigate a question using cited primary sources and feed confirmed findings into the agentic lifecycle.
disable-model-invocation: true
---

# Research

Use research to resolve a factual question that blocks Context, a
specification, or a Kanban decision. Produce one concise Markdown note in the
repository's established research-notes location; if none exists, agree on a
location before writing. Cite every material claim with its owning primary
source: official documentation, source code, specifications, or first-party
APIs.

## Boundary

Research reports evidence; it does not silently decide product behavior,
approve requirements, create a specification, create Kanban cards, or begin
implementation. Distinguish sourced facts from assumptions and unresolved
questions.

For immediate third-party library or SDK use, follow the bundle's Context7
policy for current API documentation. This skill preserves durable,
decision-oriented findings; it does not replace Context7 lookup.

## Lifecycle Handoff

Bring relevant findings to `grill-and-context`. Only user-confirmed facts,
constraints, and decisions belong in `docs/agentic/CONTEXT.md`.

When Context is confirmed and the findings affect a feature, continue:

`grill-and-context → create-specification → create-kanban`

An approved specification and Kanban card—not a research note—define
implementation and its acceptance test. Do not use research output, a script,
or manual verification as delivery or locked-test evidence.
