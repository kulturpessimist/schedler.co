// @ts-check

import {
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
  d_education,
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
  m_education,
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
export const desktopPages = [
  d_start,
  d_contact1,
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
]

/** @type {string[]} */
export const desktopContactFrames = [
  d_contact1,
  d_contact2,
  d_contact3,
  d_contact4,
  d_contact5,
]

/** @type {string[]} */
export const desktopImpressumFrames = [d_impressum, d_impressum2]

/** @type {string[]} */
export const mobilePages = [
  m_start,
  m_contact1,
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
]

/** @type {string[]} */
export const mobileContactFrames = [m_contact1]

/** @type {string[]} */
export const mobileImpressumFrames = [
  m_impressum_m,
  m_impressum_m2,
  m_impressum_m3,
  m_impressum_m4,
]
