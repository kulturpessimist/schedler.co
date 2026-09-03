// @ts-check

/**
 * Structured, machine-readable facts for Alexander Schedler's CV.
 *
 * The on-screen ASCII-art CV in `src/txt/` remains the visual source; this
 * module is the single source of truth for the semantic facts that the
 * JSON-LD graph (`routes.js`) and the llms.txt generator (`build-llms.js`)
 * derive from it.
 */

/** @typedef {{ name: string; givenName: string; familyName: string; jobTitle: string; description: string; homeLocation: { "@type": string; name: string }; address: { "@type": string; streetAddress: string; postalCode: string; addressLocality: string; addressCountry: string }; email: string; telephone: string; sameAs: string[] }} Person */

/** @type {Person} */
export const PERSON = {
  name: "Alexander Schedler",
  givenName: "Alexander",
  familyName: "Schedler",
  jobTitle: "Director Technology",
  description:
    "Technology leader with 20+ years of experience in scalable platforms, AI adoption, automation, and digital transformation. Combines hands-on software architecture expertise with executive-level technology strategy and stakeholder management.",
  homeLocation: { "@type": "Place", name: "District of Augsburg, Germany" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dillinger Straße 64a",
    postalCode: "86637",
    addressLocality: "Wertingen",
    addressCountry: "DE",
  },
  email: "alex@schedler.co",
  telephone: "+49 171 4123 929",
  sameAs: [
    "https://bsky.app/profile/alex.schedler.co",
    "https://github.com/kulturpessimist",
    "https://www.linkedin.com/in/alexanderschedler",
  ],
}

/** @typedef {{ path: string; organization: string; role: string; startDate: string; endDate?: string; description: string; activities: string[] }} Employment */

/**
 * Employment history, newest first. Entries without an `endDate` are the
 * current position. Dates use ISO-8601 year-month granularity.
 *
 * @type {Employment[]}
 */
export const EMPLOYMENT = [
  {
    path: "/job/certania",
    organization: "CERTANIA Holding GmbH",
    role: "Director Technology",
    startDate: "2024-01",
    description:
      "Strategic development and operational governance of CERTANIA's technology landscape. This includes defining infrastructure and security priorities, ensuring resilience and compliance, and enabling partner organizations to adopt and use AI solutions effectively and securely.",
    activities: [
      "Introduction of new technologies and ensuring scalable, secure implementation",
      "Strategic development of the technology landscape",
      "Prioritization of resilience, compliance, and secure use of AI solutions",
    ],
  },
  {
    path: "/job/jd",
    organization: "Johner Institut GmbH",
    role: "Senior Software Engineering Lead",
    startDate: "2023-02",
    endDate: "2023-12",
    description:
      "Worked in an agile team to get the first 'Realtime Compliance System' up and running to disrupt the working routines of medical device manufacturers, helping them overcome regulatory challenges and bring safe products to market faster.",
    activities: [
      "Technology consulting",
      "Software development and application engineering",
      "Conceptual design, architecture and development of B2B applications",
    ],
  },
  {
    path: "/job/man-es",
    organization: "MAN Energy Solutions SE",
    role: "Senior Software Engineer",
    startDate: "2018-06",
    endDate: "2023-01",
    description:
      "Worked in an agile SCRUM team on web-based projects in the enterprise sphere, creating an enterprise-wide supergraph as the foundation for multiple inter-department applications with internal and external users.",
    activities: [
      "Software development and application engineering",
      "UI/UX design and consulting",
      "Conceptual design and development of enterprise applications",
      "Agile Mentor / SCRUM Master",
    ],
  },
  {
    path: "/job/iob",
    organization: "Internet of Blah / PURR",
    role: "Frontend / Design / CEO",
    startDate: "2016-06",
    endDate: "2019-12",
    description:
      "Conception, engineering and product development of the company's product — an independent IoT Configuration Platform. Freelance projects for external clients and IT consulting, plus corporate and business development of the startup as co-founder.",
    activities: [
      "User experience and interaction design",
      "Cross-platform software development and application engineering",
      "Web application and architectural consulting",
    ],
  },
  {
    path: "/job/thinxnet",
    organization: "ThinxNet GmbH",
    role: "UI/UX Product Engineer",
    startDate: "2014-06",
    endDate: "2016-06",
    description:
      "Designed the UI and UX for iOS, Android and HTML5, supervising native developer teams to ensure quality and a consistent look and feel across all platforms, and fulfilling the role of product owner in the SCRUM workflow.",
    activities: [
      "UI/UX design and interaction design",
      "Mobile application prototyping (iOS, Android)",
      "Software development and application engineering",
    ],
  },
  {
    path: "/job/natureoffice",
    organization: "natureOffice GmbH",
    role: "Head of Software Development, Co-founder",
    startDate: "2008-08",
    endDate: "2014-04",
    description:
      "Corporate development of the startup as co-founder, focused on the technical domain. Conception, engineering and development of the company's products from a few users to hundreds of concurrent users.",
    activities: [
      "Software development and application engineering",
      "Business strategy development",
    ],
  },
  {
    path: "/job/dynomedia",
    organization: "Dynomedia GmbH",
    role: "Web Developer",
    startDate: "2005-06",
    endDate: "2008-07",
    description:
      "Worked in an advertising agency for customers in different industries (e.g. Fujitsu Siemens Computers, Sony Computer Entertainment Europe), developing an online file management system as a second mainstay for the agency.",
    activities: ["Web design and development"],
  },
  {
    path: "/job/kigg",
    organization: "KIGG GmbH",
    role: "Multimedia Producer, Project Manager",
    startDate: "2002-08",
    endDate: "2004-11",
    description:
      "Started as a multimedia producer with the campaign documentation of the 2002 mayoral election in Augsburg. Worked on web development projects, a candidates' state campaign for the 2003 elections, and municipal content management system projects.",
    activities: [
      "Project management",
      "Web design",
      "Multimedia production (CD-ROM)",
    ],
  },
]

