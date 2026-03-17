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

tools/                 # Import/processing scripts
  import-casinos.js
  libs/
    utils.js
    scrapping.js
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
- Do not commit secrets or `.env` files
