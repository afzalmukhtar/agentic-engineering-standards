---
name: debug-kanban
description: Debug a reported defect as locked regression-test Kanban cards.
---

# Debug Through Kanban

Use this for an inbound defect. It extends—not replaces—the approved Context →
Specification → Kanban → locked-test → review workflow. Read
`references/test-lock-policy.md`, `references/kanban-execution-policy.md`,
the relevant Context and specification, and the `DEBUG-KANBAN.md` template
before acting.

## Create the Debug Plan

Create `docs/agentic/debug/<bug-slug>/DEBUG-KANBAN.md`. Record the confirmed
reported behavior, a minimal real regression-test contract, ownership,
dependencies, and narrow diagnostic/fix cards (`D-001`, ...). Each card must
have a testable end-to-end behavior, status, blockers, and owned paths. Do not
diagnose by applying hypothesis-only production fixes or treat scripts,
harnesses, logs, or manual checks as test evidence.

If the report, expected behavior, test seam, ownership, or dependencies are
unclear, return `NEEDS_CONTEXT` with the exact decision needed. If no valid
seam can express the regression, add a blocked architecture-decision card,
route it to `agentic-codebase-design` and a Context decision (and the
specification when behavior changes), and block the fix. Do not create a
production workaround.

## Execute the First Card

The first executable card starts with the smallest real regression test for
the reported behavior. Treat that test as the card acceptance test and follow
the complete lifecycle in `vertical-tdd` and
`references/test-lock-policy.md`: intentional RED with the declared command,
explicit user approval, SHA-256 lock manifest, verified manifest, then the minimal fix to
GREEN. Record lifecycle evidence and status in `DEBUG-KANBAN.md`.

After RED, the regression test is immutable. Any later change—including a
merge conflict—uses only the policy's authorization → fresh RED → new approval
→ new SHA-256 lock manifest sequence. No diagnostic or fix card may bypass this gate.

## Review and Consolidate

Use `kanban-code-review` for every GREEN card and its consolidation wave.
Keep diagnostic work narrow and update dependent cards only after the reviewed
wave has passed its integration gate.
