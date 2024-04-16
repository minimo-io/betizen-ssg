# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

-   Bingo games shoud have a different set of `key-props.njk`
-   We are not being able to configure a page title different than the game title name.
-   Start creating the importing feature from WPGraph QL, https://www.youtube.com/watch?v=Z9iEqOCvMpM and https://www.wpgraphql.com/docs/custom-post-types
-   Make the carrousel.
-   Work on the tags/categories page (now from top menu being ready -and links being defined!)
-   Translate common texts
-   Create provider page
-   Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

### v2

-   Create a filter to filter tags by language name insted of adding if statements (gameslist)
-   Top casinos for games section (commented)
-   `subcats-carrousel.njk` not being used for games categories page at the moment. This could be useful for tagging games like "featured" or "Hold&Win", etc

### Bugs

-   In game screen the "Category" right info is empty.
-   Modal keeps rolling iframe when closed
-   When a game is available in just one language, the lang switches goes bezerk

### Conventions

In case you live in this online iGaming underworld and are trying to use this Eleventy template setup for your affiliate site, please consider:

-   Game images are being loaded by slug name, {slug}-hero.webp, {slug}-logo.webp and {slug}-splash.webp
-   Game categories should include a front matter pointing to the category game slug `gamesFrom: slot`
