module.exports = {
  src: {
    files: [
      "src/**/*",
      "!src/dist/**/*",
      "!src/build/**/*",
      "!src/index.html",
      "!src/main.css",
      "!src/main.js"
    ],
    tasks: ["preflight"],
    options: {
      livereload: true
    }
  },
  gruntfile: {
    files: ["Gruntfile.js"]
  },
  livereload: {
    options: {
      livereload: true
    },
    files: [
      "src/**/*",
      "!src/dist/**/*",
      "!src/build/**/*",
      "!src/index.html",
      "!src/main.css",
      "!src/main.js"
    ]
  }
};
