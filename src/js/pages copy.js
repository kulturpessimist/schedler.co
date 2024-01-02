<<<<<<< HEAD
import Start from "../txt/start.txt.js"
//
import Contact1 from "../txt/contact1.txt.js"
import Contact2 from "../txt/contact2.txt.js"
import Contact3 from "../txt/contact3.txt.js"
import Contact4 from "../txt/contact4.txt.js"
import Contact5 from "../txt/contact5.txt.js"
import Contact6 from "../txt/contact6.txt.js"
//
import Freelance from "../txt/freelance.txt.js"

import Jobs from "../txt/jobs.txt.js"

import certania from "../txt/jobs-certania.txt.js"
import jd from "../txt/jobs-jd.txt.js"
import Man from "../txt/jobs-man.txt.js"
import IoB from "../txt/jobs-iob.txt.js"
import Txn from "../txt/jobs-txn.txt.js"
import nO from "../txt/jobs-no.txt.js"
import dyno from "../txt/jobs-dyno.txt.js"
import Kigg from "../txt/jobs-kigg.txt.js"
=======
import {
  d_freelance,
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
  d_jobs_dyno,
  d_jobs_iob,
  d_jobs_kigg,
  d_jobs_man,
  d_jobs_no,
  d_jobs_txn,
  d_jobs,
  d_skills,
  d_technologies,
} from "../txt/desktop"

import {
  m_freelance,
  m_start,
  m_contact1,
  m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6,
  m_education,
  m_impressum,
  m_impressum2,
  m_jobs_dyno,
  m_jobs_iob,
  m_jobs_kigg,
  m_jobs_man,
  m_jobs_no,
  m_jobs_txn,
  m_jobs,
  m_skills,
  m_technologies,
} from "../txt/mobile"

const d_pages = [
  d_start,
  d_contact1,
  d_freelance,
  d_jobs,
>>>>>>> 627892b (mobile version)

  d_jobs_man,
  d_jobs_iob,
  d_jobs_txn,
  d_jobs_no,
  d_jobs_dyno,
  d_jobs_kigg,

<<<<<<< HEAD
import Impressum from "../txt/impressum.txt.js"
import Impressum2 from "../txt/impressum2.txt.js"

// mobile versions
import StartMobile from "../txt/start.mobile.txt.js"
import Contact1Mobile from "../txt/contact1.mobile.txt.js"
import FreelanceMobile from "../txt/freelance.mobile.txt.js"
import JobsMobile from "../txt/jobs.mobile.txt.js"

import certaniaMobile from "../txt/jobs-certania.mobile.txt.js"
import jdMobile from "../txt/jobs-jd.mobile.txt.js"
import ManMobile from "../txt/jobs-man.mobile.txt.js"
import IoBMobile from "../txt/jobs-iob.mobile.txt.js"
import TxnMobile from "../txt/jobs-txn.mobile.txt.js"
import nOMobile from "../txt/jobs-no.mobile.txt.js"
import dynoMobile from "../txt/jobs-dyno.mobile.txt.js"
import KiggMobile from "../txt/jobs-kigg.mobile.txt.js"

import EducationMobile from "../txt/education.mobile.txt.js"
import SkillsMobile from "../txt/skills.mobile.txt.js"
import TechnologiesMobile from "../txt/technologies.mobile.txt.js"

import ImpressumMobile from "../txt/impressum.mobile.txt.js"
import Impressum2Mobile from "../txt/impressum2.mobile.txt.js"
import Impressum3Mobile from "../txt/impressum3.mobile.txt.js"
import Impressum4Mobile from "../txt/impressum4.mobile.txt.js"

const pages = [
  Start,
  Contact1,
  Freelance,
  Jobs,

  certania,
  jd,
  Man,
  IoB,
  Txn,
  nO,
  dyno,
  Kigg,

  Education,
  Skills,
  Technologies,
]
const pagesMobile = [
  StartMobile,
  Contact1Mobile,
  FreelanceMobile,
  JobsMobile,
  //
  certaniaMobile,
  jdMobile,
  ManMobile,
  IoBMobile,
  TxnMobile,
  nOMobile,
  dynoMobile,
  KiggMobile,
  //
  EducationMobile,
  SkillsMobile,
  TechnologiesMobile,

  ImpressumMobile,
  Impressum2Mobile,
  Impressum3Mobile,
  Impressum4Mobile,
]
const contactFrames = [
  // Contact,
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact5,
  Contact6,
]
const contactFramesMobile = [Contact1Mobile]

const impressumFrames = [Impressum, Impressum2]
const impressumFramesMobile = [
  ImpressumMobile,
  Impressum2Mobile,
  Impressum3Mobile,
  Impressum4Mobile,
]
=======
  d_education,
  d_skills,
  d_technologies,
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
  m_freelance,
  m_jobs,

  m_jobs_man,
  m_jobs_iob,
  m_jobs_txn,
  m_jobs_no,
  m_jobs_dyno,
  m_jobs_kigg,

  m_education,
  m_skills,
  m_technologies,
]
const m_contactFrames = [
  m_contact1,
  m_contact2,
  m_contact3,
  m_contact4,
  m_contact5,
  m_contact6,
]
const m_impressumFrames = [m_impressum, m_impressum2]
//
let pages
let contactFrames
let impressumFrames

const match = window.matchMedia("(orientation: portrait)")
const matchHandler = () => {
  if (match.matches) {
    console.log("mobile")
    pages = m_pages
    contactFrames = m_contactFrames
    impressumFrames = m_impressumFrames
  } else {
    console.log("desktop")
    pages = d_pages
    contactFrames = d_contactFrames
    impressumFrames = d_impressumFrames
  }
}
match.addEventListener("change", matchHandler)
matchHandler()
>>>>>>> 627892b (mobile version)

export { pages, contactFrames, impressumFrames }
export { pagesMobile, contactFramesMobile, impressumFramesMobile }
