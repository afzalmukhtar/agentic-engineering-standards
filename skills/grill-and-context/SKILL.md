---
name: grill-and-context
description: Interview users for confirmed repository context and durable architectural decisions.
---

# Grill and Build Context

Use this skill before planning work whose purpose, constraints, interfaces, or
ownership are not already confirmed in `docs/agentic/CONTEXT.md`.

Interview the user one question at a time. Ask the next question only after
recording the prior answer. Confirm facts and decisions explicitly before
adding them to Context. If a requirement is ambiguous, stop and ask; never
silently decide its meaning, implementation, or acceptance condition.

Capture confirmed product purpose, terminology, actors, components, interfaces,
constraints, assumptions, open questions, and decisions. Create or update the
following required Mermaid diagrams in Context from confirmed information:

1. An architecture diagram showing actors, components, and primary interfaces.
2. A workflow diagram showing the relevant user or system flow.

Use `context-and-domain-modeling` to organize the Context document. Place
feature-specific behavior and acceptance criteria in that feature's
`SPECIFICATION.md`, with links back to the relevant Context sections.
