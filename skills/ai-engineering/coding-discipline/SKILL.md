---
name: agentic-ai-coding-discipline
description: Apply minimal, typed, surgical, and verifiable implementation discipline inside an approved Kanban card.
---

# Coding Discipline

This is a specialist layer for one approved card, not a separate delivery
workflow. Follow `skills/vertical-tdd/` for the card lifecycle.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. After intentional RED,
any test change requires explicit user authorization, a new intentional RED,
new approval, and a verified SHA-256 re-lock before production work resumes.
Do not use a test, script, harness, or manual check to bypass that policy.

## Think Before Production Changes

- Work only from the approved card, Context, specification, acceptance
  criteria, test contract, and declared ownership.
- Surface assumptions and material alternatives. If a required decision is
  unclear, return `NEEDS_CONTEXT`; do not silently choose.
- Prefer the simplest implementation that reaches the locked acceptance test
  at the real boundary. Do not add speculative features, abstractions, or
  configuration.
- Keep typed module-boundary inputs and outputs; apply
  `agentic-ai-pydantic-contracts` at Python tool and agent seams.

## Make Surgical Changes

- Change only lines that deliver the card's approved behavior and keep the
  repository's established style.
- Do not refactor adjacent code, reformat unrelated files, or broaden the
  card while fixing it.
- Remove imports, variables, functions, or models made dead by this ticket.
  Do not delete pre-existing dead code unless the user directs broader
  cleanup; record it for review instead.
- Keep error handling proportionate, but retain validation and handling at
  real trust boundaries.

## Verify the Approved Goal

The card's real acceptance-test command is the only RED/GREEN evidence. Test
coverage must match its approved seams and acceptance criteria; a throwaway
prototype is exempt from production coverage requirements unless the card
says otherwise. Before review, confirm every changed line traces to the card,
the locked hash still matches, and the exact test command is GREEN.
