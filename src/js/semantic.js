// @ts-check

import { d_impressum } from "../txt/desktop"
import { m_impressum_m } from "../txt/mobile"
import {
  CORE_STRENGTHS,
  EDUCATION,
  EMPLOYMENT,
  LANGUAGES,
  PERSON,
  TECHNOLOGY_INTERESTS,
} from "./resume.js"

const PDF_URL = "https://drops.schedler.co/f/ZGquwW"

/** @param {boolean} portrait */
const versionInfo = (portrait) => {
  const source = portrait ? m_impressum_m : d_impressum
  return {
    version: /Version:\s+([^\s│]+)/.exec(source)?.[1] || "",
    update: /Last update:\s+([^\s│]+)/.exec(source)?.[1] || "",
    short: /Commit:\s+([^\s│]+)/.exec(source)?.[1] || "",
    count: /Commit count:\s+([^\s│]+)/.exec(source)?.[1] || "",
  }
}

const PRIVACY = {
  title: "Datenschutzerklärung",
  sections: [
    {
      title: "SSL-Verschlüsselung",
      text: "Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-Verschlüsselung. Wenn die SSL Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.",
    },
    {
      title: "Datenschutz",
      text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
    },
  ],
}

const COPYRIGHT = {
  title: "Urheberrecht",
  text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
}

const DISCLAIMER = {
  title: "Haftungsausschluss",
  text: "Haftung für Inhalte: Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
}

/** @param {string} value */
const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

/** @param {string} value */
const monthYear = (value) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`))

/** @param {(typeof EMPLOYMENT)[number]} job */
const jobPeriod = (job) =>
  job.endDate
    ? `<time datetime="${job.startDate}">${monthYear(job.startDate)}</time> – <time datetime="${job.endDate}">${monthYear(job.endDate)}</time>`
    : `<time datetime="${job.startDate}">${monthYear(job.startDate)}</time> onwards`

/** @param {(typeof EMPLOYMENT)[number]} job */
const employerHeading = (job) => {
  const name = escapeHtml(job.organization)
  return job.organizationUrl
    ? `<h2>${name}</h2><p><a href="${escapeHtml(job.organizationUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Website of ${name} (opens in a new tab)">Website of ${name}</a></p>`
    : `<h2>${name}</h2>`
}

/** @param {(typeof EMPLOYMENT)[number]} job */
const jobDetail = (job) => `<section>
  ${employerHeading(job)}
  <p><strong>Role:</strong> ${escapeHtml(job.role)}</p>
  <p><strong>Dates:</strong> ${jobPeriod(job)}</p>
  <section><h3>Main activities</h3><ul>${job.activities.map((activity) => `<li>${escapeHtml(activity)}</li>`).join("")}</ul></section>
  <section><h3>Responsibilities</h3><p>${escapeHtml(job.description)}</p></section>
</section>`

const contact = () => `<section>
  <h2>${escapeHtml(PERSON.name)}</h2>
  <p>${escapeHtml(PERSON.homeLocation.name)}</p>
  <p>Want to get in touch?</p>
  <address>
    <ul>
      <li>Email: <a href="mailto:${escapeHtml(PERSON.email)}">${escapeHtml(PERSON.email)}</a></li>
      <li>Telephone: <a href="tel:+491714123929">+49 171 4 123 929</a></li>
      <li>Bluesky: <a href="${PERSON.sameAs[0]}" target="_blank" rel="noopener noreferrer" aria-label="Alexander Schedler on Bluesky (opens in a new tab)">@alex.schedler.co</a></li>
      <li>GitHub: <a href="${PERSON.sameAs[1]}" target="_blank" rel="noopener noreferrer" aria-label="Alexander Schedler on GitHub (opens in a new tab)">kulturpessimist</a></li>
      <li>LinkedIn: <a href="${PERSON.sameAs[2]}" target="_blank" rel="noopener noreferrer" aria-label="Alexander Schedler on LinkedIn (opens in a new tab)">alexanderschedler</a></li>
    </ul>
  </address>
</section>`

const jobsOverview = () => `<section>
  <h2>Professional experience</h2>
  <ul>${EMPLOYMENT.map((job) => `<li><a href="${job.path}" data-navigo>${escapeHtml(job.organization)}</a></li>`).join("")}</ul>
</section>`

const education = () => `<section>
  <h2>${escapeHtml(EDUCATION.degree)}</h2>
  <p>${EDUCATION.schools.map(escapeHtml).join(" and ")}</p>
  <p><time datetime="${EDUCATION.startDate}">${monthYear(EDUCATION.startDate)}</time> – <time datetime="${EDUCATION.endDate}">${monthYear(EDUCATION.endDate)}</time></p>
  <h3>Subjects</h3>
  <ul>${EDUCATION.subjects.map((subject) => `<li>${escapeHtml(subject)}</li>`).join("")}</ul>
