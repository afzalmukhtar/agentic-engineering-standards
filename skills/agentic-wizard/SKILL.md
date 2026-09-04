---
name: agentic-wizard
description: Create a human-guided shell wizard for manual actions that an agent cannot safely perform.
disable-model-invocation: true
---

# Wizard

Use a wizard only for actions a human must perform: account access,
credentials, third-party dashboard changes, one-off cutovers, or irreversible
operations requiring human confirmation. Do not invoke it for actions the
agent can perform directly, or to bypass proof of code behavior with real
tests.

## Scope the Manual Procedure

Read the repository's existing environment examples, README, CI configuration,
and deployment or migration documentation. Identify every manual stage and,
for each captured value, confirm:

- where the human obtains it;
- where it is persisted, if anywhere;
- whether it is secret;
- whether the action is irreversible.

Show the ordered stages and outputs to the user for confirmation. Do not
invent dashboard paths, commands, or secret destinations; verify them from
current documentation or ask for the missing fact.

## Author and Validate

Use an existing repository-local wizard pattern if available. Otherwise create
a minimal Bash script with one focused stage at a time, visible progress,
confirmation before irreversible actions, hidden input for secrets, and
idempotent writes for persisted values. Never hardcode or print secret values.

Run `bash -n <script>` and `shellcheck <script>` when available. Do not run a
wizard end-to-end yourself when it opens a browser, changes external state, or
waits for human input. Commit it only when the user requests a repeatable
setup path.

## Lifecycle Handoff

Record human-confirmed constraints, access facts, and decisions through
`grill-and-context` in `docs/agentic/CONTEXT.md`. If they enable or change
product behavior, continue:

`grill-and-context → create-specification → create-kanban`

A wizard can prepare access or configuration, but cannot prove shipped code.
Each approved Kanban card still requires its real acceptance test, intentional
RED, explicit approval, lock, and GREEN evidence through `vertical-tdd`.
