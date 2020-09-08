import storybook from "./storybook"
// frameworks and libs
import { annotate, annotationGroup } from "rough-notation"
import "alpinejs"
import "impress.js"
// styles and css
import "@fortawesome/fontawesome-free/css/brands.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "animate.css"
import "bulma/css/bulma.css"
import "../css/bulma.ribbon.css"
import "../fonts/fonts.css"
import "../css/style.css"
import "../css/jobs.css"
//
const app = {
  data() {
    return {
      showImprint: false,
      api: undefined,
      storybook,
      window: {
        width: 0,
        height: 0,
      },
      //
      init() {
        console.log("mounted")
        this.api = impress()
        document.body.addEventListener("impress:init", this.stepInit)
        document.body.addEventListener("impress:stepenter", this.stepEnter)
        document.body.addEventListener("impress:stepleave", this.stepLeave)
        document.body.addEventListener("impress:steprefresh", this.stepRefresh)
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight
        // let alpine run and after that init impress
        setTimeout(this.api.init, 1)
      },

      stepInit(event) {
        console.log("impress:stepinit", event)
      },
      stepLeave(event) {
        /* console.log("impress:stepleave", event) */
        const chapter = event.target.id
        if (chapter in storybook && "destroy" in storybook[chapter]) {
          storybook[chapter].destroy()
        }
      },
      stepEnter(event) {
        /* console.log("impress:stepenter", event) */
        const chapter = event.target.id
        if (chapter in storybook && "init" in storybook[chapter]) {
          storybook[chapter].init()
        }
      },
      stepRefresh(event) {
        /* console.log("impress:steprefresh", event) */
      },

      previous() {
        this.api.prev()
      },
      next() {
        this.api.next()
      },

      open() {
        this.showImprint = true
        const e = document.querySelector(" mark")
        const annotation = annotate(e, {
          type: "highlight",
          color: "#00990099",
        })
        annotation.show()
      },
      close() {
        this.showImprint = false
      },
      isOpen() {
        return this.showImprint === true
      },
    }
  },
}

window.app = app
