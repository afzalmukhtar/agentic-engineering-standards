---
name: agentic-ai-async-concurrency
description: Apply safe async fan-out, bounded concurrency, timing evidence, and failure isolation inside an approved Kanban card.
---

# Async and Concurrency

Use this layer when an approved card contains independent concurrent work,
async pipelines, queues, thread bridging, semaphores, or background tasks.
Add concurrency only when the card needs it and the sequential behavior is
already understood.

## Test-Lock Precedence

`references/test-lock-policy.md` overrides this skill. After intentional RED,
any test change requires explicit user authorization, a new intentional RED,
new approval, and a verified SHA-256 re-lock before production work resumes.

## Concurrency Rules

- Use `asyncio.gather()` for independent work. Where one unit may fail without
  halting its peers, use `return_exceptions=True` and inspect every result.
- Never block an async path with `time.sleep()` or a synchronous network call;
  use `asyncio.sleep()` or the approved `asyncio.to_thread()` bridge.
- Create semaphores in an async context or inject them; never create them at
  module import time. Document rate limits that intentionally serialize work.
- Measure duration with `time.monotonic()` or `time.perf_counter()` and log
  start and end with the same work-unit correlation token.
- Model producer-consumer stages with bounded `asyncio.Queue` instances rather
  than shared mutable collections. Define one sentinel and propagate it
  downstream before a stage exits.
- Retain references to fire-and-forget tasks, bound them with an injected
  semaphore when needed, and collect shutdown failures before propagating
  completion signals.

## Required Evidence

For concurrent work, the approved card must include deterministic tests for:

1. timing that distinguishes overlapping N-unit work from sequential work; and
2. partial failure isolation, including completion of unaffected work.

Add total-failure or sentinel-propagation coverage when those are approved
acceptance seams. Test only the card's approved behavior; a throwaway prototype
is exempt from production coverage unless its card says otherwise.

## Scope and Review

Before integrating a third-party async client or SDK, follow the existing
bundle/router Context7 policy. Delete only dead code introduced by this ticket.
The real locked acceptance test—not a timing script or manual log—is the
RED/GREEN evidence.

- [ ] Independent work, failure semantics, and concurrency bound are explicit.
- [ ] Timing and partial-failure tests are deterministic and card-scoped.
- [ ] Blocking calls, module-level semaphores, untracked tasks, and swallowed
      sentinels are absent.
- [ ] Locked test hash and exact acceptance-test evidence remain valid.
