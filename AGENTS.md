# AGENTS.md - Betizen SSG

## Project Overview

Betizen is an 11ty (Eleventy) static site generator for casino, binary options, and forex listings. It uses Tailwind CSS v4 for styling and Nunjucks templates.

## Build Commands

```bash
# Production build (full)
npm run build

# Development server with watch
npm run dev

# Debug Eleventy
npm run debug

# Debug with serve
npm run debugstart

# Benchmark build
npm run benchmark

# Clean and build
npm run clean-build
```

**Note**: This project has no test framework configured. Do not write tests unless explicitly requested.

## Code Style Guidelines

### General

- Use 2-space indentation (enforced by `.editorconfig`)
- Use LF line endings
- Trim trailing whitespace
- UTF-8 charset
- Always end files with a newline

### JavaScript

- Use **CommonJS** (`require`/`module.exports`) - this project does not use ES modules
- Prefer `const` over `let`; avoid `var` for new code
- Use Node.js built-in module prefix: `require("node:path")` not `require("path")`
- Use template literals instead of string concatenation

### Naming Conventions

- **Files**: kebab-case (e.g., `eleventy-config.js`, `import-casinos.js`)
- **Variables/functions**: camelCase (e.g., `processCasinosFile`, `currentLang`)
- **Constants**: UPPER_SNAKE_CASE for true constants (e.g., `NODE_ENV`)

### Imports

```javascript
// Node.js built-in modules
const path = require("node:path");
const fs = require("node:fs");

// External packages
const axios = require("axios");
const { DateTime } = require("luxon");

// Local modules (relative paths)
const createFrontMatter = require("./libs/createFrontMatter.js");
```

### Templates (Nunjucks .njk)

- Follow Nunjucks syntax: `{{ variable }}`, `{% tag %}`, `{# comment #}`
- Use filters: `{{ date | readableDate }}`
- Use layouts from `_includes/`
- Access Eleventy data via `page`, `collections`, `templateContent`

### Data Files (`_data/*.js`)

- Export plain objects that become global template data
- Use `module.exports = { ... }`
- Example pattern from `config.js`:

```javascript
var pkg = require("../package.json");

module.exports = {
  isDev: process.env.NODE_ENV === "dev",
  version: pkg.version,
  // ...
};
```

### Error Handling

- Use try/catch for async operations
- Log errors with `console.error(err)`
- Return `false` or `null` for expected failure cases rather than throwing

### Tailwind CSS

- Classes are applied directly in Nunjucks/HTML templates
- Custom config in `tailwind.config.js`
- Use DaisyUI components (`daisyui` package)

### Directory Structure

```
/                      # Root config files
  eleventy.config.js   # Main Eleventy configuration
  tailwind.config.js  # Tailwind configuration
  package.json

content/               # Content files (input)
  en/                  # English content
  es/                  # Spanish content
  pt-br/               # Portuguese content
  *.njk, *.md          # Template files

_data/                 # Eleventy data (global template data)
  config.js
  languages.js
  metadata.js
  nav.js
  eleventyComputed.js

_includes/             # Nunjucks includes/partials

public/                # Static assets (copied to /assets/)
  css/app.css
  imgs/
  js/
    app.js           # Main entry point, initializes all modules
    core/            # Core modules
      state.js      # Global state management
      api.js        # API client
      auth.js       # Authentication (login/logout)
      voting.js     # Karma/voting system
      cms.js        # Comments system
    modules/         # Feature modules
      modal.js      # Modal dialogs
      toast.js      # Toast notifications
      casino-search.js  # Casino list search functionality
```

### JavaScript Architecture

The project uses vanilla JavaScript with a module-based architecture exposed via the global `window.BZ` namespace.

**Core Modules (`public/js/core/`):**
- `state.js` - Global state management with pub/sub pattern
- `api.js` - API client for backend communication
- `auth.js` - Authentication (Google, Nostr)
- `voting.js` - Karma/voting system
- `cms.js` - Comments system

**Feature Modules (`public/js/modules/`):**
- `modal.js` - Modal dialog component
- `toast.js` - Toast notification component
- `casino-search.js` - Client-side fuzzy search for casino list

**Initialization Pattern:**
```javascript
// In app.js
window.BZ = window.BZ || {};
window.BZ.modal.init();
window.BZ.auth.init();
window.BZ.voting.init();
window.BZ.casinoSearch.init();
```

**Adding a New Module:**
1. Create `public/js/modules/your-module.js`
2. Wrap in `window.BZ = window.BZ || {}; window.BZ.yourModule = { ... }`
3. Include in bundle in `_includes/layouts/base.njk`
4. Initialize in `app.js` after DOM ready

**CSS Animations:**
Custom animations are defined in `public/css/app.css`:
```css
@keyframes fadeIn { ... }
@keyframes fadeOut { ... }
```

### Working with Eleventy

- **Collections**: Defined in `eleventy.config.js` using `eleventyConfig.addCollection()`
- **Filters**: Add with `eleventyConfig.addFilter(name, fn)`
- **Shortcodes**: Add with `eleventyConfig.addShortcode(name, fn)`
- **Plugins**: Add with `eleventyConfig.addPlugin(plugin, options)`
- **Passthrough**: Use `eleventyConfig.addPassthroughCopy()`

### Environment Variables

- `NODE_ENV=dev` - Development mode
- `NODE_ENV=prod` - Production mode

### Key Packages

- `@11ty/eleventy` - Static site generator
- `@11ty/eleventy-img` - Image processing
- `@11ty/eleventy-plugin-rss` - RSS feed generation
- `@tailwindcss/cli` - CSS build
- `nunjucks` - Template engine
- `luxon` - Date/time handling

## Git Conventions

- **Never commit changes** without explicit permission
- Commit message format: `AGENT: <description>`
- **ALWAYS bump patch version in `package.json`** before committing (e.g., 2.1.17 → 2.1.18)
- Do not commit secrets or `.env` files

## Finding Correct Internal Links

When translating content from one language to another, internal links must be updated to their correct English URLs. To find the correct URLs:

1. **Build the site first**: `npm run build`
2. **Check the `_site/` directory**: This contains the generated output with final URLs
3. **Look for the correct path**: Run `ls _site/en/game/` or `ls _site/en/provider/` etc.

Example:
```bash
# After building, find correct game URLs
ls _site/en/game/ | grep -i catrina
# Output: catrina-bingo-neko-games

# Use this to construct the correct link: /en/game/catrina-bingo-neko-games/
```

Note: URL slugs may differ from source filenames (e.g., `thunderstruck-ii-video-bingo.njk` → `thunderstruck-ii-online-bingo`).