</section>`

const skills =
  () => `${CORE_STRENGTHS.map((strength) => `<section><h2>${escapeHtml(strength.title)}</h2><p>${escapeHtml(strength.description)}</p></section>`).join("")}
<section><h2>Languages</h2><ul>${LANGUAGES.map((language) => `<li>${escapeHtml(language.name)} (${escapeHtml(language.proficiency)})</li>`).join("")}</ul></section>
<section><h2>Technology Interests</h2><p>${escapeHtml(TECHNOLOGY_INTERESTS)}</p></section>`

const legalNavigation = () => `<nav aria-label="Imprint sections"><ul>
  <li><a href="/impressum/0" data-navigo>Imprint</a></li>
  <li><a href="/impressum/1" data-navigo>Privacy</a></li>
  <li><a href="/impressum/2" data-navigo>Copyright</a></li>
  <li><a href="/impressum/3" data-navigo>Disclaimer</a></li>
</ul></nav>`

/** @param {boolean} portrait */
const imprint = (portrait) => {
  const version = versionInfo(portrait)
  return `<section>
  <h2>Impressum / Imprint</h2>
  <p>Angaben gemäß § 5 TMG:</p>
  <address>${escapeHtml(PERSON.name)}<br>freie Softwareentwicklung<br>${escapeHtml(PERSON.address.streetAddress)}<br>${escapeHtml(PERSON.address.postalCode)} ${escapeHtml(PERSON.address.addressLocality)}<br>Telefon: <a href="tel:+491714123929">+49 171 4123 929</a><br>E-Mail: <a href="mailto:${escapeHtml(PERSON.email)}">${escapeHtml(PERSON.email)}</a></address>
</section>
<section><h2>Download CV</h2><p>If you like my CV you can download a copy as PDF by clicking the link below. Perfectly suited to print it out and show it to your friends and colleagues.</p><p><a href="${PDF_URL}" target="_blank" rel="noopener noreferrer" aria-label="Download CV as PDF (opens in a new tab)">Download CV as PDF</a></p></section>
<section><h2>Semantic information</h2><dl><dt>Version</dt><dd>${escapeHtml(version.version)}</dd><dt>Last update</dt><dd>${escapeHtml(version.update)}</dd><dt>Commit</dt><dd>${escapeHtml(version.short)}</dd>${portrait ? "" : `<dt>Commit count</dt><dd>${escapeHtml(version.count)}</dd>`}</dl></section>
${legalNavigation()}`
}

const privacy = () =>
  `<section id="privacy"><h2>${PRIVACY.title}</h2>${PRIVACY.sections.map((section) => `<section><h3>${section.title}</h3><p>${section.text}</p></section>`).join("")}</section>`
const copyright = () =>
  `<section id="copyright"><h2>${COPYRIGHT.title}</h2><p>${COPYRIGHT.text}</p></section>`
const disclaimer = () =>
  `<section id="disclaimer"><h2>${DISCLAIMER.title}</h2><p>${DISCLAIMER.text}</p></section>`

/**
 * Render the facts visible on a route as structured HTML for assistive software.
 *
 * @param {string} pathname
 * @param {boolean} [portrait]
 * @returns {string}
 */
export const semanticHtmlForPath = (pathname, portrait = false) => {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "")
  const job = EMPLOYMENT.find((entry) => entry.path === normalized)
  if (job) return jobDetail(job)

  if (normalized === "/contact") return contact()
  if (normalized === "/jobs") return jobsOverview()
  if (normalized === "/education") return education()
  if (normalized === "/skills") return skills()
  if (normalized === "/impressum" || normalized === "/impressum/0")
    return imprint(portrait)
  if (normalized === "/impressum/1") {
    return portrait
      ? `${privacy()}${legalNavigation()}`
      : `${privacy()}${copyright()}${disclaimer()}${legalNavigation()}`
  }
  if (normalized === "/impressum/2")
    return portrait ? `${copyright()}${legalNavigation()}` : imprint(false)
  if (normalized === "/impressum/3")
    return portrait ? `${disclaimer()}${legalNavigation()}` : imprint(false)

  return `<section><h2>${escapeHtml(PERSON.name)}</h2><p>${escapeHtml(PERSON.homeLocation.name)}</p><p>${escapeHtml(PERSON.description)}</p></section>`
}

/**
 * Keep visual links clickable while ensuring the aria-hidden ASCII tree has no
 * anchors or focusable descendants.
 *
 * @param {string} html
 * @returns {string}
 */
export const presentationHtml = (html) =>
  html.replace(
    /<a\b([^>]*)href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g,
    (_match, before, href, after, label) => {
      const className = /class="([^"]+)"/.exec(`${before}${after}`)?.[1]
      const classAttribute = className
        ? ` class="${escapeHtml(className)}"`
        : ""
      return `<span${classAttribute} data-ascii-href="${escapeHtml(href)}">${label}</span>`
    },
  )
