// import { createApp } from "petite-vue"
import { annotate } from "rough-notation"

// createApp({}).mount("body")
const e = document.querySelector("i")
const annotation = annotate(e, { type: "highlight", color: "#000066" })
annotation.show()
