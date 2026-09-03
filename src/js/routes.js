// @ts-check

import {
  EDUCATION,
  EMPLOYMENT,
  LANGUAGES,
  PERSON,
  TECHNOLOGIES,
} from "./resume.js"

/**
 * @typedef {{
 *   page: number;
 *   path: string;
 *   title: string;
 *   description: string;
 *   schemaType: "ProfilePage" | "ContactPage" | "CollectionPage" | "WebPage";
 * }} CanonicalPageRoute
 */

/**
 * @typedef {{
 *   path: string;
 *   title: string;
 *   description: string;
 *   schemaType: "ProfilePage" | "ContactPage" | "CollectionPage" | "WebPage";
 * }} SiteRoute
 */

/** @type {string} */
export const SITE_URL = "https://www.schedler.pro"
/** @type {string} */
export const MARKDOWN_PATH = "/llms.txt"
/** @type {string} */
export const SITEMAP_PATH = "/sitemap.xml"
/** @type {string} */
export const CONTENT_SIGNAL_POLICY = "ai-train=no, search=yes, ai-input=yes"

/** @type {CanonicalPageRoute[]} */
export const canonicalPageRoutes = [
  {
    page: 0,
    path: "/",
    title: "Alexander Schedler | Technology Leader",
    description:
      "Technology leader with 20+ years of experience in scalable platforms, AI adoption, automation, and digital transformation.",
    schemaType: "ProfilePage",
  },
  {
    page: 1,
    path: "/contact",
    title: "Contact | Alexander Schedler",
    description:
      "Contact Alexander Schedler via email, phone, Bluesky, GitHub, or LinkedIn.",
    schemaType: "ContactPage",
  },
  {
    page: 2,
    path: "/freelance",
    title: "Advisory & Digital Expertise | Alexander Schedler",
    description:
      "Selected advisory and strategic technology engagements focused on applied AI, digital platforms, and business transformation.",
    schemaType: "WebPage",
  },
  {
    page: 3,
    path: "/jobs",
    title: "Curriculum Vitae | Alexander Schedler",
    description:
      "Professional experience and curriculum vitae of Alexander Schedler.",
    schemaType: "CollectionPage",
  },
  {
    page: 4,
    path: "/job/certania",
    title: "Director Technology at CERTANIA | Alexander Schedler",
    description:
      "Director Technology at CERTANIA Holding GmbH since January 2024.",
    schemaType: "WebPage",
  },
  {
    page: 5,
    path: "/job/jd",
    title: "Software Engineering Lead at Johner Institut | Alexander Schedler",
    description:
      "Senior Software Engineering Lead at Johner Institut GmbH from February to December 2023.",
    schemaType: "WebPage",
  },
  {
    page: 6,
    path: "/job/man-es",
    title:
      "Senior Software Engineer at MAN Energy Solutions | Alexander Schedler",
    description:
      "Senior Software Engineer at MAN Energy Solutions SE from June 2018 to January 2023.",
    schemaType: "WebPage",
  },
  {
    page: 7,
    path: "/job/iob",
    title: "Frontend, Design & CEO at Internet of Blah | Alexander Schedler",
    description:
      "Frontend, design, and CEO responsibilities at Internet of Blah / PURR from June 2016 to December 2019.",
    schemaType: "WebPage",
  },
  {
    page: 8,
    path: "/job/thinxnet",
    title: "UI/UX Product Engineer at ThinxNet | Alexander Schedler",
    description:
      "UI/UX Product Engineer at ThinxNet GmbH from June 2014 to June 2016.",
    schemaType: "WebPage",
  },
  {
    page: 9,
    path: "/job/natureoffice",
    title: "Head of Software Development at natureOffice | Alexander Schedler",
    description:
      "Head of Software Development and co-founder of natureOffice GmbH from August 2008 to April 2014.",
    schemaType: "WebPage",
  },
  {
    page: 10,
    path: "/job/dynomedia",
    title: "Web Developer at Dynomedia | Alexander Schedler",
    description: "Web Developer at Dynomedia GmbH from June 2005 to July 2008.",
    schemaType: "WebPage",
  },
  {
    page: 11,
    path: "/job/kigg",
    title: "Multimedia Producer at KIGG | Alexander Schedler",
    description:
      "Multimedia Producer and Project Manager at KIGG GmbH from August 2002 to November 2004.",
    schemaType: "WebPage",
  },
  {
    page: 12,
    path: "/education",
    title: "Education | Alexander Schedler",
    description:
      "Bachelor of Arts Multimedia from Middlesex University London and SAE Institute Munich.",
    schemaType: "WebPage",
  },
  {
    page: 13,
    path: "/skills",
    title: "Leadership & Core Strengths | Alexander Schedler",
    description:
      "Leadership, execution, stakeholder communication, languages, and technology interests.",
    schemaType: "WebPage",
  },
]

/** @type {SiteRoute} */
const impressumRoute = {
  path: "/impressum",
  title: "Imprint | Schedler.pro",
  description:
    "Imprint, privacy, copyright, and disclaimer information for Schedler.pro.",
  schemaType: "WebPage",
}

/** @type {(CanonicalPageRoute | SiteRoute)[]} */
export const siteRoutes = [...canonicalPageRoutes, impressumRoute]

/** @type {string[]} */
export const sitemapPaths = siteRoutes.map((route) => route.path)

