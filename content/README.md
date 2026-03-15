# Work Content System

`content/works/`

- One file per work item.
- Use [`_template.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/works/_template.js) as the starting point.
- `entries` controls where the item appears on `/works/`.
- `page` is optional. Add it only if the work should generate its own detail page.

`content/music/`

- One file per music card.
- Use [`_template.js`](/Volumes/Disk/Programming/bobtianqiwei.github.io/content/music/_template.js) as the starting point.
- `column` controls which of the 3 music columns the item belongs to.
- `order` controls the top-to-bottom order inside that column.

Build command:

```bash
npm run build:works
```

Generated files:

- `/works/index.html`
- Selected detail pages under `/works/*/index.html`
