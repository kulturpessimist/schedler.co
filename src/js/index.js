// @ts-check

import Navigo from "navigo"
import { createApp } from "petite-vue"
import { annotate, annotationGroup } from "rough-notation"
import "../css/style.css"
import "../fonts/Monolisa/monolisa.css"
import {
  contactFrames,
  contactFramesMobile,
  impressumFrames,
  impressumFramesMobile,
  pages,
  pagesMobile,
} from "./pages"

/**
 * @typedef {{ data: Record<string, string> }} RouteMatch
 */

/**
 * @typedef {{ url: string }} RouterLocation
 */

/**
 * @typedef {{
 *   navigate: (path: string) => void;
 *   on: (path: string, handler: (match: RouteMatch) => void) => void;
 *   notFound: (handler: () => void) => void;
 *   resolve: () => void;
 *   updatePageLinks: () => void;
 *   getCurrentLocation: () => RouterLocation;
 * }} AppRouter
 */

/**
 * @typedef {{
 *   pages: string[];
 *   contactFrames: string[];
 *   impressumFrames: string[];
 *   _router: AppRouter | null;
 *   _slideshows: ReturnType<typeof setTimeout>[];
 *   _glitchMemoize: string;
 *   transitionMode: "glitch" | "flip";
 *   currentPage: number;
 *   current: string;
 *   loader: string;
 *   readonly prevPage: number;
 *   readonly nextPage: number;
 *   readonly currentGetter: string | undefined;
 *   init: () => void;
 *   toggleDarkMode: () => void;
 *   annotateAllTheThings: () => void;
 *   combine: (from: string, to: string, take: number) => string;
 *   difference: (from: string, to: string, duration?: number) => string;
 *   columns: (from: string, to: string, takeRows: number, takeColumns?: number) => string;
 *   glitch: (text: string, count?: number, memoize?: boolean) => string;
 *   getVisibleTextSlots: (text: string) => { index: number; character: string }[];
 *   getTransitionCharset: (from: string, to: string) => string[];
 *   getRandomTransitionCharacter: (possible: string[], exclude?: string[]) => string;
 *   buildFlipFrame: (from: string, to: string, step?: number, totalSteps?: number) => string;
 *   playSlideshow: (animation?: string[], currentFrame?: number) => void;
 *   stopSlideshow: () => void;
 *   initKeyboardListener: () => void;
 *   afterNavigation: () => void;
 *   flipModeTransition: (from: string, to: string, nextPage: number) => void;
 *   navigateFromTo: (from: string, to: string, nextPage: number) => void;
 *   navigate: (direction?: "next" | "prev" | number) => void;
 *   options: () => void;
 * }} AppState
 */

/** @type {Window & { ag?: ReturnType<typeof annotationGroup>; app?: AppState }} */
const typedWindow = window

