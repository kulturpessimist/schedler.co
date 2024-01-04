const fs = require("fs/promises")
const version = require("../version.json")

const path = "./src/txt/"

const slug = (str) => {
  return str
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/[^\w-]+/g, "_")
}
const enrichContent = (content, page) => {
  const rules = {
    "start.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "District of Augsburg, Germany": "<i>District of Augsburg, Germany</i>",
      engineering: "<mark>engineering</mark>",
      development: "<mark>development</mark>",
      management: "<mark>management</mark>",
      //Frontend: "<mark>Frontend</mark>",
      //Backend: "<mark>Backend</mark>",
      //Node: "<mark>Node</mark>",
      //GraphQL: "<mark>GraphQL</mark>",
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
    /* "freelance.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "freelance software developer": "<i>freelance software developer</i>",
      "freelance work": "<mark>freelance work</mark>",
      "web application": "<mark>web application</mark>",
      JavaScript: "<mark>JavaScript</mark>",
      CouchDB: "<mark>CouchDB</mark>",
      "Just write me": '<a href="mailto:alex@schedler.co">Just write me</a>',
    }, */

    "jobs.txt": {
      "Alexander Schedler": "<strong>Alexander Schedler</strong>",
      "Curriculum Vitae": "<i>Curriculum Vitae</i>",
      Certania: '<a href="/job/certania" data-navigo>Certania</a>',
      "Johner Institut": '<a href="/job/jd" data-navigo>Johner Institut</a>',
      "MAN Energy Solutions":
        '<a href="/job/man-es" data-navigo>MAN Energy Solutions</a>',
      "MAN Energy Sol.":
        '<a href="/job/man-es" data-navigo>MAN Energy Sol.</a>',
      "Internet of Blah": '<a href="/job/iob" data-navigo>Internet of Blah</a>',
      ThinxNet: '<a href="/job/thinxnet" data-navigo>ThinxNet</a>',
      natureOffice: '<a href="/job/natureoffice" data-navigo>natureOffice</a>',
      Dynomedia: '<a href="/job/dynomedia" data-navigo>Dynomedia</a>',
      KIGG: '<a href="/job/kigg" data-navigo>KIGG</a>',
    },
    "jobs-certania.txt": {
      "Certania GmbH":
        '<strong>Certania GmbH</strong> <a class="external-employer-link" href="https://certania.com/" target="_blank"> ↗ </a>',
      "January 2024 onwards": "<i>January 2024 onwards</i>",
    },
    "jobs-jd.txt": {
      "Johner Institut GmbH":
        '<strong>Johner Institut GmbH</strong> <a class="external-employer-link" href="https://www.johner-institute.com" target="_blank"> ↗ </a>',
      "February 2023 – December 2023": "<i>February 2023 - December 2023</i>",
    },
    "jobs-man.txt": {
      "MAN Energy Solutions SE":
        '<strong>MAN Energy Solutions SE</strong> <a class="external-employer-link" href="https://www.man-es.com" target="_blank"> ↗ </a>',
      "June 2018 – January 2023": "<i>June 2018 – January 2023</i>",
    },
    "jobs-iob.txt": {
      "Internet of Blah / PURR": "<strong>Internet of Blah / PURR</strong> ",
      "June 2016 – December 2019": "<i>June 2016 – December 2019</i>",
    },

    "jobs-txn.txt": {
      "ThinxNet GmbH":
        '<strong>ThinxNet GmbH</strong> <a class="external-employer-link" href="https://thinxnet.com" target="_blank"> ↗ </a>',
      "June 2014 – June 2016": "<i>June 2014 – June 2016</i>",
    },
    "jobs-no.txt": {
      "natureOffice GmbH":
        '<strong>natureOffice GmbH</strong> <a class="external-employer-link" href="https://www.natureoffice.com" target="_blank"> ↗ </a>',
      "August 2008 - April 2014": "<i>August 2008 - April 2014</i>",
    },
    "jobs-dyno.txt": {
      "Dynomedia GmbH":
        '<strong>Dynomedia GmbH</strong> <a class="external-employer-link" href="https://web.archive.org/web/20070208042813/http://www.dynomedia.com:80/de/" target="_blank"> ↗ </a>',
      "June 2005 - July 2008": "<i>June 2005 - July 2008</i>",
    },
    "jobs-kigg.txt": {
      "KIGG GmbH":
        '<strong>KIGG GmbH</strong> <a class="external-employer-link" href="https://www.kigg.de" target="_blank"> ↗ </a>',
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
      new: "<mark>new</mark>",
      technologies: "<mark>technologies</mark>",
      creative: "<mark>creative</mark>",
      thinker: "<mark>thinker</mark>",
      German: "<mark>German</mark>",
      culture: "<mark>culture</mark>",
    },
    /* "technologies.txt": {
      "Technologies Overview": "<strong>Technologies Overview</strong>",
      "Experience and Expertise (extract)":
        "<i>Experience and Expertise (extract)</i>",
    }, */

    "impressum.txt": {
      "+49 171 4123 929": '<a href="tel:+491714123929">+49 171 4123 929</a>',
      "alex@schedler.co":
        '<a href="mailto:alex@schedler.co">alex@schedler.co</a>',
      "-> Disclaimer, data protection and":
        '<a href="/impressum/1">-> Disclaimer, data protection and</a>',
      "copyright statements...":
        '<a href="/impressum/1">copyright statements...</a>',
      "Download CV as PDF":
        '<a href="https://literally.download/f/dm21ED" target="_blank">Download CV as PDF</a>',

      "{{version-------------}}": String(version.version).padEnd(24, " "),
      "{{update--------------}}": String(version.update).padEnd(24, " "),
      "{{short---------------}}": String(version.short).padEnd(24, " "),
      "{{count---------------}}": String(version.count).padEnd(24, " "),
      "{{semver--------------}}": String(version.semver).padEnd(24, " "),
    },
    "impressum2.txt": {
      "<- Back...": '<a href="/impressum/0"><- Back...</a>',
    },

    "impressum_m.txt": {
      "+49 171 4123 929": '<a href="tel:+491714123929">+49 171 4123 929</a>',
      "alex@schedler.co":
        '<a href="mailto:alex@schedler.co">alex@schedler.co</a>',
      "Download CV as PDF":
        '<a href="https://literally.download/f/dm21ED" target="_blank">Download CV as PDF</a>',

      "{{version-------------}}": String(version.version).padEnd(24, " "),
      "{{update--------------}}": String(version.update).padEnd(24, " "),
      "{{short---------------}}": String(version.short).padEnd(24, " "),
      "{{count---------------}}": String(version.count).padEnd(24, " "),
      "{{semver--------------}}": String(version.semver).padEnd(24, " "),

      "-> Imprint": '-> <a href="/impressum/0">Imprint</a>',
      "-> Privacy": '-> <a href="/impressum/1">Privacy</a>',
      "-> Copyright": '-> <a href="/impressum/2">Copyright</a>',
      "-> Disclaimer": '-> <a href="/impressum/3">Disclaimer</a>',
    },
    "impressum_m2.txt": {
      "-> Imprint": '-> <a href="/impressum/0">Imprint</a>',
      "-> Privacy": '-> <a href="/impressum/1">Privacy</a>',
      "-> Copyright": '-> <a href="/impressum/2">Copyright</a>',
      "-> Disclaimer": '-> <a href="/impressum/3">Disclaimer</a>',
    },
    "impressum_m3.txt": {
      "-> Imprint": '-> <a href="/impressum/0">Imprint</a>',
      "-> Privacy": '-> <a href="/impressum/1">Privacy</a>',
      "-> Copyright": '-> <a href="/impressum/2">Copyright</a>',
      "-> Disclaimer": '-> <a href="/impressum/3">Disclaimer</a>',
    },
    "impressum_m4.txt": {
      "-> Imprint": '-> <a href="/impressum/0">Imprint</a>',
      "-> Privacy": '-> <a href="/impressum/1">Privacy</a>',
      "-> Copyright": '-> <a href="/impressum/2">Copyright</a>',
      "-> Disclaimer": '-> <a href="/impressum/3">Disclaimer</a>',
    },
  }
  rules["contact1.txt"] = rules["contact0.txt"]
  rules["contact2.txt"] = rules["contact0.txt"]
  rules["contact3.txt"] = rules["contact0.txt"]
  rules["contact4.txt"] = rules["contact0.txt"]
  rules["contact5.txt"] = rules["contact0.txt"]
  rules["contact6.txt"] = rules["contact0.txt"]

  rules["start.mobile.txt"] = rules["start.txt"]
  rules["contact1.mobile.txt"] = rules["contact0.txt"]
  rules["freelance.mobile.txt"] = rules["freelance.txt"]
  rules["jobs.mobile.txt"] = rules["jobs.txt"]
  rules["jobs-certania.mobile.txt"] = rules["jobs-certania.txt"]
  rules["jobs-jd.mobile.txt"] = rules["jobs-jd.txt"]
  rules["jobs-man.mobile.txt"] = rules["jobs-man.txt"]
  rules["jobs-iob.mobile.txt"] = rules["jobs-iob.txt"]
  rules["jobs-txn.mobile.txt"] = rules["jobs-txn.txt"]
  rules["jobs-no.mobile.txt"] = rules["jobs-no.txt"]
  rules["jobs-dyno.mobile.txt"] = rules["jobs-dyno.txt"]
  rules["jobs-kigg.mobile.txt"] = rules["jobs-kigg.txt"]

  rules["education.mobile.txt"] = rules["education.txt"]
  rules["skills.mobile.txt"] = rules["skills.txt"]
  rules["technologies.mobile.txt"] = rules["technologies.txt"]
  //
  // console.log(page, "was", content.length)
  if (rules[page]) {
    //content = content.replace(/(\w+)/gi, "<u>$1</u>")
    for (const key in rules[page]) {
      content = content.replace(key, rules[page][key])
    }
  }
  // console.log("is", content.length)
  return content
}

const main = async () => {
  for (let f of ["mobile", "desktop"]) {
    const filenames = await fs.readdir(path + "/" + f)

    let pages = []
    let exports = []
    for (const filename of filenames) {
      // console.log(path + filename)
      if (filename.endsWith(".txt")) {
        let content = await fs.readFile([path, f, filename].join("/"), "utf-8")
        content = enrichContent(content, filename)
        //console.log(path + filename, content.length)
        pages.push(`export const ${f[0]}_${slug(filename)} = \n\`${content}\``)
        exports.push(`${f[0]}_${slug(filename)}`)
      }
    }
    console.log([path, f + ".js"].join(""))
    //console.log("export default [\n" + exports.join(",\n") + "\n]")
    await fs.writeFile(
      [path, f + ".js"].join("/"),
      `${pages.join("; \n\n")}; \n\nexport default [\n${exports.join(
        ",\n",
      )}\n]`,
    )
  }
}

main()
