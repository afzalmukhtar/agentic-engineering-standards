---
name: agentic-resolving-merge-conflicts
description: Resolve in-progress merge or rebase conflicts without violating the approval-locked Kanban test lifecycle.
---

# Resolve Merge Conflicts

Use this only for an in-progress merge or rebase. Read the merge state,
conflicting files, linked Kanban cards, specifications, Context, test-lock
records, and the source commits that explain each side's intent. Preserve both
approved intents where compatible; otherwise record the trade-off and require
the decision that the linked Context or specification lacks. Do not invent
behavior.

## Locked-Test Gate

Before resolving any conflicted test file, determine whether it belongs to a
card whose intentional RED was recorded. A locked or otherwise post-RED test
conflict blocks the card and must never be altered, selected, restored,
reformatted, deleted, renamed, or conflict-resolved automatically.

Set the card to `change_authorization` and require all of the following before
resuming production work:

1. explicit user authorization to make the proposed test-conflict edit;
2. edit the test to resolve the conflict;
3. run the changed test to intentional RED using the card's declared real
   acceptance-test command;
4. obtain new explicit user approval of that RED test;
5. record and verify the replacement SHA-256 lock under
   `references/test-lock-policy.md`;
6. resume production work.

Do not infer authorization from a prior lock, code-review approval, merge
approval, or an instruction to continue. A test conflict with unclear expected
RED behavior returns `NEEDS_CONTEXT`. Do not continue the merge or rebase
across this blocked boundary.

## Complete Non-Blocked Conflicts

For conflicts outside the locked-test gate, resolve only the approved
behavior, then run the project's relevant automated checks. Verify every
affected locked-test hash before finishing. If any hash is missing, stale, or
mismatched, follow the same change-authorization route and stop.

Finish and commit the merge or rebase only after the checks pass, locks remain
valid, and the result still satisfies the linked Context, specification, and
Kanban ownership boundaries. Conflict resolution does not create, replace, or
weaken acceptance tests, and it never substitutes scripts or manual checks
for real test evidence.
