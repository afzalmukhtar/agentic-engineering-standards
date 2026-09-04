---
name: vertical-tdd
description: Use to implement one approved Kanban card through an approval-locked acceptance test, minimal skeleton, and GREEN.
---

# Vertical TDD

This is the sole test lifecycle for a Kanban card. It implements one
independently testable vertical behavior, not a horizontal layer, scaffold, or
test-replacement script.

Read `references/test-lock-policy.md`, the final approved ticket card, its
test contract, linked specification, and repository Context before acting.
Apply the relevant focused AI engineering standards before authoring tests and
before production changes: `coding-discipline` always; `pydantic-contracts`,
`llm-prompts`, `agent-architecture`, `async-concurrency`, and
`project-structure` when their seam or concern is present. Use Context7 before
using a third-party library or SDK.

## Required Inputs

Proceed only when all of the following are available:

- the user-approved final Kanban card and its approved acceptance criteria;
- an approved test contract with a concrete acceptance-test path, command,
  expected RED failure, and expected GREEN result;
- a declared production and test ownership boundary with no unresolved
  dependency or conflict;
- the canonical ticket, test-lock, and review locations from
  `references/artifact-templates.md`.

If an input is missing, stale, contradictory, or ambiguous, return
`NEEDS_CONTEXT` with the exact missing decision. Do not write tests, production
code, scripts, locks, or lifecycle evidence until it is resolved.

## Exact Lifecycle

Follow this order without exception:

1. **Author the acceptance test.** Before RED only, create or modify the test
   needed to express the approved test contract. Do not create production
   behavior, a production skeleton, or a script/harness as proof.
2. **Establish intentional RED.** Run the exact acceptance-test command.
   Confirm the observed failure is the contract's specific expected failure,
   not an environment, collection, dependency, or unrelated failure. Record
   the command and result in the ticket.
3. **Stop for user approval.** Ask for explicit approval of the RED test. Do
   not calculate a lock for use, create a production skeleton, edit production
   behavior, or continue automatically while approval is pending.
4. **Create and verify the lock.** After explicit approval, create the
   test-artifact path/SHA-256 manifest required by the canonical test-lock
   document, commit the lifecycle step, and verify every manifest hash.
5. **Create the minimal production skeleton.** Only now create the smallest
   production structure required to let the real entrypoint reach the locked
   test. Keep the test RED until behavior is actually implemented.
6. **Implement only to GREEN.** Add the minimum production behavior necessary
   for the locked acceptance test to pass. Run the exact test command and
   record its GREEN result. Do not broaden scope, alter the test, or use a
   substitute script as evidence.
7. **Hand off for review.** Re-verify the locked hash, commit the completed
   card, update its lifecycle report, and give the independent task-reviewer
   subagent the ticket, lock, RED/GREEN evidence, changed paths, and applicable
   standards.

## Test Immutability Gate

Initial test authoring is allowed only before intentional RED. From the moment
RED is recorded, no test file for the card may be added, modified, deleted,
renamed, reformatted, restored, or conflict-resolved without explicit user
approval. This applies equally to an existing test and the newly authored
acceptance test.

Before every production change, review, rebase, merge, or consolidation, hash
every manifest artifact and compare it to the lock record. A mismatch, missing
lock, or stale approval invalidates the lock. Stop immediately, set the card to
`change_authorization`, and follow the re-approval procedure in
`references/test-lock-policy.md`: explicit authorization to change the test,
changed-test intentional RED, new explicit approval, and a new verified lock.
Never resolve a locked-test merge conflict or silently overwrite the test to
make the hash match.

## Completion and Blocking

GREEN is necessary but insufficient. The card is ready for task review only
when its locked hash matches, the exact test command is GREEN, the card's
acceptance criteria are met at the real boundary, and its report records the
evidence. A reviewer finding, failing test, ownership conflict, hash mismatch,
or unclear requirement blocks the card and requires user direction where the
resolution is not already approved.

Never substitute a custom script, harness, snapshot update, manual check, or
production-only command for the card's acceptance test. Do not unlock a
dependent card; `implement-kanban` and its consolidator control wave
progression.
