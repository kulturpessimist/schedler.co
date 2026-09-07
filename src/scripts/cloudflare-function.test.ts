import { expect, test } from "bun:test"
import { onRequest } from "../../functions/[[path]].js"

test("serves a canonical deep link through the Pages pretty asset path", async () => {
  const assetPaths: string[] = []
  const response = await onRequest({
    request: new Request("https://www.schedler.pro/job/jd"),
    env: {
      ASSETS: {
        fetch: async (request: Request) => {
          const pathname = new URL(request.url).pathname
          assetPaths.push(pathname)

          return pathname === "/job/jd/"
            ? new Response("Johner Institut", {
                headers: { "Content-Type": "text/html; charset=utf-8" },
              })
            : Response.redirect("https://www.schedler.pro/job/jd/", 308)
        },
      },
    },
    next: async () => new Response("Not found", { status: 404 }),
  })

  expect(response.status).toBe(200)
  expect(await response.text()).toContain("Johner Institut")
  expect(assetPaths).toEqual(["/job/jd/"])
})
