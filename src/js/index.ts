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
import { SITE_URL, canonicalPageRoutes, canonicalPathForPage } from "./routes.js"

interface RouteMatch {
  data: Record<string, string>
}

interface RouterLocation {
  url: string
}

interface AppRouter {
  navigate: (path: string) => void
  on: (path: string, handler: (match: RouteMatch) => void) => void
  notFound: (handler: () => void) => void
  resolve: () => void
  updatePageLinks: () => void
  getCurrentLocation: () => RouterLocation
}

interface TextSlot {
  index: number
  character: string
}

interface AppState {
  pages: string[]
  contactFrames: string[]
  impressumFrames: string[]
  _router: AppRouter | null
  _slideshows: ReturnType<typeof setTimeout>[]
  _glitchMemoize: string
  transitionMode: "glitch" | "flip"
  currentPage: number
  current: string
  loader: string
  readonly prevPage: number
  readonly nextPage: number
  readonly currentGetter: string | undefined
  init: () => void
  toggleDarkMode: () => void
  annotateAllTheThings: () => void
  combine: (from: string, to: string, take: number) => string
  difference: (from: string, to: string, duration?: number) => string
  columns: (from: string, to: string, takeRows: number, takeColumns?: number) => string
  glitch: (text: string, count?: number, memoize?: boolean) => string
  getVisibleTextSlots: (text: string) => TextSlot[]
  getTransitionCharset: (from: string, to: string) => string[]
  getRandomTransitionCharacter: (possible: string[], exclude?: string[]) => string
  buildFlipFrame: (from: string, to: string, step?: number, totalSteps?: number) => string
  playSlideshow: (animation?: string[], currentFrame?: number) => void
  stopSlideshow: () => void
  initKeyboardListener: () => void
  afterNavigation: () => void
  pathForPage: (page: number) => string
  showPage: (page: number) => void
  syncMetadata: () => void
  flipModeTransition: (from: string, to: string, nextPage: number) => void
  navigateFromTo: (from: string, to: string, nextPage: number) => void
  navigate: (direction?: "next" | "prev" | number) => void
  cycleColors: () => void
  options: () => void
}

const typedWindow = window as Window & {
  ag?: ReturnType<typeof annotationGroup>
  app?: AppState
}

