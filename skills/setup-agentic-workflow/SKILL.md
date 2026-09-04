---
name: setup-agentic-workflow
description: Establish the repository-local artifacts for the agentic engineering workflow.
---

# Set Up Agentic Workflow

Use this skill when a repository needs the durable workflow layout. Do not
require an issue tracker, create tracker labels, or synchronize these artifacts
to an external system.

Create or preserve this canonical layout:

```text
docs/agentic/
  CONTEXT.md
  features/<feature-slug>/
    SPECIFICATION.md
    KANBAN.md
    tickets/T-001-<slug>.md
    test-locks/T-001.md
    reviews/T-001.md
  debug/<bug-slug>/
    DEBUG-KANBAN.md
```

Start `CONTEXT.md` from `references/artifact-templates.md`. For each feature,
create its `SPECIFICATION.md` before `KANBAN.md`, then add ticket, test-lock,
and review directories as tickets require them. For an inbound defect, create
the isolated debug directory and `DEBUG-KANBAN.md`.

Keep repository-wide facts in Context and feature requirements in the feature
specification. Do not create a test lock until an acceptance test has run
intentionally RED and the user explicitly approves locking it.
