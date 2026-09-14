---
name: design-scrape
description: Extract a website's visual design system (colors, fonts, spacing, shadows, radii, layout structure) plus full-page and per-section screenshots, using the Playwright MCP browser. Use when the user says "scrape this site's design", "analyze the look of X", "pull the design tokens from Y", or wants reference material to inspire a theme/component on The Data Pilot site.
---

# Design Scrape

Extracts a reusable design-system snapshot from any live website: screenshots
+ computed CSS tokens (color palette, typography, spacing scale, radii,
shadows) + high-level layout structure. Read-only — never modifies the
target site.

## When to invoke

- "Scrape the design of `<url>`"
- "Analyze how `<competitor/site>` looks"
- "Pull design tokens / color palette from `<url>`"
- Before proposing a new theme in `theme-config.js`, when the user wants
  inspiration from an external reference site

## Prerequisite

Requires the `playwright` MCP server (browser automation). If Playwright
tools aren't available, tell the user to run:
`claude mcp add playwright -- npx @playwright/mcp@latest`

## Output location

All output goes to a new task folder following this repo's `workstreams/`
convention (per `@.agents/AGENTS.md`):

```
workstreams/design_scrape_<site-slug>/
  input/     — nothing needed; the URL is the input
  output/    — final deliverables (see below)
  context/   — CONTEXT.md session log
```

`<site-slug>` = the domain with dots replaced by underscores
(e.g. `stripe.com` → `design_scrape_stripe_com`).

## Steps

1. **Create the task folder.** `mkdir -p workstreams/design_scrape_<slug>/{input,output,context}`

2. **Navigate.** Use the Playwright MCP browser tool to open the target URL
   at a desktop viewport (1440×900) first.

3. **Full-page screenshot.** Capture the whole page at desktop width, save to
   `output/screenshot_desktop_full.png`.

4. **Section screenshots.** Identify major visual sections (hero, nav, pricing,
   footer, etc. — whatever exists) and capture each as a separate screenshot
   in `output/sections/<section-name>.png`. Cap at ~8 sections; if the page has
   more, pick the most visually distinct ones and note the rest were skipped.

5. **Mobile pass.** Resize the browser viewport to 390×844 (iPhone-class) and
   repeat the full-page screenshot as `output/screenshot_mobile_full.png`.

6. **Extract design tokens.** Run a JS evaluation in the page context (via the
   Playwright evaluate tool) that walks visible elements and collects:
   - **Colors** — distinct `background-color`, `color`, and `border-color`
     values from computed styles, deduplicated, with an approximate usage
     frequency (how many elements use each) so the dominant palette is clear.
   - **Typography** — distinct `font-family` values, and the set of
     `font-size` / `font-weight` / `line-height` combinations actually in use
     (this approximates a type scale).
   - **Spacing** — distinct `padding` and `margin` values on layout-level
     elements (section/div/main), to approximate a spacing scale.
   - **Radii & shadows** — distinct `border-radius` and `box-shadow` values.
   - Do NOT scrape `<script>`/`<style>` text or attempt to reconstruct exact
     source CSS — this is an observational token extraction from computed
     styles, not a source-code dump.

7. **Layout structure summary.** Note, in plain terms, the page's structural
   pattern: nav style (sticky/transparent/solid), hero layout (centered,
   split, etc.), section rhythm, grid vs. flex patterns for card layouts,
   footer structure. This is qualitative, written by you after reviewing the
   screenshots and DOM — not scraped programmatically.

8. **Write the deliverable.** Save `output/design_system_report.md`
   (prefix any LLM-authored prose per house rule) containing:
   - Site + date scraped
   - Screenshot references (relative paths)
   - Color palette table (hex + usage note, e.g. "primary CTA", "background")
   - Typography table (family, sizes/weights in use)
   - Spacing scale list
   - Radii / shadow list
   - Layout structure notes
   - A short "how this could inform The Data Pilot" section ONLY if the user
     asked for that framing — otherwise omit it and keep the report neutral.

9. **Log the session.** Append a `## Session: YYYY-MM-DD` entry to
   `workstreams/design_scrape_<slug>/context/CONTEXT.md` per the standard
   Context-First / Context Flush format (goal, findings, output path).

10. **Report back in chat** with the output folder path and a short bulleted
    "Highlights" summary of the palette/typography/layout findings — per the
    Document Highlights Rule. Do not paste the full report into chat.

## Hard rules

- **Read-only.** Never click through forms, never submit anything, never
  authenticate. Public pages only.
- **No copying of copyrighted text/imagery into this repo's own site.** This
  skill extracts abstract design tokens (colors, spacing numbers, structural
  patterns) for inspiration — never copy the target site's actual copy,
  logos, or images into `assets/` or any page file.
- **Never apply findings to this site's files automatically.** Extraction
  only. Applying a new palette/theme to `theme-config.js` requires a separate
  explicit request and follows the New Theme = New Logo rule
  (`@.agents/rules/03-theme-logo-rule.md`).
- Respect `robots.txt` intent — this is for casual design reference on
  public marketing pages, not bulk crawling or bypassing paywalls/auth.
