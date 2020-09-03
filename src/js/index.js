import storybook from "./storybook"
// frameworks and libs
import { annotate } from "rough-notation"
import "alpinejs"
import "impress.js"
// styles and css
import "@fortawesome/fontawesome-free/css/brands.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "bulma/css/bulma.css"
import "../css/bulma.ribbon.css"
import "../fonts/fonts.css"
import "animate.css"
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
        setTimeout(this.api.init, 10)
      },

      stepInit(event) {
        console.log("impress:stepinit", event)
      },
      stepLeave(event) {
        console.log("impress:stepleave", event)
      },
      stepEnter(event) {
        console.log("impress:stepenter", event)
      },
      stepRefresh(event) {
        console.log("impress:steprefresh", event)
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
