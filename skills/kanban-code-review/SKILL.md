---
name: kanban-code-review
description: Independently review completed locked-test Kanban cards and consolidated waves.
disable-model-invocation: true
---

# Review Kanban Delivery

Read `references/kanban-execution-policy.md`,
`references/test-lock-policy.md`, the card, linked Context and specification,
and applicable focused AI standards before reviewing. This skill supplies the
review gates defined by those policies; it does not create another lifecycle.

## Review Each Completed Card

Assign a fresh reviewer subagent independent of the executor and of the card's
approval artifacts. The reviewer verifies:

- specification compliance and the independently testable behavior;
- applicable coding standards;
- the lock fields and current SHA-256 of every locked test;
- ticket-owned dead code and unused variables;
- targeted evidence from the declared real test command, never a script or
  harness substitute; and
- card status, lifecycle evidence, ownership, and review-record consistency.

Record the result in the canonical review location from
`references/artifact-templates.md` (or the debug Kanban evidence for a debug
card). A material finding changes the card to `blocked`. Request an explicit
user decision on the correction scope before any correction; then use the
policy-required independent re-review. A correction that changes a locked
test follows the complete reauthorization, RED, approval, and relock route.

## Review a Consolidated Wave

Assign a fresh consolidation subagent, distinct from every executor and
task reviewer in that wave. It verifies that only approved, reviewed cards
were merged; checks locks, cross-card integration, specification and standards
compliance; and records the repository full-suite command and result in the
wave integration review required by the execution policy.

Any merge conflict, stale lock, full-suite failure, or material integration
finding blocks the wave and requires the user decision mandated by that
policy. Do not unlock a later wave first.
