var asciify = require("./ascii.js")

var options = {
  fit: "width",
  color: false,
  width: 11,
  height: 10,
  //chars: "  .*##",
  //chars: "    ●●",
  //chars: "   .:~o*",
  //chars: "   .*#",
  chars: "   ...C",
}

asciify(
  "../../materials/Pictures/certania.png", // Middlesex_University_Logo
  options,
)
  .then(function (asciified) {
    // Print asciified image to console
    console.log(asciified)
  })
  .catch(function (err) {
    // Print error to console
    console.error(err)
  })
