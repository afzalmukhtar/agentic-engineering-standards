---
name: implement-kanban
description: Use to execute approved Kanban cards as reviewed, test-locked vertical slices through safe worktree waves.
disable-model-invocation: true
---

# Implement Kanban

Execute approved cards incrementally through `skills/vertical-tdd/`; do not
turn the Kanban plan into a bulk implementation. Read
`references/kanban-execution-policy.md` and
`references/test-lock-policy.md` before selecting any card or wave.

## Required Approval Gate

Accept a card only when it has:

- a final, explicit user-approved `KANBAN.md` and ticket card;
- approved acceptance criteria and a complete approved test contract;
- declared production and test ownership, dependencies, blockers, and wave;
- an approved specification with traceability and linked confirmed Context;
- no unresolved decision, stale approval, or planning conflict.

For each card, evaluate and invoke every relevant AI engineering standard
before implementation: `coding-discipline` is always required;
`pydantic-contracts`, `llm-prompts`, `agent-architecture`,
`async-concurrency`, and `project-structure` are required when the card
touches their corresponding boundary or concern. Use Context7 before adopting
or coding against a third-party library or SDK. Record the applicable
standards in the card's review evidence.

If any prerequisite is absent, conflicting, incomplete, or ambiguous, return
`NEEDS_CONTEXT` naming the exact missing approval or decision. Do not write
tests, production code, locks, reports, scripts, or worktree changes first.

## Select a Safe Wave

Build the candidate wave from cards whose dependencies are already
consolidated. Permit parallel execution only when no candidates have a
same-wave dependency edge and none of their owned production or test paths
overlap, including parent/child containment across production and test paths.

Create a separate isolated worktree and branch for every admitted card. Never
execute parallel cards in a shared worktree. An ownership conflict, missing
declaration, branch/worktree problem, or dependency uncertainty blocks the
card and asks the user; it never becomes an implicit serial or parallel choice.

## Execute Each Card

For each admitted card, assign a fresh executor subagent who did not author
its approval artifacts. Give that executor subagent only the approved card,
specification, Context, applicable standards, and declared ownership boundary.

The executor must invoke `vertical-tdd` and follow its exact sequence:

`acceptance test → intentional RED → explicit user approval + SHA-256 lock manifest → minimal production skeleton → GREEN`

The executor records and commits the ticket's RED evidence, lock, production
completion, and GREEN evidence as required by the execution policy. It may not
continue over a failing test, hash mismatch, stale approval, test conflict, or
test modification. Test files after RED—including existing tests and merge
conflict edits—first require explicit authorization to change the test, then
changed-test intentional RED, a new explicit approval, and a new verified
SHA-256 lock manifest before production work resumes.

Do not accept an ad-hoc script, harness, compilation check, manual test, or
production-only command as evidence in place of the card's acceptance test.

## Independent Task Review

After GREEN, route each card to an independent task-reviewer subagent, never
its executor subagent. The task-reviewer subagent must verify:

- the final card, specification, Context, and applicable AI standards;
- exact RED/GREEN evidence from the declared acceptance-test command;
- every required test-lock field and current SHA-256 manifest hash;
- no post-RED test change, including conflict resolution;
- declared ownership and the delivered end-to-end behavior; and
- no script or harness used as substitute test evidence.

The task-reviewer subagent writes and commits the canonical per-ticket review
record. A material finding transitions the card to `blocked`; the user must
explicitly decide the correction scope before the executor subagent may enter
`corrections`. The executor subagent makes only that approved correction, then
the task-reviewer subagent performs a new independent review; do not queue the
card for consolidation until that re-review is approved. A correction requiring
a test change returns the card to the test approval gate.

## Consolidate the Wave

After all cards in a parallel wave are reviewed, assign one fresh consolidation
subagent in the integration worktree, distinct from that wave's executor and
task-reviewer subagents. The consolidation subagent is responsible for the
whole wave, not an executor's local success. It verifies locks and fresh
hashes, lifecycle commits, ownership, test results, and approved review records
before merging each card.

The consolidation subagent merges only approved cards, runs the repository's
full test suite, then writes and commits the wave integration review. It must
examine cross-card behavior, specification compliance, relevant AI standards,
lock integrity, and whether any test was replaced by a script or harness. Only
a passing full suite and approved integration review update `KANBAN.md` to
consolidated and unlock cards in the next wave.

If a merge produces a locked-test conflict, a lock/hash is stale, the full
suite fails, an integration finding is material, or resolution changes an
approved behavior, ownership declaration, dependency, or test, block the wave
and ask the user. Never resolve it silently or unlock the next wave.
