# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

- Casinos importing
  - Casinos images
  - Reputation text, must not be the whole html, rather me must only put the text (maybe encoding what we are currently scraping)
- Create blog page and posts

- Corret carrousel Fortune Tiger error.
- Fix the sitemap, /feed/feed.xml
- Create a better schema for games and casinos, and edit the one at base.njk
- Casinos reputation `casinos-list.njk` is hardcoded.
- Translate common texts
- Add new content added after the export.
- Remove errorMode: "never" for "allow-fallback" and create content needed
- Change old library html-minifier for https://www.npmjs.com/package/html-minifier-terser
- Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

### v2

- Have one carrousel for each language
- Create a filter to filter tags by language name insted of adding if statements (gameslist)
- Top casinos for games section (commented)
- `subcats-carrousel.njk` not being used for games categories page at the moment. This could be useful for tagging games like "featured" or "Hold&Win", etc
- Create the `casinos-filter.njk` specially for crypto.
- Add again the count of casinos where the provider is (in providers game screen)
- For parsing FrontMatter (in the future, I want to bulk edit stuff), https://www.npmjs.com/package/front-matter
- Add more casino metadata (now commented, like Withdrawal time, etc)
- Add popup subscription
- Casino bottom promotions are hidden, maybe add a CTA.

### Bugs

- Modal keeps rolling iframe when closed
- When a game is available in just one language, the lang switches goes bezerk

### Conventions

In case you live in this online iGaming underworld and are trying to use this Eleventy template setup for your affiliate site, please consider:

- Game images are being loaded by slug name, {{fileSlug}}-hero.webp, {{fileSlug}}-logo.webp and {{fileSlug}}-splash.webp. Same images are used for all languages.
- Same for provider images, they will use: {{fileSlug}}-logo.webp, and {{fileSlug}}-character.webp
- Game categories should include a front matter pointing to the category game slug `gamesFrom: slot`

- For big sites, considering increasing NodeJs memory limit: export NODE_OPTIONS=--max_old_space_size=5012
