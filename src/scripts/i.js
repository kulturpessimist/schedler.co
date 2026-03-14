// @ts-check

/**
 * @typedef {{
 *   fit?: "width" | "height" | "none" | "box" | "original";
 *   color?: boolean;
 *   width?: number | string;
 *   height?: number | string;
 *   c_ratio?: number | string;
 *   format?: "array" | "string";
 *   chars?: string;
 * }} AsciifyOptions
 */

/**
 * @type {(path: string, options?: AsciifyOptions, callback?: ((err: string | null, result?: string | string[][]) => void)) => Promise<string | string[][]> | void}
 */
var asciify = require("./ascii.js")

/** @type {AsciifyOptions} */
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

/** @type {Promise<string | string[][]>} */
const run = /** @type {Promise<string | string[][]>} */ (
  asciify(
    "../../materials/Pictures/certania.png", // Middlesex_University_Logo
    options,
  )
)

run
  .then(
    /**
     * @param {string | string[][]} asciified
     * @returns {void}
     */
    function (asciified) {
      // Print asciified image to console
      console.log(asciified)
    },
  )
  .catch(
    /**
     * @param {unknown} err
     * @returns {void}
     */
    function (err) {
      // Print error to console
      console.error(err)
    },
  )
