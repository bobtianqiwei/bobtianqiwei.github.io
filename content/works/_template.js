// content/works/_template.js developed by Bob Tianqi Wei
module.exports = {
  slug: "new-work-slug",
  entries: [
    {
      section: "RESEARCH",
      href: "/works/new-work-slug/",
      className: "link-100 w-inline-block",
      image: "/images/new-work-cover.jpg",
      contentHtml: "New Work Title<br><br>Author Names<br><br>Venue or Year<br>",
      lightbox: null,
      order: 999
    }
  ],
  page: {
    outputPath: "works/new-work-slug/index.html",
    layout: "publication",
    title: "New Work Title",
    metaTitle: "New Work Title",
    heading: "New Work Title",
    metaHtml: "Author Names<br>Affiliation<br>2026",
    sections: [
      {
        title: "Publications",
        html: "<p class=\"paragraph-light\">Add your project description here.</p>"
      }
    ]
  }
};
