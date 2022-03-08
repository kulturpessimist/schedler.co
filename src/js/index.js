import 

// import { createApp } from "petite-vue"
import anime from "animejs/lib/anime.es.js"
import { annotate, annotationGroup } from "rough-notation"
import pages from "./pages"
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
document.querySelector("pre").innerHTML = pages[0]
//

setTimeout(annotateAllTheThings, 500)

/* setTimeout(() => {
  document.querySelector("pre").innerHTML = pages[1]
  setTimeout(annotateAllTheThings, 500)
}, 5000)
 */

document.querySelector("#back").addEventListener("click", () => {})
document.querySelector("#forward").addEventListener("click", (event) => {
  anime({
    targets: "main",
    keyframes: [{ translateY: -1000 }, { translateX: -800 }],
    duration: 4000,
    easing: "easeOutElastic(1, .8)",
  })

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
  for (let c = 0; c < 10; c++) {
    const item = p[Math.floor(Math.random() * p.length)]
    t[item] = Math.random().toString(36).substr(2, 1)
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
