#!/usr/bin/env node

// agentic-engineering-standards installer
// Usage:
//   npx agentic-engineering-standards <agent>          # install
//   npx agentic-engineering-standards <agent> --uninstall  # remove
//
// Agents: gemini | claude | cursor | all

import { cpSync, mkdirSync, rmSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { homedir } from "os";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

const SKILL_NAME = "agentic-engineering-standards";

// Directories to copy into the target
const COPY_ITEMS = ["SKILL.md", "skills", "references", "plugin.json"];

// Where each agent expects skills to live
const TARGETS = {
  gemini: join(homedir(), ".gemini", "config", "skills", SKILL_NAME),
  claude: join(homedir(), ".claude", "skills", SKILL_NAME),
  cursor: join(homedir(), ".cursor", "skills", SKILL_NAME),
};

// Antigravity plugin target (alternative to skills/)
const PLUGIN_TARGETS = {
  gemini: join(homedir(), ".gemini", "config", "plugins", SKILL_NAME),
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function printUsage() {
  console.log(`
  agentic-engineering-standards — install AI coding agent skills

  USAGE
    npx agentic-engineering-standards <agent> [options]

  AGENTS
    gemini       Install to ~/.gemini/config/skills/
    claude       Install to ~/.claude/skills/
    cursor       Install to ~/.cursor/skills/
    all          Install to all three

  OPTIONS
    --plugin     Install as Antigravity plugin instead of skill (gemini only)
    --uninstall  Remove the installed skill directory
    --help       Show this help

  EXAMPLES
    npx agentic-engineering-standards gemini
    npx agentic-engineering-standards all
    npx agentic-engineering-standards gemini --plugin
    npx agentic-engineering-standards claude --uninstall
`);
}

function copySkill(dest) {
  mkdirSync(dest, { recursive: true });

  for (const item of COPY_ITEMS) {
    const src = join(PACKAGE_ROOT, item);
    if (!existsSync(src)) continue;

    const target = join(dest, item);
    cpSync(src, target, {
      recursive: true,
      filter: (s) => !s.includes("node_modules") && !s.includes(".git"),
    });
  }
}

function uninstallSkill(dest) {
  if (!existsSync(dest)) {
    console.log(`  ℹ️  Nothing to remove at ${dest}`);
    return false;
  }
  rmSync(dest, { recursive: true, force: true });
  return true;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const positional = args.filter((a) => !a.startsWith("--"));

if (flags.includes("--help") || positional.length === 0) {
  printUsage();
  process.exit(0);
}

const agent = positional[0].toLowerCase();
const doUninstall = flags.includes("--uninstall");
const asPlugin = flags.includes("--plugin");

// Resolve target list
let agents;
if (agent === "all") {
  agents = Object.keys(TARGETS);
} else if (TARGETS[agent]) {
  agents = [agent];
} else {
  console.error(`  ❌  Unknown agent "${agent}". Choose: gemini | claude | cursor | all`);
  process.exit(1);
}

// Execute
for (const a of agents) {
  const dest = asPlugin && PLUGIN_TARGETS[a] ? PLUGIN_TARGETS[a] : TARGETS[a];
  const label = asPlugin && PLUGIN_TARGETS[a] ? "plugin" : "skill";

  if (doUninstall) {
    const removed = uninstallSkill(dest);
    if (removed) {
      console.log(`  ✅  Uninstalled ${label} from ${dest}`);
    }
  } else {
    copySkill(dest);
    console.log(`  ✅  Installed ${label} to ${dest}`);
  }
}

if (!doUninstall) {
  console.log(`\n  Restart your agent to pick up the new skills.`);
}
