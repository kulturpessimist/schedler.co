// @ts-check
"use strict"

/**
 * @typedef {"width" | "height" | "none" | "box" | "original"} AsciifyFitMode
 */

/**
 * @typedef {{
 *   fit?: AsciifyFitMode;
 *   width?: number | string;
 *   height?: number | string;
 *   c_ratio?: number | string;
 *   color?: boolean;
 *   format?: "array" | "string";
 *   chars?: string;
 * }} AsciifyOptions
 */

/**
 * @typedef {{
 *   fit: AsciifyFitMode;
 *   width: number;
 *   height: number;
 *   c_ratio: number;
 *   color: boolean;
 *   as_string: boolean;
 *   chars: string;
 * }} NormalizedOptions
 */

/** @typedef {string | string[][]} AsciifyResult */

/**
 * @typedef {(err: string | null, success?: AsciifyResult) => void} AsciifyCallback
 */

/** @type {any} */
var Jimp = require("jimp")
/** @type {{ fg: (text: string, r: number, g: number, b: number) => string }} */
var Couleurs = require("couleurs")
/** @type {number} */
var terminalCharWidth = require("terminal-char-width")
/** @type {{ width: number; height: number }} */
var windowSize = require("window-size")

/**
 * Convert an image into ASCII output.
 *
 * @param {string} path - Path to the input image.
 * @param {AsciifyOptions | AsciifyCallback} [second] - Options object or callback.
 * @param {AsciifyCallback} [third] - Optional callback when options are provided.
 * @returns {Promise<AsciifyResult> | void}
 */
module.exports = function (path, second, third) {
  /** @type {AsciifyOptions} */
  var opts = {}
  /** @type {AsciifyCallback | undefined} */
  var callback

  if (typeof second === "object" && second !== null) {
    opts = second
    if (typeof third === "function") {
      callback = third
    }
  } else if (typeof second === "function") {
    callback = second
  }

  // If no callback is specified, prepare a promise to return.
  if (!callback) {
    return new Promise(function (resolve, reject) {
      asciify_core(path, opts, function (err, success) {
        if (err) return reject(err)
        if (success !== undefined) return resolve(success)
      })
    })
  }

  // Otherwise proceed using callback style.
  asciify_core(path, opts, callback || console.log)
}

/**
 * The module's core functionality.
 *
 * @param {string} path - The full path to the image.
 * @param {AsciifyOptions} opts - Conversion options.
 * @param {AsciifyCallback} callback - Callback invoked with result.
 * @returns {void}
 */
var asciify_core = function (path, opts, callback) {
  // First open image to get initial properties.
  Jimp.read(
    path,
    /**
     * @param {unknown} err
     * @param {any} image
     * @returns {void}
     */
    function (err, image) {
      if (err) return callback("Error loading image: " + String(err))

    // Percentage based widths.
    if (opts.width && String(opts.width).slice(-1) === "%") {
      opts.width = Math.floor(
        (parseInt(String(opts.width).slice(0, -1), 10) / 100) *
          (windowSize.width * terminalCharWidth),
      )
    }

    // Percentage based heights.
    if (opts.height && String(opts.height).slice(-1) === "%") {
      opts.height = Math.floor(
        (parseInt(String(opts.height).slice(0, -1), 10) / 100) * windowSize.height,
      )
    }

    /** @type {NormalizedOptions} */
    var options = {
      fit: opts.fit ? opts.fit : "original",
      width: opts.width ? parseInt(String(opts.width), 10) : image.bitmap.width,
      height: opts.height
        ? parseInt(String(opts.height), 10)
        : image.bitmap.height,
      c_ratio: opts.c_ratio ? parseInt(String(opts.c_ratio), 10) : 2,
      color: opts.color == false ? false : true,
      as_string: opts.format === "array" ? false : true,
      chars: opts.chars || " .,:;i1tfLCG08@",
    }

    /** @type {number[]} */
    var new_dims = calculate_dims(image, options)

    // Resize to requested dimensions.
    image.resize(new_dims[0], new_dims[1])

    /** @type {AsciifyResult} */
    var ascii = ""
    if (!options.as_string) ascii = []

    // Normalization for the returned intensity so that it maps to a char.
    var norm = (255 * 4) / (options.chars.length - 1)

    // Get and convert pixels.
    for (var j = 0; j < image.bitmap.height; j++) {
      // Add new array if result type is matrix.
      if (!options.as_string) {
        /** @type {string[][]} */ (ascii).push([])
      }

      for (var i = 0; i < image.bitmap.width; i++) {
        for (var c = 0; c < options.c_ratio; c++) {
          var next = options.chars.charAt(Math.round(intensity(image, i, j) / norm))

          if (options.color) {
            var clr = Jimp.intToRGBA(image.getPixelColor(i, j))
            next = Couleurs.fg(next, clr.r, clr.g, clr.b)
          }

          if (options.as_string) {
            ascii += next
          } else {
            /** @type {string[][]} */ (ascii)[j].push(next)
          }
        }
      }

      if (options.as_string && j != image.bitmap.height - 1) ascii += "\n"
    }

      callback(null, ascii)
    },
  )
}

/**
 * Calculate new dimensions for the image using the configured fit mode.
 *
 * @param {{ bitmap: { width: number; height: number } }} img
 * @param {NormalizedOptions} opts
 * @returns {number[]}
 */
var calculate_dims = function (img, opts) {
  switch (opts.fit) {
    // Scale down by width.
    case "width":
      return [opts.width, img.bitmap.height * (opts.width / img.bitmap.width)]

    // Scale down by height.
    case "height":
      return [img.bitmap.width * ((opts.height / img.bitmap.height, opts.height))]

    // Scale by width and height (ignore aspect ratio).
    case "none":
      return [opts.width, opts.height]

    // Scale down to fit inside box matching width/height of options.
    case "box": {
      var w_ratio = img.bitmap.width / opts.width
      var h_ratio = img.bitmap.height / opts.height
      /** @type {number} */
      var neww
      /** @type {number} */
      var newh

      if (w_ratio > h_ratio) {
        newh = Math.round(img.bitmap.height / w_ratio)
        neww = opts.width
      } else {
        neww = Math.round(img.bitmap.width / h_ratio)
        newh = opts.height
      }
      return [neww, newh]
    }

    // Don't change width/height.
    // Also the default in case of bad argument.
    case "original":
    default:
      if (opts.fit !== "original") {
        console.error('Invalid option "fit", assuming "original"')
      }

      return [img.bitmap.width, img.bitmap.height]
  }
}

/**
 * Calculate pixel intensity at (x, y).
 *
 * @param {{ getPixelColor: (x: number, y: number) => number }} i
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
var intensity = function (i, x, y) {
  var color = Jimp.intToRGBA(i.getPixelColor(x, y))
  return color.r + color.g + color.b + color.a
}
