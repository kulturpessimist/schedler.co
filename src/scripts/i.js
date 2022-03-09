var asciify = require("./ascii.js")

var options = {
  fit: "width",
  color: false,
  width: 20,
  height: 20,
  chars: "  *#",
}

asciify(
  "../images/Icon.png", // Middlesex_University_Logo
  options
)
  .then(function (asciified) {
    // Print asciified image to console
    console.log(asciified)
  })
  .catch(function (err) {
    // Print error to console
    console.error(err)
  })
