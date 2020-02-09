module.exports = {
  css: {
    options: {
      separator: ""
    },
    src: [
      "src/css/webslides.css",
      "src/css/colors.css",
      "src/css/fonts.css",
      "src/css/hamburger.css",
      "src/css/schedler.co.css"
    ],
    dest: "src/main.css"
  },
  js: {
    options: {
      separator: ";"
    },
    src: ["src/js/webslides.js", "src/js/main.js"],
    dest: "src/main.js"
  },
  html: {
    options: {
      separator: "\n"
    },
    src: [
      "src/partials/_header.html",
      //'src/partials/0-loading.html',
      "src/partials/1-home.html",
      "src/partials/2-contact.html",
      "src/partials/2a-freelance.html",
      "src/partials/3-overview.html",

      "src/partials/jobs/6-MAN.html",
      "src/partials/jobs/5-IOB.html",
      "src/partials/jobs/4-Thinxnet.html",
      "src/partials/jobs/3-natureOffice.html",
      "src/partials/jobs/2-Dynomedia.html",
      "src/partials/jobs/1-KIGG.html",

      "src/partials/4-Education.html",
      "src/partials/5-Personal.html",
      "src/partials/6-Technology.html",

      "src/partials/_footer.html"
    ],
    dest: "src/index.html"
  }
};
