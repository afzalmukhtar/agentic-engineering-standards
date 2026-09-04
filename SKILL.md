---
name: agentic-engineering-standards
description: Route repository work through context, specification, vertical test-first Kanban delivery or debugging, and review.
---

# Agentic Engineering Standards

Route repository work through the completed bundle:

`Context → Specification → Kanban → vertical TDD or debug → Kanban review and consolidation`

## Core Kanban Lifecycle

Start with [workflow-router](skills/workflow-router/SKILL.md) when the request's stage is unclear. The core
lifecycle owns all delivery work:

- Context: [setup-agentic-workflow](skills/setup-agentic-workflow/SKILL.md),
  [grill-and-context](skills/grill-and-context/SKILL.md),
  [context-and-domain-modeling](skills/context-and-domain-modeling/SKILL.md),
  and [agentic-codebase-design](skills/agentic-codebase-design/SKILL.md)
- Specification: [create-specification](skills/create-specification/SKILL.md)
- Kanban: [create-kanban](skills/create-kanban/SKILL.md)
- Vertical TDD: [vertical-tdd](skills/vertical-tdd/SKILL.md), coordinated through
  [implement-kanban](skills/implement-kanban/SKILL.md)
- Debug: [debug-kanban](skills/debug-kanban/SKILL.md)
- Kanban review and consolidation:
  [kanban-code-review](skills/kanban-code-review/SKILL.md)

Use [artifact templates](references/artifact-templates.md) for the canonical
artifacts, the [test-lock policy](references/test-lock-policy.md) for test
immutability, and the [Kanban execution policy](references/kanban-execution-policy.md)
for wave execution and consolidation.

## Subordinate Specialist and Supporting Workflows

[agentic-ai-engineering](skills/ai-engineering/SKILL.md) is the AI engineering
specialist router. It remains subordinate to the core Kanban lifecycle and
routes applicable concerns to:
[agentic-ai-coding-discipline](skills/ai-engineering/coding-discipline/SKILL.md),
[agentic-ai-pydantic-contracts](skills/ai-engineering/pydantic-contracts/SKILL.md),
[agentic-ai-llm-prompts](skills/ai-engineering/llm-prompts/SKILL.md),
[agentic-ai-agent-architecture](skills/ai-engineering/agent-architecture/SKILL.md),
[agentic-ai-async-concurrency](skills/ai-engineering/async-concurrency/SKILL.md),
and [agentic-ai-project-structure](skills/ai-engineering/project-structure/SKILL.md).

The following supporting workflows also feed into, but never replace, the core
lifecycle:

- [agentic-prototype](skills/agentic-prototype/SKILL.md)
- [agentic-research](skills/agentic-research/SKILL.md)
- [agentic-resolving-merge-conflicts](skills/agentic-resolving-merge-conflicts/SKILL.md)
- [agentic-wizard](skills/agentic-wizard/SKILL.md)
- [agentic-wayfinder](skills/agentic-wayfinder/SKILL.md)

## Non-Negotiable Rules

- Each ticket is independently end-to-end testable and delivers a complete behavior, never only a horizontal layer.
- Write the ticket acceptance test and verify intentional RED before production behavior.
- After RED, the test is immutable; any change, including merge-conflict resolution, requires explicit user approval.
- No scripts substitute for tests; ticket tests are the executable source of truth.
- Run separate worktrees only for non-overlapping, dependency-free tickets with declared production and test ownership.
- A consolidator merges completed, reviewed cards and runs the full suite before the next Kanban wave.
- Unresolved decisions require user input; do not silently choose an implementation or alter an approved test.
