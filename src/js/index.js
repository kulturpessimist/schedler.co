import { createApp } from "petite-vue"
import { annotate, annotationGroup } from "rough-notation"
// contents
import {
  pages,
  contactFrames,
  impressumFrames,
  pagesMobile,
  contactFramesMobile,
  impressumFramesMobile,
} from "./pages"
import Navigo from "navigo"

/*
  <em> = deemphasized
  <i> = emphasized
  <strong> = strong
  <mark> = highlight with rough notation maybe
*/

const app = {
  pages: [],
  contactFrames: [],
  impressumFrames: [],
  _router: null,
  _slideshows: [],
  // data
  _glitchMemoize: "",
  currentPage: 0,
  current: "",
  loader: " ",
  // getters
  get prevPage() {
    return this.currentPage > 0 ? this.currentPage - 1 : this.pages.length - 1
  },
  get nextPage() {
    return this.currentPage < this.pages.length - 1 ? this.currentPage + 1 : 0
  },

  get currentGetter() {
    return app.pages[this.currentPage]
  },

  // methods
  init() {
    // darkmode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.toggleDarkMode()
    }
    // portrait mode
    if (window.innerWidth > window.innerHeight) {
      console.log("+++ landscape +++")
      this.pages = pages
      this.contactFrames = contactFrames
      this.impressumFrames = impressumFrames
    } else {
      console.log("+++ portrait +++")
      this.pages = pagesMobile
      this.contactFrames = contactFramesMobile
      this.impressumFrames = impressumFramesMobile
    }
    //

    this.initKeyboardListener()

    this.current = app.pages[this.currentPage]
    this._router = new Navigo("/")

    this._router.notFound(() => {
      this._router.navigate("/page/0")
    })

    this._router.on("/impressum/:frame", (match) => {
      this.current = this.navigateFromTo(
        this.current,
        this.impressumFrames[parseInt(match.data.frame, 10)],
      )
    })

    this._router.on("/job/:company", (match) => {
      let target
      switch (match.data.company) {
        case "certania":
          target = "/page/4"
          break
        case "jd":
          target = "/page/5"
          break
        case "man-es":
          target = "/page/6"
          break
        case "iob":
          target = "/page/7"
          break
        case "thinxnet":
          target = "/page/8"
          break
        case "natureoffice":
          target = "/page/9"
          break
        case "dynomedia":
          target = "/page/10"
          break
        case "kigg":
          target = "/page/11"
          break
        default:
          target = "/page/0"
      }
      this._router.navigate(target)
    })
    this._router.on("/page/:page", (match) => {
      if (match.data.page === "1") {
        setTimeout(() => {
          this.playSlideshow(this.contactFrames, 0)
        }, 500)
      } else {
        this.stopSlideshow()
      }
      this.navigate(Number(match.data.page))
      //
    })
    this._router.resolve()
  },

  toggleDarkMode() {
    document.querySelector("html").classList.toggle("dark")
    window.ag ? window.ag.hide() : void 0
    this.annotateAllTheThings()
  },

  annotateAllTheThings() {
    const e = document.querySelectorAll("mark")
    const color =
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color") || "#000066"
    const annotations = []
    for (let m of e) {
      annotations.push(
        annotate(m, {
          type: "highlight",
          color,
        }),
      )
    }
    const ag = annotationGroup(annotations)
    window.ag = ag
    ag.show()
  },

  /**
   * Effects
   */
  combine(from, to, take) {
    from = from.split("\n").slice(take)
    to = to.split("\n").slice(0, take)

    return [...to, ...from].join("\n")
  },

  difference(from, to, duration = 800) {
    from = from.split("")
    to = to.split("")

    const indices = []
    to.forEach((v, i) => {
      if (v.match(/\S/)) {
        indices.push(i)
      }
    })

    const speed = Math.floor(800 / indices.length)
    indices
      .sort(() => Math.random())
      .forEach((v, i) => {
        // console.log(v, from[v], "=>", to[v])
        setTimeout(
          (v) => {
            from[v] = to[v]
            this.current = from.join("")
          },
          i * speed + duration,
          v,
        )
      })
    return [...to, ...from].join("\n")
  },

  columns(from, to, takeRows, takeColumns = 50) {
    // const xfrom = this.combine(from, to, 0)
    // console.log(xfrom)
    from = from
      .split("\n")
      .map((line) => line.slice(0, line.length - takeColumns))
    to = to
      .split("\n")
      .slice(0, takeRows + 1)
      .map((line) => line.slice(-1 * takeColumns))
    //console.log(from.length, to.length)
    // let tfix = []
    let tfrom = []
    // let tto = []
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
    t.forEach((v, i) => {
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

  playSlideshow(animation = this.contactFrames, currentFrame = 0) {
    //console.log("playSlideshow", currentFrame, "of", animation.length - 1)
    const speed = 60
    const pause = 200
    const lines = animation[currentFrame].split("\n").length
    const nextFrame = (currentFrame + 1) % animation.length

    for (let i = 0; i <= lines; i++) {
      this._slideshows[i] = setTimeout(
        (i) => {
          this.current = this.combine(
            animation[currentFrame], //this.glitch(app.pages[this.currentPage], 50, Math.random() < 0.9),
            animation[nextFrame],
            i,
          )
        },
        i * speed,
        i,
      )
      if (i === lines) {
        this._slideshows[i + 1] = setTimeout(
          () => {
            this.playSlideshow(animation, nextFrame)
          },
          i * speed + pause,
        )
      }
    }
  },
  stopSlideshow() {
    //console.log(this._slideshows.length)
    this._slideshows.forEach((sl) => clearTimeout(sl))
    //clearTimeout(this._slideshows)
  },
  /**
   * Navigation
   */
  initKeyboardListener() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        this._router.navigate("/page/" + this.nextPage)
      }
      if (event.key === "ArrowLeft") {
        this._router.navigate("/page/" + this.prevPage)
      }
      if (event.key === "i") {
        this._router.navigate("/impressum/0")
      }
      if (event.key === "f") {
        this._router.navigate("/page/2")
      }
      if (event.key === "@" || event.key === "c") {
        this._router.navigate("/page/1")
      }
      /*
      if (event.key === "Dead") {
        
      } 
      */
    })
  },

  afterNavigation() {
    this._router.updatePageLinks()
    setTimeout(() => {
      this.annotateAllTheThings()
    }, 250)
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
            i,
          )
        },
        i * speed,
        i,
      )

      if (i === lines) {
        this._glitchMemoize = ""
        setTimeout(() => {
          this.currentPage = nextPage
          this.loader = " "
          clearInterval(iv)

          this.afterNavigation()
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

    this.navigateFromTo(this.current, app.pages[nextPage], nextPage)
  },
  options() {
    // this.playSlideshow(contactFrames, 0)
    if (this._router.getCurrentLocation().url.indexOf("impressum") === 0) {
      this._router.navigate("/")
    } else {
      this._router.navigate("/impressum/0")
    }
  },
}

createApp(app).mount("body")
window.app = app