/** @type {AppState} */
const app = {
  pages: [],
  contactFrames: [],
  impressumFrames: [],
  _router: null,
  _slideshows: [],
  _glitchMemoize: "",
  transitionMode: "flip", // "glitch",
  currentPage: 0,
  current: "",
  loader: " ",

  /**
   * Current index for previous page navigation.
   *
   * @returns {number}
   */
  get prevPage() {
    return this.currentPage > 0 ? this.currentPage - 1 : this.pages.length - 1
  },

  /**
   * Current index for next page navigation.
   *
   * @returns {number}
   */
  get nextPage() {
    return this.currentPage < this.pages.length - 1 ? this.currentPage + 1 : 0
  },

  /**
   * Currently visible page content.
   *
   * @returns {string | undefined}
   */
  get currentGetter() {
    return app.pages[this.currentPage]
  },

  /**
   * Initialize app data sources, keyboard shortcuts and routes.
   *
   * @returns {void}
   */
  init() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.toggleDarkMode()
    }

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

    this.initKeyboardListener()
    this.current = app.pages[this.currentPage] || ""

    const router = /** @type {AppRouter} */ (new Navigo("/"))
    this._router = router

    router.notFound(() => {
      router.navigate("/page/0")
    })

    router.on("/impressum/:frame", (match) => {
      const frame = Number.parseInt(match.data.frame, 10)
      const nextFrame = this.impressumFrames[frame] || this.impressumFrames[0]
      this.navigateFromTo(this.current, nextFrame, this.currentPage)
    })

    router.on("/job/:company", (match) => {
      /** @type {string} */
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

      router.navigate(target)
    })

    router.on("/page/:page", (match) => {
      if (match.data.page === "1") {
        setTimeout(() => {
          this.playSlideshow(this.contactFrames, 0)
        }, 500)
      } else {
        this.stopSlideshow()
      }

      this.navigate(Number(match.data.page))
    })

    router.resolve()
  },

  /**
   * Toggle dark mode class and rebuild rough-notation highlights.
   *
   * @returns {void}
   */
  toggleDarkMode() {
    const html = document.querySelector("html")
    if (html) {
      html.classList.toggle("dark")
    }

    typedWindow.ag ? typedWindow.ag.hide() : void 0
    this.annotateAllTheThings()
  },

  /**
   * Highlight all `<mark>` nodes using rough-notation.
   *
   * @returns {void}
   */
  annotateAllTheThings() {
    /** @type {NodeListOf<HTMLElement>} */
    const elements = document.querySelectorAll("mark")
    const color =
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color") || "#000066"

    /** @type {ReturnType<typeof annotate>[]} */
    const annotations = []

    for (const mark of elements) {
      annotations.push(
        annotate(mark, {
          type: "highlight",
          color,
        }),
      )
    }

    const ag = annotationGroup(annotations)
    typedWindow.ag = ag
    ag.show()
  },

  /**
   * Replace top lines of one page with lines from another page.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} take
   * @returns {string}
   */
  combine(from, to, take) {
    const fromLines = from.split("\n").slice(take)
    const toLines = to.split("\n").slice(0, take)

    return [...toLines, ...fromLines].join("\n")
  },

  /**
   * Build a randomized difference animation payload.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} [duration=800]
   * @returns {string}
   */
  difference(from, to, duration = 800) {
    const fromChars = from.split("")
    const toChars = to.split("")

    /** @type {number[]} */
    const indices = []
    toChars.forEach((value, index) => {
      if (value.match(/\S/)) {
        indices.push(index)
      }
    })

    const speed = Math.floor(800 / indices.length)
    indices
      .sort(() => Math.random())
      .forEach((value, index) => {
        setTimeout(
          (charIndex) => {
            fromChars[charIndex] = toChars[charIndex] || " "
            this.current = fromChars.join("")
          },
          index * speed + duration,
          value,
        )
      })

    return [...toChars, ...fromChars].join("\n")
  },

  /**
   * Build a column-transition output by slicing trailing/leading columns.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} takeRows
   * @param {number} [takeColumns=50]
   * @returns {string}
   */
  columns(from, to, takeRows, takeColumns = 50) {
    const fromLines = from
      .split("\n")
      .map((line) => line.slice(0, line.length - takeColumns))
    const toLines = to
      .split("\n")
      .slice(0, takeRows + 1)
      .map((line) => line.slice(-1 * takeColumns))

    /** @type {string[]} */
    const mergedFrom = []
    for (let i = 0; i < fromLines.length; i++) {
      mergedFrom.push(
        fromLines[i] +
        (toLines[i] || Array(fromLines[i].length).fill(" ").join("")),
      )
    }

    return [...mergedFrom].join("\n")
  },

  /**
   * Corrupt random non-whitespace characters for transition effects.
   *
   * @param {string} text
   * @param {number} [count=25]
   * @param {boolean} [memoize=false]
   * @returns {string}
   */
  glitch(text, count = 25, memoize = false) {
    if (memoize && this._glitchMemoize) {
      return this._glitchMemoize
    }

    const possible = "-*+/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
    /** @type {number[]} */
    const positions = []
    const chars = text.split("")

    chars.forEach((value, index) => {
      if (value.match(/\S/)) {
        positions.push(index)
      }
    })

    for (let c = 0; c <= count; c++) {
      const item = positions[Math.floor(Math.random() * positions.length)]
      chars[item] = possible[Math.floor(Math.random() * possible.length)] || " "
    }

    if (memoize) {
      this._glitchMemoize = chars.join("")
    } else {
      this._glitchMemoize = ""
    }

    return chars.join("")
  },

  /**
   * Collect visible text slots while skipping HTML tags.
   *
   * @param {string} text
   * @returns {{ index: number; character: string }[]}
   */
  getVisibleTextSlots(text) {
    /** @type {{ index: number; character: string }[]} */
    const slots = []
    let insideTag = false

    for (let index = 0; index < text.length; index++) {
      const character = text[index]

      if (character === "<") {
        insideTag = true
        continue
      }

      if (character === ">") {
        insideTag = false
        continue
      }

      if (
        !insideTag &&
        character &&
        character !== "\n"
      ) {
        slots.push({
          index,
          character,
        })
      }
    }

    return slots
  },

  /**
   * Build the random-character pool for flip transitions from visible content.
   *
   * @param {string} from
   * @param {string} to
   * @returns {string[]}
   */
  getTransitionCharset(from, to) {
    const fallback =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#$%&*+-=/\\|[]{}()@~".split(
        "",
      )
    const seen = new Set(fallback)

    for (const sourceText of [from, to]) {
      for (const { character: source } of this.getVisibleTextSlots(sourceText)) {
        if (source?.match(/\S/)) {
          seen.add(source)
        }
      }
    }

    return [...seen]
  },

  /**
   * Pick a randomized transition character that differs from excluded values.
   *
   * @param {string[]} possible
   * @param {string[]} [exclude=[]]
   * @returns {string}
   */
  getRandomTransitionCharacter(possible, exclude = []) {
    const filtered = possible.filter(
      (character) => !exclude.includes(character),
    )
    const charset = filtered.length > 0 ? filtered : possible

    return charset[Math.floor(Math.random() * charset.length)] || " "
  },

  /**
   * Build one frame of the flip-mode transition using target markup.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} [step=0]
   * @param {number} [totalSteps=6]
   * @returns {string}
   */
  buildFlipFrame(from, to, step = 0, totalSteps = 6) {
    const fromSlots = this.getVisibleTextSlots(from)
    const toSlots = this.getVisibleTextSlots(to)
    const charset = this.getTransitionCharset(from, to)
    const fromChars = from.split("")
    const isFinalStep = step >= totalSteps - 1

    if (step <= 0) {
      return from
    }

    if (isFinalStep) {
      return to
    }

    const frame = [...fromChars]

    fromSlots.forEach(({ index: sourceIndex, character: sourceCharacter }, order) => {
      const targetCharacter = toSlots[order]?.character || " "

      if (sourceCharacter === " " && targetCharacter === " ") {
        return
      }

      frame[sourceIndex] = this.getRandomTransitionCharacter(charset, [
        sourceCharacter,
        targetCharacter,
      ])
    })

    return frame.join("")
  },

  /**
   * Play contact animation frames in a loop.
   *
   * @param {string[]} [animation=this.contactFrames]
   * @param {number} [currentFrame=0]
   * @returns {void}
   */
  playSlideshow(animation, currentFrame = 0) {
    const animationFrames = animation || this.contactFrames
    const speed = 60
    const pause = 200
    const lines = animationFrames[currentFrame].split("\n").length
    const nextFrame = (currentFrame + 1) % animationFrames.length

    for (let i = 0; i <= lines; i++) {
      this._slideshows[i] = setTimeout(
        (lineIndex) => {
          this.current = this.combine(
            animationFrames[currentFrame],
            animationFrames[nextFrame],
            lineIndex,
          )
        },
        i * speed,
        i,
      )

      if (i === lines) {
        this._slideshows[i + 1] = setTimeout(
          () => {
            this.playSlideshow(animationFrames, nextFrame)
          },
          i * speed + pause,
        )
      }
    }
  },

  /**
   * Stop all pending slideshow timeouts.
   *
   * @returns {void}
   */
  stopSlideshow() {
    this._slideshows.forEach((slideshowTimeout) =>
      clearTimeout(slideshowTimeout),
    )
  },

  /**
   * Register keyboard shortcuts for page navigation.
   *
   * @returns {void}
   */
  initKeyboardListener() {
    document.addEventListener("keydown", (event) => {
      const router = this._router
      if (!router) {
        return
      }

      if (event.key === "ArrowRight") {
        router.navigate("/page/" + this.nextPage)
      }
      if (event.key === "ArrowLeft") {
        router.navigate("/page/" + this.prevPage)
      }
      if (event.key === "i") {
        router.navigate("/impressum/0")
      }
      if (event.key === "f") {
        router.navigate("/page/2")
      }
      if (event.key === "@" || event.key === "c") {
        router.navigate("/page/1")
      }
    })
  },

  /**
   * Re-bind page links and refresh annotations after route updates.
   *
   * @returns {void}
   */
  afterNavigation() {
    if (!this._router) {
      return
    }

    this._router.updatePageLinks()
    setTimeout(() => {
      this.annotateAllTheThings()
    }, 250)
  },

  /**
   * Animate visible text characters through five random passes into the target page.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} nextPage
   * @returns {void}
   */
  flipModeTransition(from, to, nextPage) {
    const speed = 150
    const totalSteps = 6
    let ivc = 0
    const ivt = ["", "", "", "", "", ""]

    this.current = from

    const interval = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 75)

    for (let step = 0; step < totalSteps; step++) {
      setTimeout(
        (currentStep) => {
          this.current = this.buildFlipFrame(from, to, currentStep, totalSteps)
        },
        (step + 1) * speed,
        step,
      )

      if (step === totalSteps - 1) {
        setTimeout(() => {
          this.currentPage = nextPage
          this.loader = " "
          clearInterval(interval)
          this.afterNavigation()
        }, (step + 1) * speed)
      }
    }
  },

  /**
   * Animate transition from one page string to another.
   *
   * @param {string} from
   * @param {string} to
   * @param {number} nextPage
   * @returns {void}
   */
  navigateFromTo(from, to, nextPage) {
    if (from === to || nextPage === this.currentPage) {
      this.current = to
      this.currentPage = nextPage
      this.loader = " "
      this.afterNavigation()
      return
    }

    if (this.transitionMode === "flip") {
      this.flipModeTransition(from, to, nextPage)
      return
    }

    const speed = 20
    let ivc = 0
    const ivt = ["", "", "", "", "", ""]

    const interval = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 75)

    const lines = this.current.split("\n").length
    for (let i = 0; i <= lines; i++) {
      setTimeout(
        (lineIndex) => {
          this.current = this.combine(
            this.glitch(from, 50, Math.random() < 0.9),
            to,
            lineIndex,
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
          clearInterval(interval)
          this.afterNavigation()
        }, i * speed)
      }
    }
  },

  /**
   * Navigate by explicit index or symbolic direction.
   *
   * @param {"next" | "prev" | number} [direction="next"]
   * @returns {void}
   */
  navigate(direction = "next") {
    /** @type {number} */
    let nextPage

    if (typeof direction === "number") {
      nextPage = direction
    } else {
      nextPage = direction === "next" ? this.nextPage : this.prevPage
    }

    this.navigateFromTo(this.current, app.pages[nextPage], nextPage)
  },

  /**
   * Toggle impressum route state.
   *
   * @returns {void}
   */
  options() {
    if (!this._router) {
      return
    }

    if (this._router.getCurrentLocation().url.indexOf("impressum") === 0) {
      this._router.navigate("/")
    } else {
      this._router.navigate("/impressum/0")
    }
  },
}

createApp(app).mount("body")
typedWindow.app = app
