module.exports = {
  default: ["preflight", "connect", "watch"],
  preflight: [
    "copy:images",
    "concat:css",
    "concat:js",
    "concat:html",
    "cssmin",
    "uglify",
    "clean:post",
    "copy:default"
  ],
  compile: ["clean:surge", "preflight", "imagemin"],
  deploy: ["compile", "surge"]
};
