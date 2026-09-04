---
name: agentic-ai-agent-architecture
description: Apply clear agent, tool, and orchestration boundaries inside an approved Kanban card.
---

# Agent Architecture

Use this layer for approved cards that change agents, tools, orchestrators,
tool routing, state machines, fan-out, retries, or pipeline assembly. It
refines the card's vertical slice; it does not plan a separate multi-agent
lifecycle.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. After intentional RED,
any test change requires explicit user authorization, a new intentional RED,
new approval, and a verified SHA-256 re-lock before production work resumes.

## Architecture Rules

- Give each agent one responsibility and one public execution method
  (`invoke()` or `run()`); keep execution data in the approved shared state
  contract rather than side-channel communication.
- Keep agents independent: agents do not import or directly invoke other
  agents. The orchestrator owns routing, sequencing, fan-out, and state
  transitions.
- Define valid transitions explicitly, halt unknown states cleanly, and bound
  loops with a configured maximum iteration count.
- Register tools in a typed registry instead of growing conditional dispatch
  chains. Return approved, serializable results and isolate expected tool
  failures at the tool or agent boundary.
- Centralize LLM-call behavior and configuration. Where the approved behavior
  needs retries, use bounded backoff and treat empty responses as failures;
  do not add a retry dependency unless the card needs it.
- Assemble dependencies in one bootstrap/composition location and use
  `agentic-ai-pydantic-contracts` for state and tool contracts.
- Use `agentic-ai-async-concurrency` for independent fan-out and its
  deterministic timing and partial-failure evidence.

## Scope and Review

Prove only the card's approved agent/tool/orchestration seam with its declared
acceptance test. Before coding against a third-party agent or LLM SDK, follow
the existing bundle/router Context7 policy. Remove only ticket-introduced dead
code and do not replace real acceptance testing with a harness.

## Review Checklist

- [ ] Responsibilities, state transitions, and ownership are explicit.
- [ ] Agent-to-agent coupling and unbounded loops are absent.
- [ ] Tool dispatch and LLM calls follow the approved boundary.
- [ ] Concurrent behavior has the required specialist evidence.
- [ ] Locked test hash and exact acceptance-test evidence remain valid.
