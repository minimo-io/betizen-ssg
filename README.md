# betizen-ssg

Reliable listings of online casinos, games, bonuses and affiliate programs, without scams! as a SSG built using Eleventy

## To Do

- Correct links:

- Remove errorMode: "never" for "allow-fallback" and create content needed
- Uncomment {# <meta name="robots" content="index,follow" /> #} and remove vercel.json noindex header.

### v2

- Search action schema hidden, at base

```<script type="application/ld+json">
              [{"@context":"https://schema.org/","@type":"WebSite","@id":"https://www.betizen.org#website","headline":"Betizen","name":"Betizen","description":"{{description}}.","url":"https://www.betizen.org","potentialAction":{"@type":"SearchAction","target":"https://www.betizen.org?s={search_term_string}","query-input":"required name=search_term_string"}}]
  </script>
```

- Pages do not load the carrousel at the top
- Add quick voting like in vegas site so we an update aggregateRatings for games and casinos
- Change old library html-minifier for https://www.npmjs.com/package/html-minifier-terser
- Create a pill for all listed casinos with Paid reviews (extreme transparency)
- Bonus at the bonus page should be of our top/paid partners only.
- Content: National Casino is setup as an Argentinian casino but it works great for Brazil (it seems)
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
- Currently when there is a bonus page for the casino bonus, the bonus box in the casino page is not related to the actual bonus page info but duplicated in the casino and bonus front-matters.

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
- For casinos without the bonus.link front-matter then the theme will grab the link from languages[page.lang].promo.url

- Bonus post types can have a bonus.image for the background image of the box, or else the system will pick up the default site-wide background image for bonuses.
