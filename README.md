# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

-   Create blog page and posts
-   Casino screen
-   Fix the sitemap, /feed/feed.xml
-   Create a better schema for games and casinos
-   Casinos reputation `casinos-list.njk` is hardcoded.
-   Create the importing tool.
-   Translate common texts

-   Change old library html-minifier for https://www.npmjs.com/package/html-minifier-terser
-   Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

### v2

-   Have one carrousel for each language
-   Create a filter to filter tags by language name insted of adding if statements (gameslist)
-   Top casinos for games section (commented)
-   `subcats-carrousel.njk` not being used for games categories page at the moment. This could be useful for tagging games like "featured" or "Hold&Win", etc
-   Create the `casinos-filter.njk` specially for crypto.
-   Add again the count of casinos where the provider is (in providers game screen)

### Bugs

-   Modal keeps rolling iframe when closed
-   When a game is available in just one language, the lang switches goes bezerk

### Conventions

In case you live in this online iGaming underworld and are trying to use this Eleventy template setup for your affiliate site, please consider:

-   Game images are being loaded by slug name, {{fileSlug}}-hero.webp, {{fileSlug}}-logo.webp and {{fileSlug}}-splash.webp
-   Same for provider images, they will use: {{fileSlug}}-logo.webp, and {{fileSlug}}-character.webp
-   Game categories should include a front matter pointing to the category game slug `gamesFrom: slot`
