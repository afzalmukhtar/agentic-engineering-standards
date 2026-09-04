# Agentic Engineering Standards

Personal skill bundle for Claude and Cursor. It routes engineering work through
durable documents and vertical, test-first Kanban cards — each card delivers one
end-to-end behavior you can prove with real tests.

## Workflow

```text
Context → Specification → Kanban → vertical TDD or debug → review and consolidation
```

1. **Context** — interview, glossary, architecture diagrams (`CONTEXT.md`)
2. **Specification** — testable requirements with acceptance criteria (`SPECIFICATION.md`)
3. **Kanban** — vertical-slice tickets with dependencies and swimlane diagram (`KANBAN.md`)
4. **Build or debug** — write the acceptance test, verify RED, get approval, implement to GREEN
5. **Review** — per-ticket review, then wave consolidation and full test suite

## Install

### Claude Code

```bash
git clone git@github.com:afzalmukhtar/agentic-engineering-standards.git \
  ~/.claude/skills/agentic-engineering-standards
```

### Cursor

```bash
git clone git@github.com:afzalmukhtar/agentic-engineering-standards.git \
  ~/.cursor/skills/agentic-engineering-standards
```

Use a real directory for Cursor (not a symlink) so `/agentic-engineering-standards`
and other slash commands are discovered reliably. Keep Claude and Cursor in sync
with `rsync` after updates if you maintain both installs.

### Update

```bash
git -C ~/.claude/skills/agentic-engineering-standards pull
```

## First use in a repository

Run **`setup-agentic-workflow`** once per repo. It creates:

```text
docs/agentic/
  CONTEXT.md
  features/<feature>/
    SPECIFICATION.md
    KANBAN.md
    tickets/
    test-locks/
    reviews/
  debug/<bug>/
    DEBUG-KANBAN.md
```

## Skills

| Stage | Skill | Purpose |
|---|---|---|
| Route | `workflow-router` | Pick the right skill when unsure |
| Setup | `setup-agentic-workflow` | Scaffold `docs/agentic/` layout |
| Context | `grill-and-context` | Interview and build `CONTEXT.md` |
| Context | `context-and-domain-modeling` | Glossary, seams, decisions |
| Context | `agentic-codebase-design` | Deep modules and testable boundaries |
| Plan | `create-specification` | Write `SPECIFICATION.md` |
| Plan | `create-kanban` | Write `KANBAN.md` and ticket cards |
| Build | `vertical-tdd` | RED → approval lock → skeleton → GREEN |
| Build | `implement-kanban` | Execute cards via isolated worktrees |
| Debug | `debug-kanban` | Locked regression test → fix cards |
| Review | `kanban-code-review` | Spec + standards review per ticket and wave |
| AI | `agentic-ai-engineering` | Pydantic, prompts, agents, async, structure |
| Support | `agentic-prototype` | Throwaway design exploration |
| Support | `agentic-research` | Cited background research |
| Support | `agentic-wayfinder` | Decision map for large foggy efforts |
| Support | `agentic-resolving-merge-conflicts` | Intent-based conflict resolution |
| Support | `agentic-wizard` | Human-only setup steps |

Reference policies live in `references/`:

- `artifact-templates.md` — document and ticket templates
- `test-lock-policy.md` — immutable tests after intentional RED
- `kanban-execution-policy.md` — parallel waves, worktrees, consolidation

## Core rules

- Each Kanban card is a **vertical slice** — complete end-to-end behavior, not one layer.
- Write the acceptance test and confirm **intentional RED** before production code.
- After RED, the test is **locked**. Any change needs your explicit approval, a fresh RED, and a new lock.
- **Tests are the proof** — scripts and harnesses do not substitute for them.
- Independent cards may run in **parallel worktrees** only when they have no shared file ownership.
- A **consolidator** merges reviewed cards and runs the full suite before the next wave.
- When in doubt, the agent **asks** — it does not guess or silently change approved tests.

## Entry point

Invoke the root skill **`agentic-engineering-standards`** or start with **`workflow-router`**.
