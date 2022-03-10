import { createApp } from "petite-vue"
// import { annotate, annotationGroup } from "rough-notation"
import version from "../version.json"
window.__version = version
// styles...
import "../fonts/VictorMono/fonts.css"
import "../css/style.css"
// contents
import pages from "./pages"
import Navigo from "navigo"

/*
  <em> = deemphasized
  <i> = emphasized
  <strong> = strong
  <mark> = highlight with rough notation maybe
*/

//
/* import rlite from "rlite-router"

const route = rlite(notFound, {
  // #users/chris -> r.params.name will equal 'chris'
  "page/:number": function ({ number }) {
    return pages[number]
  },
})

function notFound() {
  return "<h1>404 Not found :/</h1>"
}

// Hash-based routing
function processHash() {
  const hash = location.hash || "#"
  route(hash.slice(1))
}

window.addEventListener("hashchange", processHash)
processHash() */

const app = {
  _router: null,
  // data
  _glitchMemoize: "",
  currentPage: 0,
  current: "",
  loader: " ",
  // getters
  get prevPage() {
    return this.currentPage > 0 ? this.currentPage - 1 : pages.length - 1
  },
  get nextPage() {
    return this.currentPage < pages.length - 1 ? this.currentPage + 1 : 0
  },

  get currentGetter() {
    return pages[this.currentPage]
  },
  // methods
  init() {
    this.current = pages[this.currentPage]
    this._router = new Navigo("/")
    this._router.on("/page/:page", (match) => {
      this.navigate(Number(match.data.page))
    })
    this._router.resolve()
  },
  annotateAllTheThings() {
    const e = document.querySelectorAll("mark")
    const annotations = []
    for (let m of e) {
      console.log(m)
      annotations.push(annotate(m, { type: "highlight", color: "#000066" }))
    }
    const ag = annotationGroup(annotations)
    ag.show()
  },

  combine(from, to, take) {
    from = from.split("\n").slice(take)
    to = to.split("\n").slice(0, take)

    return [...to, ...from].join("\n")
  },

  glitch(text, count = 25, memoize = false) {
    if (memoize) {
      if (this._glitchMemoize) {
        return this._glitchMemoize
      }
    }

    // let possible = [...new Set(text.replace(/\s/g, "").split(""))]
    // let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")
    // let possible = "-+*/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
    // let possible = '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}'.split("")
    let possible = "-*+/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
    let p = []
    let t = text.split("")
    t.forEach((v, i, a) => {
      if (v.match(/\S/)) {
        p.push(i)
      }
    })

    for (let c = 0; c <= count; c++) {
      const item = p[Math.floor(Math.random() * p.length)]
      // const item = Math.floor(Math.random() * t.length)
      t[item] = possible[Math.floor(Math.random() * possible.length)]
    }
    if (memoize) {
      this._glitchMemoize = t.join("")
    } else {
      this._glitchMemoize = ""
    }

    return t.join("")
  },

  navigate(direction = "next") {
    const speed = 20
    let nextPage
    let iv
    let ivc = 0
    let ivt = ["▓", "▒", "░"] //"–/|\\".split("")

    iv = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 100)
    if (typeof direction === "number") {
      nextPage = direction
    } else {
      nextPage = direction === "next" ? this.nextPage : this.prevPage
    }
    const lines = pages[this.currentPage].split("\n").length
    console.log(this.currentPage, nextPage)
    for (let i = 0; i <= lines; i++) {
      setTimeout(
        (i) => {
          this.current = this.combine(
            this.glitch(pages[this.currentPage], 50, Math.random() < 0.9),
            pages[nextPage],
            i
          )
        },
        i * speed,
        i
      )

      if (i === lines) {
        this._glitchMemoize = ""
        setTimeout(() => {
          this.currentPage = nextPage
          this.loader = " "
          clearInterval(iv)
        }, i * speed)
      }
    }
  },
  options() {},
}

createApp(app).mount("body")

//
// document.querySelector("pre").innerHTML = pages[currentPage]
// setTimeout(annotateAllTheThings, 500)

//document.querySelector("#forward").addEventListener("click", (event) => {
/* anime({
    targets: "main",
    keyframes: [{ translateY: -1000 }, { translateX: -800 }],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
  }) */
/* navigate("next")

  event.stopImmediatePropagation()
  event.preventDefault()
  return false
}) */

//document.querySelector("#back").addEventListener("click", (event) => {
/* if (currentPage < pages.length - 1) {
    currentPage++
  } else {
    currentPage = 0
  }
  document.querySelector("pre").innerHTML = pages[currentPage]
 */
/*   navigate("back")

  event.stopImmediatePropagation()
  event.preventDefault()
  r eturn false
})*/

//  console.log("clicked")

/*   anime({
    targets: "main",
    keyframes: [{ translateY: 0, rotate: -16 }],
    duration: 4000,
    easing: "easeInOutElastic(1, .8)",
  }) */

/*

  /* let tx = document.querySelector("pre").innerText
  let t = tx.split("")
  let p = []
  t.forEach((v, i, a) => {
    if (v.match(/\S/)) {
      p.push(i)
    }
  })
  for (let c = 0; c < 25; c++) {
    const item = p[Math.floor(Math.random() * p.length)]
    t[item] = possible[Math.floor(Math.random() * possible.length)]
    window.requestAnimationFrame(() => {
      document.querySelector("pre").innerText = t.join("")
    })
  } 
  
  const regex = RegExp(/\S/, "g")
  const x = regex.test(t)
  console.log(x)
  t = t.replace(/\S/, "*")
  console.log(t)
  document.querySelector("pre").innerHTML = t
  */
