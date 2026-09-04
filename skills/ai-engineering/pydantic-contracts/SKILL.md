---
name: agentic-ai-pydantic-contracts
description: Apply validated Pydantic contracts at Python agent and tool module seams inside an approved Kanban card.
---

# Pydantic Data Contracts

Use this layer when an approved card introduces or changes a Python agent/tool
seam, structured external payload, state object, API payload, or LLM result.
It refines the card's approved interface; it does not create a separate
workflow or require models where the approved seam does not need one.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. After intentional RED,
any test change requires explicit user authorization, a new intentional RED,
new approval, and a verified SHA-256 re-lock before production work resumes.

## Contract Rules

- Define and validate a `BaseModel` at structured agent/tool module boundaries;
  do not pass unvalidated raw dictionaries across those boundaries.
- Define the model before logic that consumes it, and wire each new model into
  the actual approved data path.
- Represent known values with `Literal` or `Enum`, structured successes and
  failures with nested models, and explicit optional error fields rather than
  encoded error strings.
- Parse external JSON and LLM output through `model_validate()` or
  `model_validate_json()` with an approved fallback/error path.
- The caller that knows a group is related owns its shared correlation ID.
  Never generate a distinct correlation ID per related entity; overwrite
  hallucination-prone LLM-supplied correlation values from the source record.
- Declare each non-trivial `self.*` attribute in `__init__` with a type
  annotation. Do not introduce mutable class-level collection defaults.
- Use typed model inputs and return values for the seam instead of
  `dict[str, Any]` when its shape is known.

## Validation and Scope

Tests cover only the card's approved contract seams and acceptance criteria.
Before wiring Pydantic to a third-party library or provider-native structured
output, follow the existing bundle/router Context7 policy for current API
documentation. A throwaway prototype is exempt from production coverage unless
its approved card requires it. Delete only unused models or imports introduced
by this ticket.

## Review Checklist

- [ ] Boundary model validates the real input or output path.
- [ ] Known status values and nested results are typed.
- [ ] Invalid external or LLM data follows the approved failure behavior.
- [ ] Correlation values are shared and source-grounded.
- [ ] New instance state and mutable defaults are safe.
- [ ] Locked-test hash, acceptance-test evidence, and ticket scope remain valid.
