---
name: agentic-ai-project-structure
description: Apply configuration, test placement, and code-hygiene checks before an approved Kanban card reaches review.
---

# Project Structure and Hygiene

Use this layer before task review for every approved card, and when a card
changes project layout, configuration, bootstrap wiring, tests, or repository
hygiene. It validates the card's delivered slice; it does not create a second
project or delivery workflow.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. After intentional RED,
any test change requires explicit user authorization, a new intentional RED,
new approval, and a verified SHA-256 re-lock before production work resumes.

## Structure Rules

- Keep dependency wiring in the repository's established bootstrap/composition
  point. Do not introduce a new layout when the approved card can use the
  existing one.
- Keep model names, timeouts, retry limits, and other configuration in the
  established settings/configuration location; do not scatter environment
  values through agents or tools.
- Store prompt templates in the approved configuration/prompt location and
  secrets only in approved environment or secret configuration—never source.
- Place tests where the repository convention and card's acceptance-test
  contract require. The card's approved seams and acceptance criteria, not a
  blanket per-module rule, define required coverage.
- Keep imports, public method names, module boundaries, and tool conventions
  consistent with the repository.
- Remove only imports, functions, models, empty modules, or other dead code
  introduced by the ticket. Do not clean up pre-existing dead code without
  explicit user direction.

## Pre-Review Gate

Before a card reaches review:

- run the exact approved acceptance-test command and verify its locked
  SHA-256 hash;
- run any repository checks required by the approved card or existing project;
- verify new configuration, prompt, and contract code is on the real execution
  path; and
- confirm no script, harness, snapshot update, or manual check substituted for
  the card's acceptance test.

Throwaway prototypes are exempt from production test-coverage and layout
requirements unless their approved card says otherwise. Before integrating a
third-party library or SDK, follow the existing bundle/router Context7 policy.

## Review Checklist

- [ ] The card uses existing structure or only adds the minimum approved paths.
- [ ] Configuration and prompts are centralized in the established locations.
- [ ] Tests match the approved seams and acceptance criteria.
- [ ] Ticket-introduced dead code is absent; unrelated code remains untouched.
- [ ] Test lock, real test evidence, ownership, and lifecycle records are valid.
