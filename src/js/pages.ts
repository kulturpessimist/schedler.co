// @ts-check

import {
  desktopContactFrames,
  desktopImpressumFrames,
  desktopPages,
  mobileContactFrames,
  mobileImpressumFrames,
  mobilePages,
} from "./content"

let pages: string[] = []
let contactFrames: string[] = []
let impressumFrames: string[] = []
let pagesMobile: string[] = []
let contactFramesMobile: string[] = []
let impressumFramesMobile: string[] = []

/** @type {MediaQueryList} */
const match = window.matchMedia("(orientation: portrait)")

/**
 * Keep exported page collections in sync with current orientation.
 *
 * @returns {void}
 */
const matchHandler = () => {
  if (match.matches) {
    pages = mobilePages
    contactFrames = mobileContactFrames
    impressumFrames = mobileImpressumFrames
    pagesMobile = mobilePages
    contactFramesMobile = mobileContactFrames
    impressumFramesMobile = mobileImpressumFrames
  } else {
    pages = desktopPages
    contactFrames = desktopContactFrames
    impressumFrames = desktopImpressumFrames
    pagesMobile = mobilePages
    contactFramesMobile = mobileContactFrames
    impressumFramesMobile = mobileImpressumFrames
  }
}

match.addEventListener("change", matchHandler)
matchHandler()

export {
  contactFrames,
  contactFramesMobile,
  impressumFrames,
  impressumFramesMobile,
  pages,
  pagesMobile,
}
