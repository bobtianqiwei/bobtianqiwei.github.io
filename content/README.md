# Work Content System

`content/works-index.js`

- Central source for `/works/` homepage ordering and section placement.
- Each `entry` controls one work card or lightbox item on the works index.

`content/design-index.js`

- Central source for `/design/` homepage sections and card ordering.
- `featureRows` controls the large two-up cards.
- `columns` controls the three-column project stacks.

`content/design-legacy-items.js`

- Shared source for design homepage items that are not yet modeled in [`content/works-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/works-index.js).
- Keeps lightbox-only and external-link design items out of the old per-file `content/works/*.js` dependency path.

`content/swe-index.js`

- Central source for `/swe/classic/` homepage content.
- `trustedBy` controls the logo row.
- `essentials` controls the featured project table.
- `selectedProjects` controls the lower project list.

`content/music/`

- One file per music card.
- Use [`_template.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/music/_template.js) as the starting point.
- `column` controls which of the 3 music columns the item belongs to.
- `order` controls the top-to-bottom order inside that column.

`content/audio/`

- Shared audio files and playlist data used across Vision, Works, and SWE pages.
- `playlist.js` stores the shared track list.

Build command:

```bash
npm run build:works
npm run build:design-index
npm run build:swe-index
npm run build:portfolio-indexes
```

Generated files:

- `/works/index.html`
- `/design/index.html`
- `/swe/classic/index.html`
- Project detail pages under `/works/*/index.html`

`content/projects/`

- One file per shared project content source.
- Use [`_template.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/projects/_template.js) as the starting point.
- `content` stores the canonical project information.
- `views` defines which pages should be generated from the same content.

Generated files from project views:

- `/works/<slug>/index.html`
- `/design/<slug>/index.html`
- `/swe/classic/<slug>/index.html`
