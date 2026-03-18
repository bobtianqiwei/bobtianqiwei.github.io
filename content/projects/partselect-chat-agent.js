// content/projects/partselect-chat-agent.js developed by Bob Tianqi Wei
module.exports = {
  slug: "partselect-chat-agent",
  content: {
    title: "PartSelect Chat Agent",
    description: "A software engineering case study for an AI-assisted commerce and support agent focused on refrigerator and dishwasher parts.",
    hero: {
      headline: "An AI-assisted ecommerce and support agent for product search, compatibility checking, installation help, and troubleshooting.",
      metaLines: [
        "Bob Tianqi Wei",
        "React 18, Express.js, DeepSeek API, vector retrieval",
        "June 2025"
      ],
      image: "/images/PartSelect-Agent-cover-image.jpeg"
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>PartSelect Chat Agent is a production-style chat assistant for an appliance-parts storefront. It focuses on a narrow but realistic domain: refrigerator and dishwasher parts, where users need help finding products, checking model compatibility, reading installation guidance, and troubleshooting failures.</p><p>The project was built as a software engineering exercise in turning a generic chat interface into a domain-specific support system with real business constraints, clearer scope boundaries, and useful structured outputs.</p>"
      },
      {
        title: "User Experience",
        bodyHtml: "<p>The frontend centers on a responsive chat workflow with rich product cards, compatibility checks, installation guides, and troubleshooting flows. Rather than returning plain text only, the interface is designed to help users move between questions, products, and next actions without losing context.</p><p>This mattered for the project because appliance support is not just conversational. The agent has to present part numbers, prices, compatible models, and installation steps in a way that still feels usable inside a chat interaction.</p>",
        figure: {
          src: "/images/partselect-chat-agent-ui.png",
          caption: "Main interface for the PartSelect Chat Agent, combining conversational support with product and repair information."
        }
      },
      {
        title: "System Architecture",
        bodyHtml: "<p>The backend uses Express.js to expose modular REST endpoints for chat, product lookup, compatibility checks, installation guides, and troubleshooting. A DeepSeek-powered response layer is combined with business context and vector retrieval so the assistant can ground responses in relevant product information instead of replying as a generic chatbot.</p><p>The implementation also includes explicit scope control and fallback behavior. If the AI service is unavailable, the application degrades gracefully through local response logic for common installation, compatibility, and troubleshooting queries.</p>",
        figure: {
          src: "/images/partselect-chat-agent-flow.png",
          caption: "System flow for the PartSelect Chat Agent, connecting frontend interaction, business rules, retrieval, and AI response generation."
        }
      },
      {
        title: "Engineering Focus",
        bodyHtml: "<p>From a software engineering perspective, the project demonstrates domain scoping, modular backend design, API orchestration, and pragmatic resilience. The assistant is constrained to the supported appliance categories, uses structured product data for retrieval and response grounding, and separates UI components from API and service layers so the system can be extended without rewriting the whole stack.</p><p>Key engineering decisions included using React functional components and hooks for the client, centralized API handling, vector-based product retrieval, and a clean fallback path when live model calls fail. The result is less about building a flashy chatbot and more about building a reliable, bounded assistant for a concrete commerce workflow.</p>"
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"https://github.com/bobtianqiwei/ChatAgent_PartSelect?tab=readme-ov-file\" target=\"_blank\" class=\"link-in-paragraph\">GitHub repository</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/partselect-chat-agent/index.html",
      metaTitle: "PartSelect Chat Agent",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/partselect-chat-agent/index.html",
      metaTitle: "PartSelect Chat Agent - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/partselect-chat-agent/index.html",
      metaTitle: "PartSelect Chat Agent - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
