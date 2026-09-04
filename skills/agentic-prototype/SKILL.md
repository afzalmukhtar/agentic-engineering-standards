---
name: agentic-prototype
description: Build a clearly throwaway prototype to answer one design question before planning a feature.
disable-model-invocation: true
---

# Prototype

A prototype is throwaway code that answers one question. Use it only when a
state-model or UI decision cannot be settled from confirmed Context alone.
It is exploration, never production work, Kanban delivery, or completion
evidence; it is exempt from shipping-test and test-lock requirements.

## Choose the Smallest Artifact

- For a logic or state-model question, build a single runnable local artifact
  that drives difficult cases and surfaces the complete relevant state after
  every action.
- For a UI question, build a few deliberately different variants on one local
  route or page, using the repository's existing routing convention.

Mark the artifact `prototype` or `throwaway`, keep it beside the code it
informs, make it trivial to run, and use in-memory state by default. Do not
add production abstractions, persistence, polish, lifecycle locks, or tests
as proof of shipped behavior.

## Capture and Route the Learning

Record the question, observed result, and proposed decision. Confirm a
behavior-affecting decision with the user through `grill-and-context`, then
add the confirmed decision and relevant constraint to
`docs/agentic/CONTEXT.md`. A prototype does not itself approve a requirement.

If the decision creates or changes a feature, hand off in this order:

`grill-and-context → create-specification → create-kanban`

Do not begin implementation from a prototype. The later approved Kanban card
must establish its own real acceptance test, intentional RED, approval, and
test lock through `vertical-tdd`.

Keep the prototype only as long as it is useful for discussion; if retained,
label it clearly and record why. Do not treat a demo, script, screenshot, or
manual interaction as shipping-test evidence.
