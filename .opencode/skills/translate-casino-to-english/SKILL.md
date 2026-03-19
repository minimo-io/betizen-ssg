---
name: translate-casino-to-english
description: Workflow for translating casino reviews from Spanish to English in the Betizen SSG project. Includes step-by-step instructions for finding Spanish-only casinos, translating content, updating internal links, and adding cross-sell cards.
---

## Overview

This skill provides a clear workflow for translating casino reviews from Spanish to English in the Betizen SSG project.

## Prerequisites

1. Identify a Spanish casino file that doesn't exist in English
2. Build the site (`npm run build`) to have `_site/` with correct URLs

## Step-by-Step Workflow

### Step 1: Find Spanish-Only Casinos

```bash
comm -23 <(ls content/es/casinos/ | grep -v 'casinos.njk\|casinos.11tydata.js' | sort) <(ls content/en/casinos/ | grep -v 'casinos.njk\|casinos.11tydata.js' | sort)
```

### Step 2: Read Spanish Source File

Read the Spanish file to understand:
- Front matter structure (title, description, excerpt, operator, gradient, bonus, details, etc.)
- Content sections with IDs/anchors
- Internal links that need updating

### Step 3: Find Correct Internal Link URLs

After building, check `_site/en/` for correct URL paths:

```bash
# Games
ls _site/en/game/

# Providers  
ls _site/en/game-provider/

# Casinos
ls _site/en/online-casino/

# General casinos list
ls _site/en/online-casinos/
```

### Step 4: Create English Translation File

Create `content/en/casinos/[slug].njk` with:

**Front Matter:**
- `date`: Update to current date (e.g., "2026-03-18T12:00:00+00:00")
- `title`: Keep same or adapt
- `description`: Translate to English
- `excerpt`: Translate to English
- `bonus.link`: Keep Spanish link OR update if English version exists
- Keep all other fields (operator, gradient, details, license, ranking, score, reputation)

**Content:**
- Translate paragraphs to English
- Keep Spanish anchors/IDs (e.g., `id="juegos"`, `id="bonos"`) for internal link compatibility
- Update internal links to English versions where they exist
- Keep `/juegos/...` as-is if no English equivalent
- Update `/proveedor/...` → `/en/game-provider/...`
- Update `/casinos/` → `/en/online-casinos/`

**Cross-linking - National Casino Promotion:**
- Add a National Casino promotion card after the Promotions section heading to cross-sell:
```njk
<div class="card bg-base-200 border border-base-300 compact p-4">
  <div class="card-body p-0 flex-row items-center gap-3">
    <span class="text-2xl">🎰</span>
    <p class="text-sm">Looking for more options? Don't miss our <a href="/en/online-casino/national-casino/" class="link link-primary font-semibold">National Casino review</a> - a top-rated choice.</p>
  </div>
</div>
```

### Step 5: Test

Restart dev server and test the page renders correctly.

### Step 6: Commit

```bash
git add content/en/casinos/[filename].njk
git commit -m "AGENT: add [Casino Name] English translation"
```

## Common URL Mappings

| Spanish | English |
|---------|---------|
| `/juegos/[slug]/` | `/en/game/[slug]/` (if exists) |
| `/proveedor/[slug]/` | `/en/game-provider/[slug]/` |
| `/casinos/` | `/en/online-casinos/` |
| `/casino/[slug]/` | `/en/online-casino/[slug]/` |

## Notes

- URL slugs may differ from filenames (Eleventy generates them)
- Always build first to get accurate `_site/` URLs
- Keep Spanish anchors to maintain compatibility with existing internal links
- Use DaisyUI components for consistent styling
- Always add the National Casino promotion card in translations to cross-sell
