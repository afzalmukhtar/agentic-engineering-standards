# Test-Lock Policy

This policy governs the acceptance test for every Kanban card. The acceptance
test is the card's executable source of truth; an ad-hoc script, harness, or
manual check is never substitute evidence.

## Scope and Preconditions

A card may enter this lifecycle only with a user-approved final card, its
approved test contract, declared test ownership, and no unresolved decision.
No production behavior or production skeleton may be created before the lock
is recorded.

`intentional RED` means running the card's declared acceptance-test command
against the newly authored acceptance test and observing the specific expected
failure from the approved test contract. A command error, missing dependency,
or unrelated failure is not RED evidence.

## Initial Authoring and Locking

Before intentional RED, the executor may create or revise the card's
acceptance test to express only the approved test contract. This is initial
test authoring; it is not a lock and must not include production behavior.

After an intentional RED:

1. Record the exact command, date, and specific failing result in the ticket.
2. Pause and request explicit user approval of that RED test.
3. After approval, create a test manifest containing a repository-relative
   path and SHA-256 for every locked test artifact for the card (for example,
   `shasum -a 256 <test-path>`), then create
   `docs/agentic/features/<feature-slug>/test-locks/<ticket>.md`.
4. Record the lock and its approval in a dedicated lifecycle commit.
5. Verify every observed manifest hash equals its recorded hash before the
   first production change and before review or consolidation.

Each lock record must contain all of these fields:

| Field | Required content |
| --- | --- |
| Ticket | Stable ticket identifier |
| Test manifest | Repository-relative path/SHA-256 pair for every locked test artifact |
| Acceptance criteria | Approved criterion IDs and observable coverage |
| RED command/result | Exact command and the expected, observed failure |
| Approval reference | User message, link, or dated approval identifier |
| Timestamp | Lock creation timestamp with timezone |

## Immutability Rule

Once intentional RED has occurred, do not add, edit, delete, rename, reformat,
restore, or resolve a merge conflict in any test file for that card without
explicit user approval. This includes the locked acceptance test, an existing
test, generated test data committed as a test artifact, and a test change made
while rebasing or merging.

The executor may change production files only after a valid lock exists.
Reviewers and consolidators may read and hash locked tests but must not alter
them. A merge conflict touching a locked test blocks the card; it is not a
routine conflict-resolution task.

## Hash Verification and Re-approval

Treat a missing lock, stale approval, missing required field, unreadable
manifest artifact, or any SHA-256 mismatch as an invalid lock. Immediately:

1. stop production work, review approval, merge, and consolidation;
2. return the card to `change_authorization` and record the mismatch in its
   lifecycle report;
3. ask the user to explicitly authorize the proposed test change;
4. only after that authorization, make the test change, re-run the declared
   acceptance command to intentional RED, and capture its result;
5. request and record a new explicit approval for the new RED test;
6. replace the lock record with the new complete manifest, approval reference,
   timestamp, and RED evidence in a new lifecycle commit; then re-verify every
   manifest hash.

Do not infer either approval from an earlier lock, a code-review approval, a
merge approval, or an instruction to continue. If the reason for a changed
test or the expected RED result is unclear, return `NEEDS_CONTEXT` with the
specific decision needed.

## Evidence Boundaries

Only the approved acceptance-test command can establish RED or GREEN for the
card. Scripts and harnesses may assist normal development only when the card's
test command invokes real tests; they cannot create, replace, weaken, or
attest to the acceptance test. A passing script, compilation check, mocked
command, or manually inspected output does not satisfy this policy.
