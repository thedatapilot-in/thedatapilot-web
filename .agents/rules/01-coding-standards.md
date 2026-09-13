---
trigger: model_decision
description: "Rules and standards for writing Python/bash scripts, CLI parameters, and code editor hygiene."
---
# 01 — Coding & Script Standards

## Scripting Standards
1. **Module Docstring:** Include script name, purpose, inputs, outputs, usage, and last updated date.
2. **CLI Parameters:** Derive all file paths dynamically via arguments. Never hardcode absolute paths in logic.
3. **Progress Output:** Include clean `console.log()` / `print()` statements for key milestones. Silence during long scripts is not acceptable.
4. **Secure Credential Handling:** Never store passwords or tokens in code or `.env`. Design scripts to read credentials securely using runtime input prompts (`getpass`) or OS-Native Keyrings.
5. **Dependency Path Recording (Self-Learning):** If an agent finds a workaround for a tricky dependency installation, the agent MUST immediately invoke the `self_learner` subagent or write a strict rule to `mistakes_and_rules.md`.

## Code Editor File-Opening Rule
1. **Never Open Files:** NEVER open edited or newly created files in the code editor automatically. Only edit files silently in the background unless explicitly asked to open them.

## Output Hygiene & Communication
1. **ABSOLUTE NO CODE BLOCKS IN CHAT:** NEVER output code blocks, code snippets, diff blocks, or raw script listings in chat responses under any circumstances. Keep chat responses strictly focused on high-level natural language updates, action items, status summaries, and clickable links to modified files.
2. **SILENT TERMINAL EXECUTION:** Run all terminal commands silently in the background. Never echo raw terminal logs, command outputs, or expand code blocks in chat responses unless explicitly requested by the user.

## Git & File Hygiene
1. **Specific Staging:** Stage specific files by name (`git add src/App.js`). Never use `git add -A` blindly.
2. **Superseded Files:** Delete old superseded files immediately. Do not append `_old` to filenames.
3. **LLM Prefixing:** Prefix AI-authored documentation with `[by LLM]`.

## CI/CD & Deployment Optimization
1. **FTP Deployment State Reuse:** Never use dynamic commit SHAs (`github.sha`) in `state-name` for Hostinger FTP deployment workflows. Always use stable environment state file names (`.ftp-deploy-sync-${env_label}.json`) so FTP performs fast incremental syncs instead of full server re-scans.
2. **Code-First Layout Auditing:** Always inspect underlying source code DOM classes (`max-w-7xl`, `items-stretch`, `h-full flex flex-col justify-between`) to verify container width and card height symmetry before making layout claims.

