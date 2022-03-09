import version from "../version.json"
window.__version = version
// styles...
import "../fonts/VictorMono/fonts.css"
import "../css/style.css"
import "../fonts/VictorMono/fonts.css"
// contents
import pages from "./pages"
//
import rlite from "rlite-router"

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
processHash()

// import { createApp } from "petite-vue"
// createApp({}).mount("body")

// import { annotate, annotationGroup } from "rough-notation"
const annotateAllTheThings = () => {
  const e = document.querySelectorAll("mark")
  const annotations = []
  for (let m of e) {
    console.log(m)
    annotations.push(annotate(m, { type: "highlight", color: "#000066" }))
  }
  const ag = annotationGroup(annotations)
  ag.show()
}

//
let currentPage = 0
document.querySelector("pre").innerHTML = pages[currentPage]
// setTimeout(annotateAllTheThings, 500)

const combine = (from, to, take) => {
  from = from.split("\n").slice(take)
  to = to.split("\n").slice(0, take)

  return [...to, ...from].join("\n")
}

const glitch = (text, count = 25, memoize = false) => {
  if (memoize) {
    if (window.glitchMemo) {
      return window.glitchMemo
    }
  }

  let possible = [...new Set(text.replace(/\s/g, "").split(""))]
  possible = "-*+/|}{[]?/.+-_)(*&^%$#@!)}~".split("")

  // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")
  // "-+*/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
  // '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}'.split("")
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
    window.glitchMemo = t.join("")
  } else {
    window.glitchMemo = ""
  }

  return t.join("")
}

const navigate = (direction = "next") => {
  const speed = 20
  let iv
  let ivc = 0
  let ivt = ["▓", "▒", "░"] //"–/|\\".split("")

  let nextPage

  /* document.querySelector("#iLoader").style.display = "inline" */
  iv = setInterval(() => {
    document.querySelector("#iLoader").innerText = ivt[ivc++ % ivt.length]
  }, 100)

  if (direction === "next") {
    if (currentPage < pages.length - 1) {
      nextPage = currentPage + 1
    } else {
      nextPage = 0
    }
  } else {
    if (currentPage === 0) {
      nextPage = pages.length - 1
    } else {
      nextPage = currentPage - 1
    }
  }

  const lines = pages[currentPage].split("\n").length
  for (let i = 0; i <= lines; i++) {
    setTimeout(() => {
      document.querySelector("pre").innerHTML = combine(
        glitch(pages[currentPage], 50, Math.random() < 0.9),
        pages[nextPage],
        i
      )
    }, i * speed)
    if (i === lines - 1) {
      window.glitchMemo = ""
      setTimeout(() => {
        //if (currentPage < pages.length - 1) {
        currentPage = nextPage
        //} else {
        // currentPage = 0
        //}
        // document.querySelector("#iLoader").style.display = "none"

        document.querySelector("#iLoader").innerText = " "
        clearInterval(iv)
      }, i * speed)
    }
  }
  //setTimeout
}

document.querySelector("#forward").addEventListener("click", (event) => {
  /* anime({
    targets: "main",
    keyframes: [{ translateY: -1000 }, { translateX: -800 }],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
  }) */
  navigate("next")

  event.stopImmediatePropagation()
  event.preventDefault()
  return false
})

document.querySelector("#back").addEventListener("click", (event) => {
  /* if (currentPage < pages.length - 1) {
    currentPage++
  } else {
    currentPage = 0
  }
  document.querySelector("pre").innerHTML = pages[currentPage]
 */
  navigate("back")

  event.stopImmediatePropagation()
  event.preventDefault()
  return false
})

document.querySelector("#options").addEventListener("click", () => {
  console.log("clicked")

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
})