/**
 * @param {number} page
 * @returns {string}
 */
export const canonicalPathForPage = (page) => {
  return canonicalPageRoutes.find((route) => route.page === page)?.path || "/"
}

/**
 * @param {string} pathname
 * @returns {string}
 */
export const absoluteUrl = (pathname) => {
  return new URL(pathname, SITE_URL).toString()
}

/**
 * Resolve browser paths, including impressum slideshow frames, to a canonical route.
 *
 * @param {string} pathname
 * @returns {SiteRoute}
 */
export const siteRouteForPath = (pathname) => {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")

  if (normalized.startsWith("/impressum/")) {
    return impressumRoute
  }

  return siteRoutes.find((route) => route.path === normalized) || siteRoutes[0]
}

/**
 * Build the route-specific Schema.org graph embedded in HTML responses.
 *
 * @param {string} pathname
 * @returns {{ "@context": string, "@graph": Record<string, unknown>[] }}
 */
export const structuredDataForPath = (pathname) => {
  const route = siteRouteForPath(pathname)
  const pageUrl = absoluteUrl(route.path)
  const websiteId = `${absoluteUrl("/")}#website`
  const personId = `${absoluteUrl("/")}#person`

  /** @type {Record<string, unknown>[]} */
  const graph = []

  /** @type {Record<string, unknown>} */
  const page = {
    "@type": route.schemaType,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
  }

  if (route.path === "/") {
    page.mainEntity = { "@id": personId }
  } else if (route.path !== "/impressum") {
    page.about = { "@id": personId }
  }

  graph.push(page)

  if (route.path === "/") {
    graph.unshift({
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: "Schedler.pro",
      alternateName: "Alexander Schedler",
      inLanguage: "en",
      publisher: { "@id": personId },
    })
  }

  if (route.path === "/impressum") {
    return { "@context": "https://schema.org", "@graph": graph }
  }

  /** @type {Record<string, unknown>} */
  const person = {
    "@type": "Person",
    "@id": personId,
    url: absoluteUrl("/"),
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    homeLocation: PERSON.homeLocation,
    address: PERSON.address,
    email: PERSON.email,
    telephone: PERSON.telephone,
    sameAs: PERSON.sameAs,
    alumniOf: EDUCATION.schools.map((school) => ({
      "@type": "CollegeOrUniversity",
      name: school,
    })),
    knowsAbout: TECHNOLOGIES.map((tech) => tech.name),
    knowsLanguage: LANGUAGES.map((lang) => lang.name),
  }

  const currentEmployer = EMPLOYMENT.find((job) => job.endDate === undefined)

  if (currentEmployer) {
    person.worksFor = {
      "@id": `${absoluteUrl(currentEmployer.path)}#organization`,
    }
  }

  const inScopeJobs =
    route.path === "/" || route.path === "/jobs"
      ? EMPLOYMENT
      : EMPLOYMENT.filter((job) => job.path === route.path)

  if (inScopeJobs.length > 0) {
    person.hasOccupation = inScopeJobs.map(
      (job) => `${absoluteUrl(job.path)}#role`,
    )
  }

  graph.push(person)

  /** @type {Set<string>} */
  const orgIds = new Set()

  if (currentEmployer) {
    const orgId = `${absoluteUrl(currentEmployer.path)}#organization`
    orgIds.add(orgId)
    graph.push({
      "@type": "Organization",
      "@id": orgId,
      name: currentEmployer.organization,
      url: absoluteUrl(currentEmployer.path),
    })
  }

  for (const job of inScopeJobs) {
    const orgId = `${absoluteUrl(job.path)}#organization`

    if (!orgIds.has(orgId)) {
      orgIds.add(orgId)
      graph.push({
        "@type": "Organization",
        "@id": orgId,
        name: job.organization,
        url: absoluteUrl(job.path),
      })
    }

    /** @type {Record<string, unknown>} */
    const role = {
      "@type": "Role",
      "@id": `${absoluteUrl(job.path)}#role`,
      roleName: job.role,
      startDate: job.startDate,
      description: job.description,
    }

    if (job.endDate) {
      role.endDate = job.endDate
    }

    graph.push(role)
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

/**
 * @param {string | null | undefined} acceptHeader
 * @returns {boolean}
 */
export const wantsMarkdown = (acceptHeader) => {
  return (acceptHeader || "").toLowerCase().includes("text/markdown")
}

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export const isHtmlRoute = (pathname) => {
  if (pathname === "/" || pathname.endsWith(".html")) {
    return true
  }

  return !/\/[^/]+\.[^/]+$/.test(pathname)
}

/**
 * @param {string} markdown
 * @returns {number}
 */
export const estimateMarkdownTokens = (markdown) => {
  return Math.max(1, Math.ceil(markdown.length / 4))
}

/**
 * @param {string | null | undefined} existing
 * @param {string} value
 * @returns {string}
 */
export const mergeVary = (existing, value) => {
  const parts = new Set(
    (existing || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  )

  parts.add(value)

  return [...parts].join(", ")
}

/**
 * @param {string} [pathname]
 * @returns {string}
 */
export const buildLinkHeader = (pathname = "/") => {
  const links = [
    `<${pathname}>; rel="alternate"; type="text/markdown"`,
    `<${MARKDOWN_PATH}>; rel="service-doc"; type="text/markdown"`,
  ]

  return links.join(", ")
}
