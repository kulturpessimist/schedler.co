import {
  // d_freelance,
  d_start,
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
  d_contact6,
  d_education,
  d_impressum,
  d_impressum2,
  d_jobs_certania,
  d_jobs_jd,
  d_jobs_dyno,
  d_jobs_iob,
  d_jobs_kigg,
  d_jobs_man,
  d_jobs_no,
  d_jobs_txn,
  d_jobs,
  d_skills,
  // d_technologies,
} from "../txt/desktop"

import {
  // m_freelance,
  m_start,
  m_contact1,
  /* m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6, */
  m_education,
  m_impressum,
  m_impressum2,
  m_impressum3,
  m_impressum4,
  m_jobs_dyno,
  m_jobs_iob,
  m_jobs_kigg,
  m_jobs_man,
  m_jobs_no,
  m_jobs_txn,
  m_jobs,
  m_skills,
  m_jobs_jd,
  m_jobs_certania,
  // m_technologies,
} from "../txt/mobile"

const d_pages = [
  d_start,
  d_contact1,
  // d_freelance,
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
const d_contactFrames = [
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
  d_contact6,
]
const d_impressumFrames = [d_impressum, d_impressum2]

const m_pages = [
  m_start,
  m_contact1,
  // m_freelance,
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
const m_contactFrames = [
  m_contact1,
  /* m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6, */
]
const m_impressumFrames = [
  m_impressum,
  m_impressum2,
  m_impressum3,
  m_impressum4,
]
//
let pages, contactFrames, impressumFrames
let pagesMobile, contactFramesMobile, impressumFramesMobile

const match = window.matchMedia("(orientation: portrait)")
const matchHandler = () => {
  if (match.matches) {
    console.log("mobile")
    pages = m_pages
    contactFrames = m_contactFrames
    impressumFrames = m_impressumFrames
    pagesMobile = m_pages
    contactFramesMobile = m_contactFrames
    impressumFramesMobile = m_impressumFrames
  } else {
    console.log("desktop")
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
  pages,
  contactFrames,
  impressumFrames,
  pagesMobile,
  contactFramesMobile,
  impressumFramesMobile,
}
