// content/projects/fools-gold.js developed by Bob Tianqi Wei
module.exports = {
  slug: "fools-gold",
  content: {
    title: "Fool's Gold",
    description: "",
    hero: {
      headline: "Dreams and Disillusionment of Chinese Immigrants in the Golden City",
      metaLines: [
        "Bob Tianqi Wei, Jiayi Liu, NAMI, Rachel Zhang",
        "Advisor: Asma Kazmi",
        "UC Berkeley",
        "2024"
      ]
    },
    sections: [
      {
        images: [
          "/images/IMG_0923.jpg",
          "/images/IMG_0926.jpg",
          "/images/IMG_0932.jpg"
        ],
        imageColumns: 3
      },
      {
        bodyHtml: "<p>&quot;Fool&#x27;s Gold: Dreams and Disillusionment of Chinese Immigrants in the Golden City&quot; examines the dual symbolism of gold in the lives of Chinese immigrants who arrived in the United States during the 19th century. The California Gold Rush attracted thousands of Chinese laborers, lured by promises of wealth and prosperity. For many, “San Francisco” (旧金山, or “the land of gold”) was envisioned as a place of opportunity, a gateway to a brighter future. However, the golden dreams of these immigrants quickly tarnished. They were subjected to racial discrimination, economic exploitation, and harsh working conditions. Rather than striking gold, many Chinese immigrants found themselves in low-paying, perilous jobs such as prostitutes or railroad workers, often trapped by unjust labor conditions, systemic racism, and exclusionary laws like the Chinese Exclusion Act.</p><p>Gold in this project represents both the ideals of wealth and success, as well as the painful reality of exploitation and broken dreams. Chinese laborers not only worked in gold mines but also contributed to constructing the Central Pacific Railroad and Western mines, yet their contributions were met with prejudice, legal exclusion, and a pervasive &quot;Yellow Peril&quot; sentiment. The term “Fool’s Gold” aptly reflects how Chinese laborers became a “cheap alternative,” valued for their labor but denied fair treatment and dignity.</p>"
      },
      {
        video: {
          src: "https://www.youtube.com/embed/jkSkgd9QDkc?si=1Y2K5WBGt7Nl1fT_",
          title: "Fool's Gold video"
        }
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/fools-gold/index.html",
      layout: "works-case-study",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      metaTitle: "Fool's Gold: Dreams and Disillusionment of Chinese Immigrants in the Golden City"
    }
  }
};
