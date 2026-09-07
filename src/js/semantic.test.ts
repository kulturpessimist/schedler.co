import { describe, expect, test } from "bun:test"
import { canonicalPageRoutes } from "./routes.js"
import { presentationHtml, semanticHtmlForPath } from "./semantic.js"

describe("semantic accessibility content", () => {
  test("covers every CV route and imprint frame", () => {
    const paths = [
      ...canonicalPageRoutes.map((route) => route.path),
      "/impressum/0",
      "/impressum/1",
      "/impressum/2",
      "/impressum/3",
    ]

    for (const path of paths) {
      const html = semanticHtmlForPath(path, true)
      expect(html).toContain("<section")
      expect(html).toMatch(/<h2[ >]/)
    }
  })

  test("removes anchors from the aria-hidden presentation", () => {
    const html = presentationHtml('<a href="/jobs" data-navigo>Jobs</a>')
    expect(html).not.toContain("<a")
    expect(html).toContain('data-ascii-href="/jobs"')
    expect(html).not.toContain("data-navigo")
  })
})
