# Bob Tianqi Wei Website

This repository contains the current source of Bob Tianqi Wei's personal website.

The site is now organized around a small number of content sources and render scripts, instead of many scattered one-off page data files.

## Main Site Structure

Top-level pages that are part of the active site:

- `/`
- `/about/`
- `/vision/`
- `/works/`
- `/design/`
- `/swe/`
- `/cv/`
- `/engresume/`

Supporting organized sections:

- [`/works/experiments/`](/Volumes/Disk/Programming/bobtianqiwei.github.io/works/experiments): standalone experiment pages such as cat, dog, pokemon, terminal, and yesorno
- [`/quick-links/`](/Volumes/Disk/Programming/bobtianqiwei.github.io/quick-links): small utility or redirect-style pages such as meet and teaching
- [`/archive/`](/Volumes/Disk/Programming/bobtianqiwei.github.io/archive): preserved old pages that are no longer part of the main navigation

## Source Of Truth

### Homepage indexes

- [`content/works-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/works-index.js)
  Controls the `/works/` homepage ordering and section placement.

- [`content/design-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/design-index.js)
  Controls the `/design/` homepage section layout and ordering.

- [`content/design-legacy-items.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/design-legacy-items.js)
  Holds design homepage items that still need custom data but no longer belong in the old `content/works/*.js` system.

- [`content/swe-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/swe-index.js)
  Controls the `/swe/classic/` homepage content.

### Project detail pages

- [`content/projects/`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/projects)
  Canonical source for project detail content.

Each project file can generate one or more detail pages under:

- `/works/<slug>/`
- `/design/<slug>/`
- `/swe/classic/<slug>/`

The shared template reference is:

- [`content/projects/_template.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/projects/_template.js)

### Music

- [`content/music/`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/music)
  Source for music cards on the works page.

## Render Scripts

- [`scripts/render-works.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/scripts/render-works.js)
  Builds `/works/` and `/works/all-works/`.

- [`scripts/render-project-pages.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/scripts/render-project-pages.js)
  Builds project detail pages from `content/projects/`.

- [`scripts/render-design-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/scripts/render-design-index.js)
  Builds `/design/` from `content/design-index.js`.

- [`scripts/render-swe-classic-index.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/scripts/render-swe-classic-index.js)
  Builds `/swe/classic/` from `content/swe-index.js`.

## Common Commands

```bash
npm run build:works
npm run build:projects
npm run build:design-index
npm run build:swe-index
npm run build:portfolio-indexes
npm run preview
```

What they do:

- `build:works`: rebuilds the works index and all project detail pages
- `build:projects`: rebuilds all pages from `content/projects/`
- `build:design-index`: rebuilds the design homepage
- `build:swe-index`: rebuilds the SWE classic homepage
- `build:portfolio-indexes`: rebuilds both design and SWE homepages
- `preview`: starts a local static server on port `8000`

## Styling

Shared project-page media styles:

- [`css/project-pages.css`](/Volumes/Disk/Programming/bobtianqiwei.github.io/css/project-pages.css)

Per-portfolio project styles:

- [`css/project-pages-design.css`](/Volumes/Disk/Programming/bobtianqiwei.github.io/css/project-pages-design.css)
- [`css/project-pages-swe-classic.css`](/Volumes/Disk/Programming/bobtianqiwei.github.io/css/project-pages-swe-classic.css)

In general:

- If you only change CSS, you usually do not need to regenerate HTML.
- If you change content data, HTML structure, or class names, rebuild the affected pages.

## Current Organization Rules

- New project detail content should go into `content/projects/`.
- New works homepage cards should be added in `content/works-index.js`.
- New design homepage cards should be added in `content/design-index.js`.
- New SWE classic homepage cards should be added in `content/swe-index.js`.
- Standalone playful tools or small web experiments should go under `works/experiments/`.
- Small utility pages or redirect-like pages should go under `quick-links/`.
- Old pages that should be preserved but not surfaced in the active site should go under `archive/`.

## Page Update Checklist

- After adding a new view in `content/projects/<slug>.js`, rebuild the affected detail pages with `npm run build:projects`.
- If that project is surfaced on `/works/`, `/design/`, or `/swe/classic/`, update the corresponding homepage data file so the link points to the new generated page instead of an old external or legacy path.
- Rebuild the affected homepage indexes after changing those links:
  - `npm run build:works`
  - `npm run build:design-index`
  - `npm run build:swe-index`
- After rendering new pages, verify both the detail page path and every homepage entry that should point to it.

## Notes

- The old `content/works/*.js` content system has been retired.
- `design/index.html`, `swe/classic/index.html`, and many project pages are generated files. When they look wrong, check the source data and renderer first.
- Some older static pages still exist outside the generated systems. If they stay in active use, they should either be moved into the content-driven system or clearly categorized as experiments, quick links, or archive pages.
