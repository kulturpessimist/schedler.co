import { annotate, annotationGroup } from "rough-notation"

export default {
  home: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 100,
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
      x: 200000,
      y: 0,
      z: 0,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 100,
    init() {
      console.log("Welcome!")
      document
        .querySelector(".bubble.left")
        .classList.add("animate__fadeInLeft")
      document
        .querySelector(".bubble.right")
        .classList.add("animate__fadeInRight")
    },
    destroy() {
      document
        .querySelector(".bubble.left")
        .classList.remove("animate__fadeInLeft")
      document
        .querySelector(".bubble.right")
        .classList.remove("animate__fadeInRight")
    },
  },
  freelance: {
    position: {
      x: 200000,
      y: 150000,
      z: 0,
    },
    rotation: { x: 0, y: 90, z: 30 },
    scale: 100,
    init() {},
  },
  overview: {
    position: {
      x: 400000,
      y: 0,
      z: 100000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 100,
    init() {},
  },
  // jobs
  man: {
    position: {
      x: 350000,
      y: -5000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  iob: {
    position: {
      x: 360000,
      y: -10000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  thinxnet: {
    position: {
      x: 370000,
      y: -15000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  natureoffice: {
    position: {
      x: 380000,
      y: -20000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  dynomedia: {
    position: {
      x: 390000,
      y: -25000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  kigg: {
    position: {
      x: 400000,
      y: -30000,
      z: 0,
    },
    rotation: { x: 19, y: 0, z: 33 },
    scale: 10,
    init() {},
  },
  // soft
  education: {
    position: {
      x: 500000,
      y: 100000,
      z: 200000,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 100,
    init() {},
  },
  personal: {
    position: {
      x: 600000,
      y: -30000,
      z: 100000,
    },
    rotation: { x: 0, y: 0, z: -50 },
    scale: 100,
    init() {},
  },
  technology: {
    position: {
      x: 550000,
      y: 50000,
      z: 100000,
    },
    rotation: { x: 0, y: 90, z: -50 },
    scale: 50,
    init() {},
  },
  fin: {
    position: {
      x: 12000 / 2,
      y: 12000 / 2,
      z: 12000 / 2,
    },
    rotation: { x: 0, y: 0, z: 0 },
    scale: 1000,
    init() {},
  },
}
