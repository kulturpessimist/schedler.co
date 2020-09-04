import { annotate, annotationGroup } from "rough-notation"

export default {
  home: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {
      /* setTimeout(() => {
        const marks = []
        document.querySelectorAll("#home mark").forEach((elem) => {
          marks.push(
            annotate(elem, {
              type: "highlight",
              color: "#ff000033",
              multiline: true,
            })
          )
        })

        annotationGroup(marks).show()
      }, 1000) */
    },
  },
  contact: {
    position: {
      x: 1000,
      y: 1000,
      z: 1000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {
      console.log("Welcome!")
      document
        .querySelector(".bubble-left")
        .classList.add("animate__fadeInLeft")
      document
        .querySelector(".bubble-right")
        .classList.add("animate__fadeInRight")
    },
    destroy() {
      document
        .querySelector(".bubble-left")
        .classList.remove("animate__fadeInLeft")
      document
        .querySelector(".bubble-right")
        .classList.remove("animate__fadeInRight")
    },
  },
  freelance: {
    position: {
      x: 2000,
      y: 2000,
      z: 2000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  overview: {
    position: {
      x: 3000,
      y: 3000,
      z: 3000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  // jobs
  man: {
    position: {
      x: 4000,
      y: 4000,
      z: 4000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  iob: {
    position: {
      x: 5000,
      y: 5000,
      z: 5000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  thinxnet: {
    position: {
      x: 6000,
      y: 6000,
      z: 6000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  natureoffice: {
    position: {
      x: 7000,
      y: 7000,
      z: 7000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  dynomedia: {
    position: {
      x: 8000,
      y: 8000,
      z: 8000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  kigg: {
    position: {
      x: 9000,
      y: 9000,
      z: 9000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  // soft
  education: {
    position: {
      x: 10000,
      y: 10000,
      z: 10000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  personal: {
    position: {
      x: 11000,
      y: 11000,
      z: 11000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  technology: {
    position: {
      x: 12000,
      y: 12000,
      z: 12000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1,
    init() {},
  },
  fin: {
    position: {
      x: 12000 / 2,
      y: 12000 / 2,
      z: 12000 / 2,
    },
    rotation: { x: 360, y: 0, z: 30 },
    scale: 5,
    init() {},
  },
}
