const fs = require("fs/promises")
const version = require("../version.json")

const path = "./src/txt/" /* process.argv[2] ||  */

const enrichContent = (content, page) => {
  const rules = {
    "start.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "District of Augsburg, Germany": "<i>District of Augsburg, Germany</i>",
      engineering: "<mark>engineering</mark>",
      development: "<mark>development</mark>",
      management: "<mark>management</mark>",
      Frontend: "<mark>Frontend</mark>",
      "Node, GraphQL": "<mark>Node, GraphQL</mark>",
    },
    "contact0.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "District of Augsburg, Germany": "<i>District of Augsburg, Germany</i>",
      "alex@schedler.co":
        '<a href="mailto:alex@schedler.co">alex@schedler.co</a>',
      "+49 171 4 123 929": '<a href="tel:+491714123929">+49 171 4 123 929</a>',
      "@kulturpessimist":
        '<a href="https://twitter.com/kulturpessimist" target="_blank">@kulturpessimist</a>',
      "~kulturpessimist":
        '<a href="https://www.github.com/kulturpessimist" target="_blank">/kulturpessimist</a>',
      "/alexanderschedler":
        '<a href="https://www.linkedin.com/in/alexanderschedler" target="_blank">/alexanderschedler</a>',
      "/Alex_Schedler":
        '<a href="https://www.xing.com/profile/Alex_Schedler" target="_blank">/Alex_Schedler</a>',
    },
    "freelance.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "freelance software developer": "<i>freelance software developer</i>",
      "freelance work": "<mark>freelance work</mark>",
      "web application": "<mark>web application</mark>",
      JavaScript: "<mark>JavaScript</mark>",
      CouchDB: "<mark>CouchDB</mark>",
      "Just write me": '<a href="mailto:alex@schedler.co">Just write me</a>',
    },

    "jobs.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "Curriculum Vitae": "<i>Curriculum Vitae</i>",
      "MAN Energy Solutions":
        '<a href="/job/man-es" data-navigo>MAN Energy Solutions</a>',
      "Internet of Blah": '<a href="/job/iob" data-navigo>Internet of Blah</a>',
      ThinxNet: '<a href="/job/thinxnet" data-navigo>ThinxNet</a>',
      natureOffice: '<a href="/job/natureoffice" data-navigo>natureOffice</a>',
      Dynomedia: '<a href="/job/dynomedia" data-navigo>Dynomedia</a>',
      KIGG: '<a href="/job/kigg" data-navigo>KIGG</a>',
    },
    "jobs-man.txt": {
      "MAN Energy Solutions": "<strong>MAN Energy Solutions</strong>",
      "June 2018 onwards": "<i>June 2018 onwards</i>",
    },
    "jobs-iob.txt": {
      "Internet of Blah / PURR": "<strong>Internet of Blah / PURR</strong>",
      "June 2016 – December 2019": "<i>June 2016 – December 2019</i>",
    },
    "jobs-txn.txt": {
      "ThinxNet GmbH": "<strong>ThinxNet GmbH</strong>",
      "June 2014 – June 2016": "<i>June 2014 – June 2016</i>",
    },
    "jobs-no.txt": {
      "natureOffice GmbH": "<strong>natureOffice GmbH</strong>",
      "August 2008 - April 2014": "<i>August 2008 - April 2014</i>",
    },
    "jobs-dyno.txt": {
      "Dynomedia GmbH": "<strong>Dynomedia GmbH</strong>",
      "June 2005 - July 2008": "<i>June 2005 - July 2008</i>",
    },
    "jobs-kigg.txt": {
      "KIGG GmbH": "<strong>KIGG GmbH</strong>",
      "August 2002 - November 2004": "<i>August 2002 - November 2004</i>",
    },

    "education.txt": {
      "Bachelor of Arts Multimedia":
        "<strong>Bachelor of Arts Multimedia</strong>",
      "August 2001 - May 2004": "<i>August 2001 - May 2004</i>",
    },
    "skills.txt": {
      "Personal Skills": "<strong>Personal Skills</strong>",
      "and Competences": "<i>and Competences</i>",
      "new technologies": "<mark>new technologies</mark>",
      "creative thinker": "<mark>creative thinker</mark>",
      German: "<mark>German</mark>",
      culture: "<mark>culture</mark>",
    },
    "technologies.txt": {
      "Technologies Overview": "<strong>Technologies Overview</strong>",
      "Experience and Expertise (extract)":
        "<i>Experience and Expertise (extract)</i>",
    },

    "impressum.txt": {
      "+49 171 4123 929": '<a href="tel:+491714123929">+49 171 4123 929</a>',
      "alex@schedler.co":
        '<a href="mailto:alex@schedler.co">alex@schedler.co</a>',
      "-> Disclaimer, data protection and":
        '<a href="/impressum/1">-> Disclaimer, data protection and</a>',
      "copyright statements...":
        '<a href="/impressum/1">copyright statements...</a>',
      "Download CV as PDF":
        '<a href="https://literally.download/2IiXLQ" target="_blank">Download CV as PDF</a>',

      "{{version-------------}}": String(version.version).padEnd(24, " "),
      "{{update--------------}}": String(version.update).padEnd(24, " "),
      "{{short---------------}}": String(version.short).padEnd(24, " "),
      "{{count---------------}}": String(version.count).padEnd(24, " "),
      "{{semver--------------}}": String(version.semver).padEnd(24, " "),
    },
    "impressum2.txt": {
      "<- Back...": '<a href="/impressum/0"><- Back...</a>',
    },
  }
  rules["contact1.txt"] = rules["contact0.txt"]
  rules["contact2.txt"] = rules["contact0.txt"]
  rules["contact3.txt"] = rules["contact0.txt"]
  rules["contact4.txt"] = rules["contact0.txt"]
  rules["contact5.txt"] = rules["contact0.txt"]
  rules["contact6.txt"] = rules["contact0.txt"]
  rules["Freelance.txt"] = rules["freelance.txt"]
  rules["Start.txt"] = rules["start.txt"]
  //
  console.log(page, "was", content.length)
  if (rules[page]) {
    for (const key in rules[page]) {
      content = content.replace(key, rules[page][key])
    }
  }
  console.log("is", content.length)
  return content
}

const main = async () => {
  const filenames = await fs.readdir(path)

  for (const filename of filenames) {
    // console.log(path + filename)
    if (filename.endsWith(".txt")) {
      let content = await fs.readFile(path + filename, "utf-8")
      content = enrichContent(content, filename)
      await fs.writeFile(
        path + filename + ".js",
        `export default \`${content}\``
      )
      //console.log(path + filename, content.length)
    }
  }
}

main()
