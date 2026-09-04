---
name: agentic-ai-llm-prompts
description: Apply prompt contracts, grounded structured output, and approved LLM behavior tests inside a Kanban card.
---

# LLM Prompt Engineering

Use this layer for an approved card that writes or changes a system prompt,
user prompt, few-shot example, LLM call, or structured-output behavior. It is
not an independent prompt-delivery lifecycle.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. Once intentional RED is
recorded, any test change requires explicit user authorization, a new
intentional RED, new approval, and a verified SHA-256 re-lock before
production work resumes.

## Prompt Contracts

- Treat prompts as configuration: keep templates in the approved configuration
  location, not inline in agent logic.
- State the role, inputs, exact output schema, field constraints, grounding
  rule, and date placeholder when recency matters.
- For synthesis, require use of only supplied evidence, explicit gaps for
  failed or insufficient inputs, and source/task identifiers where applicable.
- For classification, require the model to select labels only from the input
  and quote the decisive input phrase in its reason.
- For planning or tool use, state independent-task, tool-choice, and
  non-fabrication constraints explicitly.
- Pair structured output with the applicable
  `agentic-ai-pydantic-contracts` model and an approved parse-failure path.

## Test and Provider Discipline

Test only the prompt/output behavior identified by the card's approved seams
and acceptance criteria: use known inputs, validate structured outputs, and
exercise the specified grounding or failure behavior. Throwaway prototypes are
exempt from production coverage unless their card requires it.

Before using a provider-native structured-output API or changing a provider
SDK integration, follow the existing bundle/router Context7 policy for current
documentation. Do not duplicate a provider workflow from memory.

## Review Checklist

- [ ] Prompts are reusable configuration, not ad-hoc inline strings.
- [ ] Output shape, constraints, grounding, and gaps are explicit.
- [ ] Structured output has validated parsing and approved failure behavior.
- [ ] Tests use approved card criteria and preserve the locked test unchanged.
- [ ] No ticket-unrelated cleanup or test substitute was introduced.
