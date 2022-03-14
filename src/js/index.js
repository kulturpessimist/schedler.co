import { createApp } from "petite-vue"
// import { annotate, annotationGroup } from "rough-notation"
import version from "../version.json"
window.__version = version
// styles...
import "../fonts/VictorMono/fonts.css"
import "../css/style.css"
// contents
import { pages, contactFrames, impressumFrames } from "./pages"
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
  _slideshows: [],
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

    this._router.notFound(() => {
      this._router.navigate("/page/0")
    })

    this._router.on("/impressum/:frame", (match) => {
      this.current = this.navigateFromTo(
        this.current,
        impressumFrames[parseInt(match.data.frame, 10)]
      )
    })

    this._router.on("/job/:company", (match) => {
      console.log(match)
      let target
      switch (match.data.company) {
        case "man-es":
          target = "/page/4"
          break
        case "iob":
          target = "/page/5"
          break
        case "thinxnet":
          target = "/page/6"
          break
        case "natureoffice":
          target = "/page/7"
          break
        case "dynomedia":
          target = "/page/8"
          break
        case "kigg":
          target = "/page/9"
          break
        default:
          target = "/page/0"
      }
      this._router.navigate(target)
    })
    this._router.on("/page/:page", (match) => {
      if (match.data.page === "1") {
        setTimeout(() => {
          this.playSlideshow(contactFrames, 0)
        }, 500)
      } else {
        this.stopSlideshow()
      }
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

  /**
   *
   */
  combine(from, to, take) {
    from = from.split("\n").slice(take)
    to = to.split("\n").slice(0, take)

    return [...to, ...from].join("\n")
  },

  difference(from, to, duration = 800) {
    from = from.split("")
    to = to.split("")

    indices = []
    to.forEach((v, i, a) => {
      if (v.match(/\S/)) {
        indices.push(i)
      }
    })

    const speed = Math.floor(800 / indices.length)
    indices
      .sort(() => Math.random())
      .forEach((v, i, a) => {
        console.log(v, from[v], "=>", to[v])
        setTimeout(
          (v) => {
            from[v] = to[v]
            this.current = from.join("")
          },
          i * speed,
          v
        )
      })
    console.log(indices)
    return [...to, ...from].join("\n")
  },

  columns(from, to, takeRows, takeColumns = 50) {
    xfrom = this.combine(from, to, 0)
    // console.log(xfrom)
    from = from
      .split("\n")
      .map((line) => line.slice(0, line.length - takeColumns))
    to = to
      .split("\n")
      .slice(0, takeRows + 1)
      .map((line) => line.slice(-1 * takeColumns))
    console.log(from.length, to.length)
    let tfix = []
    let tfrom = []
    let tto = []
    for (let i = 0; i < from.length; i++) {
      // tfix.push(from[i].slice(from[i].length - takeColumns))

      tfrom.push(from[i] + (to[i] || Array(from[i].length).fill(" ").join("")))
    }

    return [...tfrom].join("\n")
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

  navigateFromTo(from, to, nextPage) {
    const speed = 20
    let iv
    let ivc = 0
    let ivt = ["▓", "▒", "░"] //"–/|\\".split("")

    iv = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 100)

    const lines = this.current.split("\n").length
    for (let i = 0; i <= lines; i++) {
      setTimeout(
        (i) => {
          this.current = this.combine(
            this.glitch(from, 50, Math.random() < 0.9),
            to,
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
          this._router.updatePageLinks()
        }, i * speed)
      }
    }
  },

  navigate(direction = "next") {
    let nextPage

    if (typeof direction === "number") {
      nextPage = direction
    } else {
      nextPage = direction === "next" ? this.nextPage : this.prevPage
    }

    this.navigateFromTo(this.current, pages[nextPage], nextPage)
  },
  options() {
    console.log("options", this._router.getCurrentLocation())
    // this.playSlideshow(contactFrames, 0)
    if (this._router.getCurrentLocation().url.indexOf("impressum") === 0) {
      this._router.navigate("/")
    } else {
      this._router.navigate("/impressum/0")
    }
  },

  playSlideshow(animation = contactFrames, currentFrame = 0) {
    //console.log("playSlideshow", currentFrame, "of", animation.length - 1)
    const speed = 60
    const pause = 200
    const lines = animation[currentFrame].split("\n").length
    const nextFrame = (currentFrame + 1) % animation.length

    for (let i = 0; i <= lines; i++) {
      this._slideshows[i] = setTimeout(
        (i) => {
          this.current = this.combine(
            animation[currentFrame], //this.glitch(pages[this.currentPage], 50, Math.random() < 0.9),
            animation[nextFrame],
            i
          )
        },
        i * speed,
        i
      )
      if (i === lines) {
        this._slideshows[i + 1] = setTimeout(() => {
          this.playSlideshow(animation, nextFrame)
        }, i * speed + pause)
      }
    }
  },
  stopSlideshow() {
    console.log(this._slideshows.length)
    this._slideshows.forEach((sl) => clearTimeout(sl))
    //clearTimeout(this._slideshows)
  },
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
