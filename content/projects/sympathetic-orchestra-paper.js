// content/projects/sympathetic-orchestra-paper.js developed by Bob Tianqi Wei
module.exports = {
  slug: "sympathetic-orchestra-paper",
  content: {
    title: "Sympathetic Orchestra",
    description: "Research papers and demo publication for Sympathetic Orchestra, an interactive conducting education system.",
    hero: {
      headline: "Research on responsive virtual orchestral feedback for embodied conducting practice and tacit skill development.",
      metaLines: [
        "Bob Tianqi Wei, Shm Almeda, Ethan Tam, Dor Abrahamson",
        "UC Berkeley",
        "2024"
      ]
    },
    sections: [
      {
        title: "Publications",
        bodyHtml: "<p><strong>Sympathetic Orchestra: A Responsive Virtual Orchestra for Embodied Interpretive Practice in Conducting</strong><br>Bob Tianqi Wei, Shm Almeda, Shayne Shen, Ethan Tam, and Dor Abrahamson.<br>CHI 2026, Accepted</p><p><strong class=\"italic-bold-in-research-title\">ABSTRACT</strong><br>Learning to conduct effectively depends on a tight loop between perception and action, in which students’ hand gestures are continuously shaped by audible and situational feedback. However, students often rehearse with static recordings that cannot respond to their physical actions or interpretive intentions. This breaks the feedback needed to develop tacit musical knowledge, such as how timing, cueing, balance, and phrasing are communicated through embodied motion. We present Sympathetic Orchestra, a real time interactive system that maps conducting gestures to dynamically responsive orchestral playback and a stage oriented visual layout, making the consequences of actions immediately perceivable. The system reveals higher engagement and distinct interaction patterns that show how responsive feedback supports the development of tacit musical understanding through embodied practice.</p><p><a href=\"https://dl.acm.org/doi/10.1145/3672539.3686783\" target=\"_blank\" class=\"link-in-paragraph\"><strong>Demonstration of Sympathetic Orchestra: An Interactive Conducting Education System for Responsive, Tacit Skill Development</strong></a><br>Bob Tianqi Wei, Shm Almeda, Ethan Tam, and Dor Abrahamson.<br>UIST 2024<br>https://doi.org/10.1145/3672539.3686783<br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/other_papers/DemoSympatheticOrchestra.pdf\" target=\"_blank\" class=\"link-in-paragraph\">PDF</a></p><p><strong class=\"italic-bold-in-research-title\">ABSTRACT</strong><br>Students learning musical conducting often practice along to static recordings, which do not provide real-time feedback similar to that of a live orchestra during rehearsals. Novice conductors need better solutions for practicing with feedback that mimics the experience of conducting a live orchestra. We can leverage emergent multimodal and spatial interaction technologies to support a virtual orchestra practice experience that allows students to develop tacit, live-practice knowledge. Through formative interviews with conducting experts and students, we designed and developed a dynamic, multimodal interaction system that targets key goals held by students developing their orchestral conducting skills, and that traditional practicing methods lack support for.</p>"
      },
      {
        title: "Beta",
        bodyHtml: "<p><a href=\"/works/sympathetic-orchestra/\" class=\"link-in-paragraph\"><strong>Sympathetic Orchestra (beta)</strong></a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/sympathetic-orchestra-paper/index.html",
      metaTitle: "Sympathetic Orchestra Paper",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    }
  }
};