/** @typedef {{ schools: string[]; degree: string; startDate: string; endDate: string; subjects: string[] }} Education */

/** @type {Education} */
export const EDUCATION = {
  schools: ["SAE Institute Munich", "Middlesex University London"],
  degree: "Bachelor of Arts Multimedia",
  startDate: "2001-08",
  endDate: "2004-05",
  subjects: [
    "Contemporary issues and research",
    "Business management, marketing and legal issues",
    "Psychology, team management and storyboarding",
    "Multimedia and education",
    "Multimedia and Online Production",
    "Graphic design",
  ],
}

/** @typedef {{ name: string; level: string; years: string }} Technology */

/** @type {Technology[]} */
export const TECHNOLOGIES = [
  { name: "JavaScript", level: "Expert", years: "18+ years" },
  { name: "Agile & SCRUM", level: "Experienced", years: "8+ years" },
  { name: "HTML", level: "Expert", years: "18+ years" },
  { name: "Vue", level: "Expert", years: "6+ years" },
  { name: "node", level: "Expert", years: "10+ years" },
  { name: "Typescript", level: "Experienced", years: "4+ years" },
  { name: "Web Components", level: "Experienced", years: "7+ years" },
  { name: "Graphic Design", level: "Experienced", years: "15+ years" },
  { name: "CSS", level: "Expert", years: "15+ years" },
  { name: "CouchDB", level: "Expert", years: "12+ years" },
  { name: "GraphQL", level: "Experienced", years: "4+ years" },
]

/** @typedef {{ name: string; proficiency: string }} Language */

/** @type {Language[]} */
export const LANGUAGES = [
  { name: "German", proficiency: "Mother tongue" },
  { name: "English", proficiency: "Fluent" },
]

/** @typedef {{ title: string; description: string }} CoreStrength */

/** @type {CoreStrength[]} */
export const CORE_STRENGTHS = [
  {
    title: "Leadership & Execution",
    description:
      "Experienced in leading technology initiatives from strategy to execution, coordinating stakeholders, prioritizing complex requirements, and delivering scalable digital solutions in international business environments.",
  },
  {
    title: "Stakeholder Communication",
    description:
      "Strong communicator between business, technology, and leadership teams. Able to translate complex technical topics into clear business language and align diverse stakeholders around practical outcomes.",
  },
]

/** @type {string} */
export const TECHNOLOGY_INTERESTS =
  "Focused on applied AI, digital platforms, and digital business models that unlock new opportunities and measurable value. Strong interest in technology-driven sustainability and the role of digital innovation in building more resilient organizations."

/** @type {string} */
export const OVERVIEW =
  "This site serves as a professional portfolio and curriculum vitae for Alexander Schedler, showcasing expertise in internet application engineering, development, and management."
