---
name: agentic-ai-engineering
description: Apply focused AI engineering standards within an approved Kanban card without creating a second delivery lifecycle.
---

# AI Engineering Specialist Layer

Use this nested router only within the bundle's established flow:

`Context → Specification → Kanban → vertical TDD → review`

It is not a planner, Kanban workflow, or test lifecycle. `skills/vertical-tdd/`
is the sole test lifecycle for a card; `references/test-lock-policy.md` is the
highest-precedence policy for every test decision.

## Attach Standards to the Card

Record the applicable standards in the card's review evidence. Apply:

| Card point | Required specialist layer |
| --- | --- |
| Before any production change | `agentic-ai-coding-discipline` |
| Python agent or tool module seam | `agentic-ai-pydantic-contracts` |
| Prompt, LLM call, or structured output behavior | `agentic-ai-llm-prompts` |
| Agent, tool-routing, state-machine, or orchestration behavior | `agentic-ai-agent-architecture` |
| Independent concurrent work or async pipeline | `agentic-ai-async-concurrency` |
| Before task review | `agentic-ai-project-structure` |

Apply more than one layer when a card crosses more than one concern. The
ticket's approved Context, specification, acceptance criteria, ownership, and
test contract set the scope; these standards refine that work and do not add a
separate feature, card, or lifecycle.

## Card-Stage Integration

1. **Ready for test:** identify applicable layers from the approved seams and
   acceptance criteria. `agentic-ai-coding-discipline` is always applicable.
2. **Acceptance-test authoring and intentional RED:** use the layers to make
   the approved test precise. Coverage stays limited to approved seams and
   acceptance criteria. Throwaway prototypes are exempt from production test
   coverage requirements unless the approved card says otherwise.
3. **After RED:** the test-lock policy overrides this router and every child
   skill. Do not add, edit, delete, rename, reformat, restore, or
   conflict-resolve a card test without explicit user authorization, a new
   intentional RED, a new explicit approval, and a new verified SHA-256 lock.
4. **Locked production work:** use the identified layers only to implement the
   locked behavior. Do not use a script, harness, or manual check as a
   substitute for the card's acceptance test.
5. **Review:** verify the applicable layers, ticket-owned dead-code cleanup,
   configuration and hygiene, the locked hash, and real test evidence before
   the card advances.

## Compatibility Rules

- Delete only dead code, imports, variables, or models introduced by the
  ticket. Record unrelated pre-existing dead code; remove it only when the
  user explicitly approves broader cleanup.
- Use Context7 before coding against a third-party library or SDK, following
  the existing bundle/router documentation policy. This router does not define
  a competing tool workflow.
- If an applicable seam, acceptance criterion, or post-RED test change is
  ambiguous, return `NEEDS_CONTEXT` and name the decision needed.
