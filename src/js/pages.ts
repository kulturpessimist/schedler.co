// @ts-check

import {
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
  //d_contact6,
  d_education,
  d_freelance,
  d_impressum,
  d_impressum2,
  d_jobs,
  d_jobs_certania,
  d_jobs_dyno,
  d_jobs_iob,
  d_jobs_jd,
  d_jobs_kigg,
  d_jobs_man,
  d_jobs_no,
  d_jobs_txn,
  d_skills,
  d_start,
} from "../txt/desktop"

import {
  m_contact1,
  /* m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6, */
  m_education,
  m_freelance,
  m_impressum_m,
  m_impressum_m2,
  m_impressum_m3,
  m_impressum_m4,
  m_jobs,
  m_jobs_certania,
  m_jobs_dyno,
  m_jobs_iob,
  m_jobs_jd,
  m_jobs_kigg,
  m_jobs_man,
  m_jobs_no,
  m_jobs_txn,
  m_skills,
  m_start,
} from "../txt/mobile"

/** @type {string[]} */
const d_pages = [
  d_start,
  d_contact1,
  d_freelance,
  d_jobs,

  d_jobs_certania,
  d_jobs_jd,
  d_jobs_man,
  d_jobs_iob,
  d_jobs_txn,
  d_jobs_no,
  d_jobs_dyno,
  d_jobs_kigg,

  d_education,
  d_skills,
  // d_technologies,
]

/** @type {string[]} */
const d_contactFrames = [
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
  //d_contact6,
]

/** @type {string[]} */
const d_impressumFrames = [d_impressum, d_impressum2]

/** @type {string[]} */
const m_pages = [
  m_start,
  m_contact1,
  m_freelance,
  m_jobs,

  m_jobs_certania,
  m_jobs_jd,
  m_jobs_man,
  m_jobs_iob,
  m_jobs_txn,
  m_jobs_no,
  m_jobs_dyno,
  m_jobs_kigg,

  m_education,
  m_skills,
  // m_technologies,
]

/** @type {string[]} */
const m_contactFrames = [
  m_contact1,
  /* m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6, */
]

/** @type {string[]} */
const m_impressumFrames = [
  m_impressum_m,
  m_impressum_m2,
  m_impressum_m3,
  m_impressum_m4,
]

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
    pages = m_pages
    contactFrames = m_contactFrames
    impressumFrames = m_impressumFrames
    pagesMobile = m_pages
    contactFramesMobile = m_contactFrames
    impressumFramesMobile = m_impressumFrames
  } else {
    pages = d_pages
    contactFrames = d_contactFrames
    impressumFrames = d_impressumFrames
    pagesMobile = m_pages
    contactFramesMobile = m_contactFrames
    impressumFramesMobile = m_impressumFrames
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
  pagesMobile
}

