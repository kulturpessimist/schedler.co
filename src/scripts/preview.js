const path = require("path");

const distDir = path.join(process.cwd(), "dist");
const port = Number(process.env.PORT || 4173);

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname === "/") {
      pathname = "/index.html";
    }

    const filePath = path.join(distDir, pathname.slice(1));
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    if (!path.extname(pathname)) {
      return new Response(Bun.file(path.join(distDir, "index.html")), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Preview available at http://localhost:${server.port}`);
