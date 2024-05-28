# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

- Continue with articles from other languages
- Casinos list page, has a page title with error
- Create a way to order casinos by some index.
- Corret carrousel Fortune Tiger error.
- Fix the sitemap, /feed/feed.xml
- Create a better schema for games and casinos, and edit the one at base.njk
- Casinos reputation `casinos-list.njk` is hardcoded.
- Translate common texts
- Add new content added after the export.
- Remove errorMode: "never" for "allow-fallback" and create content needed
- Change old library html-minifier for https://www.npmjs.com/package/html-minifier-terser
- Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

- Correct links:
  /visit/ links all along articles and posts...
  http://localhost:8080/promocoes/
  http://localhost:8080/colunas/bankroll-o-que-e-e-como-gerencia-lo-em-nossas-apostas/
  href="/cassino/
  /jogo/

> > Same in english and portuguse

> > Define what to do with tags links.

> > Do sth with this: http://localhost:8080/tags/

### v2

- Blog articles have their date in english. Eg. June 14, 2018
- Create one landing page as the end of funnel to complement adboxes, where the bell and bonus page will be. Maybe in the same url.
- Add main casino promo to the casino reputation popup
- Add front-matter for blacklisted casinos
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
- Some games can be highlighted using the front-matter property: `gameListFeatured: true`
- Same for provider images, they will use: {{fileSlug}}-logo.webp, and {{fileSlug}}-character.webp
- Game categories should include a front matter pointing to the category game slug `gamesFrom: slot`

- For big sites, considering increasing NodeJs memory limit: export NODE_OPTIONS=--max_old_space_size=5012

- Two conversion boxes: `"components/bz-banner-hero.njk"`, `"components/bz-subscribe.njk"` and one landing page as end-of-funnel.
