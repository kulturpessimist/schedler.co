import version from "../version.json"
// styles...
import "../fonts/VictorMono/fonts.css"
import "../css/style.css"
import "animate.css"
//
import pages from "./pages"

// import { createApp } from "petite-vue"
import anime from "animejs/lib/anime.es.js"
import { annotate, annotationGroup } from "rough-notation"
// createApp({}).mount("body")
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

window.anime = anime

//
let currentPage = 0
document.querySelector("pre").innerHTML = pages[currentPage]
//

setTimeout(annotateAllTheThings, 500)

/* setTimeout(() => {
  document.querySelector("pre").innerHTML = pages[1]
  setTimeout(annotateAllTheThings, 500)
}, 5000)
 */

document.querySelector("#back").addEventListener("click", (event) => {
  if (currentPage < pages.length - 1) {
    currentPage++
  } else {
    currentPage = 0
  }
  document.querySelector("pre").innerHTML = pages[currentPage]

  event.stopImmediatePropagation()
  event.preventDefault()
  return false
})

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

  const possible = "-+*/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
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
  }

  return t.join("")
}

document.querySelector("#forward").addEventListener("click", (event) => {
  /* anime({
    targets: "main",
    keyframes: [{ translateY: -1000 }, { translateX: -800 }],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
  }) */
  const speed = 20

  let nextPage
  if (currentPage < pages.length - 1) {
    nextPage = currentPage + 1
  } else {
    nextPage = 0
  }
  const lines = pages[currentPage].split("\n").length
  for (let i = 0; i <= lines; i++) {
    setTimeout(() => {
      document.querySelector("pre").innerHTML = combine(
        glitch(pages[currentPage], 50, true),
        pages[nextPage],
        i
      )
    }, i * speed)
    if (i === lines - 1) {
      console.log("done")
      window.glitchMemo = ""
      setTimeout(() => {
        if (currentPage < pages.length - 1) {
          currentPage++
        } else {
          currentPage = 0
        }
      }, i * speed)
    }
  }
  //setTimeout

  event.stopImmediatePropagation()
  event.preventDefault()
  return false
})

document.querySelector("#options").addEventListener("click", () => {
  console.log("clicked")
  let tx = document.querySelector("pre").innerText
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
  } /*
  const regex = RegExp(/\S/, "g")
  const x = regex.test(t)
  console.log(x)
  t = t.replace(/\S/, "*")
  console.log(t)
  document.querySelector("pre").innerHTML = t
  */
})