const app: AppState = {
  pages: [],
  contactFrames: [],
  impressumFrames: [],
  _router: null,
  _slideshows: [],
  _glitchMemoize: "",
  transitionMode: "flip",
  currentPage: 0,
  current: "",
  loader: " ",

  /**
   * Current index for previous page navigation.
   */
  get prevPage(): number {
    return this.currentPage > 0 ? this.currentPage - 1 : this.pages.length - 1
  },

  /**
   * Current index for next page navigation.
   */
  get nextPage(): number {
    return this.currentPage < this.pages.length - 1 ? this.currentPage + 1 : 0
  },

  /**
   * Currently visible page content.
   */
  get currentGetter(): string | undefined {
    return app.pages[this.currentPage]
  },

  /**
   * Initialize app data sources, keyboard shortcuts and routes.
   */
  init(): void {
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

    const router = new Navigo("/") as unknown as AppRouter
    this._router = router

    router.notFound(() => {
      router.navigate("/")
    })

    for (const route of canonicalPageRoutes) {
      router.on(route.path, () => {
        this.showPage(route.page)
      })
    }

    router.on("/impressum", () => {
      const nextFrame = this.impressumFrames[0] || this.current
      this.navigateFromTo(this.current, nextFrame, this.currentPage)
    })

    router.on("/impressum/:frame", (match: RouteMatch) => {
      const frame = Number.parseInt(match.data.frame, 10)
      const nextFrame = this.impressumFrames[frame] || this.impressumFrames[0]
      this.navigateFromTo(this.current, nextFrame, this.currentPage)
    })

    router.on("/page/:page", (match: RouteMatch) => {
      const page = Number(match.data.page)
      router.navigate(this.pathForPage(page))
    })

    router.resolve()
  },

  /**
   * Toggle dark mode class and rebuild rough-notation highlights.
   */
  toggleDarkMode(): void {
    const html = document.querySelector("html")
    if (html) {
      html.classList.toggle("dark")
    }

    typedWindow.ag ? typedWindow.ag.hide() : void 0
    this.annotateAllTheThings()
  },

  /**
   * Highlight all `<mark>` nodes using rough-notation.
   */
  annotateAllTheThings(): void {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll("mark")
    const color =
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color") || "#000066"

    const annotations: ReturnType<typeof annotate>[] = []

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
   */
  combine(from: string, to: string, take: number): string {
    const fromLines = from.split("\n").slice(take)
    const toLines = to.split("\n").slice(0, take)

    return [...toLines, ...fromLines].join("\n")
  },

  /**
   * Build a randomized difference animation payload.
   */
  difference(from: string, to: string, duration = 800): string {
    const fromChars = from.split("")
    const toChars = to.split("")

    const indices: number[] = []
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
          (charIndex: number) => {
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
   */
  columns(from: string, to: string, takeRows: number, takeColumns = 50): string {
    const fromLines = from
      .split("\n")
      .map((line) => line.slice(0, line.length - takeColumns))
    const toLines = to
      .split("\n")
      .slice(0, takeRows + 1)
      .map((line) => line.slice(-1 * takeColumns))

    const mergedFrom: string[] = []
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
   */
  glitch(text: string, count = 25, memoize = false): string {
    if (memoize && this._glitchMemoize) {
      return this._glitchMemoize
    }

    const possible = "-*+/|}{[]?/.+-_)(*&^%$#@!)}~".split("")
    const positions: number[] = []
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
   */
  getVisibleTextSlots(text: string): TextSlot[] {
    const slots: TextSlot[] = []
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
   */
  getTransitionCharset(from: string, to: string): string[] {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#$%&* +-=/\\|[]{}()@~"
    const fallback = ALPHABET.split("")
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
   */
  getRandomTransitionCharacter(possible: string[], exclude: string[] = []): string {
    const filtered = possible.filter(
      (character) => !exclude.includes(character),
    )
    const charset = filtered.length > 0 ? filtered : possible

    return charset[Math.floor(Math.random() * charset.length)] || " "
  },

  /**
   * Build one frame of the flip-mode transition using target markup.
   */
  buildFlipFrame(from: string, to: string, step = 0, totalSteps = 6): string {
    const fromSlots = this.getVisibleTextSlots(from)
    const toSlots = this.getVisibleTextSlots(to)
    const charset = this.getTransitionCharset(from, to)
    const fromChars = from.split("")
    const progress = totalSteps > 1 ? step / (totalSteps - 1) : 1
    const isFinalStep = step >= totalSteps - 1

    if (step <= 0) {
      return from
    }

    if (isFinalStep) {
      return to
    }

    const frame = [...fromChars]

    for (let order = 0; order < Math.max(fromSlots.length, toSlots.length); order++) {
      const sourceSlot = fromSlots[order]
      const targetSlot = toSlots[order]
      const sourceIndex = sourceSlot?.index
      const sourceCharacter = sourceSlot?.character || " "
      const targetCharacter = targetSlot?.character || " "
      const outputIndex = sourceIndex ?? targetSlot?.index

      if (outputIndex === undefined) {
        continue
      }

      if (sourceCharacter === " " && targetCharacter === " ") {
        continue
      }

      const shouldAnimate =
        progress < 1 / 3
          ? sourceCharacter !== " "
          : progress < 2 / 3
            ? sourceCharacter !== " " || targetCharacter !== " "
            : targetCharacter !== " "

      if (!shouldAnimate) {
        continue
      }

      frame[outputIndex] = this.getRandomTransitionCharacter(charset, [
        sourceCharacter,
        targetCharacter,
      ])
    }

    return frame.join("")
  },

  /**
   * Play contact animation frames in a loop.
   */
  playSlideshow(animation?: string[], currentFrame = 0): void {
    const animationFrames = animation || this.contactFrames
    const speed = 60
    const pause = 200
    const lines = animationFrames[currentFrame].split("\n").length
    const nextFrame = (currentFrame + 1) % animationFrames.length

    for (let i = 0; i <= lines; i++) {
      this._slideshows[i] = setTimeout(
        (lineIndex: number) => {
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
   */
  stopSlideshow(): void {
    this._slideshows.forEach((slideshowTimeout) =>
      clearTimeout(slideshowTimeout),
    )
  },

  /**
   * Register keyboard shortcuts for page navigation.
   */
  initKeyboardListener(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      const router = this._router
      if (!router) {
        return
      }

      if (event.key === "ArrowRight") {
        router.navigate(this.pathForPage(this.nextPage))
      }
      if (event.key === "ArrowLeft") {
        router.navigate(this.pathForPage(this.prevPage))
      }
      if (event.key === "i") {
        router.navigate("/impressum")
      }
      if (event.key === "f") {
        router.navigate(this.pathForPage(2))
      }
      if (event.key === "@" || event.key === "c") {
        router.navigate(this.pathForPage(1))
      }
      if (event.key === "x") {
        this.cycleColors()
      }
    })
  },

  /**
   * Re-bind page links and refresh annotations after route updates.
   */
  afterNavigation(): void {
    if (!this._router) {
      return
    }

    this.syncMetadata()
    this._router.updatePageLinks()
    setTimeout(() => {
      this.annotateAllTheThings()
    }, 250)
  },

  /**
   * Convert a page index into the matching canonical pathname.
   */
  pathForPage(page: number): string {
    return canonicalPathForPage(page)
  },

  /**
   * Route to a page and keep contact slideshow behavior in one place.
   */
  showPage(page: number): void {
    if (page === 1) {
      setTimeout(() => {
        this.playSlideshow(this.contactFrames, 0)
      }, 500)
    } else {
      this.stopSlideshow()
    }

    this.navigate(page)
  },

  /**
   * Keep canonical and Open Graph URLs aligned with the active SPA route.
   */
  syncMetadata(): void {
    const pathname = window.location.pathname || "/"
    const absolutePath = new URL(pathname, SITE_URL).toString()
    const canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null
    const ogUrl = document.querySelector(
      'meta[property="og:url"]',
    ) as HTMLMetaElement | null

    canonical?.setAttribute("href", absolutePath)
    ogUrl?.setAttribute("content", absolutePath)
  },

  /**
   * Animate visible text characters through random passes into the target page.
   */
  flipModeTransition(from: string, to: string, nextPage: number): void {
    const speed = 100
    const totalSteps = 8
    let ivc = 0
    let ivt = ["", "", "", "", "", ""];

    this.current = from

    const interval = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 75)

    for (let step = 0; step < totalSteps; step++) {
      setTimeout(
        (currentStep: number) => {
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
   */
  navigateFromTo(from: string, to: string, nextPage: number): void {
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
    let ivt = ["", "", "", "", "", ""];

    const interval = setInterval(() => {
      this.loader = ivt[ivc++ % ivt.length]
    }, 75)

    const lines = this.current.split("\n").length
    for (let i = 0; i <= lines; i++) {
      setTimeout(
        (lineIndex: number) => {
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
   */
  navigate(direction: "next" | "prev" | number = "next"): void {
    let nextPage: number

    if (typeof direction === "number") {
      nextPage = direction
    } else {
      nextPage = direction === "next" ? this.nextPage : this.prevPage
    }

    this.navigateFromTo(this.current, app.pages[nextPage], nextPage)
  },

  /**
   * Toggle impressum route state.
   */
  options(): void {
    if (!this._router) {
      return
    }

    if (this._router.getCurrentLocation().url.indexOf("impressum") === 0) {
      this._router.navigate("/")
    } else {
      this._router.navigate("/impressum")
    }
  },

  /**
   * Cycle accent colors randomly from Tailwind palette.
   */
  cycleColors(): void {
    const tailWindColors = [
      "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
      "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink",
      "rose", "taupe", "mist", "sand", "stone", "neutral", "zinc", "gray",
      "olive", "slate",
    ]
    const randomColor = tailWindColors[Math.floor(Math.random() * tailWindColors.length)]
    const darkMode = !!document.querySelector("html.dark")
    const lightVars = [100, 400, 950]
    const darkVars = [950, 500, 200]
    const currentVars = darkMode ? darkVars : lightVars
    const root = document.querySelector(":root") as HTMLElement | null
    if (root?.style) {
      root.style.setProperty("--main-color", `var(--color-${randomColor}-${currentVars[0]})`)
      root.style.setProperty("--accent-color", `var(--color-${randomColor}-${currentVars[1]})`)
      root.style.setProperty("--text-color", `var(--color-${randomColor}-${currentVars[2]})`)

      setTimeout(() => {
        typedWindow.ag ? typedWindow.ag.hide() : void 0
        this.annotateAllTheThings()
      }, 300)
    }
  },
}

createApp(app).mount("body")
typedWindow.app = app
