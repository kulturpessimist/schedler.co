import version from "../version.json"

import Start from "../txt/start.txt.js"
import Contact from "../txt/contact0.txt.js"
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

import Man from "../txt/jobs-man.txt.js"
import IoB from "../txt/jobs-iob.txt.js"
import Txn from "../txt/jobs-txn.txt.js"
import nO from "../txt/jobs-no.txt.js"
import dyno from "../txt/jobs-dyno.txt.js"
import Kigg from "../txt/jobs-kigg.txt.js"

import Education from "../txt/education.txt.js"
import Skills from "../txt/skills.txt.js"
import Technologies from "../txt/technologies.txt.js"

import ImpressumRaw from "../txt/impressum.txt.js"
import Impressum2 from "../txt/impressum2.txt.js"

let Impressum = ImpressumRaw.replace(
  "{{version-------------}}",
  String(version.semver).padEnd(24, " ")
)
  .replace("{{update--------------}}", String(version.update).padEnd(24, " "))
  .replace("{{short---------------}}", String(version.short).padEnd(24, " "))
  .replace("{{count---------------}}", String(version.count).padEnd(24, " "))
console.log(version, Impressum)
const pages = [
  Start,
  Contact1,
  Freelance,
  Jobs,

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
const contactFrames = [
  // Contact,
  Contact1,
  Contact2,
  Contact3,
  Contact4,
  Contact5,
  Contact6,
]
const impressumFrames = [Impressum, Impressum2]
export { pages, contactFrames, impressumFrames }
