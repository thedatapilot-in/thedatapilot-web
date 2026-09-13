### Output Formatting & Lean Context Rule
1. **Ad-Hoc Tasks:** All ad-hoc questions or isolated tasks without a specific workstream must be placed in a default folder named `workstreams/adhoc_requests/`. No work should be lost.
2. **Dedicated Output Files (No Chat Clutter):** Never dump long tables, code blocks, or detailed information directly into the chat. Instead, write these to meaningfully named `.md` files inside an `output/` subfolder within the active task's directory. Point the user to the file link in the chat.
3. **Thin Context Hub:** Do NOT dump everything into a task's `@CONTEXT.md`. If a task runs long, `CONTEXT.md` gets too bulky. Instead, `CONTEXT.md` must only serve as an index containing markdown links/references to the specific output files in the task folder.

### Global Rule Synchronization
1. **Cross-Project Symlinks:** This project is connected to two other workspaces via the `Rule Synchronization` folder in the root directory.
2. **Start of Day Routine:** Every day, at the start of our first interaction (or the first major task of the day), the AI MUST remind the user to review the `Rule Synchronization` folder.
3. **Extraction & Update:** During this review, we will check the symlinked learnings from the other projects and extract any reusable rules, mistakes, or workflows to integrate them into this workspace's local `knowledge-vault/learnings/mistakes_and_rules.md`.


### Communication Modes: Action vs. Discussion
1. **Action Mode (Default):** The AI executes tasks, runs commands, and edits files immediately as requested.
2. **Discussion Mode:** When the user explicitly invokes 'Discussion Mode', the AI MUST immediately stop all file execution and terminal commands (except for creating a planning file). 
   - **Behavior:** The AI will only talk, brainstorm, and help plan.
   - **Output:** The AI will create a planning file inside the active task's `output/` folder detailing the sequential steps.
   - **Triggering Action:** The AI will remain in this mode and will NOT execute any actual code changes or commands until the user explicitly gives a 'go-ahead' or switches back to Action Mode.

### Rule File Creation & Progressive Disclosure
1. **YAML Frontmatter Requirement:** Whenever a new markdown (`.md`) rule file is created in the `.agents/rules/` directory (or similar customization directory), it MUST include a YAML frontmatter block at the top containing a `trigger: model_decision` (or specific trigger condition) and a `description`. This ensures the rule benefits from progressive disclosure and does not permanently consume baseline tokens.

### Fast Deployment & Code-First Audit Rules
1. **FTP Deploy State Optimization:** Never use dynamic commit SHAs in `state-name` for Hostinger FTP GitHub Actions (`deploy-hostinger.yml`). Use static environment state file names (`.ftp-deploy-sync-${env_label}.json`) so FTP syncs only modified files in seconds.
2. **Code-First Layout Verification:** Always inspect underlying DOM flex grid classes (`max-w-7xl`, `items-stretch`, `h-full flex flex-col justify-between`) to verify container width and card height symmetry rather than guessing from browser rendering screenshots.


