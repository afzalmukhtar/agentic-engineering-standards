---
name: workflow-router
description: Choose the appropriate bundle workflow after its required Context and approval gates.
---

# Route Workflow Work

Route only to skills in this workflow bundle. First classify the request. When
the target workflow needs confirmed Context and its facts, decisions, or
required approval are absent, route to `grill-and-context` or
`context-and-domain-modeling` first; do not bypass that gate.

| Request | Dispatch |
| --- | --- |
| Planned build, new capability, or material change | `setup-agentic-workflow`, then `grill-and-context` or `context-and-domain-modeling` as needed |
| Inbound defect, failure, or debugging report | Establish/confirm Context, then `debug-kanban` |
| Research question | `agentic-research`, then route confirmed findings through `grill-and-context` |
| Constrained spike or throwaway experiment | `agentic-prototype`, with its result routed through Context |
| Human-only access, account, environment, or manual setup | `agentic-wizard`, then record confirmed constraints in Context |
| Merge or rebase conflict | `agentic-resolving-merge-conflicts` after Context and test-lock checks |
| Large or unclear decision space | `agentic-wayfinder`, then Context before specification |
| Approved card ready for execution | `implement-kanban`, which invokes `vertical-tdd` |
| GREEN card or consolidated wave ready for review | `kanban-code-review` |
| Approved card with an AI engineering concern | `agentic-ai-engineering` |

If classification, requirements, or an approval decision is ambiguous, ask the
user before proceeding; never silently choose a workflow or solution.
