var asciify = require("./ascii.js")

var options = {
  fit: "width",
  color: false,
  width: 14,
  height: 16,
  //chars: "  .*##",
  //chars: "    ●●",
  //chars: "   .:~o*",
  chars: "   .*#",
}

asciify(
  "../../materials/Pictures/kigg.png", // Middlesex_University_Logo
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
