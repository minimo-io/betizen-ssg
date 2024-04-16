# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

-   Start creating the importing feature from WPGraph QL
-   Make the carrousel.
-   Work on the tags/categories page (now from top menu being ready -and links being defined!)
-   Translate common texts
-   Create provider page
-   Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

### Bugs

-   Modal keeps rolling iframe when closed

### v2

-   Create a filter to filter tags by language name insted of adding if statements (gameslist)
-   Top casinos for games section (commented)
-   `subcats-carrousel.njk` not being used for games categories page at the moment. This could be useful for tagging games like "featured" or "Hold&Win", etc

### Conventions

In case you live in this online iGaming underworld and are trying to use this Eleventy template setup for your affiliate site, please consider:

-   Game images are being loaded by slug name, {slug}-hero.webp, {slug}-logo.webp and {slug}-splash.webp
-   Game categories should include a tag with name category\_{name}
