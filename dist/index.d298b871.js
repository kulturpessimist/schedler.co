// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, mainEntry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3NeHt":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d298b871a73b099a300bc6725f6f08d7";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets;

function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}

function getPort() {
  return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare


var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"NPpSU":[function(require,module,exports) {
"use strict";

var _storybook = _interopRequireDefault(require("./storybook"));

var _roughNotation = require("rough-notation");

require("alpinejs");

require("impress.js");

require("../css/bulma.scss");

require("@fortawesome/fontawesome-free/css/brands.css");

require("@fortawesome/fontawesome-free/css/solid.css");

require("@fortawesome/fontawesome-free/css/fontawesome.css");

require("animate.css");

require("../fonts/fonts.css");

require("../css/style.css");

require("../css/jobs.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// frameworks and libs
// styles...
// ...sass
// ...css
//
const app = {
  data() {
    return {
      showImprint: false,
      showImprint1: false,
      showImprint2: false,
      showImprint3: false,
      api: undefined,
      storybook: _storybook.default,
      window: {
        width: 0,
        height: 0
      },

      //
      init() {
        console.log("mounted");
        this.api = impress();
        document.body.addEventListener("impress:init", this.stepInit);
        document.body.addEventListener("impress:stepenter", this.stepEnter);
        document.body.addEventListener("impress:stepleave", this.stepLeave);
        document.body.addEventListener("impress:steprefresh", this.stepRefresh);
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight; // let alpine run and after that init impress

        setTimeout(this.api.init, 1);
      },

      stepInit(event) {
        console.log("impress:stepinit", event);
      },

      stepLeave(event) {
        /* console.log("impress:stepleave", event) */
        const chapter = event.target.id;

        if (chapter in _storybook.default && "destroy" in _storybook.default[chapter]) {
          _storybook.default[chapter].destroy();
        }
      },

      stepEnter(event) {
        /* console.log("impress:stepenter", event) */
        const chapter = event.target.id;

        if (chapter in _storybook.default && "init" in _storybook.default[chapter]) {
          _storybook.default[chapter].init();
        }
      },

      stepRefresh(event) {
        /* console.log("impress:steprefresh", event) */
      },

      previous() {
        this.api.prev();
      },

      next() {
        this.api.next();
      },

      open() {
        this.showImprint = true;
        const e = document.querySelector(" mark");
        const annotation = (0, _roughNotation.annotate)(e, {
          type: "highlight",
          color: "#00990099"
        });
        annotation.show();
      },

      close() {
        this.showImprint = false;
      },

      isOpen() {
        return this.showImprint === true;
      }

    };
  }

};
window.app = app;
},{"./storybook":"1IxTx","rough-notation":"BAvvw","alpinejs":"2Pa9L","impress.js":"2Ot6v","../css/bulma.scss":"2xeXx","@fortawesome/fontawesome-free/css/brands.css":"56How","@fortawesome/fontawesome-free/css/solid.css":"3dboW","@fortawesome/fontawesome-free/css/fontawesome.css":"4SjKI","animate.css":"25569","../fonts/fonts.css":"26bL1","../css/style.css":"61VVo","../css/jobs.css":"2O3uv"}],"1IxTx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _roughNotation = require("rough-notation");

var _default = {
  home: {
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 100,

    init() {
      /* setTimeout(() => {
        const marks = []
        document.querySelectorAll("#home mark").forEach((elem) => {
          marks.push(
            annotate(elem, {
              type: "highlight",
              color: "#ff000033",
              multiline: true,
            })
          )
        })
         annotationGroup(marks).show()
      }, 1000) */
    }

  },
  contact: {
    position: {
      x: 200000,
      y: 0,
      z: 0
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 100,

    init() {
      console.log("Welcome!");
      document.querySelector(".bubble.left").classList.add("animate__fadeInLeft");
      document.querySelector(".bubble.right").classList.add("animate__fadeInRight");
    },

    destroy() {
      document.querySelector(".bubble.left").classList.remove("animate__fadeInLeft");
      document.querySelector(".bubble.right").classList.remove("animate__fadeInRight");
    }

  },
  freelance: {
    position: {
      x: 200000,
      y: 150000,
      z: 0
    },
    rotation: {
      x: 0,
      y: 90,
      z: 30
    },
    scale: 100,

    init() {}

  },
  overview: {
    position: {
      x: 400000,
      y: 0,
      z: 100000
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 100,

    init() {}

  },
  // jobs
  man: {
    position: {
      x: 350000,
      y: -5000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  iob: {
    position: {
      x: 360000,
      y: -10000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  thinxnet: {
    position: {
      x: 370000,
      y: -15000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  natureoffice: {
    position: {
      x: 380000,
      y: -20000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  dynomedia: {
    position: {
      x: 390000,
      y: -25000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  kigg: {
    position: {
      x: 400000,
      y: -30000,
      z: 0
    },
    rotation: {
      x: 19,
      y: 0,
      z: 33
    },
    scale: 10,

    init() {}

  },
  // soft
  education: {
    position: {
      x: 500000,
      y: 100000,
      z: 200000
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 100,

    init() {}

  },
  personal: {
    position: {
      x: 600000,
      y: -30000,
      z: 100000
    },
    rotation: {
      x: 0,
      y: 0,
      z: -50
    },
    scale: 100,

    init() {}

  },
  technology: {
    position: {
      x: 550000,
      y: 50000,
      z: 100000
    },
    rotation: {
      x: 0,
      y: 90,
      z: -50
    },
    scale: 50,

    init() {}

  },
  fin: {
    position: {
      x: 12000 / 2,
      y: 12000 / 2,
      z: 12000 / 2
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: 1000,

    init() {}

  }
};
exports.default = _default;
},{"rough-notation":"BAvvw"}],"BAvvw":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t="http://www.w3.org/2000/svg";class e{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}function s(t,e,s,i,n){return{type:"path",ops:c(t,e,s,i,n)}}function i(t,e,i){const n=(t||[]).length;if(n>2){const s=[];for(let e=0;e<n-1;e++)s.push(...c(t[e][0],t[e][1],t[e+1][0],t[e+1][1],i));return e&&s.push(...c(t[n-1][0],t[n-1][1],t[0][0],t[0][1],i)),{type:"path",ops:s}}return 2===n?s(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}function n(t,e,s,n,o){return function(t,e){return i(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function o(t,e,s,i,n){return function(t,e,s,i){const[n,o]=l(i.increment,t,e,i.rx,i.ry,1,i.increment*h(.1,h(.4,1,s),s),s);let r=f(n,null,s);if(!s.disableMultiStroke){const[n]=l(i.increment,t,e,i.rx,i.ry,1.5,0,s),o=f(n,null,s);r=r.concat(o)}return{estimatedPoints:o,opset:{type:"path",ops:r}}}(t,e,n,function(t,e,s){const i=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),n=Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*i),o=2*Math.PI/n;let r=Math.abs(t/2),h=Math.abs(e/2);const c=1-s.curveFitting;return r+=a(r*c,s),h+=a(h*c,s),{increment:o,rx:r,ry:h}}(s,i,n)).opset}function r(t){return t.randomizer||(t.randomizer=new e(t.seed||0)),t.randomizer.next()}function h(t,e,s,i=1){return s.roughness*i*(r(s)*(e-t)+t)}function a(t,e,s=1){return h(-t,t,e,s)}function c(t,e,s,i,n,o=!1){const r=o?n.disableMultiStrokeFill:n.disableMultiStroke,h=u(t,e,s,i,n,!0,!1);if(r)return h;const a=u(t,e,s,i,n,!0,!0);return h.concat(a)}function u(t,e,s,i,n,o,h){const c=Math.pow(t-s,2)+Math.pow(e-i,2),u=Math.sqrt(c);let f=1;f=u<200?1:u>500?.4:-.0016668*u+1.233334;let l=n.maxRandomnessOffset||0;l*l*100>c&&(l=u/10);const g=l/2,d=.2+.2*r(n);let p=n.bowing*n.maxRandomnessOffset*(i-e)/200,_=n.bowing*n.maxRandomnessOffset*(t-s)/200;p=a(p,n,f),_=a(_,n,f);const m=[],w=()=>a(g,n,f),v=()=>a(l,n,f);return o&&(h?m.push({op:"move",data:[t+w(),e+w()]}):m.push({op:"move",data:[t+a(l,n,f),e+a(l,n,f)]})),h?m.push({op:"bcurveTo",data:[p+t+(s-t)*d+w(),_+e+(i-e)*d+w(),p+t+2*(s-t)*d+w(),_+e+2*(i-e)*d+w(),s+w(),i+w()]}):m.push({op:"bcurveTo",data:[p+t+(s-t)*d+v(),_+e+(i-e)*d+v(),p+t+2*(s-t)*d+v(),_+e+2*(i-e)*d+v(),s+v(),i+v()]}),m}function f(t,e,s){const i=t.length,n=[];if(i>3){const o=[],r=1-s.curveTightness;n.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<i;e++){const s=t[e];o[0]=[s[0],s[1]],o[1]=[s[0]+(r*t[e+1][0]-r*t[e-1][0])/6,s[1]+(r*t[e+1][1]-r*t[e-1][1])/6],o[2]=[t[e+1][0]+(r*t[e][0]-r*t[e+2][0])/6,t[e+1][1]+(r*t[e][1]-r*t[e+2][1])/6],o[3]=[t[e+1][0],t[e+1][1]],n.push({op:"bcurveTo",data:[o[1][0],o[1][1],o[2][0],o[2][1],o[3][0],o[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;n.push({op:"lineTo",data:[e[0]+a(t,s),e[1]+a(t,s)]})}}else 3===i?(n.push({op:"move",data:[t[1][0],t[1][1]]}),n.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===i&&n.push(...c(t[0][0],t[0][1],t[1][0],t[1][1],s));return n}function l(t,e,s,i,n,o,r,h){const c=[],u=[],f=a(.5,h)-Math.PI/2;u.push([a(o,h)+e+.9*i*Math.cos(f-t),a(o,h)+s+.9*n*Math.sin(f-t)]);for(let r=f;r<2*Math.PI+f-.01;r+=t){const t=[a(o,h)+e+i*Math.cos(r),a(o,h)+s+n*Math.sin(r)];c.push(t),u.push(t)}return u.push([a(o,h)+e+i*Math.cos(f+2*Math.PI+.5*r),a(o,h)+s+n*Math.sin(f+2*Math.PI+.5*r)]),u.push([a(o,h)+e+.98*i*Math.cos(f+r),a(o,h)+s+.98*n*Math.sin(f+r)]),u.push([a(o,h)+e+.9*i*Math.cos(f+.5*r),a(o,h)+s+.9*n*Math.sin(f+.5*r)]),[u,c]}function g(t,e){return{maxRandomnessOffset:2,roughness:"highlight"===t?3:1.5,bowing:1,stroke:"#000",strokeWidth:1.5,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,combineNestedSvgPaths:!1,disableMultiStroke:"double"!==t,disableMultiStrokeFill:!1,seed:e}}function d(e,r,h,a,c,u){const f=[];let l=h.strokeWidth||2;const d=function(t){const e=t.padding;if(e||0===e){if("number"==typeof e)return[e,e,e,e];if(Array.isArray(e)){const t=e;if(t.length)switch(t.length){case 4:return[...t];case 1:return[t[0],t[0],t[0],t[0]];case 2:return[...t,...t];case 3:return[...t,t[1]];default:return[t[0],t[1],t[2],t[3]]}}}return[5,5,5,5]}(h),p=void 0===h.animate||!!h.animate,_=h.iterations||2,m=g("single",u);switch(h.type){case"underline":{const t=r.y+r.h+d[2];for(let e=0;e<_;e++)e%2?f.push(s(r.x+r.w,t,r.x,t,m)):f.push(s(r.x,t,r.x+r.w,t,m));break}case"strike-through":{const t=r.y+r.h/2;for(let e=0;e<_;e++)e%2?f.push(s(r.x+r.w,t,r.x,t,m)):f.push(s(r.x,t,r.x+r.w,t,m));break}case"box":{const t=r.x-d[3],e=r.y-d[0],s=r.w+(d[1]+d[3]),i=r.h+(d[0]+d[2]);for(let o=0;o<_;o++)f.push(n(t,e,s,i,m));break}case"bracket":{const t=Array.isArray(h.brackets)?h.brackets:h.brackets?[h.brackets]:["right"],e=r.x-2*d[3],s=r.x+r.w+2*d[1],n=r.y-2*d[0],o=r.y+r.h+2*d[2];for(const h of t){let t;switch(h){case"bottom":t=[[e,r.y+r.h],[e,o],[s,o],[s,r.y+r.h]];break;case"top":t=[[e,r.y],[e,n],[s,n],[s,r.y]];break;case"left":t=[[r.x,n],[e,n],[e,o],[r.x,o]];break;case"right":t=[[r.x+r.w,n],[s,n],[s,o],[r.x+r.w,o]]}t&&f.push(i(t,!1,m))}break}case"crossed-off":{const t=r.x,e=r.y,i=t+r.w,n=e+r.h;for(let o=0;o<_;o++)o%2?f.push(s(i,n,t,e,m)):f.push(s(t,e,i,n,m));for(let o=0;o<_;o++)o%2?f.push(s(t,n,i,e,m)):f.push(s(i,e,t,n,m));break}case"circle":{const t=g("double",u),e=r.w+(d[1]+d[3]),s=r.h+(d[0]+d[2]),i=r.x-d[3]+e/2,n=r.y-d[0]+s/2,h=Math.floor(_/2),a=_-2*h;for(let r=0;r<h;r++)f.push(o(i,n,e,s,t));for(let t=0;t<a;t++)f.push(o(i,n,e,s,m));break}case"highlight":{const t=g("highlight",u);l=.95*r.h;const e=r.y+r.h/2;for(let i=0;i<_;i++)i%2?f.push(s(r.x+r.w,e,r.x,e,t)):f.push(s(r.x,e,r.x+r.w,e,t));break}}if(f.length){const s=function(t){const e=[];for(const s of t){let t="";for(const i of s.ops){const s=i.data;switch(i.op){case"move":t.trim()&&e.push(t.trim()),t=`M${s[0]} ${s[1]} `;break;case"bcurveTo":t+=`C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;break;case"lineTo":t+=`L${s[0]} ${s[1]} `}}t.trim()&&e.push(t.trim())}return e}(f),i=[],n=[];let o=0;const r=(t,e,s)=>t.setAttribute(e,s);for(const a of s){const s=document.createElementNS(t,"path");if(r(s,"d",a),r(s,"fill","none"),r(s,"stroke",h.color||"currentColor"),r(s,"stroke-width",""+l),p){const t=s.getTotalLength();i.push(t),o+=t}e.appendChild(s),n.push(s)}if(p){let t=0;for(let e=0;e<n.length;e++){const s=n[e],r=i[e],h=o?c*(r/o):0,u=a+t,f=s.style;f.strokeDashoffset=""+r,f.strokeDasharray=""+r,f.animation=`rough-notation-dash ${h}ms ease-out ${u}ms forwards`,t+=h}}}}class p{constructor(t,e){this._state="unattached",this._resizing=!1,this._seed=Math.floor(Math.random()*2**31),this._lastSizes=[],this._animationDelay=0,this._resizeListener=()=>{this._resizing||(this._resizing=!0,setTimeout(()=>{this._resizing=!1,"showing"===this._state&&this.haveRectsChanged()&&this.show()},400))},this._e=t,this._config=JSON.parse(JSON.stringify(e)),this.attach()}get animate(){return this._config.animate}set animate(t){this._config.animate=t}get animationDuration(){return this._config.animationDuration}set animationDuration(t){this._config.animationDuration=t}get iterations(){return this._config.iterations}set iterations(t){this._config.iterations=t}get color(){return this._config.color}set color(t){this._config.color!==t&&(this._config.color=t,this.refresh())}get strokeWidth(){return this._config.strokeWidth}set strokeWidth(t){this._config.strokeWidth!==t&&(this._config.strokeWidth=t,this.refresh())}get padding(){return this._config.padding}set padding(t){this._config.padding!==t&&(this._config.padding=t,this.refresh())}attach(){if("unattached"===this._state&&this._e.parentElement){!function(){if(!window.__rno_kf_s){const t=window.__rno_kf_s=document.createElement("style");t.textContent="@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }",document.head.appendChild(t)}}();const e=this._svg=document.createElementNS(t,"svg");e.setAttribute("class","rough-annotation");const s=e.style;s.position="absolute",s.top="0",s.left="0",s.overflow="visible",s.pointerEvents="none",s.width="100px",s.height="100px";const i="highlight"===this._config.type;if(this._e.insertAdjacentElement(i?"beforebegin":"afterend",e),this._state="not-showing",i){const t=window.getComputedStyle(this._e).position;(!t||"static"===t)&&(this._e.style.position="relative")}this.attachListeners()}}detachListeners(){window.removeEventListener("resize",this._resizeListener),this._ro&&this._ro.unobserve(this._e)}attachListeners(){this.detachListeners(),window.addEventListener("resize",this._resizeListener,{passive:!0}),!this._ro&&"ResizeObserver"in window&&(this._ro=new window.ResizeObserver(t=>{for(const e of t)e.contentRect&&this._resizeListener()})),this._ro&&this._ro.observe(this._e)}haveRectsChanged(){if(this._lastSizes.length){const t=this.rects();if(t.length!==this._lastSizes.length)return!0;for(let e=0;e<t.length;e++)if(!this.isSameRect(t[e],this._lastSizes[e]))return!0}return!1}isSameRect(t,e){const s=(t,e)=>Math.round(t)===Math.round(e);return s(t.x,e.x)&&s(t.y,e.y)&&s(t.w,e.w)&&s(t.h,e.h)}isShowing(){return"not-showing"!==this._state}refresh(){this.isShowing()&&!this.pendingRefresh&&(this.pendingRefresh=Promise.resolve().then(()=>{this.isShowing()&&this.show(),delete this.pendingRefresh}))}show(){switch(this._state){case"unattached":break;case"showing":this.hide(),this._svg&&this.render(this._svg,!0);break;case"not-showing":this.attach(),this._svg&&this.render(this._svg,!1)}}hide(){if(this._svg)for(;this._svg.lastChild;)this._svg.removeChild(this._svg.lastChild);this._state="not-showing"}remove(){this._svg&&this._svg.parentElement&&this._svg.parentElement.removeChild(this._svg),this._svg=void 0,this._state="unattached",this.detachListeners()}render(t,e){let s=this._config;e&&(s=JSON.parse(JSON.stringify(this._config)),s.animate=!1);const i=this.rects();let n=0;i.forEach(t=>n+=t.w);const o=s.animationDuration||800;let r=0;for(let e=0;e<i.length;e++){const h=o*(i[e].w/n);d(t,i[e],s,r+this._animationDelay,h,this._seed),r+=h}this._lastSizes=i,this._state="showing"}rects(){const t=[];if(this._svg)if(this._config.multiline){const e=this._e.getClientRects();for(let s=0;s<e.length;s++)t.push(this.svgRect(this._svg,e[s]))}else t.push(this.svgRect(this._svg,this._e.getBoundingClientRect()));return t}svgRect(t,e){const s=t.getBoundingClientRect(),i=e;return{x:(i.x||i.left)-(s.x||s.left),y:(i.y||i.top)-(s.y||s.top),w:i.width,h:i.height}}}exports.annotate=function(t,e){return new p(t,e)},exports.annotationGroup=function(t){let e=0;for(const s of t){const t=s;t._animationDelay=e;e+=0===t.animationDuration?0:t.animationDuration||800}const s=[...t];return{show(){for(const t of s)t.show()},hide(){for(const t of s)t.hide()}}};

},{}],"2Pa9L":[function(require,module,exports) {
var define;

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.Alpine = factory());
})(this, function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  } // Thanks @stimulus:
  // https://github.com/stimulusjs/stimulus/blob/master/packages/%40stimulus/core/src/application.ts


  function domReady() {
    return new Promise(resolve => {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", resolve);
      } else {
        resolve();
      }
    });
  }

  function arrayUnique(array) {
    return Array.from(new Set(array));
  }

  function isTesting() {
    return navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom");
  }

  function warnIfMalformedTemplate(el, directive) {
    if (el.tagName.toLowerCase() !== 'template') {
      console.warn(`Alpine: [${directive}] directive should only be added to <template> tags. See https://github.com/alpinejs/alpine#${directive}`);
    } else if (el.content.childElementCount !== 1) {
      console.warn(`Alpine: <template> tag with [${directive}] encountered with multiple element roots. Make sure <template> only has a single child element.`);
    }
  }

  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[_\s]/, '-').toLowerCase();
  }

  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }

  function walk(el, callback) {
    if (callback(el) === false) return;
    let node = el.firstElementChild;

    while (node) {
      walk(node, callback);
      node = node.nextElementSibling;
    }
  }

  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function saferEval(expression, dataContext, additionalHelperVariables = {}) {
    if (typeof expression === 'function') {
      return expression.call(dataContext);
    }

    return new Function(['$data', ...Object.keys(additionalHelperVariables)], `var __alpine_result; with($data) { __alpine_result = ${expression} }; return __alpine_result`)(dataContext, ...Object.values(additionalHelperVariables));
  }

  function saferEvalNoReturn(expression, dataContext, additionalHelperVariables = {}) {
    if (typeof expression === 'function') {
      return Promise.resolve(expression.call(dataContext, additionalHelperVariables['$event']));
    }

    let AsyncFunction = Function;
    /* MODERN-ONLY:START */

    AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    /* MODERN-ONLY:END */
    // For the cases when users pass only a function reference to the caller: `x-on:click="foo"`
    // Where "foo" is a function. Also, we'll pass the function the event instance when we call it.

    if (Object.keys(dataContext).includes(expression)) {
      let methodReference = new Function(['dataContext', ...Object.keys(additionalHelperVariables)], `with(dataContext) { return ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables));

      if (typeof methodReference === 'function') {
        return Promise.resolve(methodReference.call(dataContext, additionalHelperVariables['$event']));
      } else {
        return Promise.resolve();
      }
    }

    return Promise.resolve(new AsyncFunction(['dataContext', ...Object.keys(additionalHelperVariables)], `with(dataContext) { ${expression} }`)(dataContext, ...Object.values(additionalHelperVariables)));
  }

  const xAttrRE = /^x-(on|bind|data|text|html|model|if|for|show|cloak|transition|ref|spread)\b/;

  function isXAttr(attr) {
    const name = replaceAtAndColonWithStandardSyntax(attr.name);
    return xAttrRE.test(name);
  }

  function getXAttrs(el, component, type) {
    let directives = Array.from(el.attributes).filter(isXAttr).map(parseHtmlAttribute); // Get an object of directives from x-spread.

    let spreadDirective = directives.filter(directive => directive.type === 'spread')[0];

    if (spreadDirective) {
      let spreadObject = saferEval(spreadDirective.expression, component.$data); // Add x-spread directives to the pile of existing directives.

      directives = directives.concat(Object.entries(spreadObject).map(([name, value]) => parseHtmlAttribute({
        name,
        value
      })));
    }

    if (type) return directives.filter(i => i.type === type);
    return sortDirectives(directives);
  }

  function sortDirectives(directives) {
    let directiveOrder = ['bind', 'model', 'show', 'catch-all'];
    return directives.sort((a, b) => {
      let typeA = directiveOrder.indexOf(a.type) === -1 ? 'catch-all' : a.type;
      let typeB = directiveOrder.indexOf(b.type) === -1 ? 'catch-all' : b.type;
      return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
    });
  }

  function parseHtmlAttribute({
    name,
    value
  }) {
    const normalizedName = replaceAtAndColonWithStandardSyntax(name);
    const typeMatch = normalizedName.match(xAttrRE);
    const valueMatch = normalizedName.match(/:([a-zA-Z0-9\-:]+)/);
    const modifiers = normalizedName.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map(i => i.replace('.', '')),
      expression: value
    };
  }

  function isBooleanAttr(attrName) {
    // As per HTML spec table https://html.spec.whatwg.org/multipage/indices.html#attributes-3:boolean-attribute
    // Array roughly ordered by estimated usage
    const booleanAttributes = ['disabled', 'checked', 'required', 'readonly', 'hidden', 'open', 'selected', 'autofocus', 'itemscope', 'multiple', 'novalidate', 'allowfullscreen', 'allowpaymentrequest', 'formnovalidate', 'autoplay', 'controls', 'loop', 'muted', 'playsinline', 'default', 'ismap', 'reversed', 'async', 'defer', 'nomodule'];
    return booleanAttributes.includes(attrName);
  }

  function replaceAtAndColonWithStandardSyntax(name) {
    if (name.startsWith('@')) {
      return name.replace('@', 'x-on:');
    } else if (name.startsWith(':')) {
      return name.replace(':', 'x-bind:');
    }

    return name;
  }

  function convertClassStringToArray(classList, filterFn = Boolean) {
    return classList.split(' ').filter(filterFn);
  }

  const TRANSITION_TYPE_IN = 'in';
  const TRANSITION_TYPE_OUT = 'out';

  function transitionIn(el, show, component, forceSkip = false) {
    // We don't want to transition on the initial page load.
    if (forceSkip) return show();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_IN) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, 'transition');
    const showAttr = getXAttrs(el, component, 'show')[0]; // If this is triggered by a x-show.transition.

    if (showAttr && showAttr.modifiers.includes('transition')) {
      let modifiers = showAttr.modifiers; // If x-show.transition.out, we'll skip the "in" transition.

      if (modifiers.includes('out') && !modifiers.includes('in')) return show();
      const settingBothSidesOfTransition = modifiers.includes('in') && modifiers.includes('out'); // If x-show.transition.in...out... only use "in" related modifiers for this transition.

      modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index < modifiers.indexOf('out')) : modifiers;
      transitionHelperIn(el, modifiers, show); // Otherwise, we can assume x-transition:enter.
    } else if (attrs.some(attr => ['enter', 'enter-start', 'enter-end'].includes(attr.value))) {
      transitionClassesIn(el, component, attrs, show);
    } else {
      // If neither, just show that damn thing.
      show();
    }
  }

  function transitionOut(el, hide, component, forceSkip = false) {
    // We don't want to transition on the initial page load.
    if (forceSkip) return hide();

    if (el.__x_transition && el.__x_transition.type === TRANSITION_TYPE_OUT) {
      // there is already a similar transition going on, this was probably triggered by
      // a change in a different property, let's just leave the previous one doing its job
      return;
    }

    const attrs = getXAttrs(el, component, 'transition');
    const showAttr = getXAttrs(el, component, 'show')[0];

    if (showAttr && showAttr.modifiers.includes('transition')) {
      let modifiers = showAttr.modifiers;
      if (modifiers.includes('in') && !modifiers.includes('out')) return hide();
      const settingBothSidesOfTransition = modifiers.includes('in') && modifiers.includes('out');
      modifiers = settingBothSidesOfTransition ? modifiers.filter((i, index) => index > modifiers.indexOf('out')) : modifiers;
      transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hide);
    } else if (attrs.some(attr => ['leave', 'leave-start', 'leave-end'].includes(attr.value))) {
      transitionClassesOut(el, component, attrs, hide);
    } else {
      hide();
    }
  }

  function transitionHelperIn(el, modifiers, showCallback) {
    // Default values inspired by: https://material.io/design/motion/speed.html#duration
    const styleValues = {
      duration: modifierValue(modifiers, 'duration', 150),
      origin: modifierValue(modifiers, 'origin', 'center'),
      first: {
        opacity: 0,
        scale: modifierValue(modifiers, 'scale', 95)
      },
      second: {
        opacity: 1,
        scale: 100
      }
    };
    transitionHelper(el, modifiers, showCallback, () => {}, styleValues, TRANSITION_TYPE_IN);
  }

  function transitionHelperOut(el, modifiers, settingBothSidesOfTransition, hideCallback) {
    // Make the "out" transition .5x slower than the "in". (Visually better)
    // HOWEVER, if they explicitly set a duration for the "out" transition,
    // use that.
    const duration = settingBothSidesOfTransition ? modifierValue(modifiers, 'duration', 150) : modifierValue(modifiers, 'duration', 150) / 2;
    const styleValues = {
      duration: duration,
      origin: modifierValue(modifiers, 'origin', 'center'),
      first: {
        opacity: 1,
        scale: 100
      },
      second: {
        opacity: 0,
        scale: modifierValue(modifiers, 'scale', 95)
      }
    };
    transitionHelper(el, modifiers, () => {}, hideCallback, styleValues, TRANSITION_TYPE_OUT);
  }

  function modifierValue(modifiers, key, fallback) {
    // If the modifier isn't present, use the default.
    if (modifiers.indexOf(key) === -1) return fallback; // If it IS present, grab the value after it: x-show.transition.duration.500ms

    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue) return fallback;

    if (key === 'scale') {
      // Check if the very next value is NOT a number and return the fallback.
      // If x-show.transition.scale, we'll use the default scale value.
      // That is how a user opts out of the opacity transition.
      if (!isNumeric(rawValue)) return fallback;
    }

    if (key === 'duration') {
      // Support x-show.transition.duration.500ms && duration.500
      let match = rawValue.match(/([0-9]+)ms/);
      if (match) return match[1];
    }

    if (key === 'origin') {
      // Support chaining origin directions: x-show.transition.top.right
      if (['top', 'right', 'left', 'center', 'bottom'].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(' ');
      }
    }

    return rawValue;
  }

  function transitionHelper(el, modifiers, hook1, hook2, styleValues, type) {
    // clear the previous transition if exists to avoid caching the wrong styles
    if (el.__x_transition) {
      cancelAnimationFrame(el.__x_transition.nextFrame);
      el.__x_transition.callback && el.__x_transition.callback();
    } // If the user set these style values, we'll put them back when we're done with them.


    const opacityCache = el.style.opacity;
    const transformCache = el.style.transform;
    const transformOriginCache = el.style.transformOrigin; // If no modifiers are present: x-show.transition, we'll default to both opacity and scale.

    const noModifiers = !modifiers.includes('opacity') && !modifiers.includes('scale');
    const transitionOpacity = noModifiers || modifiers.includes('opacity');
    const transitionScale = noModifiers || modifiers.includes('scale'); // These are the explicit stages of a transition (same stages for in and for out).
    // This way you can get a birds eye view of the hooks, and the differences
    // between them.

    const stages = {
      start() {
        if (transitionOpacity) el.style.opacity = styleValues.first.opacity;
        if (transitionScale) el.style.transform = `scale(${styleValues.first.scale / 100})`;
      },

      during() {
        if (transitionScale) el.style.transformOrigin = styleValues.origin;
        el.style.transitionProperty = [transitionOpacity ? `opacity` : ``, transitionScale ? `transform` : ``].join(' ').trim();
        el.style.transitionDuration = `${styleValues.duration / 1000}s`;
        el.style.transitionTimingFunction = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
      },

      show() {
        hook1();
      },

      end() {
        if (transitionOpacity) el.style.opacity = styleValues.second.opacity;
        if (transitionScale) el.style.transform = `scale(${styleValues.second.scale / 100})`;
      },

      hide() {
        hook2();
      },

      cleanup() {
        if (transitionOpacity) el.style.opacity = opacityCache;
        if (transitionScale) el.style.transform = transformCache;
        if (transitionScale) el.style.transformOrigin = transformOriginCache;
        el.style.transitionProperty = null;
        el.style.transitionDuration = null;
        el.style.transitionTimingFunction = null;
      }

    };
    transition(el, stages, type);
  }

  function transitionClassesIn(el, component, directives, showCallback) {
    let ensureStringExpression = expression => {
      return typeof expression === 'function' ? component.evaluateReturnExpression(el, expression) : expression;
    };

    const enter = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter') || {
      expression: ''
    }).expression));
    const enterStart = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter-start') || {
      expression: ''
    }).expression));
    const enterEnd = convertClassStringToArray(ensureStringExpression((directives.find(i => i.value === 'enter-end') || {
      expression: ''
    }).expression));
    transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {}, TRANSITION_TYPE_IN);
  }

  function transitionClassesOut(el, component, directives, hideCallback) {
    const leave = convertClassStringToArray((directives.find(i => i.value === 'leave') || {
      expression: ''
    }).expression);
    const leaveStart = convertClassStringToArray((directives.find(i => i.value === 'leave-start') || {
      expression: ''
    }).expression);
    const leaveEnd = convertClassStringToArray((directives.find(i => i.value === 'leave-end') || {
      expression: ''
    }).expression);
    transitionClasses(el, leave, leaveStart, leaveEnd, () => {}, hideCallback, TRANSITION_TYPE_OUT);
  }

  function transitionClasses(el, classesDuring, classesStart, classesEnd, hook1, hook2, type) {
    // clear the previous transition if exists to avoid caching the wrong classes
    if (el.__x_transition) {
      cancelAnimationFrame(el.__x_transition.nextFrame);
      el.__x_transition.callback && el.__x_transition.callback();
    }

    const originalClasses = el.__x_original_classes || [];
    const stages = {
      start() {
        el.classList.add(...classesStart);
      },

      during() {
        el.classList.add(...classesDuring);
      },

      show() {
        hook1();
      },

      end() {
        // Don't remove classes that were in the original class attribute.
        el.classList.remove(...classesStart.filter(i => !originalClasses.includes(i)));
        el.classList.add(...classesEnd);
      },

      hide() {
        hook2();
      },

      cleanup() {
        el.classList.remove(...classesDuring.filter(i => !originalClasses.includes(i)));
        el.classList.remove(...classesEnd.filter(i => !originalClasses.includes(i)));
      }

    };
    transition(el, stages, type);
  }

  function transition(el, stages, type) {
    el.__x_transition = {
      // Set transition type so we can avoid clearing transition if the direction is the same
      type: type,
      // create a callback for the last stages of the transition so we can call it
      // from different point and early terminate it. Once will ensure that function
      // is only called one time.
      callback: once(() => {
        stages.hide(); // Adding an "isConnected" check, in case the callback
        // removed the element from the DOM.

        if (el.isConnected) {
          stages.cleanup();
        }

        delete el.__x_transition;
      }),
      // This store the next animation frame so we can cancel it
      nextFrame: null
    };
    stages.start();
    stages.during();
    el.__x_transition.nextFrame = requestAnimationFrame(() => {
      // Note: Safari's transitionDuration property will list out comma separated transition durations
      // for every single transition property. Let's grab the first one and call it a day.
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1000;

      if (duration === 0) {
        duration = Number(getComputedStyle(el).animationDuration.replace('s', '')) * 1000;
      }

      stages.show();
      el.__x_transition.nextFrame = requestAnimationFrame(() => {
        stages.end();
        setTimeout(el.__x_transition.callback, duration);
      });
    });
  }

  function isNumeric(subject) {
    return !isNaN(subject);
  } // Thanks @vuejs
  // https://github.com/vuejs/vue/blob/4de4649d9637262a9b007720b59f80ac72a5620c/src/shared/util.js


  function once(callback) {
    let called = false;
    return function () {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      }
    };
  }

  function handleForDirective(component, templateEl, expression, initialUpdate, extraVars) {
    warnIfMalformedTemplate(templateEl, 'x-for');
    let iteratorNames = typeof expression === 'function' ? parseForExpression(component.evaluateReturnExpression(templateEl, expression)) : parseForExpression(expression);
    let items = evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, templateEl, iteratorNames, extraVars); // As we walk the array, we'll also walk the DOM (updating/creating as we go).

    let currentEl = templateEl;
    items.forEach((item, index) => {
      let iterationScopeVariables = getIterationScopeVariables(iteratorNames, item, index, items, extraVars());
      let currentKey = generateKeyForIteration(component, templateEl, index, iterationScopeVariables);
      let nextEl = lookAheadForMatchingKeyedElementAndMoveItIfFound(currentEl.nextElementSibling, currentKey); // If we haven't found a matching key, insert the element at the current position.

      if (!nextEl) {
        nextEl = addElementInLoopAfterCurrentEl(templateEl, currentEl); // And transition it in if it's not the first page load.

        transitionIn(nextEl, () => {}, component, initialUpdate);
        nextEl.__x_for = iterationScopeVariables;
        component.initializeElements(nextEl, () => nextEl.__x_for); // Otherwise update the element we found.
      } else {
        // Temporarily remove the key indicator to allow the normal "updateElements" to work.
        delete nextEl.__x_for_key;
        nextEl.__x_for = iterationScopeVariables;
        component.updateElements(nextEl, () => nextEl.__x_for);
      }

      currentEl = nextEl;
      currentEl.__x_for_key = currentKey;
    });
    removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component);
  } // This was taken from VueJS 2.* core. Thanks Vue!


  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\(|\)$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch) return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].trim().replace(stripParensRE, '');
    let iteratorMatch = item.match(forIteratorRE);

    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, '').trim();
      res.index = iteratorMatch[1].trim();

      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }

    return res;
  }

  function getIterationScopeVariables(iteratorNames, item, index, items, extraVars) {
    // We must create a new object, so each iteration has a new scope
    let scopeVariables = extraVars ? _objectSpread2({}, extraVars) : {};
    scopeVariables[iteratorNames.item] = item;
    if (iteratorNames.index) scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection) scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }

  function generateKeyForIteration(component, el, index, iterationScopeVariables) {
    let bindKeyAttribute = getXAttrs(el, component, 'bind').filter(attr => attr.value === 'key')[0]; // If the dev hasn't specified a key, just return the index of the iteration.

    if (!bindKeyAttribute) return index;
    return component.evaluateReturnExpression(el, bindKeyAttribute.expression, () => iterationScopeVariables);
  }

  function evaluateItemsAndReturnEmptyIfXIfIsPresentAndFalseOnElement(component, el, iteratorNames, extraVars) {
    let ifAttribute = getXAttrs(el, component, 'if')[0];

    if (ifAttribute && !component.evaluateReturnExpression(el, ifAttribute.expression)) {
      return [];
    } // This adds support for the `i in n` syntax.


    if (isNumeric(iteratorNames.items)) {
      return Array.from(Array(parseInt(iteratorNames.items, 10)).keys(), i => i + 1);
    }

    return component.evaluateReturnExpression(el, iteratorNames.items, extraVars);
  }

  function addElementInLoopAfterCurrentEl(templateEl, currentEl) {
    let clone = document.importNode(templateEl.content, true);
    currentEl.parentElement.insertBefore(clone, currentEl.nextElementSibling);
    return currentEl.nextElementSibling;
  }

  function lookAheadForMatchingKeyedElementAndMoveItIfFound(nextEl, currentKey) {
    if (!nextEl) return; // If the the key's DO match, no need to look ahead.

    if (nextEl.__x_for_key === currentKey) return nextEl; // If they don't, we'll look ahead for a match.
    // If we find it, we'll move it to the current position in the loop.

    let tmpNextEl = nextEl;

    while (tmpNextEl) {
      if (tmpNextEl.__x_for_key === currentKey) {
        return tmpNextEl.parentElement.insertBefore(tmpNextEl, nextEl);
      }

      tmpNextEl = tmpNextEl.nextElementSibling && tmpNextEl.nextElementSibling.__x_for_key !== undefined ? tmpNextEl.nextElementSibling : false;
    }
  }

  function removeAnyLeftOverElementsFromPreviousUpdate(currentEl, component) {
    var nextElementFromOldLoop = currentEl.nextElementSibling && currentEl.nextElementSibling.__x_for_key !== undefined ? currentEl.nextElementSibling : false;

    while (nextElementFromOldLoop) {
      let nextElementFromOldLoopImmutable = nextElementFromOldLoop;
      let nextSibling = nextElementFromOldLoop.nextElementSibling;
      transitionOut(nextElementFromOldLoop, () => {
        nextElementFromOldLoopImmutable.remove();
      }, component);
      nextElementFromOldLoop = nextSibling && nextSibling.__x_for_key !== undefined ? nextSibling : false;
    }
  }

  function handleAttributeBindingDirective(component, el, attrName, expression, extraVars, attrType, modifiers) {
    var value = component.evaluateReturnExpression(el, expression, extraVars);

    if (attrName === 'value') {
      if (Alpine.ignoreFocusedForValueBinding && document.activeElement.isSameNode(el)) return; // If nested model key is undefined, set the default value to empty string.

      if (value === undefined && expression.match(/\./)) {
        value = '';
      }

      if (el.type === 'radio') {
        // Set radio value from x-bind:value, if no "value" attribute exists.
        // If there are any initial state values, radio will have a correct
        // "checked" value since x-bind:value is processed before x-model.
        if (el.attributes.value === undefined && attrType === 'bind') {
          el.value = value;
        } else if (attrType !== 'bind') {
          el.checked = el.value == value;
        }
      } else if (el.type === 'checkbox') {
        // If we are explicitly binding a string to the :value, set the string,
        // If the value is a boolean, leave it alone, it will be set to "on"
        // automatically.
        if (typeof value === 'string' && attrType === 'bind') {
          el.value = value;
        } else if (attrType !== 'bind') {
          if (Array.isArray(value)) {
            // I'm purposely not using Array.includes here because it's
            // strict, and because of Numeric/String mis-casting, I
            // want the "includes" to be "fuzzy".
            el.checked = value.some(val => val == el.value);
          } else {
            el.checked = !!value;
          }
        }
      } else if (el.tagName === 'SELECT') {
        updateSelect(el, value);
      } else {
        if (el.value === value) return;
        el.value = value;
      }
    } else if (attrName === 'class') {
      if (Array.isArray(value)) {
        const originalClasses = el.__x_original_classes || [];
        el.setAttribute('class', arrayUnique(originalClasses.concat(value)).join(' '));
      } else if (typeof value === 'object') {
        // Sorting the keys / class names by their boolean value will ensure that
        // anything that evaluates to `false` and needs to remove classes is run first.
        const keysSortedByBooleanValue = Object.keys(value).sort((a, b) => value[a] - value[b]);
        keysSortedByBooleanValue.forEach(classNames => {
          if (value[classNames]) {
            convertClassStringToArray(classNames).forEach(className => el.classList.add(className));
          } else {
            convertClassStringToArray(classNames).forEach(className => el.classList.remove(className));
          }
        });
      } else {
        const originalClasses = el.__x_original_classes || [];
        const newClasses = convertClassStringToArray(value);
        el.setAttribute('class', arrayUnique(originalClasses.concat(newClasses)).join(' '));
      }
    } else {
      attrName = modifiers.includes('camel') ? camelCase(attrName) : attrName; // If an attribute's bound value is null, undefined or false, remove the attribute

      if ([null, undefined, false].includes(value)) {
        el.removeAttribute(attrName);
      } else {
        isBooleanAttr(attrName) ? setIfChanged(el, attrName, attrName) : setIfChanged(el, attrName, value);
      }
    }
  }

  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }

  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map(value => {
      return value + '';
    });
    Array.from(el.options).forEach(option => {
      option.selected = arrayWrappedValue.includes(option.value || option.text);
    });
  }

  function handleTextDirective(el, output, expression) {
    // If nested model key is undefined, set the default value to empty string.
    if (output === undefined && expression.match(/\./)) {
      output = '';
    }

    el.textContent = output;
  }

  function handleHtmlDirective(component, el, expression, extraVars) {
    el.innerHTML = component.evaluateReturnExpression(el, expression, extraVars);
  }

  function handleShowDirective(component, el, value, modifiers, initialUpdate = false) {
    const hide = () => {
      el.style.display = 'none';
    };

    const show = () => {
      if (el.style.length === 1 && el.style.display === 'none') {
        el.removeAttribute('style');
      } else {
        el.style.removeProperty('display');
      }
    };

    if (initialUpdate === true) {
      if (value) {
        show();
      } else {
        hide();
      }

      return;
    }

    const handle = resolve => {
      if (value) {
        if (el.style.display === 'none' || el.__x_transition) {
          transitionIn(el, () => {
            show();
          }, component);
        }

        resolve(() => {});
      } else {
        if (el.style.display !== 'none') {
          transitionOut(el, () => {
            resolve(() => {
              hide();
            });
          }, component);
        } else {
          resolve(() => {});
        }
      }
    }; // The working of x-show is a bit complex because we need to
    // wait for any child transitions to finish before hiding
    // some element. Also, this has to be done recursively.
    // If x-show.immediate, foregoe the waiting.


    if (modifiers.includes('immediate')) {
      handle(finish => finish());
      return;
    } // x-show is encountered during a DOM tree walk. If an element
    // we encounter is NOT a child of another x-show element we
    // can execute the previous x-show stack (if one exists).


    if (component.showDirectiveLastElement && !component.showDirectiveLastElement.contains(el)) {
      component.executeAndClearRemainingShowDirectiveStack();
    }

    component.showDirectiveStack.push(handle);
    component.showDirectiveLastElement = el;
  }

  function handleIfDirective(component, el, expressionResult, initialUpdate, extraVars) {
    warnIfMalformedTemplate(el, 'x-if');
    const elementHasAlreadyBeenAdded = el.nextElementSibling && el.nextElementSibling.__x_inserted_me === true;

    if (expressionResult && (!elementHasAlreadyBeenAdded || el.__x_transition)) {
      const clone = document.importNode(el.content, true);
      el.parentElement.insertBefore(clone, el.nextElementSibling);
      transitionIn(el.nextElementSibling, () => {}, component, initialUpdate);
      component.initializeElements(el.nextElementSibling, extraVars);
      el.nextElementSibling.__x_inserted_me = true;
    } else if (!expressionResult && elementHasAlreadyBeenAdded) {
      transitionOut(el.nextElementSibling, () => {
        el.nextElementSibling.remove();
      }, component, initialUpdate);
    }
  }

  function registerListener(component, el, event, modifiers, expression, extraVars = {}) {
    const options = {
      passive: modifiers.includes('passive')
    };

    if (modifiers.includes('camel')) {
      event = camelCase(event);
    }

    if (modifiers.includes('away')) {
      let handler = e => {
        // Don't do anything if the click came from the element or within it.
        if (el.contains(e.target)) return; // Don't do anything if this element isn't currently visible.

        if (el.offsetWidth < 1 && el.offsetHeight < 1) return; // Now that we are sure the element is visible, AND the click
        // is from outside it, let's run the expression.

        runListenerHandler(component, expression, e, extraVars);

        if (modifiers.includes('once')) {
          document.removeEventListener(event, handler, options);
        }
      }; // Listen for this event at the root level.


      document.addEventListener(event, handler, options);
    } else {
      let listenerTarget = modifiers.includes('window') ? window : modifiers.includes('document') ? document : el;

      let handler = e => {
        // Remove this global event handler if the element that declared it
        // has been removed. It's now stale.
        if (listenerTarget === window || listenerTarget === document) {
          if (!document.body.contains(el)) {
            listenerTarget.removeEventListener(event, handler, options);
            return;
          }
        }

        if (isKeyEvent(event)) {
          if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
            return;
          }
        }

        if (modifiers.includes('prevent')) e.preventDefault();
        if (modifiers.includes('stop')) e.stopPropagation(); // If the .self modifier isn't present, or if it is present and
        // the target element matches the element we are registering the
        // event on, run the handler

        if (!modifiers.includes('self') || e.target === el) {
          const returnValue = runListenerHandler(component, expression, e, extraVars);
          returnValue.then(value => {
            if (value === false) {
              e.preventDefault();
            } else {
              if (modifiers.includes('once')) {
                listenerTarget.removeEventListener(event, handler, options);
              }
            }
          });
        }
      };

      if (modifiers.includes('debounce')) {
        let nextModifier = modifiers[modifiers.indexOf('debounce') + 1] || 'invalid-wait';
        let wait = isNumeric(nextModifier.split('ms')[0]) ? Number(nextModifier.split('ms')[0]) : 250;
        handler = debounce(handler, wait);
      }

      listenerTarget.addEventListener(event, handler, options);
    }
  }

  function runListenerHandler(component, expression, e, extraVars) {
    return component.evaluateCommandExpression(e.target, expression, () => {
      return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        '$event': e
      });
    });
  }

  function isKeyEvent(event) {
    return ['keydown', 'keyup'].includes(event);
  }

  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter(i => {
      return !['window', 'document', 'prevent', 'stop'].includes(i);
    });

    if (keyModifiers.includes('debounce')) {
      let debounceIndex = keyModifiers.indexOf('debounce');
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || 'invalid-wait').split('ms')[0]) ? 2 : 1);
    } // If no modifier is specified, we'll call it a press.


    if (keyModifiers.length === 0) return false; // If one is passed, AND it matches the key pressed, we'll call it a press.

    if (keyModifiers.length === 1 && keyModifiers[0] === keyToModifier(e.key)) return false; // The user is listening for key combinations.

    const systemKeyModifiers = ['ctrl', 'shift', 'alt', 'meta', 'cmd', 'super'];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter(modifier => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter(i => !selectedSystemKeyModifiers.includes(i));

    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter(modifier => {
        // Alias "cmd" and "super" to "meta"
        if (modifier === 'cmd' || modifier === 'super') modifier = 'meta';
        return e[`${modifier}Key`];
      }); // If all the modifiers selected are pressed, ...

      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        // AND the remaining key is pressed as well. It's a press.
        if (keyModifiers[0] === keyToModifier(e.key)) return false;
      }
    } // We'll call it NOT a valid keypress.


    return true;
  }

  function keyToModifier(key) {
    switch (key) {
      case '/':
        return 'slash';

      case ' ':
      case 'Spacebar':
        return 'space';

      default:
        return key && kebabCase(key);
    }
  }

  function registerModelListener(component, el, modifiers, expression, extraVars) {
    // If the element we are binding to is a select, a radio, or checkbox
    // we'll listen for the change event instead of the "input" event.
    var event = el.tagName.toLowerCase() === 'select' || ['checkbox', 'radio'].includes(el.type) || modifiers.includes('lazy') ? 'change' : 'input';
    const listenerExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    registerListener(component, el, event, modifiers, listenerExpression, () => {
      return _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        rightSideOfExpression: generateModelAssignmentFunction(el, modifiers, expression)
      });
    });
  }

  function generateModelAssignmentFunction(el, modifiers, expression) {
    if (el.type === 'radio') {
      // Radio buttons only work properly when they share a name attribute.
      // People might assume we take care of that for them, because
      // they already set a shared "x-model" attribute.
      if (!el.hasAttribute('name')) el.setAttribute('name', expression);
    }

    return (event, currentValue) => {
      // Check for event.detail due to an issue where IE11 handles other events as a CustomEvent.
      if (event instanceof CustomEvent && event.detail) {
        return event.detail;
      } else if (el.type === 'checkbox') {
        // If the data we are binding to is an array, toggle its value inside the array.
        if (Array.isArray(currentValue)) {
          const newValue = modifiers.includes('number') ? safeParseNumber(event.target.value) : event.target.value;
          return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter(i => i !== newValue);
        } else {
          return event.target.checked;
        }
      } else if (el.tagName.toLowerCase() === 'select' && el.multiple) {
        return modifiers.includes('number') ? Array.from(event.target.selectedOptions).map(option => {
          const rawValue = option.value || option.text;
          return safeParseNumber(rawValue);
        }) : Array.from(event.target.selectedOptions).map(option => {
          return option.value || option.text;
        });
      } else {
        const rawValue = event.target.value;
        return modifiers.includes('number') ? safeParseNumber(rawValue) : modifiers.includes('trim') ? rawValue.trim() : rawValue;
      }
    };
  }

  function safeParseNumber(rawValue) {
    const number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric(number) ? number : rawValue;
  }
  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */


  const {
    isArray
  } = Array;
  const {
    getPrototypeOf,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    defineProperties: ObjectDefineProperties,
    isExtensible,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty
  } = Object;
  const {
    push: ArrayPush,
    concat: ArrayConcat,
    map: ArrayMap
  } = Array.prototype;

  function isUndefined(obj) {
    return obj === undefined;
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  function isObject(obj) {
    return typeof obj === 'object';
  }

  const proxyToValueMap = new WeakMap();

  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }

  const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  function wrapValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
  }
  /**
   * Unwrap property descriptors will set value on original descriptor
   * We only need to unwrap if value is specified
   * @param descriptor external descrpitor provided to define new property on original value
   */


  function unwrapDescriptor(descriptor) {
    if (hasOwnProperty.call(descriptor, 'value')) {
      descriptor.value = unwrap(descriptor.value);
    }

    return descriptor;
  }

  function lockShadowTarget(membrane, shadowTarget, originalTarget) {
    const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
    targetKeys.forEach(key => {
      let descriptor = getOwnPropertyDescriptor(originalTarget, key); // We do not need to wrap the descriptor if configurable
      // Because we can deal with wrapping it when user goes through
      // Get own property descriptor. There is also a chance that this descriptor
      // could change sometime in the future, so we can defer wrapping
      // until we need to

      if (!descriptor.configurable) {
        descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
      }

      ObjectDefineProperty(shadowTarget, key, descriptor);
    });
    preventExtensions(shadowTarget);
  }

  class ReactiveProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getProxy(value);
    }

    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      const oldValue = originalTarget[key];

      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated(originalTarget, key);
      } else if (key === 'length' && isArray(originalTarget)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        valueMutated(originalTarget, key);
      }

      return true;
    }

    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      delete originalTarget[key];
      valueMutated(originalTarget, key);
      return true;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    isExtensible(shadowTarget) {
      const shadowIsExtensible = isExtensible(shadowTarget);

      if (!shadowIsExtensible) {
        return shadowIsExtensible;
      }

      const {
        originalTarget,
        membrane
      } = this;
      const targetIsExtensible = isExtensible(originalTarget);

      if (!targetIsExtensible) {
        lockShadowTarget(membrane, shadowTarget, originalTarget);
      }

      return targetIsExtensible;
    }

    setPrototypeOf(shadowTarget, prototype) {}

    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf(originalTarget);
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor(originalTarget, key);

      if (isUndefined(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);

      if (!isUndefined(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value, setter or getter (if available) cannot observe
      // mutations, just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapValue);

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      const {
        originalTarget,
        membrane
      } = this;
      lockShadowTarget(membrane, shadowTarget, originalTarget);
      preventExtensions(originalTarget);
      return true;
    }

    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueMutated
      } = membrane;
      const {
        configurable
      } = descriptor; // We have to check for value in descriptor
      // because Object.freeze(proxy) calls this method
      // with only { configurable: false, writeable: false }
      // Additionally, method will only be called with writeable:false
      // if the descriptor has a value, as opposed to getter/setter
      // So we can just check if writable is present and then see if
      // value is present. This eliminates getter and setter descriptors

      if (hasOwnProperty.call(descriptor, 'writable') && !hasOwnProperty.call(descriptor, 'value')) {
        const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
        descriptor.value = originalDescriptor.value;
      }

      ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));

      if (configurable === false) {
        ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
      }

      valueMutated(originalTarget, key);
      return true;
    }

  }

  function wrapReadOnlyValue(membrane, value) {
    return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
  }

  class ReadOnlyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    }

    get(shadowTarget, key) {
      const {
        membrane,
        originalTarget
      } = this;
      const value = originalTarget[key];
      const {
        valueObserved
      } = membrane;
      valueObserved(originalTarget, key);
      return membrane.getReadOnlyProxy(value);
    }

    set(shadowTarget, key, value) {
      return false;
    }

    deleteProperty(shadowTarget, key) {
      return false;
    }

    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(target, argArray, newTarget) {
      /* No op */
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key);
      return key in originalTarget;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget
      } = this;
      return ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
    }

    setPrototypeOf(shadowTarget, prototype) {}

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane
      } = this;
      const {
        valueObserved
      } = membrane; // keys looked up via hasOwnProperty need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor(originalTarget, key);

      if (isUndefined(desc)) {
        return desc;
      }

      const shadowDescriptor = getOwnPropertyDescriptor(shadowTarget, key);

      if (!isUndefined(shadowDescriptor)) {
        return shadowDescriptor;
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value or getter (if available) cannot be observed,
      // just like regular methods, in which case we just do nothing.


      desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);

      if (hasOwnProperty.call(desc, 'set')) {
        desc.set = undefined; // readOnly membrane does not allow setters
      }

      if (!desc.configurable) {
        // If descriptor from original target is not configurable,
        // We must copy the wrapped descriptor over to the shadow target.
        // Otherwise, proxy will throw an invariant error.
        // This is our last chance to lock the value.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
        ObjectDefineProperty(shadowTarget, key, desc);
      }

      return desc;
    }

    preventExtensions(shadowTarget) {
      return false;
    }

    defineProperty(shadowTarget, key, descriptor) {
      return false;
    }

  }

  function createShadowTarget(value) {
    let shadowTarget = undefined;

    if (isArray(value)) {
      shadowTarget = [];
    } else if (isObject(value)) {
      shadowTarget = {};
    }

    return shadowTarget;
  }

  const ObjectDotPrototype = Object.prototype;

  function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
      return false;
    } // treat all non-object types, including undefined, as non-observable values


    if (typeof value !== 'object') {
      return false;
    }

    if (isArray(value)) {
      return true;
    }

    const proto = getPrototypeOf(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
  }

  const defaultValueObserved = (obj, key) => {
    /* do nothing */
  };

  const defaultValueMutated = (obj, key) => {
    /* do nothing */
  };

  const defaultValueDistortion = value => value;

  function wrapDescriptor(membrane, descriptor, getValue) {
    const {
      set,
      get
    } = descriptor;

    if (hasOwnProperty.call(descriptor, 'value')) {
      descriptor.value = getValue(membrane, descriptor.value);
    } else {
      if (!isUndefined(get)) {
        descriptor.get = function () {
          // invoking the original getter with the original target
          return getValue(membrane, get.call(unwrap(this)));
        };
      }

      if (!isUndefined(set)) {
        descriptor.set = function (value) {
          // At this point we don't have a clear indication of whether
          // or not a valid mutation will occur, we don't have the key,
          // and we are not sure why and how they are invoking this setter.
          // Nevertheless we preserve the original semantics by invoking the
          // original setter with the original target and the unwrapped value
          set.call(unwrap(this), membrane.unwrapProxy(value));
        };
      }
    }

    return descriptor;
  }

  class ReactiveMembrane {
    constructor(options) {
      this.valueDistortion = defaultValueDistortion;
      this.valueMutated = defaultValueMutated;
      this.valueObserved = defaultValueObserved;
      this.valueIsObservable = defaultValueIsObservable;
      this.objectGraph = new WeakMap();

      if (!isUndefined(options)) {
        const {
          valueDistortion,
          valueMutated,
          valueObserved,
          valueIsObservable
        } = options;
        this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
        this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
      }
    }

    getProxy(value) {
      const unwrappedValue = unwrap(value);
      const distorted = this.valueDistortion(unwrappedValue);

      if (this.valueIsObservable(distorted)) {
        const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
        // we return the readonly.

        return o.readOnly === value ? value : o.reactive;
      }

      return distorted;
    }

    getReadOnlyProxy(value) {
      value = unwrap(value);
      const distorted = this.valueDistortion(value);

      if (this.valueIsObservable(distorted)) {
        return this.getReactiveState(value, distorted).readOnly;
      }

      return distorted;
    }

    unwrapProxy(p) {
      return unwrap(p);
    }

    getReactiveState(value, distortedValue) {
      const {
        objectGraph
      } = this;
      let reactiveState = objectGraph.get(distortedValue);

      if (reactiveState) {
        return reactiveState;
      }

      const membrane = this;
      reactiveState = {
        get reactive() {
          const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'reactive', {
            value: proxy
          });
          return proxy;
        },

        get readOnly() {
          const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'readOnly', {
            value: proxy
          });
          return proxy;
        }

      };
      objectGraph.set(distortedValue, reactiveState);
      return reactiveState;
    }

  }
  /** version: 0.26.0 */


  function wrap(data, mutationCallback) {
    let membrane = new ReactiveMembrane({
      valueMutated(target, key) {
        mutationCallback(target, key);
      }

    });
    return {
      data: membrane.getProxy(data),
      membrane: membrane
    };
  }

  function unwrap$1(membrane, observable) {
    let unwrappedData = membrane.unwrapProxy(observable);
    let copy = {};
    Object.keys(unwrappedData).forEach(key => {
      if (['$el', '$refs', '$nextTick', '$watch'].includes(key)) return;
      copy[key] = unwrappedData[key];
    });
    return copy;
  }

  class Component {
    constructor(el, componentForClone = null) {
      this.$el = el;
      const dataAttr = this.$el.getAttribute('x-data');
      const dataExpression = dataAttr === '' ? '{}' : dataAttr;
      const initExpression = this.$el.getAttribute('x-init');
      let dataExtras = {
        $el: this.$el
      };
      let canonicalComponentElementReference = componentForClone ? componentForClone.$el : this.$el;
      Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
        Object.defineProperty(dataExtras, `$${name}`, {
          get: function get() {
            return callback(canonicalComponentElementReference);
          }
        });
      });
      this.unobservedData = componentForClone ? componentForClone.getUnobservedData() : saferEval(dataExpression, dataExtras); // Construct a Proxy-based observable. This will be used to handle reactivity.

      let {
        membrane,
        data
      } = this.wrapDataInObservable(this.unobservedData);
      this.$data = data;
      this.membrane = membrane; // After making user-supplied data methods reactive, we can now add
      // our magic properties to the original data for access.

      this.unobservedData.$el = this.$el;
      this.unobservedData.$refs = this.getRefsProxy();
      this.nextTickStack = [];

      this.unobservedData.$nextTick = callback => {
        this.nextTickStack.push(callback);
      };

      this.watchers = {};

      this.unobservedData.$watch = (property, callback) => {
        if (!this.watchers[property]) this.watchers[property] = [];
        this.watchers[property].push(callback);
      }; // Register custom magic properties.


      Object.entries(Alpine.magicProperties).forEach(([name, callback]) => {
        Object.defineProperty(this.unobservedData, `$${name}`, {
          get: function get() {
            return callback(canonicalComponentElementReference);
          }
        });
      });
      this.showDirectiveStack = [];
      this.showDirectiveLastElement;
      componentForClone || Alpine.onBeforeComponentInitializeds.forEach(callback => callback(this));
      var initReturnedCallback; // If x-init is present AND we aren't cloning (skip x-init on clone)

      if (initExpression && !componentForClone) {
        // We want to allow data manipulation, but not trigger DOM updates just yet.
        // We haven't even initialized the elements with their Alpine bindings. I mean c'mon.
        this.pauseReactivity = true;
        initReturnedCallback = this.evaluateReturnExpression(this.$el, initExpression);
        this.pauseReactivity = false;
      } // Register all our listeners and set all our attribute bindings.


      this.initializeElements(this.$el); // Use mutation observer to detect new elements being added within this component at run-time.
      // Alpine's just so darn flexible amirite?

      this.listenForNewElementsToInitialize();

      if (typeof initReturnedCallback === 'function') {
        // Run the callback returned from the "x-init" hook to allow the user to do stuff after
        // Alpine's got it's grubby little paws all over everything.
        initReturnedCallback.call(this.$data);
      }

      componentForClone || setTimeout(() => {
        Alpine.onComponentInitializeds.forEach(callback => callback(this));
      }, 0);
    }

    getUnobservedData() {
      return unwrap$1(this.membrane, this.$data);
    }

    wrapDataInObservable(data) {
      var self = this;
      let updateDom = debounce(function () {
        self.updateElements(self.$el);
      }, 0);
      return wrap(data, (target, key) => {
        if (self.watchers[key]) {
          // If there's a watcher for this specific key, run it.
          self.watchers[key].forEach(callback => callback(target[key]));
        } else if (Array.isArray(target)) {
          // Arrays are special cases, if any of the items change, we consider the array as mutated.
          Object.keys(self.watchers).forEach(fullDotNotationKey => {
            let dotNotationParts = fullDotNotationKey.split('.'); // Ignore length mutations since they would result in duplicate calls.
            // For example, when calling push, we would get a mutation for the item's key
            // and a second mutation for the length property.

            if (key === 'length') return;
            dotNotationParts.reduce((comparisonData, part) => {
              if (Object.is(target, comparisonData[part])) {
                self.watchers[fullDotNotationKey].forEach(callback => callback(target));
              }

              return comparisonData[part];
            }, self.getUnobservedData());
          });
        } else {
          // Let's walk through the watchers with "dot-notation" (foo.bar) and see
          // if this mutation fits any of them.
          Object.keys(self.watchers).filter(i => i.includes('.')).forEach(fullDotNotationKey => {
            let dotNotationParts = fullDotNotationKey.split('.'); // If this dot-notation watcher's last "part" doesn't match the current
            // key, then skip it early for performance reasons.

            if (key !== dotNotationParts[dotNotationParts.length - 1]) return; // Now, walk through the dot-notation "parts" recursively to find
            // a match, and call the watcher if one's found.

            dotNotationParts.reduce((comparisonData, part) => {
              if (Object.is(target, comparisonData)) {
                // Run the watchers.
                self.watchers[fullDotNotationKey].forEach(callback => callback(target[key]));
              }

              return comparisonData[part];
            }, self.getUnobservedData());
          });
        } // Don't react to data changes for cases like the `x-created` hook.


        if (self.pauseReactivity) return;
        updateDom();
      });
    }

    walkAndSkipNestedComponents(el, callback, initializeComponentCallback = () => {}) {
      walk(el, el => {
        // We've hit a component.
        if (el.hasAttribute('x-data')) {
          // If it's not the current one.
          if (!el.isSameNode(this.$el)) {
            // Initialize it if it's not.
            if (!el.__x) initializeComponentCallback(el); // Now we'll let that sub-component deal with itself.

            return false;
          }
        }

        return callback(el);
      });
    }

    initializeElements(rootEl, extraVars = () => {}) {
      this.walkAndSkipNestedComponents(rootEl, el => {
        // Don't touch spawns from for loop
        if (el.__x_for_key !== undefined) return false; // Don't touch spawns from if directives

        if (el.__x_inserted_me !== undefined) return false;
        this.initializeElement(el, extraVars);
      }, el => {
        el.__x = new Component(el);
      });
      this.executeAndClearRemainingShowDirectiveStack();
      this.executeAndClearNextTickStack(rootEl);
    }

    initializeElement(el, extraVars) {
      // To support class attribute merging, we have to know what the element's
      // original class attribute looked like for reference.
      if (el.hasAttribute('class') && getXAttrs(el, this).length > 0) {
        el.__x_original_classes = convertClassStringToArray(el.getAttribute('class'));
      }

      this.registerListeners(el, extraVars);
      this.resolveBoundAttributes(el, true, extraVars);
    }

    updateElements(rootEl, extraVars = () => {}) {
      this.walkAndSkipNestedComponents(rootEl, el => {
        // Don't touch spawns from for loop (and check if the root is actually a for loop in a parent, don't skip it.)
        if (el.__x_for_key !== undefined && !el.isSameNode(this.$el)) return false;
        this.updateElement(el, extraVars);
      }, el => {
        el.__x = new Component(el);
      });
      this.executeAndClearRemainingShowDirectiveStack();
      this.executeAndClearNextTickStack(rootEl);
    }

    executeAndClearNextTickStack(el) {
      // Skip spawns from alpine directives
      if (el === this.$el && this.nextTickStack.length > 0) {
        // We run the tick stack after the next frame to allow any
        // running transitions to pass the initial show stage.
        requestAnimationFrame(() => {
          while (this.nextTickStack.length > 0) {
            this.nextTickStack.shift()();
          }
        });
      }
    }

    executeAndClearRemainingShowDirectiveStack() {
      // The goal here is to start all the x-show transitions
      // and build a nested promise chain so that elements
      // only hide when the children are finished hiding.
      this.showDirectiveStack.reverse().map(thing => {
        return new Promise(resolve => {
          thing(finish => {
            resolve(finish);
          });
        });
      }).reduce((nestedPromise, promise) => {
        return nestedPromise.then(() => {
          return promise.then(finish => finish());
        });
      }, Promise.resolve(() => {})); // We've processed the handler stack. let's clear it.

      this.showDirectiveStack = [];
      this.showDirectiveLastElement = undefined;
    }

    updateElement(el, extraVars) {
      this.resolveBoundAttributes(el, false, extraVars);
    }

    registerListeners(el, extraVars) {
      getXAttrs(el, this).forEach(({
        type,
        value,
        modifiers,
        expression
      }) => {
        switch (type) {
          case 'on':
            registerListener(this, el, value, modifiers, expression, extraVars);
            break;

          case 'model':
            registerModelListener(this, el, modifiers, expression, extraVars);
            break;
        }
      });
    }

    resolveBoundAttributes(el, initialUpdate = false, extraVars) {
      let attrs = getXAttrs(el, this);
      attrs.forEach(({
        type,
        value,
        modifiers,
        expression
      }) => {
        switch (type) {
          case 'model':
            handleAttributeBindingDirective(this, el, 'value', expression, extraVars, type, modifiers);
            break;

          case 'bind':
            // The :key binding on an x-for is special, ignore it.
            if (el.tagName.toLowerCase() === 'template' && value === 'key') return;
            handleAttributeBindingDirective(this, el, value, expression, extraVars, type, modifiers);
            break;

          case 'text':
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleTextDirective(el, output, expression);
            break;

          case 'html':
            handleHtmlDirective(this, el, expression, extraVars);
            break;

          case 'show':
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleShowDirective(this, el, output, modifiers, initialUpdate);
            break;

          case 'if':
            // If this element also has x-for on it, don't process x-if.
            // We will let the "x-for" directive handle the "if"ing.
            if (attrs.some(i => i.type === 'for')) return;
            var output = this.evaluateReturnExpression(el, expression, extraVars);
            handleIfDirective(this, el, output, initialUpdate, extraVars);
            break;

          case 'for':
            handleForDirective(this, el, expression, initialUpdate, extraVars);
            break;

          case 'cloak':
            el.removeAttribute('x-cloak');
            break;
        }
      });
    }

    evaluateReturnExpression(el, expression, extraVars = () => {}) {
      return saferEval(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        $dispatch: this.getDispatchFunction(el)
      }));
    }

    evaluateCommandExpression(el, expression, extraVars = () => {}) {
      return saferEvalNoReturn(expression, this.$data, _objectSpread2(_objectSpread2({}, extraVars()), {}, {
        $dispatch: this.getDispatchFunction(el)
      }));
    }

    getDispatchFunction(el) {
      return (event, detail = {}) => {
        el.dispatchEvent(new CustomEvent(event, {
          detail,
          bubbles: true
        }));
      };
    }

    listenForNewElementsToInitialize() {
      const targetNode = this.$el;
      const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
      };
      const observer = new MutationObserver(mutations => {
        for (let i = 0; i < mutations.length; i++) {
          // Filter out mutations triggered from child components.
          const closestParentComponent = mutations[i].target.closest('[x-data]');
          if (!(closestParentComponent && closestParentComponent.isSameNode(this.$el))) continue;

          if (mutations[i].type === 'attributes' && mutations[i].attributeName === 'x-data') {
            const rawData = saferEval(mutations[i].target.getAttribute('x-data') || '{}', {
              $el: this.$el
            });
            Object.keys(rawData).forEach(key => {
              if (this.$data[key] !== rawData[key]) {
                this.$data[key] = rawData[key];
              }
            });
          }

          if (mutations[i].addedNodes.length > 0) {
            mutations[i].addedNodes.forEach(node => {
              if (node.nodeType !== 1 || node.__x_inserted_me) return;

              if (node.matches('[x-data]') && !node.__x) {
                node.__x = new Component(node);
                return;
              }

              this.initializeElements(node);
            });
          }
        }
      });
      observer.observe(targetNode, observerOptions);
    }

    getRefsProxy() {
      var self = this;
      var refObj = {}; // One of the goals of this is to not hold elements in memory, but rather re-evaluate
      // the DOM when the system needs something from it. This way, the framework is flexible and
      // friendly to outside DOM changes from libraries like Vue/Livewire.
      // For this reason, I'm using an "on-demand" proxy to fake a "$refs" object.

      return new Proxy(refObj, {
        get(object, property) {
          if (property === '$isAlpineProxy') return true;
          var ref; // We can't just query the DOM because it's hard to filter out refs in
          // nested components.

          self.walkAndSkipNestedComponents(self.$el, el => {
            if (el.hasAttribute('x-ref') && el.getAttribute('x-ref') === property) {
              ref = el;
            }
          });
          return ref;
        }

      });
    }

  }

  const Alpine = {
    version: "2.7.0",
    pauseMutationObserver: false,
    magicProperties: {},
    onComponentInitializeds: [],
    onBeforeComponentInitializeds: [],
    ignoreFocusedForValueBinding: false,
    start: async function start() {
      if (!isTesting()) {
        await domReady();
      }

      this.discoverComponents(el => {
        this.initializeComponent(el);
      }); // It's easier and more performant to just support Turbolinks than listen
      // to MutationObserver mutations at the document level.

      document.addEventListener("turbolinks:load", () => {
        this.discoverUninitializedComponents(el => {
          this.initializeComponent(el);
        });
      });
      this.listenForNewUninitializedComponentsAtRunTime(el => {
        this.initializeComponent(el);
      });
    },
    discoverComponents: function discoverComponents(callback) {
      const rootEls = document.querySelectorAll('[x-data]');
      rootEls.forEach(rootEl => {
        callback(rootEl);
      });
    },
    discoverUninitializedComponents: function discoverUninitializedComponents(callback, el = null) {
      const rootEls = (el || document).querySelectorAll('[x-data]');
      Array.from(rootEls).filter(el => el.__x === undefined).forEach(rootEl => {
        callback(rootEl);
      });
    },
    listenForNewUninitializedComponentsAtRunTime: function listenForNewUninitializedComponentsAtRunTime(callback) {
      const targetNode = document.querySelector('body');
      const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
      };
      const observer = new MutationObserver(mutations => {
        if (this.pauseMutationObserver) return;

        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes.length > 0) {
            mutations[i].addedNodes.forEach(node => {
              // Discard non-element nodes (like line-breaks)
              if (node.nodeType !== 1) return; // Discard any changes happening within an existing component.
              // They will take care of themselves.

              if (node.parentElement && node.parentElement.closest('[x-data]')) return;
              this.discoverUninitializedComponents(el => {
                this.initializeComponent(el);
              }, node.parentElement);
            });
          }
        }
      });
      observer.observe(targetNode, observerOptions);
    },
    initializeComponent: function initializeComponent(el) {
      if (!el.__x) {
        // Wrap in a try/catch so that we don't prevent other components
        // from initializing when one component contains an error.
        try {
          el.__x = new Component(el);
        } catch (error) {
          setTimeout(() => {
            throw error;
          }, 0);
        }
      }
    },
    clone: function clone(component, newEl) {
      if (!newEl.__x) {
        newEl.__x = new Component(newEl, component);
      }
    },
    addMagicProperty: function addMagicProperty(name, callback) {
      this.magicProperties[name] = callback;
    },
    onComponentInitialized: function onComponentInitialized(callback) {
      this.onComponentInitializeds.push(callback);
    },
    onBeforeComponentInitialized: function onBeforeComponentInitialized(callback) {
      this.onBeforeComponentInitializeds.push(callback);
    }
  };

  if (!isTesting()) {
    window.Alpine = Alpine;

    if (window.deferLoadingAlpine) {
      window.deferLoadingAlpine(function () {
        window.Alpine.start();
      });
    } else {
      window.Alpine.start();
    }
  }

  return Alpine;
});
},{}],"2Ot6v":[function(require,module,exports) {
// This file was automatically generated from files in src/ directory.

/*! Licensed under MIT License - http://github.com/impress/impress.js */
/**
 * impress.js
 *
 * impress.js is a presentation tool based on the power of CSS3 transforms and transitions
 * in modern browsers and inspired by the idea behind prezi.com.
 *
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz), 2016-2020 Henrik Ingo (@henrikingo)
 *
 * Released under the MIT License.
 *
 * ------------------------------------------------
 *  author:  Bartek Szopka, Henrik Ingo
 *  version: 1.1.0
 *  url:     http://impress.js.org
 *  source:  http://github.com/impress/impress.js/
 */

// You are one of those who like to know how things work inside?
// Let me show you the cogs that make impress.js run...
( function( document, window ) {
    "use strict";
    var lib;

    // HELPER FUNCTIONS

    // `pfx` is a function that takes a standard CSS property name as a parameter
    // and returns it's prefixed version valid for current browser it runs in.
    // The code is heavily inspired by Modernizr http://www.modernizr.com/
    var pfx = ( function() {

        var style = document.createElement( "dummy" ).style,
            prefixes = "Webkit Moz O ms Khtml".split( " " ),
            memory = {};

        return function( prop ) {
            if ( typeof memory[ prop ] === "undefined" ) {

                var ucProp  = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
                    props   = ( prop + " " + prefixes.join( ucProp + " " ) + ucProp ).split( " " );

                memory[ prop ] = null;
                for ( var i in props ) {
                    if ( style[ props[ i ] ] !== undefined ) {
                        memory[ prop ] = props[ i ];
                        break;
                    }
                }

            }

            return memory[ prop ];
        };

    } )();

    var validateOrder = function( order, fallback ) {
        var validChars = "xyz";
        var returnStr = "";
        if ( typeof order === "string" ) {
            for ( var i in order.split( "" ) ) {
                if ( validChars.indexOf( order[ i ] ) >= 0 ) {
                    returnStr += order[ i ];

                    // Each of x,y,z can be used only once.
                    validChars = validChars.split( order[ i ] ).join( "" );
                }
            }
        }
        if ( returnStr ) {
            return returnStr;
        } else if ( fallback !== undefined ) {
            return fallback;
        } else {
            return "xyz";
        }
    };

    // `css` function applies the styles given in `props` object to the element
    // given as `el`. It runs all property names through `pfx` function to make
    // sure proper prefixed version of the property is used.
    var css = function( el, props ) {
        var key, pkey;
        for ( key in props ) {
            if ( props.hasOwnProperty( key ) ) {
                pkey = pfx( key );
                if ( pkey !== null ) {
                    el.style[ pkey ] = props[ key ];
                }
            }
        }
        return el;
    };

    // `translate` builds a translate transform string for given data.
    var translate = function( t ) {
        return " translate3d(" + t.x + "px," + t.y + "px," + t.z + "px) ";
    };

    // `rotate` builds a rotate transform string for given data.
    // By default the rotations are in X Y Z order that can be reverted by passing `true`
    // as second parameter.
    var rotate = function( r, revert ) {
        var order = r.order ? r.order : "xyz";
        var css = "";
        var axes = order.split( "" );
        if ( revert ) {
            axes = axes.reverse();
        }

        for ( var i = 0; i < axes.length; i++ ) {
            css += " rotate" + axes[ i ].toUpperCase() + "(" + r[ axes[ i ] ] + "deg)";
        }
        return css;
    };

    // `scale` builds a scale transform string for given data.
    var scale = function( s ) {
        return " scale(" + s + ") ";
    };

    // `computeWindowScale` counts the scale factor between window size and size
    // defined for the presentation in the config.
    var computeWindowScale = function( config ) {
        var hScale = window.innerHeight / config.height,
            wScale = window.innerWidth / config.width,
            scale = hScale > wScale ? wScale : hScale;

        if ( config.maxScale && scale > config.maxScale ) {
            scale = config.maxScale;
        }

        if ( config.minScale && scale < config.minScale ) {
            scale = config.minScale;
        }

        return scale;
    };

    // CHECK SUPPORT
    var body = document.body;
    var impressSupported =

                          // Browser should support CSS 3D transtorms
                           ( pfx( "perspective" ) !== null ) &&

                          // And `classList` and `dataset` APIs
                           ( body.classList ) &&
                           ( body.dataset );

    if ( !impressSupported ) {

        // We can't be sure that `classList` is supported
        body.className += " impress-not-supported ";
    }

    // GLOBALS AND DEFAULTS

    // This is where the root elements of all impress.js instances will be kept.
    // Yes, this means you can have more than one instance on a page, but I'm not
    // sure if it makes any sense in practice ;)
    var roots = {};

    var preInitPlugins = [];
    var preStepLeavePlugins = [];

    // Some default config values.
    var defaults = {
        width: 1024,
        height: 768,
        maxScale: 1,
        minScale: 0,

        perspective: 1000,

        transitionDuration: 1000
    };

    // It's just an empty function ... and a useless comment.
    var empty = function() { return false; };

    // IMPRESS.JS API

    // And that's where interesting things will start to happen.
    // It's the core `impress` function that returns the impress.js API
    // for a presentation based on the element with given id ("impress"
    // by default).
    var impress = window.impress = function( rootId ) {

        // If impress.js is not supported by the browser return a dummy API
        // it may not be a perfect solution but we return early and avoid
        // running code that may use features not implemented in the browser.
        if ( !impressSupported ) {
            return {
                init: empty,
                goto: empty,
                prev: empty,
                next: empty,
                swipe: empty,
                tear: empty,
                lib: {}
            };
        }

        rootId = rootId || "impress";

        // If given root is already initialized just return the API
        if ( roots[ "impress-root-" + rootId ] ) {
            return roots[ "impress-root-" + rootId ];
        }

        // The gc library depends on being initialized before we do any changes to DOM.
        lib = initLibraries( rootId );

        body.classList.remove( "impress-not-supported" );
        body.classList.add( "impress-supported" );

        // Data of all presentation steps
        var stepsData = {};

        // Element of currently active step
        var activeStep = null;

        // Current state (position, rotation and scale) of the presentation
        var currentState = null;

        // Array of step elements
        var steps = null;

        // Configuration options
        var config = null;

        // Scale factor of the browser window
        var windowScale = null;

        // Root presentation elements
        var root = lib.util.byId( rootId );
        var canvas = document.createElement( "div" );

        var initialized = false;

        // STEP EVENTS
        //
        // There are currently two step events triggered by impress.js
        // `impress:stepenter` is triggered when the step is shown on the
        // screen (the transition from the previous one is finished) and
        // `impress:stepleave` is triggered when the step is left (the
        // transition to next step just starts).

        // Reference to last entered step
        var lastEntered = null;

        // `onStepEnter` is called whenever the step element is entered
        // but the event is triggered only if the step is different than
        // last entered step.
        // We sometimes call `goto`, and therefore `onStepEnter`, just to redraw a step, such as
        // after screen resize. In this case - more precisely, in any case - we trigger a
        // `impress:steprefresh` event.
        var onStepEnter = function( step ) {
            if ( lastEntered !== step ) {
                lib.util.triggerEvent( step, "impress:stepenter" );
                lastEntered = step;
            }
            lib.util.triggerEvent( step, "impress:steprefresh" );
        };

        // `onStepLeave` is called whenever the currentStep element is left
        // but the event is triggered only if the currentStep is the same as
        // lastEntered step.
        var onStepLeave = function( currentStep, nextStep ) {
            if ( lastEntered === currentStep ) {
                lib.util.triggerEvent( currentStep, "impress:stepleave", { next: nextStep } );
                lastEntered = null;
            }
        };

        // `initStep` initializes given step element by reading data from its
        // data attributes and setting correct styles.
        var initStep = function( el, idx ) {
            var data = el.dataset,
                step = {
                    translate: {
                        x: lib.util.toNumber( data.x ),
                        y: lib.util.toNumber( data.y ),
                        z: lib.util.toNumber( data.z )
                    },
                    rotate: {
                        x: lib.util.toNumber( data.rotateX ),
                        y: lib.util.toNumber( data.rotateY ),
                        z: lib.util.toNumber( data.rotateZ || data.rotate ),
                        order: validateOrder( data.rotateOrder )
                    },
                    scale: lib.util.toNumber( data.scale, 1 ),
                    transitionDuration: lib.util.toNumber(
                        data.transitionDuration, config.transitionDuration
                    ),
                    el: el
                };

            if ( !el.id ) {
                el.id = "step-" + ( idx + 1 );
            }

            stepsData[ "impress-" + el.id ] = step;

            css( el, {
                position: "absolute",
                transform: "translate(-50%,-50%)" +
                           translate( step.translate ) +
                           rotate( step.rotate ) +
                           scale( step.scale ),
                transformStyle: "preserve-3d"
            } );
        };

        // Initialize all steps.
        // Read the data-* attributes, store in internal stepsData, and render with CSS.
        var initAllSteps = function() {
            steps = lib.util.$$( ".step", root );
            steps.forEach( initStep );
        };

        // `init` API function that initializes (and runs) the presentation.
        var init = function() {
            if ( initialized ) { return; }
            execPreInitPlugins( root );

            // First we set up the viewport for mobile devices.
            // For some reason iPad goes nuts when it is not done properly.
            var meta = lib.util.$( "meta[name='viewport']" ) || document.createElement( "meta" );
            meta.content = "width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no";
            if ( meta.parentNode !== document.head ) {
                meta.name = "viewport";
                document.head.appendChild( meta );
            }

            // Initialize configuration object
            var rootData = root.dataset;
            config = {
                width: lib.util.toNumber( rootData.width, defaults.width ),
                height: lib.util.toNumber( rootData.height, defaults.height ),
                maxScale: lib.util.toNumber( rootData.maxScale, defaults.maxScale ),
                minScale: lib.util.toNumber( rootData.minScale, defaults.minScale ),
                perspective: lib.util.toNumber( rootData.perspective, defaults.perspective ),
                transitionDuration: lib.util.toNumber(
                    rootData.transitionDuration, defaults.transitionDuration
                )
            };

            windowScale = computeWindowScale( config );

            // Wrap steps with "canvas" element
            lib.util.arrayify( root.childNodes ).forEach( function( el ) {
                canvas.appendChild( el );
            } );
            root.appendChild( canvas );

            // Set initial styles
            document.documentElement.style.height = "100%";

            css( body, {
                height: "100%",
                overflow: "hidden"
            } );

            var rootStyles = {
                position: "absolute",
                transformOrigin: "top left",
                transition: "all 0s ease-in-out",
                transformStyle: "preserve-3d"
            };

            css( root, rootStyles );
            css( root, {
                top: "50%",
                left: "50%",
                perspective: ( config.perspective / windowScale ) + "px",
                transform: scale( windowScale )
            } );
            css( canvas, rootStyles );

            body.classList.remove( "impress-disabled" );
            body.classList.add( "impress-enabled" );

            // Get and init steps
            initAllSteps();

            // Set a default initial state of the canvas
            currentState = {
                translate: { x: 0, y: 0, z: 0 },
                rotate:    { x: 0, y: 0, z: 0, order: "xyz" },
                scale:     1
            };

            initialized = true;

            lib.util.triggerEvent( root, "impress:init",
                                   { api: roots[ "impress-root-" + rootId ] } );
        };

        // `getStep` is a helper function that returns a step element defined by parameter.
        // If a number is given, step with index given by the number is returned, if a string
        // is given step element with such id is returned, if DOM element is given it is returned
        // if it is a correct step element.
        var getStep = function( step ) {
            if ( typeof step === "number" ) {
                step = step < 0 ? steps[ steps.length + step ] : steps[ step ];
            } else if ( typeof step === "string" ) {
                step = lib.util.byId( step );
            }
            return ( step && step.id && stepsData[ "impress-" + step.id ] ) ? step : null;
        };

        // Used to reset timeout for `impress:stepenter` event
        var stepEnterTimeout = null;

        // `goto` API function that moves to step given as `el` parameter (by index, id or element).
        // `duration` optionally given as second parameter, is the transition duration in css.
        // `reason` is the string "next", "prev" or "goto" (default) and will be made available to
        // preStepLeave plugins.
        // `origEvent` may contain event that caused the call to goto, such as a key press event
        var goto = function( el, duration, reason, origEvent ) {
            reason = reason || "goto";
            origEvent = origEvent || null;

            if ( !initialized ) {
                return false;
            }

            // Re-execute initAllSteps for each transition. This allows to edit step attributes
            // dynamically, such as change their coordinates, or even remove or add steps, and have
            // that change apply when goto() is called.
            initAllSteps();

            if ( !( el = getStep( el ) ) ) {
                return false;
            }

            // Sometimes it's possible to trigger focus on first link with some keyboard action.
            // Browser in such a case tries to scroll the page to make this element visible
            // (even that body overflow is set to hidden) and it breaks our careful positioning.
            //
            // So, as a lousy (and lazy) workaround we will make the page scroll back to the top
            // whenever slide is selected
            //
            // If you are reading this and know any better way to handle it, I'll be glad to hear
            // about it!
            window.scrollTo( 0, 0 );

            var step = stepsData[ "impress-" + el.id ];
            duration = ( duration !== undefined ? duration : step.transitionDuration );

            // If we are in fact moving to another step, start with executing the registered
            // preStepLeave plugins.
            if ( activeStep && activeStep !== el ) {
                var event = { target: activeStep, detail: {} };
                event.detail.next = el;
                event.detail.transitionDuration = duration;
                event.detail.reason = reason;
                if ( origEvent ) {
                    event.origEvent = origEvent;
                }

                if ( execPreStepLeavePlugins( event ) === false ) {

                    // PreStepLeave plugins are allowed to abort the transition altogether, by
                    // returning false.
                    // see stop and substep plugins for an example of doing just that
                    return false;
                }

                // Plugins are allowed to change the detail values
                el = event.detail.next;
                step = stepsData[ "impress-" + el.id ];
                duration = event.detail.transitionDuration;
            }

            if ( activeStep ) {
                activeStep.classList.remove( "active" );
                body.classList.remove( "impress-on-" + activeStep.id );
            }
            el.classList.add( "active" );

            body.classList.add( "impress-on-" + el.id );

            // Compute target state of the canvas based on given step
            var target = {
                rotate: {
                    x: -step.rotate.x,
                    y: -step.rotate.y,
                    z: -step.rotate.z,
                    order: step.rotate.order
                },
                translate: {
                    x: -step.translate.x,
                    y: -step.translate.y,
                    z: -step.translate.z
                },
                scale: 1 / step.scale
            };

            // Check if the transition is zooming in or not.
            //
            // This information is used to alter the transition style:
            // when we are zooming in - we start with move and rotate transition
            // and the scaling is delayed, but when we are zooming out we start
            // with scaling down and move and rotation are delayed.
            var zoomin = target.scale >= currentState.scale;

            duration = lib.util.toNumber( duration, config.transitionDuration );
            var delay = ( duration / 2 );

            // If the same step is re-selected, force computing window scaling,
            // because it is likely to be caused by window resize
            if ( el === activeStep ) {
                windowScale = computeWindowScale( config );
            }

            var targetScale = target.scale * windowScale;

            // Trigger leave of currently active element (if it's not the same step again)
            if ( activeStep && activeStep !== el ) {
                onStepLeave( activeStep, el );
            }

            // Now we alter transforms of `root` and `canvas` to trigger transitions.
            //
            // And here is why there are two elements: `root` and `canvas` - they are
            // being animated separately:
            // `root` is used for scaling and `canvas` for translate and rotations.
            // Transitions on them are triggered with different delays (to make
            // visually nice and "natural" looking transitions), so we need to know
            // that both of them are finished.
            css( root, {

                // To keep the perspective look similar for different scales
                // we need to "scale" the perspective, too
                // For IE 11 support we must specify perspective independent
                // of transform.
                perspective: ( config.perspective / targetScale ) + "px",
                transform: scale( targetScale ),
                transitionDuration: duration + "ms",
                transitionDelay: ( zoomin ? delay : 0 ) + "ms"
            } );

            css( canvas, {
                transform: rotate( target.rotate, true ) + translate( target.translate ),
                transitionDuration: duration + "ms",
                transitionDelay: ( zoomin ? 0 : delay ) + "ms"
            } );

            // Here is a tricky part...
            //
            // If there is no change in scale or no change in rotation and translation, it means
            // there was actually no delay - because there was no transition on `root` or `canvas`
            // elements. We want to trigger `impress:stepenter` event in the correct moment, so
            // here we compare the current and target values to check if delay should be taken into
            // account.
            //
            // I know that this `if` statement looks scary, but it's pretty simple when you know
            // what is going on - it's simply comparing all the values.
            if ( currentState.scale === target.scale ||
                ( currentState.rotate.x === target.rotate.x &&
                  currentState.rotate.y === target.rotate.y &&
                  currentState.rotate.z === target.rotate.z &&
                  currentState.translate.x === target.translate.x &&
                  currentState.translate.y === target.translate.y &&
                  currentState.translate.z === target.translate.z ) ) {
                delay = 0;
            }

            // Store current state
            currentState = target;
            activeStep = el;

            // And here is where we trigger `impress:stepenter` event.
            // We simply set up a timeout to fire it taking transition duration (and possible delay)
            // into account.
            //
            // I really wanted to make it in more elegant way. The `transitionend` event seemed to
            // be the best way to do it, but the fact that I'm using transitions on two separate
            // elements and that the `transitionend` event is only triggered when there was a
            // transition (change in the values) caused some bugs and made the code really
            // complicated, cause I had to handle all the conditions separately. And it still
            // needed a `setTimeout` fallback for the situations when there is no transition at all.
            // So I decided that I'd rather make the code simpler than use shiny new
            // `transitionend`.
            //
            // If you want learn something interesting and see how it was done with `transitionend`
            // go back to version 0.5.2 of impress.js:
            // http://github.com/bartaz/impress.js/blob/0.5.2/js/impress.js
            window.clearTimeout( stepEnterTimeout );
            stepEnterTimeout = window.setTimeout( function() {
                onStepEnter( activeStep );
            }, duration + delay );

            return el;
        };

        // `prev` API function goes to previous step (in document order)
        // `event` is optional, may contain the event that caused the need to call prev()
        var prev = function( origEvent ) {
            var prev = steps.indexOf( activeStep ) - 1;
            prev = prev >= 0 ? steps[ prev ] : steps[ steps.length - 1 ];

            return goto( prev, undefined, "prev", origEvent );
        };

        // `next` API function goes to next step (in document order)
        // `event` is optional, may contain the event that caused the need to call next()
        var next = function( origEvent ) {
            var next = steps.indexOf( activeStep ) + 1;
            next = next < steps.length ? steps[ next ] : steps[ 0 ];

            return goto( next, undefined, "next", origEvent );
        };

        // Swipe for touch devices by @and3rson.
        // Below we extend the api to control the animation between the currently
        // active step and a presumed next/prev step. See touch plugin for
        // an example of using this api.

        // Helper function
        var interpolate = function( a, b, k ) {
            return a + ( b - a ) * k;
        };

        // Animate a swipe.
        //
        // Pct is a value between -1.0 and +1.0, designating the current length
        // of the swipe.
        //
        // If pct is negative, swipe towards the next() step, if positive,
        // towards the prev() step.
        //
        // Note that pre-stepleave plugins such as goto can mess with what is a
        // next() and prev() step, so we need to trigger the pre-stepleave event
        // here, even if a swipe doesn't guarantee that the transition will
        // actually happen.
        //
        // Calling swipe(), with any value of pct, won't in itself cause a
        // transition to happen, this is just to animate the swipe. Once the
        // transition is committed - such as at a touchend event - caller is
        // responsible for also calling prev()/next() as appropriate.
        //
        // Note: For now, this function is made available to be used by the swipe plugin (which
        // is the UI counterpart to this). It is a semi-internal API and intentionally not
        // documented in DOCUMENTATION.md.
        var swipe = function( pct ) {
            if ( Math.abs( pct ) > 1 ) {
                return;
            }

            // Prepare & execute the preStepLeave event
            var event = { target: activeStep, detail: {} };
            event.detail.swipe = pct;

            // Will be ignored within swipe animation, but just in case a plugin wants to read this,
            // humor them
            event.detail.transitionDuration = config.transitionDuration;
            var idx; // Needed by jshint
            if ( pct < 0 ) {
                idx = steps.indexOf( activeStep ) + 1;
                event.detail.next = idx < steps.length ? steps[ idx ] : steps[ 0 ];
                event.detail.reason = "next";
            } else if ( pct > 0 ) {
                idx = steps.indexOf( activeStep ) - 1;
                event.detail.next = idx >= 0 ? steps[ idx ] : steps[ steps.length - 1 ];
                event.detail.reason = "prev";
            } else {

                // No move
                return;
            }
            if ( execPreStepLeavePlugins( event ) === false ) {

                // If a preStepLeave plugin wants to abort the transition, don't animate a swipe
                // For stop, this is probably ok. For substep, the plugin it self might want to do
                // some animation, but that's not the current implementation.
                return false;
            }
            var nextElement = event.detail.next;

            var nextStep = stepsData[ "impress-" + nextElement.id ];

            // If the same step is re-selected, force computing window scaling,
            var nextScale = nextStep.scale * windowScale;
            var k = Math.abs( pct );

            var interpolatedStep = {
                translate: {
                    x: interpolate( currentState.translate.x, -nextStep.translate.x, k ),
                    y: interpolate( currentState.translate.y, -nextStep.translate.y, k ),
                    z: interpolate( currentState.translate.z, -nextStep.translate.z, k )
                },
                rotate: {
                    x: interpolate( currentState.rotate.x, -nextStep.rotate.x, k ),
                    y: interpolate( currentState.rotate.y, -nextStep.rotate.y, k ),
                    z: interpolate( currentState.rotate.z, -nextStep.rotate.z, k ),

                    // Unfortunately there's a discontinuity if rotation order changes. Nothing I
                    // can do about it?
                    order: k < 0.7 ? currentState.rotate.order : nextStep.rotate.order
                },
                scale: interpolate( currentState.scale * windowScale, nextScale, k )
            };

            css( root, {

                // To keep the perspective look similar for different scales
                // we need to 'scale' the perspective, too
                perspective: config.perspective / interpolatedStep.scale + "px",
                transform: scale( interpolatedStep.scale ),
                transitionDuration: "0ms",
                transitionDelay: "0ms"
            } );

            css( canvas, {
                transform: rotate( interpolatedStep.rotate, true ) +
                           translate( interpolatedStep.translate ),
                transitionDuration: "0ms",
                transitionDelay: "0ms"
            } );
        };

        // Teardown impress
        // Resets the DOM to the state it was before impress().init() was called.
        // (If you called impress(rootId).init() for multiple different rootId's, then you must
        // also call tear() once for each of them.)
        var tear = function() {
            lib.gc.teardown();
            delete roots[ "impress-root-" + rootId ];
        };

        // Adding some useful classes to step elements.
        //
        // All the steps that have not been shown yet are given `future` class.
        // When the step is entered the `future` class is removed and the `present`
        // class is given. When the step is left `present` class is replaced with
        // `past` class.
        //
        // So every step element is always in one of three possible states:
        // `future`, `present` and `past`.
        //
        // There classes can be used in CSS to style different types of steps.
        // For example the `present` class can be used to trigger some custom
        // animations when step is shown.
        lib.gc.addEventListener( root, "impress:init", function() {

            // STEP CLASSES
            steps.forEach( function( step ) {
                step.classList.add( "future" );
            } );

            lib.gc.addEventListener( root, "impress:stepenter", function( event ) {
                event.target.classList.remove( "past" );
                event.target.classList.remove( "future" );
                event.target.classList.add( "present" );
            }, false );

            lib.gc.addEventListener( root, "impress:stepleave", function( event ) {
                event.target.classList.remove( "present" );
                event.target.classList.add( "past" );
            }, false );

        }, false );

        // Adding hash change support.
        lib.gc.addEventListener( root, "impress:init", function() {

            // Last hash detected
            var lastHash = "";

            // `#/step-id` is used instead of `#step-id` to prevent default browser
            // scrolling to element in hash.
            //
            // And it has to be set after animation finishes, because in Chrome it
            // makes transtion laggy.
            // BUG: http://code.google.com/p/chromium/issues/detail?id=62820
            lib.gc.addEventListener( root, "impress:stepenter", function( event ) {
                window.location.hash = lastHash = "#/" + event.target.id;
            }, false );

            lib.gc.addEventListener( window, "hashchange", function() {

                // When the step is entered hash in the location is updated
                // (just few lines above from here), so the hash change is
                // triggered and we would call `goto` again on the same element.
                //
                // To avoid this we store last entered hash and compare.
                if ( window.location.hash !== lastHash ) {
                    goto( lib.util.getElementFromHash() );
                }
            }, false );

            // START
            // by selecting step defined in url or first step of the presentation
            goto( lib.util.getElementFromHash() || steps[ 0 ], 0 );
        }, false );

        body.classList.add( "impress-disabled" );

        // Store and return API for given impress.js root element
        return ( roots[ "impress-root-" + rootId ] = {
            init: init,
            goto: goto,
            next: next,
            prev: prev,
            swipe: swipe,
            tear: tear,
            lib: lib
        } );

    };

    // Flag that can be used in JS to check if browser have passed the support test
    impress.supported = impressSupported;

    // ADD and INIT LIBRARIES
    // Library factories are defined in src/lib/*.js, and register themselves by calling
    // impress.addLibraryFactory(libraryFactoryObject). They're stored here, and used to augment
    // the API with library functions when client calls impress(rootId).
    // See src/lib/README.md for clearer example.
    // (Advanced usage: For different values of rootId, a different instance of the libaries are
    // generated, in case they need to hold different state for different root elements.)
    var libraryFactories = {};
    impress.addLibraryFactory = function( obj ) {
        for ( var libname in obj ) {
            if ( obj.hasOwnProperty( libname ) ) {
                libraryFactories[ libname ] = obj[ libname ];
            }
        }
    };

    // Call each library factory, and return the lib object that is added to the api.
    var initLibraries = function( rootId ) { //jshint ignore:line
        var lib = {};
        for ( var libname in libraryFactories ) {
            if ( libraryFactories.hasOwnProperty( libname ) ) {
                if ( lib[ libname ] !== undefined ) {
                    throw "impress.js ERROR: Two libraries both tried to use libname: " +  libname;
                }
                lib[ libname ] = libraryFactories[ libname ]( rootId );
            }
        }
        return lib;
    };

    // `addPreInitPlugin` allows plugins to register a function that should
    // be run (synchronously) at the beginning of init, before
    // impress().init() itself executes.
    impress.addPreInitPlugin = function( plugin, weight ) {
        weight = parseInt( weight ) || 10;
        if ( weight <= 0 ) {
            throw "addPreInitPlugin: weight must be a positive integer";
        }

        if ( preInitPlugins[ weight ] === undefined ) {
            preInitPlugins[ weight ] = [];
        }
        preInitPlugins[ weight ].push( plugin );
    };

    // Called at beginning of init, to execute all pre-init plugins.
    var execPreInitPlugins = function( root ) { //jshint ignore:line
        for ( var i = 0; i < preInitPlugins.length; i++ ) {
            var thisLevel = preInitPlugins[ i ];
            if ( thisLevel !== undefined ) {
                for ( var j = 0; j < thisLevel.length; j++ ) {
                    thisLevel[ j ]( root );
                }
            }
        }
    };

    // `addPreStepLeavePlugin` allows plugins to register a function that should
    // be run (synchronously) at the beginning of goto()
    impress.addPreStepLeavePlugin = function( plugin, weight ) { //jshint ignore:line
        weight = parseInt( weight ) || 10;
        if ( weight <= 0 ) {
            throw "addPreStepLeavePlugin: weight must be a positive integer";
        }

        if ( preStepLeavePlugins[ weight ] === undefined ) {
            preStepLeavePlugins[ weight ] = [];
        }
        preStepLeavePlugins[ weight ].push( plugin );
    };

    // Called at beginning of goto(), to execute all preStepLeave plugins.
    var execPreStepLeavePlugins = function( event ) { //jshint ignore:line
        for ( var i = 0; i < preStepLeavePlugins.length; i++ ) {
            var thisLevel = preStepLeavePlugins[ i ];
            if ( thisLevel !== undefined ) {
                for ( var j = 0; j < thisLevel.length; j++ ) {
                    if ( thisLevel[ j ]( event ) === false ) {

                        // If a plugin returns false, the stepleave event (and related transition)
                        // is aborted
                        return false;
                    }
                }
            }
        }
    };

} )( document, window );

// THAT'S ALL FOLKS!
//
// Thanks for reading it all.
// Or thanks for scrolling down and reading the last part.
//
// I've learnt a lot when building impress.js and I hope this code and comments
// will help somebody learn at least some part of it.

/**
 * Garbage collection utility
 *
 * This library allows plugins to add elements and event listeners they add to the DOM. The user
 * can call `impress().lib.gc.teardown()` to cause all of them to be removed from DOM, so that
 * the document is in the state it was before calling `impress().init()`.
 *
 * In addition to just adding elements and event listeners to the garbage collector, plugins
 * can also register callback functions to do arbitrary cleanup upon teardown.
 *
 * Henrik Ingo (c) 2016
 * MIT License
 */

( function( document, window ) {
    "use strict";
    var roots = [];
    var rootsCount = 0;
    var startingState = { roots: [] };

    var libraryFactory = function( rootId ) {
        if ( roots[ rootId ] ) {
            return roots[ rootId ];
        }

        // Per root global variables (instance variables?)
        var elementList = [];
        var eventListenerList = [];
        var callbackList = [];

        recordStartingState( rootId );

        // LIBRARY FUNCTIONS
        // Definitions of the library functions we return as an object at the end

        // `pushElement` adds a DOM element to the gc stack
        var pushElement = function( element ) {
            elementList.push( element );
        };

        // `appendChild` is a convenience wrapper that combines DOM appendChild with gc.pushElement
        var appendChild = function( parent, element ) {
            parent.appendChild( element );
            pushElement( element );
        };

        // `pushEventListener` adds an event listener to the gc stack
        var pushEventListener = function( target, type, listenerFunction ) {
            eventListenerList.push( { target:target, type:type, listener:listenerFunction } );
        };

        // `addEventListener` combines DOM addEventListener with gc.pushEventListener
        var addEventListener = function( target, type, listenerFunction ) {
            target.addEventListener( type, listenerFunction );
            pushEventListener( target, type, listenerFunction );
        };

        // `pushCallback` If the above utilities are not enough, plugins can add their own callback
        // function to do arbitrary things.
        var pushCallback = function( callback ) {
            callbackList.push( callback );
        };
        pushCallback( function( rootId ) { resetStartingState( rootId ); } );

        // `teardown` will
        // - execute all callbacks in LIFO order
        // - call `removeChild` on all DOM elements in LIFO order
        // - call `removeEventListener` on all event listeners in LIFO order
        // The goal of a teardown is to return to the same state that the DOM was before
        // `impress().init()` was called.
        var teardown = function() {

            // Execute the callbacks in LIFO order
            var i; // Needed by jshint
            for ( i = callbackList.length - 1; i >= 0; i-- ) {
                callbackList[ i ]( rootId );
            }
            callbackList = [];
            for ( i = 0; i < elementList.length; i++ ) {
                elementList[ i ].parentElement.removeChild( elementList[ i ] );
            }
            elementList = [];
            for ( i = 0; i < eventListenerList.length; i++ ) {
                var target   = eventListenerList[ i ].target;
                var type     = eventListenerList[ i ].type;
                var listener = eventListenerList[ i ].listener;
                target.removeEventListener( type, listener );
            }
        };

        var lib = {
            pushElement: pushElement,
            appendChild: appendChild,
            pushEventListener: pushEventListener,
            addEventListener: addEventListener,
            pushCallback: pushCallback,
            teardown: teardown
        };
        roots[ rootId ] = lib;
        rootsCount++;
        return lib;
    };

    // Let impress core know about the existence of this library
    window.impress.addLibraryFactory( { gc: libraryFactory } );

    // CORE INIT
    // The library factory (gc(rootId)) is called at the beginning of impress(rootId).init()
    // For the purposes of teardown(), we can use this as an opportunity to save the state
    // of a few things in the DOM in their virgin state, before impress().init() did anything.
    // Note: These could also be recorded by the code in impress.js core as these values
    // are changed, but in an effort to not deviate too much from upstream, I'm adding
    // them here rather than the core itself.
    var recordStartingState = function( rootId ) {
        startingState.roots[ rootId ] = {};
        startingState.roots[ rootId ].steps = [];

        // Record whether the steps have an id or not
        var steps = document.getElementById( rootId ).querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ ) {
            var el = steps[ i ];
            startingState.roots[ rootId ].steps.push( {
                el: el,
                id: el.getAttribute( "id" )
            } );
        }

        // In the rare case of multiple roots, the following is changed on first init() and
        // reset at last tear().
        if ( rootsCount === 0 ) {
            startingState.body = {};

            // It is customary for authors to set body.class="impress-not-supported" as a starting
            // value, which can then be removed by impress().init(). But it is not required.
            // Remember whether it was there or not.
            if ( document.body.classList.contains( "impress-not-supported" ) ) {
                startingState.body.impressNotSupported = true;
            } else {
                startingState.body.impressNotSupported = false;
            }

            // If there's a <meta name="viewport"> element, its contents will be overwritten by init
            var metas = document.head.querySelectorAll( "meta" );
            for ( i = 0; i < metas.length; i++ ) {
                var m = metas[ i ];
                if ( m.name === "viewport" ) {
                    startingState.meta = m.content;
                }
            }
        }
    };

    // CORE TEARDOWN
    var resetStartingState = function( rootId ) {

        // Reset body element
        document.body.classList.remove( "impress-enabled" );
        document.body.classList.remove( "impress-disabled" );

        var root = document.getElementById( rootId );
        var activeId = root.querySelector( ".active" ).id;
        document.body.classList.remove( "impress-on-" + activeId );

        document.documentElement.style.height = "";
        document.body.style.height = "";
        document.body.style.overflow = "";

        // Remove style values from the root and step elements
        // Note: We remove the ones set by impress.js core. Otoh, we didn't preserve any original
        // values. A more sophisticated implementation could keep track of original values and then
        // reset those.
        var steps = root.querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ ) {
            steps[ i ].classList.remove( "future" );
            steps[ i ].classList.remove( "past" );
            steps[ i ].classList.remove( "present" );
            steps[ i ].classList.remove( "active" );
            steps[ i ].style.position = "";
            steps[ i ].style.transform = "";
            steps[ i ].style[ "transform-style" ] = "";
        }
        root.style.position = "";
        root.style[ "transform-origin" ] = "";
        root.style.transition = "";
        root.style[ "transform-style" ] = "";
        root.style.top = "";
        root.style.left = "";
        root.style.transform = "";

        // Reset id of steps ("step-1" id's are auto generated)
        steps = startingState.roots[ rootId ].steps;
        var step;
        while ( step = steps.pop() ) {
            if ( step.id === null ) {
                step.el.removeAttribute( "id" );
            } else {
                step.el.setAttribute( "id", step.id );
            }
        }
        delete startingState.roots[ rootId ];

        // Move step div elements away from canvas, then delete canvas
        // Note: There's an implicit assumption here that the canvas div is the only child element
        // of the root div. If there would be something else, it's gonna be lost.
        var canvas = root.firstChild;
        var canvasHTML = canvas.innerHTML;
        root.innerHTML = canvasHTML;

        if ( roots[ rootId ] !== undefined ) {
            delete roots[ rootId ];
            rootsCount--;
        }
        if ( rootsCount === 0 ) {

            // In the rare case that more than one impress root elements were initialized, these
            // are only reset when all are uninitialized.
            document.body.classList.remove( "impress-supported" );
            if ( startingState.body.impressNotSupported ) {
                document.body.classList.add( "impress-not-supported" );
            }

            // We need to remove or reset the meta element inserted by impress.js
            var metas = document.head.querySelectorAll( "meta" );
            for ( i = 0; i < metas.length; i++ ) {
                var m = metas[ i ];
                if ( m.name === "viewport" ) {
                    if ( startingState.meta !== undefined ) {
                        m.content = startingState.meta;
                    } else {
                        m.parentElement.removeChild( m );
                    }
                }
            }
        }

    };

} )( document, window );

/**
 * Common utility functions
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz)
 * Henrik Ingo (c) 2016
 * MIT License
 */

( function( document, window ) {
    "use strict";
    var roots = [];

    var libraryFactory = function( rootId ) {
        if ( roots[ rootId ] ) {
            return roots[ rootId ];
        }

        // `$` returns first element for given CSS `selector` in the `context` of
        // the given element or whole document.
        var $ = function( selector, context ) {
            context = context || document;
            return context.querySelector( selector );
        };

        // `$$` return an array of elements for given CSS `selector` in the `context` of
        // the given element or whole document.
        var $$ = function( selector, context ) {
            context = context || document;
            return arrayify( context.querySelectorAll( selector ) );
        };

        // `arrayify` takes an array-like object and turns it into real Array
        // to make all the Array.prototype goodness available.
        var arrayify = function( a ) {
            return [].slice.call( a );
        };

        // `byId` returns element with given `id` - you probably have guessed that ;)
        var byId = function( id ) {
            return document.getElementById( id );
        };

        // `getElementFromHash` returns an element located by id from hash part of
        // window location.
        var getElementFromHash = function() {

            // Get id from url # by removing `#` or `#/` from the beginning,
            // so both "fallback" `#slide-id` and "enhanced" `#/slide-id` will work
            return byId( window.location.hash.replace( /^#\/?/, "" ) );
        };

        // `getUrlParamValue` return a given URL parameter value if it exists
        // `undefined` if it doesn't exist
        var getUrlParamValue = function( parameter ) {
            var chunk = window.location.search.split( parameter + "=" )[ 1 ];
            var value = chunk && chunk.split( "&" )[ 0 ];

            if ( value !== "" ) {
                return value;
            }
        };

        // Throttling function calls, by Remy Sharp
        // http://remysharp.com/2010/07/21/throttling-function-calls/
        var throttle = function( fn, delay ) {
            var timer = null;
            return function() {
                var context = this, args = arguments;
                window.clearTimeout( timer );
                timer = window.setTimeout( function() {
                    fn.apply( context, args );
                }, delay );
            };
        };

        // `toNumber` takes a value given as `numeric` parameter and tries to turn
        // it into a number. If it is not possible it returns 0 (or other value
        // given as `fallback`).
        var toNumber = function( numeric, fallback ) {
            return isNaN( numeric ) ? ( fallback || 0 ) : Number( numeric );
        };

        // `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
        // and triggers it on element given as `el`.
        var triggerEvent = function( el, eventName, detail ) {
            var event = document.createEvent( "CustomEvent" );
            event.initCustomEvent( eventName, true, true, detail );
            el.dispatchEvent( event );
        };

        var lib = {
            $: $,
            $$: $$,
            arrayify: arrayify,
            byId: byId,
            getElementFromHash: getElementFromHash,
            throttle: throttle,
            toNumber: toNumber,
            triggerEvent: triggerEvent,
            getUrlParamValue: getUrlParamValue
        };
        roots[ rootId ] = lib;
        return lib;
    };

    // Let impress core know about the existence of this library
    window.impress.addLibraryFactory( { util: libraryFactory } );

} )( document, window );

/**
 * Autoplay plugin - Automatically advance slideshow after N seconds
 *
 * Copyright 2016 Henrik Ingo, henrik.ingo@avoinelama.fi
 * Released under the MIT license.
 */
/* global clearTimeout, setTimeout, document */

( function( document ) {
    "use strict";

    var autoplayDefault = 0;
    var currentStepTimeout = 0;
    var api = null;
    var timeoutHandle = null;
    var root = null;
    var util;

    // On impress:init, check whether there is a default setting, as well as
    // handle step-1.
    document.addEventListener( "impress:init", function( event ) {
        util = event.detail.api.lib.util;

        // Getting API from event data instead of global impress().init().
        // You don't even need to know what is the id of the root element
        // or anything. `impress:init` event data gives you everything you
        // need to control the presentation that was just initialized.
        api = event.detail.api;
        root = event.target;

        // Element attributes starting with "data-", become available under
        // element.dataset. In addition hyphenized words become camelCased.
        var data = root.dataset;
        var autoplay = util.getUrlParamValue( "impress-autoplay" ) || data.autoplay;

        if ( autoplay ) {
            autoplayDefault = util.toNumber( autoplay, 0 );
        }

        var toolbar = document.querySelector( "#impress-toolbar" );
        if ( toolbar ) {
            addToolbarButton( toolbar );
        }

        api.lib.gc.pushCallback( function() {
            clearTimeout( timeoutHandle );
        } );

        // Note that right after impress:init event, also impress:stepenter is
        // triggered for the first slide, so that's where code flow continues.
    }, false );

    document.addEventListener( "impress:autoplay:pause", function( event ) {
        status = "paused";
        reloadTimeout( event );
    }, false );

    document.addEventListener( "impress:autoplay:play", function( event ) {
        status = "playing";
        reloadTimeout( event );
    }, false );

    // If default autoplay time was defined in the presentation root, or
    // in this step, set timeout.
    var reloadTimeout = function( event ) {
        var step = event.target;
        currentStepTimeout = util.toNumber( step.dataset.autoplay, autoplayDefault );
        if ( status === "paused" ) {
            setAutoplayTimeout( 0 );
        } else {
            setAutoplayTimeout( currentStepTimeout );
        }
    };

    document.addEventListener( "impress:stepenter", function( event ) {
        reloadTimeout( event );
    }, false );

    document.addEventListener( "impress:substep:enter", function( event ) {
        reloadTimeout( event );
    }, false );

    /**
     * Set timeout after which we move to next() step.
     */
    var setAutoplayTimeout = function( timeout ) {
        if ( timeoutHandle ) {
            clearTimeout( timeoutHandle );
        }

        if ( timeout > 0 ) {
            timeoutHandle = setTimeout( function() { api.next(); }, timeout * 1000 );
        }
        setButtonText();
    };

    /*** Toolbar plugin integration *******************************************/
    var status = "not clicked";
    var toolbarButton = null;

    var makeDomElement = function( html ) {
        var tempDiv = document.createElement( "div" );
        tempDiv.innerHTML = html;
        return tempDiv.firstChild;
    };

    var toggleStatus = function() {
        if ( currentStepTimeout > 0 && status !== "paused" ) {
            status = "paused";
        } else {
            status = "playing";
        }
    };

    var getButtonText = function() {
        if ( currentStepTimeout > 0 && status !== "paused" ) {
            return "||"; // Pause
        } else {
            return "&#9654;"; // Play
        }
    };

    var setButtonText = function() {
        if ( toolbarButton ) {

            // Keep button size the same even if label content is changing
            var buttonWidth = toolbarButton.offsetWidth;
            var buttonHeight = toolbarButton.offsetHeight;
            toolbarButton.innerHTML = getButtonText();
            if ( !toolbarButton.style.width ) {
                toolbarButton.style.width = buttonWidth + "px";
            }
            if ( !toolbarButton.style.height ) {
                toolbarButton.style.height = buttonHeight + "px";
            }
        }
    };

    var addToolbarButton = function( toolbar ) {
        var html = '<button id="impress-autoplay-playpause" ' + // jshint ignore:line
                   'title="Autoplay" class="impress-autoplay">' + // jshint ignore:line
                   getButtonText() + "</button>"; // jshint ignore:line
        toolbarButton = makeDomElement( html );
        toolbarButton.addEventListener( "click", function() {
            toggleStatus();
            if ( status === "playing" ) {
                if ( autoplayDefault === 0 ) {
                    autoplayDefault = 7;
                }
                if ( currentStepTimeout === 0 ) {
                    currentStepTimeout = autoplayDefault;
                }
                setAutoplayTimeout( currentStepTimeout );
            } else if ( status === "paused" ) {
                setAutoplayTimeout( 0 );
            }
        } );

        util.triggerEvent( toolbar, "impress:toolbar:appendChild",
                      { group: 10, element: toolbarButton } );
    };

} )( document );

/**
 * Blackout plugin
 *
 * Press b or . to hide all slides, and b or . again to show them.
 * Also navigating to a different slide will show them again (impress:stepleave).
 *
 * Copyright 2014 @Strikeskids
 * Released under the MIT license.
 */
/* global document */

( function( document ) {
    "use strict";

    var canvas = null;
    var blackedOut = false;
    var util = null;
    var root = null;
    var api = null;

    // While waiting for a shared library of utilities, copying these 2 from main impress.js
    var css = function( el, props ) {
        var key, pkey;
        for ( key in props ) {
            if ( props.hasOwnProperty( key ) ) {
                pkey = pfx( key );
                if ( pkey !== null ) {
                    el.style[ pkey ] = props[ key ];
                }
            }
        }
        return el;
    };

    var pfx = ( function() {

        var style = document.createElement( "dummy" ).style,
            prefixes = "Webkit Moz O ms Khtml".split( " " ),
            memory = {};

        return function( prop ) {
            if ( typeof memory[ prop ] === "undefined" ) {

                var ucProp  = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
                    props   = ( prop + " " + prefixes.join( ucProp + " " ) + ucProp ).split( " " );

                memory[ prop ] = null;
                for ( var i in props ) {
                    if ( style[ props[ i ] ] !== undefined ) {
                        memory[ prop ] = props[ i ];
                        break;
                    }
                }

            }

            return memory[ prop ];
        };

    } )();

    var removeBlackout = function() {
        if ( blackedOut ) {
            css( canvas, {
                display: "block"
            } );
            blackedOut = false;
            util.triggerEvent( root, "impress:autoplay:play", {} );
        }
    };

    var blackout = function() {
        if ( blackedOut ) {
            removeBlackout();
        } else {
            css( canvas, {
                display: ( blackedOut = !blackedOut ) ? "none" : "block"
            } );
            blackedOut = true;
            util.triggerEvent( root, "impress:autoplay:pause", {} );
        }
    };

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
        api = event.detail.api;
        util = api.lib.util;
        root = event.target;
        canvas = root.firstElementChild;
        var gc = api.lib.gc;
        var util = api.lib.util;

        gc.addEventListener( document, "keydown", function( event ) {

            // Accept b or . -> . is sent by presentation remote controllers
            if ( event.keyCode === 66 || event.keyCode === 190 ) {
                event.preventDefault();
                if ( !blackedOut ) {
                    blackout();
                } else {
                    removeBlackout();
                }
            }
        }, false );

        gc.addEventListener( document, "keyup", function( event ) {

            // Accept b or . -> . is sent by presentation remote controllers
            if ( event.keyCode === 66 || event.keyCode === 190 ) {
                event.preventDefault();
            }
        }, false );

    }, false );

    document.addEventListener( "impress:stepleave", function() {
        removeBlackout();
    }, false );

} )( document );


/**
 * Extras Plugin
 *
 * This plugin performs initialization (like calling mermaid.initialize())
 * for the extras/ plugins if they are loaded into a presentation.
 *
 * See README.md for details.
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */
/* global markdown, hljs, mermaid, impress, document, window */

( function( document, window ) {
    "use strict";

    var preInit = function() {
        if ( window.markdown ) {

            // Unlike the other extras, Markdown.js doesn't by default do anything in
            // particular. We do it ourselves here.
            // In addition, we use "-----" as a delimiter for new slide.

            // Query all .markdown elements and translate to HTML
            var markdownDivs = document.querySelectorAll( ".markdown" );
            for ( var idx = 0; idx < markdownDivs.length; idx++ ) {
              var element = markdownDivs[ idx ];
              var dialect = element.dataset.markdownDialect;

              var slides = element.textContent.split( /^-----$/m );
              var i = slides.length - 1;
              element.innerHTML = markdown.toHTML( slides[ i ], dialect );

              // If there's an id, unset it for last, and all other, elements,
              // and then set it for the first.
              var id = null;
              if ( element.id ) {
                id = element.id;
                element.id = "";
              }
              i--;
              while ( i >= 0 ) {
                var newElement = element.cloneNode( false );
                newElement.innerHTML = markdown.toHTML( slides[ i ] );
                element.parentNode.insertBefore( newElement, element );
                element = newElement;
                i--;
              }
              if ( id !== null ) {
                element.id = id;
              }
            }
        } // Markdown

        if ( window.hljs ) {
            hljs.initHighlightingOnLoad();
        }

        if ( window.mermaid ) {
            mermaid.initialize( { startOnLoad:true } );
        }
    };

    // Register the plugin to be called in pre-init phase
    // Note: Markdown.js should run early/first, because it creates new div elements.
    // So add this with a lower-than-default weight.
    impress.addPreInitPlugin( preInit, 1 );

} )( document, window );


/**
 * Form support
 *
 * Functionality to better support use of input, textarea, button... elements in a presentation.
 *
 * This plugin does two things:
 *
 * Set stopPropagation on any element that might take text input. This allows users to type, for
 * example, the letter 'P' into a form field, without causing the presenter console to spring up.
 *
 * On impress:stepleave, de-focus any potentially active
 * element. This is to prevent the focus from being left in a form element that is no longer visible
 * in the window, and user therefore typing garbage into the form.
 *
 * TODO: Currently it is not possible to use TAB to navigate between form elements. Impress.js, and
 * in particular the navigation plugin, unfortunately must fully take control of the tab key,
 * otherwise a user could cause the browser to scroll to a link or button that's not on the current
 * step. However, it could be possible to allow tab navigation between form elements, as long as
 * they are on the active step. This is a topic for further study.
 *
 * Copyright 2016 Henrik Ingo
 * MIT License
 */
/* global document */
( function( document ) {
    "use strict";
    var root;
    var api;

    document.addEventListener( "impress:init", function( event ) {
        root = event.target;
        api = event.detail.api;
        var gc = api.lib.gc;

        var selectors = [ "input", "textarea", "select", "[contenteditable=true]" ];
        for ( var selector of selectors ) {
            var elements = document.querySelectorAll( selector );
            if ( !elements ) {
                continue;
            }

            for ( var i = 0; i < elements.length; i++ ) {
                var e = elements[ i ];
                gc.addEventListener( e, "keydown", function( event ) {
                    event.stopPropagation();
                } );
                gc.addEventListener( e, "keyup", function( event ) {
                    event.stopPropagation();
                } );
            }
        }
    }, false );

    document.addEventListener( "impress:stepleave", function() {
        document.activeElement.blur();
    }, false );

} )( document );


/**
 * Fullscreen plugin
 *
 * Press F5 to enter fullscreen and ESC to exit fullscreen mode.
 *
 * Copyright 2019 @giflw
 * Released under the MIT license.
 */
/* global document */

( function( document ) {
    "use strict";

    function enterFullscreen() {
        var elem = document.documentElement;
        if ( !document.fullscreenElement ) {
            elem.requestFullscreen();
        }
    }

    function exitFullscreen() {
        if ( document.fullscreenElement ) {
            document.exitFullscreen();
        }
    }

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
        var api = event.detail.api;
        var root = event.target;
        var gc = api.lib.gc;
        var util = api.lib.util;

        gc.addEventListener( document, "keydown", function( event ) {

            // 116 (F5) is sent by presentation remote controllers
            if ( event.code === "F5" ) {
                event.preventDefault();
                enterFullscreen();
                util.triggerEvent( root.querySelector( ".active" ), "impress:steprefresh" );
            }

            // 27 (Escape) is sent by presentation remote controllers
            if ( event.key === "Escape" || event.key === "F5" ) {
                event.preventDefault();
                exitFullscreen();
                util.triggerEvent( root.querySelector( ".active" ), "impress:steprefresh" );
            }
        }, false );

        util.triggerEvent( document, "impress:help:add",
            { command: "F5 / ESC", text: "Fullscreen: Enter / Exit", row: 200 } );

    }, false );

} )( document );


/**
 * Goto Plugin
 *
 * The goto plugin is a pre-stepleave plugin. It is executed before impress:stepleave,
 * and will alter the destination where to transition next.
 *
 * Example:
 *
 *         <!-- When leaving this step, go directly to "step-5" -->
 *         <div class="step" data-goto="step-5">
 *
 *         <!-- When leaving this step with next(), go directly to "step-5", instead of next step.
 *              If moving backwards to previous step - e.g. prev() instead of next() -
 *              then go to "step-1". -->
 *         <div class="step" data-goto-next="step-5" data-goto-prev="step-1">
 *
 *        <!-- data-goto-key-list and data-goto-next-list allow you to build advanced non-linear
 *             navigation. -->
 *        <div class="step"
 *             data-goto-key-list="ArrowUp ArrowDown ArrowRight ArrowLeft"
 *             data-goto-next-list="step-4 step-3 step-2 step-5">
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values for a table
 * of what strings to use for each key.
 *
 * Copyright 2016-2017 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */
/* global window, document, impress */

( function( document, window ) {
    "use strict";
    var lib;

    document.addEventListener( "impress:init", function( event ) {
        lib = event.detail.api.lib;
    }, false );

    var isNumber = function( numeric ) {
        return !isNaN( numeric );
    };

    var goto = function( event ) {
        if ( ( !event ) || ( !event.target ) ) {
            return;
        }

        var data = event.target.dataset;
        var steps = document.querySelectorAll( ".step" );

        // Data-goto-key-list="" & data-goto-next-list="" //////////////////////////////////////////
        if ( data.gotoKeyList !== undefined &&
             data.gotoNextList !== undefined &&
             event.origEvent !== undefined &&
             event.origEvent.key !== undefined ) {
            var keylist = data.gotoKeyList.split( " " );
            var nextlist = data.gotoNextList.split( " " );

            if ( keylist.length !== nextlist.length ) {
                window.console.log(
                    "impress goto plugin: data-goto-key-list and data-goto-next-list don't match:"
                );
                window.console.log( keylist );
                window.console.log( nextlist );

                // Don't return, allow the other categories to work despite this error
            } else {
                var index = keylist.indexOf( event.origEvent.key );
                if ( index >= 0 ) {
                    var next = nextlist[ index ];
                    if ( isNumber( next ) ) {
                        event.detail.next = steps[ next ];

                        // If the new next element has its own transitionDuration, we're responsible
                        // for setting that on the event as well
                        event.detail.transitionDuration = lib.util.toNumber(
                            event.detail.next.dataset.transitionDuration,
                            event.detail.transitionDuration
                        );
                        return;
                    } else {
                        var newTarget = document.getElementById( next );
                        if ( newTarget && newTarget.classList.contains( "step" ) ) {
                            event.detail.next = newTarget;
                            event.detail.transitionDuration = lib.util.toNumber(
                                event.detail.next.dataset.transitionDuration,
                                event.detail.transitionDuration
                            );
                            return;
                        } else {
                            window.console.log( "impress goto plugin: " + next +
                                                " is not a step in this impress presentation." );
                        }
                    }
                }
            }
        }

        // Data-goto-next="" & data-goto-prev="" ///////////////////////////////////////////////////

        // Handle event.target data-goto-next attribute
        if ( isNumber( data.gotoNext ) && event.detail.reason === "next" ) {
            event.detail.next = steps[ data.gotoNext ];

            // If the new next element has its own transitionDuration, we're responsible for setting
            // that on the event as well
            event.detail.transitionDuration = lib.util.toNumber(
                event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
            );
            return;
        }
        if ( data.gotoNext && event.detail.reason === "next" ) {
            var newTarget = document.getElementById( data.gotoNext ); // jshint ignore:line
            if ( newTarget && newTarget.classList.contains( "step" ) ) {
                event.detail.next = newTarget;
                event.detail.transitionDuration = lib.util.toNumber(
                    event.detail.next.dataset.transitionDuration,
                    event.detail.transitionDuration
                );
                return;
            } else {
                window.console.log( "impress goto plugin: " + data.gotoNext +
                                    " is not a step in this impress presentation." );
            }
        }

        // Handle event.target data-goto-prev attribute
        if ( isNumber( data.gotoPrev ) && event.detail.reason === "prev" ) {
            event.detail.next = steps[ data.gotoPrev ];
            event.detail.transitionDuration = lib.util.toNumber(
                event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
            );
            return;
        }
        if ( data.gotoPrev && event.detail.reason === "prev" ) {
            var newTarget = document.getElementById( data.gotoPrev ); // jshint ignore:line
            if ( newTarget && newTarget.classList.contains( "step" ) ) {
                event.detail.next = newTarget;
                event.detail.transitionDuration = lib.util.toNumber(
                    event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
                );
                return;
            } else {
                window.console.log( "impress goto plugin: " + data.gotoPrev +
                                    " is not a step in this impress presentation." );
            }
        }

        // Data-goto="" ///////////////////////////////////////////////////////////////////////////

        // Handle event.target data-goto attribute
        if ( isNumber( data.goto ) ) {
            event.detail.next = steps[ data.goto ];
            event.detail.transitionDuration = lib.util.toNumber(
                event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
            );
            return;
        }
        if ( data.goto ) {
            var newTarget = document.getElementById( data.goto ); // jshint ignore:line
            if ( newTarget && newTarget.classList.contains( "step" ) ) {
                event.detail.next = newTarget;
                event.detail.transitionDuration = lib.util.toNumber(
                    event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
                );
                return;
            } else {
                window.console.log( "impress goto plugin: " + data.goto +
                                    " is not a step in this impress presentation." );
            }
        }
    };

    // Register the plugin to be called in pre-stepleave phase
    impress.addPreStepLeavePlugin( goto );

} )( document, window );


/**
 * Help popup plugin
 *
 * Example:
 *
 *     <!-- Show a help popup at start, or if user presses "H" -->
 *     <div id="impress-help"></div>
 *
 * For developers:
 *
 * Typical use for this plugin, is for plugins that support some keypress, to add a line
 * to the help popup produced by this plugin. For example "P: Presenter console".
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */
/* global window, document */

( function( document, window ) {
    "use strict";
    var rows = [];
    var timeoutHandle;

    var triggerEvent = function( el, eventName, detail ) {
        var event = document.createEvent( "CustomEvent" );
        event.initCustomEvent( eventName, true, true, detail );
        el.dispatchEvent( event );
    };

    var renderHelpDiv = function() {
        var helpDiv = document.getElementById( "impress-help" );
        if ( helpDiv ) {
            var html = [];
            for ( var row in rows ) {
                for ( var arrayItem in row ) {
                    html.push( rows[ row ][ arrayItem ] );
                }
            }
            if ( html ) {
                helpDiv.innerHTML = "<table>\n" + html.join( "\n" ) + "</table>\n";
            }
        }
    };

    var toggleHelp = function() {
        var helpDiv = document.getElementById( "impress-help" );
        if ( !helpDiv ) {
            return;
        }

        if ( helpDiv.style.display === "block" ) {
            helpDiv.style.display = "none";
        } else {
            helpDiv.style.display = "block";
            window.clearTimeout( timeoutHandle );
        }
    };

    document.addEventListener( "keyup", function( event ) {

        if ( event.keyCode === 72 || event.keyCode === 191 ) { // "h" || "?"
            event.preventDefault();
            toggleHelp();
        }
    }, false );

    // API
    // Other plugins can add help texts, typically if they support an action on a keypress.
    /**
     * Add a help text to the help popup.
     *
     * :param: e.detail.command  Example: "H"
     * :param: e.detail.text     Example: "Show this help."
     * :param: e.detail.row      Row index from 0 to 9 where to place this help text. Example: 0
     */
    document.addEventListener( "impress:help:add", function( e ) {

        // The idea is for the sender of the event to supply a unique row index, used for sorting.
        // But just in case two plugins would ever use the same row index, we wrap each row into
        // its own array. If there are more than one entry for the same index, they are shown in
        // first come, first serve ordering.
        var rowIndex = e.detail.row;
        if ( typeof rows[ rowIndex ] !== "object" || !rows[ rowIndex ].isArray ) {
            rows[ rowIndex ] = [];
        }
        rows[ e.detail.row ].push( "<tr><td><strong>" + e.detail.command + "</strong></td><td>" +
                                   e.detail.text + "</td></tr>" );
        renderHelpDiv();
    } );

    document.addEventListener( "impress:init", function( e ) {
        renderHelpDiv();

        // At start, show the help for 7 seconds.
        var helpDiv = document.getElementById( "impress-help" );
        if ( helpDiv ) {
            helpDiv.style.display = "block";
            timeoutHandle = window.setTimeout( function() {
                var helpDiv = document.getElementById( "impress-help" );
                helpDiv.style.display = "none";
            }, 7000 );

            // Regster callback to empty the help div on teardown
            var api = e.detail.api;
            api.lib.gc.pushCallback( function() {
                window.clearTimeout( timeoutHandle );
                helpDiv.style.display = "";
                helpDiv.innerHTML = "";
                rows = [];
            } );
        }

        // Use our own API to register the help text for "h"
        triggerEvent( document, "impress:help:add",
                      { command: "H", text: "Show this help", row: 0 } );
    } );

} )( document, window );


/**
 * Adds a presenter console to impress.js
 *
 * MIT Licensed, see license.txt.
 *
 * Copyright 2012, 2013, 2015 impress-console contributors (see README.txt)
 *
 * version: 1.3-dev
 *
 */

// This file contains so much HTML, that we will just respectfully disagree about js
/* jshint quotmark:single */
/* global navigator, top, setInterval, clearInterval, document, window */

( function( document, window ) {
    'use strict';

    // TODO: Move this to src/lib/util.js
    var triggerEvent = function( el, eventName, detail ) {
        var event = document.createEvent( 'CustomEvent' );
        event.initCustomEvent( eventName, true, true, detail );
        el.dispatchEvent( event );
    };

    // Create Language object depending on browsers language setting
    var lang;
    switch ( navigator.language ) {
    case 'de':
        lang = {
            'noNotes': '<div class="noNotes">Keine Notizen hierzu</div>',
            'restart': 'Neustart',
            'clickToOpen': 'Klicken um Sprecherkonsole zu öffnen',
            'prev': 'zurück',
            'next': 'weiter',
            'loading': 'initalisiere',
            'ready': 'Bereit',
            'moving': 'in Bewegung',
            'useAMPM': false
        };
        break;
    case 'en': // jshint ignore:line
    default : // jshint ignore:line
        lang = {
            'noNotes': '<div class="noNotes">No notes for this step</div>',
            'restart': 'Restart',
            'clickToOpen': 'Click to open speaker console',
            'prev': 'Prev',
            'next': 'Next',
            'loading': 'Loading',
            'ready': 'Ready',
            'moving': 'Moving',
            'useAMPM': false
        };
        break;
    }

    // Settings to set iframe in speaker console
    const preViewDefaultFactor = 0.7;
    const preViewMinimumFactor = 0.5;
    const preViewGap    = 4;

    // This is the default template for the speaker console window
    const consoleTemplate = '<!DOCTYPE html>' +
        '<html id="impressconsole"><head>' +

          // Order is important: If user provides a cssFile, those will win, because they're later
          '{{cssStyle}}' +
          '{{cssLink}}' +
        '</head><body>' +
        '<div id="console">' +
          '<div id="views">' +
            '<iframe id="slideView" scrolling="no"></iframe>' +
            '<iframe id="preView" scrolling="no"></iframe>' +
            '<div id="blocker"></div>' +
          '</div>' +
          '<div id="notes"></div>' +
        '</div>' +
        '<div id="controls"> ' +
          '<div id="prev"><a  href="#" onclick="impress().prev(); return false;" />' +
            '{{prev}}</a></div>' +
          '<div id="next"><a  href="#" onclick="impress().next(); return false;" />' +
            '{{next}}</a></div>' +
          '<div id="clock">--:--</div>' +
          '<div id="timer" onclick="timerReset()">00m 00s</div>' +
          '<div id="status">{{loading}}</div>' +
        '</div>' +
        '</body></html>';

    // Default css location
    var cssFileOldDefault = 'css/impressConsole.css';
    var cssFile = undefined; // jshint ignore:line

    // Css for styling iframs on the console
    var cssFileIframeOldDefault = 'css/iframe.css';
    var cssFileIframe = undefined; // jshint ignore:line

    // All console windows, so that you can call impressConsole() repeatedly.
    var allConsoles = {};

    // Zero padding helper function:
    var zeroPad = function( i ) {
        return ( i < 10 ? '0' : '' ) + i;
    };

    // The console object
    var impressConsole = window.impressConsole = function( rootId ) {

        rootId = rootId || 'impress';

        if ( allConsoles[ rootId ] ) {
            return allConsoles[ rootId ];
        }

        // Root presentation elements
        var root = document.getElementById( rootId );

        var consoleWindow = null;

        var nextStep = function() {
            var classes = '';
            var nextElement = document.querySelector( '.active' );

            // Return to parents as long as there is no next sibling
            while ( !nextElement.nextElementSibling && nextElement.parentNode ) {
                nextElement = nextElement.parentNode;
            }
            nextElement = nextElement.nextElementSibling;
            while ( nextElement ) {
                classes = nextElement.attributes[ 'class' ];
                if ( classes && classes.value.indexOf( 'step' ) !== -1 ) {
                    consoleWindow.document.getElementById( 'blocker' ).innerHTML = lang.next;
                    return nextElement;
                }

                if ( nextElement.firstElementChild ) { // First go into deep
                    nextElement = nextElement.firstElementChild;
                } else {

                    // Go to next sibling or through parents until there is a next sibling
                    while ( !nextElement.nextElementSibling && nextElement.parentNode ) {
                        nextElement = nextElement.parentNode;
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }

            // No next element. Pick the first
            consoleWindow.document.getElementById( 'blocker' ).innerHTML = lang.restart;
            return document.querySelector( '.step' );
        };

        // Sync the notes to the step
        var onStepLeave = function() {
            if ( consoleWindow ) {

                // Set notes to next steps notes.
                var newNotes = document.querySelector( '.active' ).querySelector( '.notes' );
                if ( newNotes ) {
                    newNotes = newNotes.innerHTML;
                } else {
                    newNotes = lang.noNotes;
                }
                consoleWindow.document.getElementById( 'notes' ).innerHTML = newNotes;

                // Set the views
                var baseURL = document.URL.substring( 0, document.URL.search( '#/' ) );
                var slideSrc = baseURL + '#' + document.querySelector( '.active' ).id;
                var preSrc = baseURL + '#' + nextStep().id;
                var slideView = consoleWindow.document.getElementById( 'slideView' );

                // Setting them when they are already set causes glithes in Firefox, so check first:
                if ( slideView.src !== slideSrc ) {
                    slideView.src = slideSrc;
                }
                var preView = consoleWindow.document.getElementById( 'preView' );
                if ( preView.src !== preSrc ) {
                    preView.src = preSrc;
                }

                consoleWindow.document.getElementById( 'status' ).innerHTML =
                    '<span class="moving">' + lang.moving + '</span>';
            }
        };

        // Sync the previews to the step
        var onStepEnter = function() {
            if ( consoleWindow ) {

                // We do everything here again, because if you stopped the previos step to
                // early, the onstepleave trigger is not called for that step, so
                // we need this to sync things.
                var newNotes = document.querySelector( '.active' ).querySelector( '.notes' );
                if ( newNotes ) {
                    newNotes = newNotes.innerHTML;
                } else {
                    newNotes = lang.noNotes;
                }
                var notes = consoleWindow.document.getElementById( 'notes' );
                notes.innerHTML = newNotes;
                notes.scrollTop = 0;

                // Set the views
                var baseURL = document.URL.substring( 0, document.URL.search( '#/' ) );
                var slideSrc = baseURL + '#' + document.querySelector( '.active' ).id;
                var preSrc = baseURL + '#' + nextStep().id;
                var slideView = consoleWindow.document.getElementById( 'slideView' );

                // Setting them when they are already set causes glithes in Firefox, so check first:
                if ( slideView.src !== slideSrc ) {
                    slideView.src = slideSrc;
                }
                var preView = consoleWindow.document.getElementById( 'preView' );
                if ( preView.src !== preSrc ) {
                    preView.src = preSrc;
                }

                consoleWindow.document.getElementById( 'status' ).innerHTML =
                    '<span  class="ready">' + lang.ready + '</span>';
            }
        };

        // Sync substeps
        var onSubstep = function( event ) {
            if ( consoleWindow ) {
                if ( event.detail.reason === 'next' ) {
                    onSubstepShow();
                }
                if ( event.detail.reason === 'prev' ) {
                    onSubstepHide();
                }
            }
        };

        var onSubstepShow = function() {
            var slideView = consoleWindow.document.getElementById( 'slideView' );
            triggerEventInView( slideView, 'impress:substep:show' );
        };

        var onSubstepHide = function() {
            var slideView = consoleWindow.document.getElementById( 'slideView' );
            triggerEventInView( slideView, 'impress:substep:hide' );
        };

        var triggerEventInView = function( frame, eventName, detail ) {

            // Note: Unfortunately Chrome does not allow createEvent on file:// URLs, so this won't
            // work. This does work on Firefox, and should work if viewing the presentation on a
            // http:// URL on Chrome.
            var event = frame.contentDocument.createEvent( 'CustomEvent' );
            event.initCustomEvent( eventName, true, true, detail );
            frame.contentDocument.dispatchEvent( event );
        };

        var spaceHandler = function() {
            var notes = consoleWindow.document.getElementById( 'notes' );
            if ( notes.scrollTopMax - notes.scrollTop > 20 ) {
               notes.scrollTop = notes.scrollTop + notes.clientHeight * 0.8;
            } else {
               window.impress().next();
            }
        };

        var timerReset = function() {
            consoleWindow.timerStart = new Date();
        };

        // Show a clock
        var clockTick = function() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var ampm = '';

            if ( lang.useAMPM ) {
                ampm = ( hours < 12 ) ? 'AM' : 'PM';
                hours = ( hours > 12 ) ? hours - 12 : hours;
                hours = ( hours === 0 ) ? 12 : hours;
            }

            // Clock
            var clockStr = zeroPad( hours ) + ':' + zeroPad( minutes ) + ':' + zeroPad( seconds ) +
                           ' ' + ampm;
            consoleWindow.document.getElementById( 'clock' ).firstChild.nodeValue = clockStr;

            // Timer
            seconds = Math.floor( ( now - consoleWindow.timerStart ) / 1000 );
            minutes = Math.floor( seconds / 60 );
            seconds = Math.floor( seconds % 60 );
            consoleWindow.document.getElementById( 'timer' ).firstChild.nodeValue =
                zeroPad( minutes ) + 'm ' + zeroPad( seconds ) + 's';

            if ( !consoleWindow.initialized ) {

                // Nudge the slide windows after load, or they will scrolled wrong on Firefox.
                consoleWindow.document.getElementById( 'slideView' ).contentWindow.scrollTo( 0, 0 );
                consoleWindow.document.getElementById( 'preView' ).contentWindow.scrollTo( 0, 0 );
                consoleWindow.initialized = true;
            }
        };

        var registerKeyEvent = function( keyCodes, handler, window ) {
            if ( window === undefined ) {
                window = consoleWindow;
            }

            // Prevent default keydown action when one of supported key is pressed
            window.document.addEventListener( 'keydown', function( event ) {
                if ( !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey &&
                     keyCodes.indexOf( event.keyCode ) !== -1 ) {
                    event.preventDefault();
                }
            }, false );

            // Trigger impress action on keyup
            window.document.addEventListener( 'keyup', function( event ) {
                if ( !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey &&
                     keyCodes.indexOf( event.keyCode ) !== -1 ) {
                        handler();
                        event.preventDefault();
                }
            }, false );
        };

        var consoleOnLoad = function() {
                var slideView = consoleWindow.document.getElementById( 'slideView' );
                var preView = consoleWindow.document.getElementById( 'preView' );

                // Firefox:
                slideView.contentDocument.body.classList.add( 'impress-console' );
                preView.contentDocument.body.classList.add( 'impress-console' );
                if ( cssFileIframe !== undefined ) {
                    slideView.contentDocument.head.insertAdjacentHTML(
                        'beforeend',
                        '<link rel="stylesheet" type="text/css" href="' + cssFileIframe + '">'
                    );
                    preView.contentDocument.head.insertAdjacentHTML(
                        'beforeend',
                        '<link rel="stylesheet" type="text/css" href="' + cssFileIframe + '">'
                    );
                }

                // Chrome:
                slideView.addEventListener( 'load', function() {
                        slideView.contentDocument.body.classList.add( 'impress-console' );
                        if ( cssFileIframe !== undefined ) {
                            slideView.contentDocument.head.insertAdjacentHTML(
                                'beforeend',
                                '<link rel="stylesheet" type="text/css" href="' +
                                    cssFileIframe + '">'
                            );
                        }
                } );
                preView.addEventListener( 'load', function() {
                        preView.contentDocument.body.classList.add( 'impress-console' );
                        if ( cssFileIframe !== undefined ) {
                            preView.contentDocument.head.insertAdjacentHTML(
                                'beforeend',
                                '<link rel="stylesheet" type="text/css" href="' +
                                    cssFileIframe + '">' );
                        }
                } );
        };

        var open = function() {
            if ( top.isconsoleWindow ) {
                return;
            }

            if ( consoleWindow && !consoleWindow.closed ) {
                consoleWindow.focus();
            } else {
                consoleWindow = window.open( '', 'impressConsole' );

                // If opening failes this may be because the browser prevents this from
                // not (or less) interactive JavaScript...
                if ( consoleWindow == null ) {

                    // ... so I add a button to klick.
                    // workaround on firefox
                    var message = document.createElement( 'div' );
                    message.id = 'impress-console-button';
                    message.style.position = 'fixed';
                    message.style.left = 0;
                    message.style.top = 0;
                    message.style.right = 0;
                    message.style.bottom = 0;
                    message.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    var clickStr = 'var x = document.getElementById(\'impress-console-button\');' +
                                     'x.parentNode.removeChild(x);' +
                                     'var r = document.getElementById(\'' + rootId + '\');' +
                                     'impress(\'' + rootId +
                                     '\').lib.util.triggerEvent(r, \'impress:console:open\', {})';
                    var styleStr = 'margin: 25vh 25vw;width:50vw;height:50vh;';
                    message.innerHTML = '<button style="' + styleStr + '" ' +
                                                 'onclick="' + clickStr + '">' +
                                        lang.clickToOpen +
                                        '</button>';
                    document.body.appendChild( message );
                    return;
                }

                var cssLink = '';
                if ( cssFile !== undefined ) {
                    cssLink = '<link rel="stylesheet" type="text/css" media="screen" href="' +
                              cssFile + '">';
                }

                // This sets the window location to the main window location, so css can be loaded:
                consoleWindow.document.open();

                // Write the template:
                consoleWindow.document.write(

                    // CssStyleStr is lots of inline <style></style> defined at the end of this file
                    consoleTemplate.replace( '{{cssStyle}}', cssStyleStr() )
                                   .replace( '{{cssLink}}', cssLink )
                                   .replace( /{{.*?}}/gi, function( x ) {
                                       return lang[ x.substring( 2, x.length - 2 ) ]; }
                                   )
                );
                consoleWindow.document.title = 'Speaker Console (' + document.title + ')';
                consoleWindow.impress = window.impress;

                // We set this flag so we can detect it later, to prevent infinite popups.
                consoleWindow.isconsoleWindow = true;

                // Set the onload function:
                consoleWindow.onload = consoleOnLoad;

                // Add clock tick
                consoleWindow.timerStart = new Date();
                consoleWindow.timerReset = timerReset;
                consoleWindow.clockInterval = setInterval( allConsoles[ rootId ].clockTick, 1000 );

                // Keyboard navigation handlers
                // 33: pg up, 37: left, 38: up
                registerKeyEvent( [ 33, 37, 38 ], window.impress().prev );

                // 34: pg down, 39: right, 40: down
                registerKeyEvent( [ 34, 39, 40 ], window.impress().next );

                // 32: space
                registerKeyEvent( [ 32 ], spaceHandler );

                // 82: R
                registerKeyEvent( [ 82 ], timerReset );

                // Cleanup
                consoleWindow.onbeforeunload = function() {

                    // I don't know why onunload doesn't work here.
                    clearInterval( consoleWindow.clockInterval );
                };

                // It will need a little nudge on Firefox, but only after loading:
                onStepEnter();
                consoleWindow.initialized = false;
                consoleWindow.document.close();

                //Catch any window resize to pass size on
                window.onresize = resize;
                consoleWindow.onresize = resize;

                return consoleWindow;
            }
        };

        var resize = function() {
            var slideView = consoleWindow.document.getElementById( 'slideView' );
            var preView = consoleWindow.document.getElementById( 'preView' );

            // Get ratio of presentation
            var ratio = window.innerHeight / window.innerWidth;

            // Get size available for views
            var views = consoleWindow.document.getElementById( 'views' );

            // SlideView may have a border or some padding:
            // asuming same border width on both direktions
            var delta = slideView.offsetWidth - slideView.clientWidth;

            // Set views
            var slideViewWidth = ( views.clientWidth - delta );
            var slideViewHeight = Math.floor( slideViewWidth * ratio );

            var preViewTop = slideViewHeight + preViewGap;

            var preViewWidth = Math.floor( slideViewWidth * preViewDefaultFactor );
            var preViewHeight = Math.floor( slideViewHeight * preViewDefaultFactor );

            // Shrink preview to fit into space available
            if ( views.clientHeight - delta < preViewTop + preViewHeight ) {
                preViewHeight = views.clientHeight - delta - preViewTop;
                preViewWidth = Math.floor( preViewHeight / ratio );
            }

            // If preview is not high enough forget ratios!
            if ( preViewWidth <= Math.floor( slideViewWidth * preViewMinimumFactor ) ) {
                slideViewWidth = ( views.clientWidth - delta );
                slideViewHeight = Math.floor( ( views.clientHeight - delta - preViewGap ) /
                                             ( 1 + preViewMinimumFactor ) );

                preViewTop = slideViewHeight + preViewGap;

                preViewWidth = Math.floor( slideViewWidth * preViewMinimumFactor );
                preViewHeight = views.clientHeight - delta - preViewTop;
            }

            // Set the calculated into styles
            slideView.style.width = slideViewWidth + 'px';
            slideView.style.height = slideViewHeight + 'px';

            preView.style.top = preViewTop + 'px';

            preView.style.width = preViewWidth + 'px';
            preView.style.height = preViewHeight + 'px';
        };

        var _init = function( cssConsole, cssIframe ) {
            if ( cssConsole !== undefined ) {
                cssFile = cssConsole;
            }

            // You can also specify the css in the presentation root div:
            // <div id="impress" data-console-css=..." data-console-css-iframe="...">
            else if ( root.dataset.consoleCss !== undefined ) {
                cssFile = root.dataset.consoleCss;
            }

            if ( cssIframe !== undefined ) {
                cssFileIframe = cssIframe;
            } else if ( root.dataset.consoleCssIframe !== undefined ) {
                cssFileIframe = root.dataset.consoleCssIframe;
            }

            // Register the event
            root.addEventListener( 'impress:stepleave', onStepLeave );
            root.addEventListener( 'impress:stepenter', onStepEnter );
            root.addEventListener( 'impress:substep:stepleaveaborted', onSubstep );
            root.addEventListener( 'impress:substep:show', onSubstepShow );
            root.addEventListener( 'impress:substep:hide', onSubstepHide );

            //When the window closes, clean up after ourselves.
            window.onunload = function() {
                if ( consoleWindow && !consoleWindow.closed ) {
                    consoleWindow.close();
                }
            };

            //Open speaker console when they press 'p'
            registerKeyEvent( [ 80 ], open, window );

            //Btw, you can also launch console automatically:
            //<div id="impress" data-console-autolaunch="true">
            if ( root.dataset.consoleAutolaunch === 'true' ) {
                open();
            }
        };

        var init = function( cssConsole, cssIframe ) {
            if ( ( cssConsole === undefined || cssConsole === cssFileOldDefault ) &&
                 ( cssIframe === undefined  || cssIframe === cssFileIframeOldDefault ) ) {
                window.console.log( 'impressConsole().init() is deprecated. ' +
                                   'impressConsole is now initialized automatically when you ' +
                                   'call impress().init().' );
            }
            _init( cssConsole, cssIframe );
        };

        // New API for impress.js plugins is based on using events
        root.addEventListener( 'impress:console:open', function() {
            open();
        } );

        /**
         * Register a key code to an event handler
         *
         * :param: event.detail.keyCodes    List of key codes
         * :param: event.detail.handler     A function registered as the event handler
         * :param: event.detail.window      The console window to register the keycode in
         */
        root.addEventListener( 'impress:console:registerKeyEvent', function( event ) {
            registerKeyEvent( event.detail.keyCodes, event.detail.handler, event.detail.window );
        } );

        // Return the object
        allConsoles[ rootId ] = { init: init, open: open, clockTick: clockTick,
                               registerKeyEvent: registerKeyEvent, _init: _init };
        return allConsoles[ rootId ];

    };

    // This initializes impressConsole automatically when initializing impress itself
    document.addEventListener( 'impress:init', function( event ) {

        // Note: impressConsole wants the id string, not the DOM element directly
        impressConsole( event.target.id )._init();

        // Add 'P' to the help popup
        triggerEvent( document, 'impress:help:add',
                        { command: 'P', text: 'Presenter console', row: 10 } );
    } );

    // Returns a string to be used inline as a css <style> element in the console window.
    // Apologies for length, but hiding it here at the end to keep it away from rest of the code.
    var cssStyleStr = function() {
        return `<style>
            #impressconsole body {
                background-color: rgb(255, 255, 255);
                padding: 0;
                margin: 0;
                font-family: verdana, arial, sans-serif;
                font-size: 2vw;
            }

            #impressconsole div#console {
                position: absolute;
                top: 0.5vw;
                left: 0.5vw;
                right: 0.5vw;
                bottom: 3vw;
                margin: 0;
            }

            #impressconsole div#views, #impressconsole div#notes {
                position: absolute;
                top: 0;
                bottom: 0;
            }

            #impressconsole div#views {
                left: 0;
                right: 50vw;
                overflow: hidden;
            }

            #impressconsole div#blocker {
                position: absolute;
                right: 0;
                bottom: 0;
            }

            #impressconsole div#notes {
                left: 50vw;
                right: 0;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 0.3ex;
                background-color: rgb(255, 255, 255);
                border: solid 1px rgb(120, 120, 120);
            }

            #impressconsole div#notes .noNotes {
                color: rgb(200, 200, 200);
            }

            #impressconsole div#notes p {
                margin-top: 0;
            }

            #impressconsole iframe {
                position: absolute;
                margin: 0;
                padding: 0;
                left: 0;
                border: solid 1px rgb(120, 120, 120);
            }

            #impressconsole iframe#slideView {
                top: 0;
                width: 49vw;
                height: 49vh;
            }

            #impressconsole iframe#preView {
                opacity: 0.7;
                top: 50vh;
                width: 30vw;
                height: 30vh;
            }

            #impressconsole div#controls {
                margin: 0;
                position: absolute;
                bottom: 0.25vw;
                left: 0.5vw;
                right: 0.5vw;
                height: 2.5vw;
                background-color: rgb(255, 255, 255);
                background-color: rgba(255, 255, 255, 0.6);
            }

            #impressconsole div#prev, div#next {
            }

            #impressconsole div#prev a, #impressconsole div#next a {
                display: block;
                border: solid 1px rgb(70, 70, 70);
                border-radius: 0.5vw;
                font-size: 1.5vw;
                padding: 0.25vw;
                text-decoration: none;
                background-color: rgb(220, 220, 220);
                color: rgb(0, 0, 0);
            }

            #impressconsole div#prev a:hover, #impressconsole div#next a:hover {
                background-color: rgb(245, 245, 245);
            }

            #impressconsole div#prev {
                float: left;
            }

            #impressconsole div#next {
                float: right;
            }

            #impressconsole div#status {
                margin-left: 2em;
                margin-right: 2em;
                text-align: center;
                float: right;
            }

            #impressconsole div#clock {
                margin-left: 2em;
                margin-right: 2em;
                text-align: center;
                float: left;
            }

            #impressconsole div#timer {
                margin-left: 2em;
                margin-right: 2em;
                text-align: center;
                float: left;
            }

            #impressconsole span.moving {
                color: rgb(255, 0, 0);
            }

            #impressconsole span.ready {
                color: rgb(0, 128, 0);
            }
        </style>`;
    };

} )( document, window );

/**
 * Media Plugin
 *
 * This plugin will do the following things:
 *
 *  - Add a special class when playing (body.impress-media-video-playing
 *    and body.impress-media-video-playing) and pausing media (body.impress-media-video-paused
 *    and body.impress-media-audio-paused) (removing them when ending).
 *    This can be useful for example for darkening the background or fading out other elements
 *    while a video is playing.
 *    Only media at the current step are taken into account. All classes are removed when leaving
 *    a step.
 *
 *  - Introduce the following new data attributes:
 *
 *    - data-media-autoplay="true": Autostart media when entering its step.
 *    - data-media-autostop="true": Stop media (= pause and reset to start), when leaving its
 *      step.
 *    - data-media-autopause="true": Pause media but keep current time when leaving its step.
 *
 *    When these attributes are added to a step they are inherited by all media on this step.
 *    Of course this setting can be overwritten by adding different attributes to inidvidual
 *    media.
 *
 *    The same rule applies when this attributes is added to the root element. Settings can be
 *    overwritten for individual steps and media.
 *
 *    Examples:
 *    - data-media-autoplay="true" data-media-autostop="true": start media on enter, stop on
 *      leave, restart from beginning when re-entering the step.
 *
 *    - data-media-autoplay="true" data-media-autopause="true": start media on enter, pause on
 *      leave, resume on re-enter
 *
 *    - data-media-autoplay="true" data-media-autostop="true" data-media-autopause="true": start
 *      media on enter, stop on leave (stop overwrites pause).
 *
 *    - data-media-autoplay="true" data-media-autopause="false": let media start automatically
 *      when entering a step and let it play when leaving the step.
 *
 *    - <div id="impress" data-media-autoplay="true"> ... <div class="step"
 *      data-media-autoplay="false">
 *      All media is startet automatically on all steps except the one that has the
 *      data-media-autoplay="false" attribute.
 *
 *  - Pro tip: Use <audio onended="impress().next()"> or <video onended="impress().next()"> to
 *    proceed to the next step automatically, when the end of the media is reached.
 *
 *
 * Copyright 2018 Holger Teichert (@complanar)
 * Released under the MIT license.
 */
/* global window, document */

( function( document, window ) {
    "use strict";
    var root, api, gc, attributeTracker;

    attributeTracker = [];

    // Function names
    var enhanceMediaNodes,
        enhanceMedia,
        removeMediaClasses,
        onStepenterDetectImpressConsole,
        onStepenter,
        onStepleave,
        onPlay,
        onPause,
        onEnded,
        getMediaAttribute,
        teardown;

    document.addEventListener( "impress:init", function( event ) {
        root = event.target;
        api = event.detail.api;
        gc = api.lib.gc;

        enhanceMedia();

        gc.pushCallback( teardown );
    }, false );

    teardown = function() {
        var el, i;
        removeMediaClasses();
        for ( i = 0; i < attributeTracker.length; i += 1 ) {
            el = attributeTracker[ i ];
            el.node.removeAttribute( el.attr );
        }
        attributeTracker = [];
    };

    getMediaAttribute = function( attributeName, nodes ) {
        var attrName, attrValue, i, node;
        attrName = "data-media-" + attributeName;

        // Look for attributes in all nodes
        for ( i = 0; i < nodes.length; i += 1 ) {
            node = nodes[ i ];

            // First test, if the attribute exists, because some browsers may return
            // an empty string for non-existing attributes - specs are not clear at that point
            if ( node.hasAttribute( attrName ) ) {

                // Attribute found, return their parsed boolean value, empty strings count as true
                // to enable empty value booleans (common in html5 but not allowed in well formed
                // xml).
                attrValue = node.getAttribute( attrName );
                if ( attrValue === "" || attrValue === "true" ) {
                    return true;
                } else {
                    return false;
                }
            }

            // No attribute found at current node, proceed with next round
        }

        // Last resort: no attribute found - return undefined to distiguish from false
        return undefined;
    };

    onPlay = function( event ) {
        var type = event.target.nodeName.toLowerCase();
        document.body.classList.add( "impress-media-" + type + "-playing" );
        document.body.classList.remove( "impress-media-" + type + "-paused" );
    };

    onPause = function( event ) {
        var type = event.target.nodeName.toLowerCase();
        document.body.classList.add( "impress-media-" + type + "-paused" );
        document.body.classList.remove( "impress-media-" + type + "-playing" );
    };

    onEnded = function( event ) {
        var type = event.target.nodeName.toLowerCase();
        document.body.classList.remove( "impress-media-" + type + "-playing" );
        document.body.classList.remove( "impress-media-" + type + "-paused" );
    };

    removeMediaClasses = function() {
        var type, types;
        types = [ "video", "audio" ];
        for ( type in types ) {
            document.body.classList.remove( "impress-media-" + types[ type ] + "-playing" );
            document.body.classList.remove( "impress-media-" + types[ type ] + "-paused" );
        }
    };

    enhanceMediaNodes = function() {
        var i, id, media, mediaElement, type;

        media = root.querySelectorAll( "audio, video" );
        for ( i = 0; i < media.length; i += 1 ) {
            type = media[ i ].nodeName.toLowerCase();

            // Set an id to identify each media node - used e.g. for cross references by
            // the consoleMedia plugin
            mediaElement = media[ i ];
            id = mediaElement.getAttribute( "id" );
            if ( id === undefined || id === null ) {
                mediaElement.setAttribute( "id", "media-" + type + "-" + i );
                attributeTracker.push( { "node": mediaElement, "attr": "id" } );
            }
            gc.addEventListener( mediaElement, "play", onPlay );
            gc.addEventListener( mediaElement, "playing", onPlay );
            gc.addEventListener( mediaElement, "pause", onPause );
            gc.addEventListener( mediaElement, "ended", onEnded );
        }
    };

    enhanceMedia = function() {
        var steps, stepElement, i;
        enhanceMediaNodes();
        steps = document.getElementsByClassName( "step" );
        for ( i = 0; i < steps.length; i += 1 ) {
            stepElement = steps[ i ];

            gc.addEventListener( stepElement, "impress:stepenter", onStepenter );
            gc.addEventListener( stepElement, "impress:stepleave", onStepleave );
        }
    };

    onStepenterDetectImpressConsole = function() {
        return {
            "preview": ( window.frameElement !== null && window.frameElement.id === "preView" ),
            "slideView": ( window.frameElement !== null && window.frameElement.id === "slideView" )
        };
    };

    onStepenter = function( event ) {
        var stepElement, media, mediaElement, i, onConsole, autoplay;
        if ( ( !event ) || ( !event.target ) ) {
            return;
        }

        stepElement = event.target;
        removeMediaClasses();

        media = stepElement.querySelectorAll( "audio, video" );
        for ( i = 0; i < media.length; i += 1 ) {
            mediaElement = media[ i ];

            // Autoplay when (maybe inherited) autoplay setting is true,
            // but only if not on preview of the next step in impressConsole
            onConsole = onStepenterDetectImpressConsole();
            autoplay = getMediaAttribute( "autoplay", [ mediaElement, stepElement, root ] );
            if ( autoplay && !onConsole.preview ) {
                if ( onConsole.slideView ) {
                    mediaElement.muted = true;
                }
                mediaElement.play();
            }
        }
    };

    onStepleave = function( event ) {
        var stepElement, media, i, mediaElement, autoplay, autopause, autostop;
        if ( ( !event || !event.target ) ) {
            return;
        }

        stepElement = event.target;
        media = event.target.querySelectorAll( "audio, video" );
        for ( i = 0; i < media.length; i += 1 ) {
            mediaElement = media[ i ];

            autoplay = getMediaAttribute( "autoplay", [ mediaElement, stepElement, root ] );
            autopause = getMediaAttribute( "autopause", [ mediaElement, stepElement, root ] );
            autostop = getMediaAttribute( "autostop",  [ mediaElement, stepElement, root ] );

            // If both autostop and autopause are undefined, set it to the value of autoplay
            if ( autostop === undefined && autopause === undefined ) {
                autostop = autoplay;
            }

            if ( autopause || autostop ) {
                mediaElement.pause();
                if ( autostop ) {
                    mediaElement.currentTime = 0;
                }
            }
        }
        removeMediaClasses();
    };

} )( document, window );

/**
 * Mobile devices support
 *
 * Allow presentation creators to hide all but 3 slides, to save resources, particularly on mobile
 * devices, using classes body.impress-mobile, .step.prev, .step.active and .step.next.
 *
 * Note: This plugin does not take into account possible redirections done with skip, goto etc
 * plugins. Basically it wouldn't work as intended in such cases, but the active step will at least
 * be correct.
 *
 * Adapted to a plugin from a submission by @Kzeni:
 * https://github.com/impress/impress.js/issues/333
 */
/* global document, navigator */
( function( document ) {
    "use strict";

    var getNextStep = function( el ) {
        var steps = document.querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ ) {
            if ( steps[ i ] === el ) {
                if ( i + 1 < steps.length ) {
                    return steps[ i + 1 ];
                } else {
                    return steps[ 0 ];
                }
            }
        }
    };
    var getPrevStep = function( el ) {
        var steps = document.querySelectorAll( ".step" );
        for ( var i = steps.length - 1; i >= 0; i-- ) {
            if ( steps[ i ] === el ) {
                if ( i - 1 >= 0 ) {
                    return steps[ i - 1 ];
                } else {
                    return steps[ steps.length - 1 ];
                }
            }
        }
    };

    // Detect mobile browsers & add CSS class as appropriate.
    document.addEventListener( "impress:init", function( event ) {
        var body = document.body;
        if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                 navigator.userAgent
             ) ) {
            body.classList.add( "impress-mobile" );
        }

        // Unset all this on teardown
        var api = event.detail.api;
        api.lib.gc.pushCallback( function() {
            document.body.classList.remove( "impress-mobile" );
            var prev = document.getElementsByClassName( "prev" )[ 0 ];
            var next = document.getElementsByClassName( "next" )[ 0 ];
            if ( typeof prev !== "undefined" ) {
                prev.classList.remove( "prev" );
            }
            if ( typeof next !== "undefined" ) {
                next.classList.remove( "next" );
            }
        } );
    } );

    // Add prev and next classes to the siblings of the newly entered active step element
    // Remove prev and next classes from their current step elements
    // Note: As an exception we break namespacing rules, as these are useful general purpose
    // classes. (Naming rules would require us to use css classes mobile-next and mobile-prev,
    // based on plugin name.)
    document.addEventListener( "impress:stepenter", function( event ) {
	      var oldprev = document.getElementsByClassName( "prev" )[ 0 ];
	      var oldnext = document.getElementsByClassName( "next" )[ 0 ];

	      var prev = getPrevStep( event.target );
	      prev.classList.add( "prev" );
	      var next = getNextStep( event.target );
	      next.classList.add( "next" );

	      if ( typeof oldprev !== "undefined" ) {
		      oldprev.classList.remove( "prev" );
              }
	      if ( typeof oldnext !== "undefined" ) {
		      oldnext.classList.remove( "next" );
              }
    } );
} )( document );


/**
 * Mouse timeout plugin
 *
 * After 3 seconds of mouse inactivity, add the css class
 * `body.impress-mouse-timeout`. On `mousemove`, `click` or `touch`, remove the
 * class.
 *
 * The use case for this plugin is to use CSS to hide elements from the screen
 * and only make them visible when the mouse is moved. Examples where this
 * might be used are: the toolbar from the toolbar plugin, and the mouse cursor
 * itself.
 *
 * Example CSS:
 *
 *     body.impress-mouse-timeout {
 *         cursor: none;
 *     }
 *     body.impress-mouse-timeout div#impress-toolbar {
 *         display: none;
 *     }
 *
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */
/* global window, document */
( function( document, window ) {
    "use strict";
    var timeout = 3;
    var timeoutHandle;

    var hide = function() {

        // Mouse is now inactive
        document.body.classList.add( "impress-mouse-timeout" );
    };

    var show = function() {
        if ( timeoutHandle ) {
            window.clearTimeout( timeoutHandle );
        }

        // Mouse is now active
        document.body.classList.remove( "impress-mouse-timeout" );

        // Then set new timeout after which it is considered inactive again
        timeoutHandle = window.setTimeout( hide, timeout * 1000 );
    };

    document.addEventListener( "impress:init", function( event ) {
        var api = event.detail.api;
        var gc = api.lib.gc;
        gc.addEventListener( document, "mousemove", show );
        gc.addEventListener( document, "click", show );
        gc.addEventListener( document, "touch", show );

        // Set first timeout
        show();

        // Unset all this on teardown
        gc.pushCallback( function() {
            window.clearTimeout( timeoutHandle );
            document.body.classList.remove( "impress-mouse-timeout" );
        } );
    }, false );

} )( document, window );

/**
 * Navigation events plugin
 *
 * As you can see this part is separate from the impress.js core code.
 * It's because these navigation actions only need what impress.js provides with
 * its simple API.
 *
 * This plugin is what we call an _init plugin_. It's a simple kind of
 * impress.js plugin. When loaded, it starts listening to the `impress:init`
 * event. That event listener initializes the plugin functionality - in this
 * case we listen to some keypress and mouse events. The only dependencies on
 * core impress.js functionality is the `impress:init` method, as well as using
 * the public api `next(), prev(),` etc when keys are pressed.
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz)
 * Released under the MIT license.
 * ------------------------------------------------
 *  author:  Bartek Szopka
 *  version: 0.5.3
 *  url:     http://bartaz.github.com/impress.js/
 *  source:  http://github.com/bartaz/impress.js/
 *
 */
/* global document */
( function( document ) {
    "use strict";

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {

        // Getting API from event data.
        // So you don't event need to know what is the id of the root element
        // or anything. `impress:init` event data gives you everything you
        // need to control the presentation that was just initialized.
        var api = event.detail.api;
        var gc = api.lib.gc;
        var util = api.lib.util;

        // Supported keys are:
        // [space] - quite common in presentation software to move forward
        // [up] [right] / [down] [left] - again common and natural addition,
        // [pgdown] / [pgup] - often triggered by remote controllers,
        // [tab] - this one is quite controversial, but the reason it ended up on
        //   this list is quite an interesting story... Remember that strange part
        //   in the impress.js code where window is scrolled to 0,0 on every presentation
        //   step, because sometimes browser scrolls viewport because of the focused element?
        //   Well, the [tab] key by default navigates around focusable elements, so clicking
        //   it very often caused scrolling to focused element and breaking impress.js
        //   positioning. I didn't want to just prevent this default action, so I used [tab]
        //   as another way to moving to next step... And yes, I know that for the sake of
        //   consistency I should add [shift+tab] as opposite action...
        var isNavigationEvent = function( event ) {

            // Don't trigger navigation for example when user returns to browser window with ALT+TAB
            if ( event.altKey || event.ctrlKey || event.metaKey ) {
                return false;
            }

            // In the case of TAB, we force step navigation always, overriding the browser
            // navigation between input elements, buttons and links.
            if ( event.keyCode === 9 ) {
                return true;
            }

            // With the sole exception of TAB, we also ignore keys pressed if shift is down.
            if ( event.shiftKey ) {
                return false;
            }

            if ( ( event.keyCode >= 32 && event.keyCode <= 34 ) ||
                 ( event.keyCode >= 37 && event.keyCode <= 40 ) ) {
                return true;
            }
        };

        // KEYBOARD NAVIGATION HANDLERS

        // Prevent default keydown action when one of supported key is pressed.
        gc.addEventListener( document, "keydown", function( event ) {
            if ( isNavigationEvent( event ) ) {
                event.preventDefault();
            }
        }, false );

        // Trigger impress action (next or prev) on keyup.
        gc.addEventListener( document, "keyup", function( event ) {
            if ( isNavigationEvent( event ) ) {
                if ( event.shiftKey ) {
                    switch ( event.keyCode ) {
                        case 9: // Shift+tab
                            api.prev();
                            break;
                    }
                } else {
                    switch ( event.keyCode ) {
                        case 33: // Pg up
                        case 37: // Left
                        case 38: // Up
                                 api.prev( event );
                                 break;
                        case 9:  // Tab
                        case 32: // Space
                        case 34: // Pg down
                        case 39: // Right
                        case 40: // Down
                                 api.next( event );
                                 break;
                    }
                }
                event.preventDefault();
            }
        }, false );

        // Delegated handler for clicking on the links to presentation steps
        gc.addEventListener( document, "click", function( event ) {

            // Event delegation with "bubbling"
            // check if event target (or any of its parents is a link)
            var target = event.target;
            try {
                while ( ( target.tagName !== "A" ) &&
                        ( target !== document.documentElement ) ) {
                    target = target.parentNode;
                }

                if ( target.tagName === "A" ) {
                    var href = target.getAttribute( "href" );

                    // If it's a link to presentation step, target this step
                    if ( href && href[ 0 ] === "#" ) {
                        target = document.getElementById( href.slice( 1 ) );
                    }
                }

                if ( api.goto( target ) ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                }
            }
            catch ( err ) {

                // For example, when clicking on the button to launch speaker console, the button
                // is immediately deleted from the DOM. In this case target is a DOM element when
                // we get it, but turns out to be null if you try to actually do anything with it.
                if ( err instanceof TypeError &&
                     err.message === "target is null" ) {
                    return;
                }
                throw err;
            }
        }, false );

        // Delegated handler for clicking on step elements
        gc.addEventListener( document, "click", function( event ) {
            var target = event.target;
            try {

                // Find closest step element that is not active
                while ( !( target.classList.contains( "step" ) &&
                        !target.classList.contains( "active" ) ) &&
                        ( target !== document.documentElement ) ) {
                    target = target.parentNode;
                }

                if ( api.goto( target ) ) {
                    event.preventDefault();
                }
            }
            catch ( err ) {

                // For example, when clicking on the button to launch speaker console, the button
                // is immediately deleted from the DOM. In this case target is a DOM element when
                // we get it, but turns out to be null if you try to actually do anything with it.
                if ( err instanceof TypeError &&
                     err.message === "target is null" ) {
                    return;
                }
                throw err;
            }
        }, false );

        // Add a line to the help popup
        util.triggerEvent( document, "impress:help:add", { command: "Left &amp; Right",
                                                           text: "Previous &amp; Next step",
                                                           row: 1 } );

    }, false );

} )( document );


/**
 * Navigation UI plugin
 *
 * This plugin provides UI elements "back", "forward" and a list to select
 * a specific slide number.
 *
 * The navigation controls are added to the toolbar plugin via DOM events. User must enable the
 * toolbar in a presentation to have them visible.
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */

// This file contains so much HTML, that we will just respectfully disagree about js
/* jshint quotmark:single */
/* global document */

( function( document ) {
    'use strict';
    var toolbar;
    var api;
    var root;
    var steps;
    var hideSteps = [];
    var prev;
    var select;
    var next;

    var triggerEvent = function( el, eventName, detail ) {
        var event = document.createEvent( 'CustomEvent' );
        event.initCustomEvent( eventName, true, true, detail );
        el.dispatchEvent( event );
    };

    var makeDomElement = function( html ) {
        var tempDiv = document.createElement( 'div' );
        tempDiv.innerHTML = html;
        return tempDiv.firstChild;
    };

    var selectOptionsHtml = function() {
        var options = '';
        for ( var i = 0; i < steps.length; i++ ) {

            // Omit steps that are listed as hidden from select widget
            if ( hideSteps.indexOf( steps[ i ] ) < 0 ) {
                options = options + '<option value="' + steps[ i ].id + '">' + // jshint ignore:line
                                    steps[ i ].id + '</option>' + '\n'; // jshint ignore:line
            }
        }
        return options;
    };

    var addNavigationControls = function( event ) {
        api = event.detail.api;
        var gc = api.lib.gc;
        root = event.target;
        steps = root.querySelectorAll( '.step' );

        var prevHtml   = '<button id="impress-navigation-ui-prev" title="Previous" ' +
                         'class="impress-navigation-ui">&lt;</button>';
        var selectHtml = '<select id="impress-navigation-ui-select" title="Go to" ' +
                         'class="impress-navigation-ui">' + '\n' +
                           selectOptionsHtml() +
                           '</select>';
        var nextHtml   = '<button id="impress-navigation-ui-next" title="Next" ' +
                         'class="impress-navigation-ui">&gt;</button>';

        prev = makeDomElement( prevHtml );
        prev.addEventListener( 'click',
            function() {
                api.prev();
        } );
        select = makeDomElement( selectHtml );
        select.addEventListener( 'change',
            function( event ) {
                api.goto( event.target.value );
        } );
        gc.addEventListener( root, 'impress:steprefresh', function( event ) {

            // As impress.js core now allows to dynamically edit the steps, including adding,
            // removing, and reordering steps, we need to requery and redraw the select list on
            // every stepenter event.
            steps = root.querySelectorAll( '.step' );
            select.innerHTML = '\n' + selectOptionsHtml();

            // Make sure the list always shows the step we're actually on, even if it wasn't
            // selected from the list
            select.value = event.target.id;
        } );
        next = makeDomElement( nextHtml );
        next.addEventListener( 'click',
            function() {
                api.next();
        } );

        triggerEvent( toolbar, 'impress:toolbar:appendChild', { group: 0, element: prev } );
        triggerEvent( toolbar, 'impress:toolbar:appendChild', { group: 0, element: select } );
        triggerEvent( toolbar, 'impress:toolbar:appendChild', { group: 0, element: next } );

    };

    // API for not listing given step in the select widget.
    // For example, if you set class="skip" on some element, you may not want it to show up in the
    // list either. Otoh we cannot assume that, or anything else, so steps that user wants omitted
    // must be specifically added with this API call.
    document.addEventListener( 'impress:navigation-ui:hideStep', function( event ) {
        hideSteps.push( event.target );
        if ( select ) {
            select.innerHTML = selectOptionsHtml();
        }
    }, false );

    // Wait for impress.js to be initialized
    document.addEventListener( 'impress:init', function( event ) {
        toolbar = document.querySelector( '#impress-toolbar' );
        if ( toolbar ) {
            addNavigationControls( event );
        }
    }, false );

} )( document );


/* global document */
( function( document ) {
    "use strict";
    var root;
    var stepids = [];

    // Get stepids from the steps under impress root
    var getSteps = function() {
        stepids = [];
        var steps = root.querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ )
        {
          stepids[ i + 1 ] = steps[ i ].id;
        }
        };

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
            root = event.target;
        getSteps();
        var gc = event.detail.api.lib.gc;
        gc.pushCallback( function() {
            stepids = [];
            if ( progressbar ) {
                progressbar.style.width = "";
                        }
            if ( progress ) {
                progress.innerHTML = "";
                        }
        } );
    } );

    var progressbar = document.querySelector( "div.impress-progressbar div" );
    var progress = document.querySelector( "div.impress-progress" );

    if ( null !== progressbar || null !== progress ) {
        document.addEventListener( "impress:stepleave", function( event ) {
            updateProgressbar( event.detail.next.id );
        } );

        document.addEventListener( "impress:steprefresh", function( event ) {
            getSteps();
            updateProgressbar( event.target.id );
        } );

    }

    function updateProgressbar( slideId ) {
        var slideNumber = stepids.indexOf( slideId );
        if ( null !== progressbar ) {
                        var width = 100 / ( stepids.length - 1 ) * ( slideNumber );
            progressbar.style.width = width.toFixed( 2 ) + "%";
        }
        if ( null !== progress ) {
            progress.innerHTML = slideNumber + "/" + ( stepids.length - 1 );
        }
    }
} )( document );

/**
 * Relative Positioning Plugin
 *
 * This plugin provides support for defining the coordinates of a step relative
 * to the previous step. This is often more convenient when creating presentations,
 * since as you add, remove or move steps, you may not need to edit the positions
 * as much as is the case with the absolute coordinates supported by impress.js
 * core.
 *
 * Example:
 *
 *         <!-- Position step 1000 px to the right and 500 px up from the previous step. -->
 *         <div class="step" data-rel-x="1000" data-rel-y="500">
 *
 * Following html attributes are supported for step elements:
 *
 *     data-rel-x
 *     data-rel-y
 *     data-rel-z
 *
 * These values are also inherited from the previous step. This makes it easy to
 * create a boring presentation where each slide shifts for example 1000px down
 * from the previous.
 *
 * In addition to plain numbers, which are pixel values, it is also possible to
 * define relative positions as a multiple of screen height and width, using
 * a unit of "h" and "w", respectively, appended to the number.
 *
 * Example:
 *
 *        <div class="step" data-rel-x="1.5w" data-rel-y="1.5h">
 *
 * This plugin is a *pre-init plugin*. It is called synchronously from impress.js
 * core at the beginning of `impress().init()`. This allows it to process its own
 * data attributes first, and possibly alter the data-x, data-y and data-z attributes
 * that will then be processed by `impress().init()`.
 *
 * (Another name for this kind of plugin might be called a *filter plugin*, but
 * *pre-init plugin* is more generic, as a plugin might do whatever it wants in
 * the pre-init stage.)
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */

/* global document, window */

( function( document, window ) {
    "use strict";

    var startingState = {};

    /**
     * Copied from core impress.js. We currently lack a library mechanism to
     * to share utility functions like this.
     */
    var toNumber = function( numeric, fallback ) {
        return isNaN( numeric ) ? ( fallback || 0 ) : Number( numeric );
    };

    /**
     * Extends toNumber() to correctly compute also relative-to-screen-size values 5w and 5h.
     *
     * Returns the computed value in pixels with w/h postfix removed.
     */
    var toNumberAdvanced = function( numeric, fallback ) {
        if ( typeof numeric !== "string" ) {
            return toNumber( numeric, fallback );
        }
        var ratio = numeric.match( /^([+-]*[\d\.]+)([wh])$/ );
        if ( ratio == null ) {
            return toNumber( numeric, fallback );
        } else {
            var value = parseFloat( ratio[ 1 ] );
            var multiplier = ratio[ 2 ] === "w" ? window.innerWidth : window.innerHeight;
            return value * multiplier;
        }
    };

    var computeRelativePositions = function( el, prev ) {
        var data = el.dataset;

        if ( !prev ) {

            // For the first step, inherit these defaults
            prev = { x:0, y:0, z:0, relative: { x:0, y:0, z:0 } };
        }

        if ( data.relTo ) {

            var ref = document.getElementById( data.relTo );
            if ( ref ) {

                // Test, if it is a previous step that already has some assigned position data
                if ( el.compareDocumentPosition( ref ) & Node.DOCUMENT_POSITION_PRECEDING ) {
                    prev.x = toNumber( ref.getAttribute( "data-x" ) );
                    prev.y = toNumber( ref.getAttribute( "data-y" ) );
                    prev.z = toNumber( ref.getAttribute( "data-z" ) );
                    prev.relative = {};
                } else {
                    window.console.error(
                        "impress.js rel plugin: Step \"" + data.relTo + "\" is not defined " +
                        "*before* the current step. Referencing is limited to previously defined " +
                        "steps. Please check your markup. Ignoring data-rel-to attribute of " +
                        "this step. Have a look at the documentation for how to create relative " +
                        "positioning to later shown steps with the help of the goto plugin."
                    );
                }
            } else {

                // Step not found
                window.console.warn(
                    "impress.js rel plugin: \"" + data.relTo + "\" is not a valid step in this " +
                    "impress.js presentation. Please check your markup. Ignoring data-rel-to " +
                    "attribute of this step."
                );
            }
        }

        var step = {
                x: toNumber( data.x, prev.x ),
                y: toNumber( data.y, prev.y ),
                z: toNumber( data.z, prev.z ),
                relative: {
                    x: toNumberAdvanced( data.relX, prev.relative.x ),
                    y: toNumberAdvanced( data.relY, prev.relative.y ),
                    z: toNumberAdvanced( data.relZ, prev.relative.z )
                }
            };

        // Relative position is ignored/zero if absolute is given.
        // Note that this also has the effect of resetting any inherited relative values.
        if ( data.x !== undefined ) {
            step.relative.x = 0;
        }
        if ( data.y !== undefined ) {
            step.relative.y = 0;
        }
        if ( data.z !== undefined ) {
            step.relative.z = 0;
        }

        // Apply relative position to absolute position, if non-zero
        // Note that at this point, the relative values contain a number value of pixels.
        step.x = step.x + step.relative.x;
        step.y = step.y + step.relative.y;
        step.z = step.z + step.relative.z;

        return step;
    };

    var rel = function( root ) {
        var steps = root.querySelectorAll( ".step" );
        var prev;
        startingState[ root.id ] = [];
        for ( var i = 0; i < steps.length; i++ ) {
            var el = steps[ i ];
            startingState[ root.id ].push( {
                el: el,
                x: el.getAttribute( "data-x" ),
                y: el.getAttribute( "data-y" ),
                z: el.getAttribute( "data-z" ),
                relX: el.getAttribute( "data-rel-x" ),
                relY: el.getAttribute( "data-rel-y" ),
                relZ: el.getAttribute( "data-rel-z" )
            } );
            var step = computeRelativePositions( el, prev );

            // Apply relative position (if non-zero)
            el.setAttribute( "data-x", step.x );
            el.setAttribute( "data-y", step.y );
            el.setAttribute( "data-z", step.z );
            prev = step;
        }
    };

    // Register the plugin to be called in pre-init phase
    window.impress.addPreInitPlugin( rel );

    // Register teardown callback to reset the data.x, .y, .z values.
    document.addEventListener( "impress:init", function( event ) {
        var root = event.target;
        event.detail.api.lib.gc.pushCallback( function() {
            var steps = startingState[ root.id ];
            var step;
            while ( step = steps.pop() ) {

                // Reset x/y/z in cases where this plugin has changed it.
                if ( step.relX !== null ) {
                    if ( step.x === null ) {
                        step.el.removeAttribute( "data-x" );
                    } else {
                        step.el.setAttribute( "data-x", step.x );
                    }
                }
                if ( step.relY !== null ) {
                    if ( step.y === null ) {
                        step.el.removeAttribute( "data-y" );
                    } else {
                        step.el.setAttribute( "data-y", step.y );
                    }
                }
                if ( step.relZ !== null ) {
                    if ( step.z === null ) {
                        step.el.removeAttribute( "data-z" );
                    } else {
                        step.el.setAttribute( "data-z", step.z );
                    }
                }
            }
            delete startingState[ root.id ];
        } );
    }, false );
} )( document, window );


/**
 * Resize plugin
 *
 * Rescale the presentation after a window resize.
 *
 * Copyright 2011-2012 Bartek Szopka (@bartaz)
 * Released under the MIT license.
 * ------------------------------------------------
 *  author:  Bartek Szopka
 *  version: 0.5.3
 *  url:     http://bartaz.github.com/impress.js/
 *  source:  http://github.com/bartaz/impress.js/
 *
 */

/* global document, window */

( function( document, window ) {
    "use strict";

    // Wait for impress.js to be initialized
    document.addEventListener( "impress:init", function( event ) {
        var api = event.detail.api;

        // Rescale presentation when window is resized
        api.lib.gc.addEventListener( window, "resize", api.lib.util.throttle( function() {

            // Force going to active step again, to trigger rescaling
            api.goto( document.querySelector( ".step.active" ), 500 );
        }, 250 ), false );
    }, false );

} )( document, window );


/**
 * Skip Plugin
 *
 * Example:
 *
 *    <!-- This slide is disabled in presentations, when moving with next()
 *         and prev() commands, but you can still move directly to it, for
 *         example with a url (anything using goto()). -->
 *         <div class="step skip">
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */

/* global document, window */

( function( document, window ) {
    "use strict";
    var util;

    document.addEventListener( "impress:init", function( event ) {
        util = event.detail.api.lib.util;
    }, false );

    var getNextStep = function( el ) {
        var steps = document.querySelectorAll( ".step" );
        for ( var i = 0; i < steps.length; i++ ) {
            if ( steps[ i ] === el ) {
                if ( i + 1 < steps.length ) {
                    return steps[ i + 1 ];
                } else {
                    return steps[ 0 ];
                }
            }
        }
    };
    var getPrevStep = function( el ) {
        var steps = document.querySelectorAll( ".step" );
        for ( var i = steps.length - 1; i >= 0; i-- ) {
            if ( steps[ i ] === el ) {
                if ( i - 1 >= 0 ) {
                    return steps[ i - 1 ];
                } else {
                    return steps[ steps.length - 1 ];
                }
            }
        }
    };

    var skip = function( event ) {
        if ( ( !event ) || ( !event.target ) ) {
            return;
        }

        if ( event.detail.next.classList.contains( "skip" ) ) {
            if ( event.detail.reason === "next" ) {

                // Go to the next next step instead
                event.detail.next = getNextStep( event.detail.next );

                // Recursively call this plugin again, until there's a step not to skip
                skip( event );
            } else if ( event.detail.reason === "prev" ) {

                // Go to the previous previous step instead
                event.detail.next = getPrevStep( event.detail.next );
                skip( event );
            }

            // If the new next element has its own transitionDuration, we're responsible for setting
            // that on the event as well
            event.detail.transitionDuration = util.toNumber(
                event.detail.next.dataset.transitionDuration, event.detail.transitionDuration
            );
        }
    };

    // Register the plugin to be called in pre-stepleave phase
    // The weight makes this plugin run early. This is a good thing, because this plugin calls
    // itself recursively.
    window.impress.addPreStepLeavePlugin( skip, 1 );

} )( document, window );


/**
 * Stop Plugin
 *
 * Example:
 *
 *        <!-- Stop at this slide.
 *             (For example, when used on the last slide, this prevents the
 *             presentation from wrapping back to the beginning.) -->
 *        <div class="step stop">
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */
/* global document, window */
( function( document, window ) {
    "use strict";

    var stop = function( event ) {
        if ( ( !event ) || ( !event.target ) ) {
            return;
        }

        if ( event.target.classList.contains( "stop" ) ) {
            if ( event.detail.reason === "next" ) {
                return false;
            }
        }
    };

    // Register the plugin to be called in pre-stepleave phase
    // The weight makes this plugin run fairly early.
    window.impress.addPreStepLeavePlugin( stop, 2 );

} )( document, window );


/**
 * Substep Plugin
 *
 * Copyright 2017 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */

/* global document, window */

( function( document, window ) {
    "use strict";

    // Copied from core impress.js. Good candidate for moving to src/lib/util.js.
    var triggerEvent = function( el, eventName, detail ) {
        var event = document.createEvent( "CustomEvent" );
        event.initCustomEvent( eventName, true, true, detail );
        el.dispatchEvent( event );
    };

    var activeStep = null;
    document.addEventListener( "impress:stepenter", function( event ) {
        activeStep = event.target;
    }, false );

    var substep = function( event ) {
        if ( ( !event ) || ( !event.target ) ) {
            return;
        }

        var step = event.target;
        var el; // Needed by jshint
        if ( event.detail.reason === "next" ) {
            el = showSubstepIfAny( step );
            if ( el ) {

                // Send a message to others, that we aborted a stepleave event.
                triggerEvent( step, "impress:substep:stepleaveaborted",
                              { reason: "next", substep: el } );

                // Autoplay uses this for reloading itself
                triggerEvent( step, "impress:substep:enter",
                              { reason: "next", substep: el } );

                // Returning false aborts the stepleave event
                return false;
            }
        }
        if ( event.detail.reason === "prev" ) {
            el = hideSubstepIfAny( step );
            if ( el ) {
                triggerEvent( step, "impress:substep:stepleaveaborted",
                              { reason: "prev", substep: el } );

                triggerEvent( step, "impress:substep:leave",
                              { reason: "prev", substep: el } );

                return false;
            }
        }
    };

    var showSubstepIfAny = function( step ) {
        var substeps = step.querySelectorAll( ".substep" );
        var visible = step.querySelectorAll( ".substep-visible" );
        if ( substeps.length > 0 ) {
            return showSubstep( substeps, visible );
        }
    };

    var showSubstep = function( substeps, visible ) {
        if ( visible.length < substeps.length ) {
            for ( var i = 0; i < substeps.length; i++ ) {
                substeps[ i ].classList.remove( "substep-active" );
            }
            var el = substeps[ visible.length ];
            el.classList.add( "substep-visible" );
            el.classList.add( "substep-active" );
            return el;
        }
    };

    var hideSubstepIfAny = function( step ) {
        var substeps = step.querySelectorAll( ".substep" );
        var visible = step.querySelectorAll( ".substep-visible" );
        if ( substeps.length > 0 ) {
            return hideSubstep( visible );
        }
    };

    var hideSubstep = function( visible ) {
        if ( visible.length > 0 ) {
            var current = -1;
            for ( var i = 0; i < visible.length; i++ ) {
                if ( visible[ i ].classList.contains( "substep-active" ) ) {
                    current = i;
                }
                visible[ i ].classList.remove( "substep-active" );
            }
            if ( current > 0 ) {
                visible[ current - 1 ].classList.add( "substep-active" );
            }
            var el = visible[ visible.length - 1 ];
            el.classList.remove( "substep-visible" );
            return el;
        }
    };

    // Register the plugin to be called in pre-stepleave phase.
    // The weight makes this plugin run before other preStepLeave plugins.
    window.impress.addPreStepLeavePlugin( substep, 1 );

    // When entering a step, in particular when re-entering, make sure that all substeps are hidden
    // at first
    document.addEventListener( "impress:stepenter", function( event ) {
        var step = event.target;
        var visible = step.querySelectorAll( ".substep-visible" );
        for ( var i = 0; i < visible.length; i++ ) {
            visible[ i ].classList.remove( "substep-visible" );
        }
    }, false );

    // API for others to reveal/hide next substep ////////////////////////////////////////////////
    document.addEventListener( "impress:substep:show", function() {
        showSubstepIfAny( activeStep );
    }, false );

    document.addEventListener( "impress:substep:hide", function() {
        hideSubstepIfAny( activeStep );
    }, false );

} )( document, window );

/**
 * Support for swipe and tap on touch devices
 *
 * This plugin implements navigation for plugin devices, via swiping left/right,
 * or tapping on the left/right edges of the screen.
 *
 *
 *
 * Copyright 2015: Andrew Dunai (@and3rson)
 * Modified to a plugin, 2016: Henrik Ingo (@henrikingo)
 *
 * MIT License
 */
/* global document, window */
( function( document, window ) {
    "use strict";

    // Touch handler to detect swiping left and right based on window size.
    // If the difference in X change is bigger than 1/20 of the screen width,
    // we simply call an appropriate API function to complete the transition.
    var startX = 0;
    var lastX = 0;
    var lastDX = 0;
    var threshold = window.innerWidth / 20;

    document.addEventListener( "touchstart", function( event ) {
        lastX = startX = event.touches[ 0 ].clientX;
    } );

    document.addEventListener( "touchmove", function( event ) {
         var x = event.touches[ 0 ].clientX;
         var diff = x - startX;

         // To be used in touchend
         lastDX = lastX - x;
         lastX = x;

         window.impress().swipe( diff / window.innerWidth );
     } );

     document.addEventListener( "touchend", function() {
         var totalDiff = lastX - startX;
         if ( Math.abs( totalDiff ) > window.innerWidth / 5 && ( totalDiff * lastDX ) <= 0 ) {
             if ( totalDiff > window.innerWidth / 5 && lastDX <= 0 ) {
                 window.impress().prev();
             } else if ( totalDiff < -window.innerWidth / 5 && lastDX >= 0 ) {
                 window.impress().next();
             }
         } else if ( Math.abs( lastDX ) > threshold ) {
             if ( lastDX < -threshold ) {
                 window.impress().prev();
             } else if ( lastDX > threshold ) {
                 window.impress().next();
             }
         } else {

             // No movement - move (back) to the current slide
             window.impress().goto( document.querySelector( "#impress .step.active" ) );
         }
     } );

     document.addEventListener( "touchcancel", function() {

             // Move (back) to the current slide
             window.impress().goto( document.querySelector( "#impress .step.active" ) );
     } );

} )( document, window );

/**
 * Toolbar plugin
 *
 * This plugin provides a generic graphical toolbar. Other plugins that
 * want to expose a button or other widget, can add those to this toolbar.
 *
 * Using a single consolidated toolbar for all GUI widgets makes it easier
 * to position and style the toolbar rather than having to do that for lots
 * of different divs.
 *
 *
 * *** For presentation authors: *****************************************
 *
 * To add/activate the toolbar in your presentation, add this div:
 *
 *     <div id="impress-toolbar"></div>
 *
 * Styling the toolbar is left to presentation author. Here's an example CSS:
 *
 *    .impress-enabled div#impress-toolbar {
 *        position: fixed;
 *        right: 1px;
 *        bottom: 1px;
 *        opacity: 0.6;
 *    }
 *    .impress-enabled div#impress-toolbar > span {
 *        margin-right: 10px;
 *    }
 *
 * The [mouse-timeout](../mouse-timeout/README.md) plugin can be leveraged to hide
 * the toolbar from sight, and only make it visible when mouse is moved.
 *
 *    body.impress-mouse-timeout div#impress-toolbar {
 *        display: none;
 *    }
 *
 *
 * *** For plugin authors **********************************************
 *
 * To add a button to the toolbar, trigger the `impress:toolbar:appendChild`
 * or `impress:toolbar:insertBefore` events as appropriate. The detail object
 * should contain following parameters:
 *
 *    { group : 1,                       // integer. Widgets with the same group are grouped inside
 *                                       // the same <span> element.
 *      html : "<button>Click</button>", // The html to add.
 *      callback : "mycallback",         // Toolbar plugin will trigger event
 *                                       // `impress:toolbar:added:mycallback` when done.
 *      before: element }                // The reference element for an insertBefore() call.
 *
 * You should also listen to the `impress:toolbar:added:mycallback` event. At
 * this point you can find the new widget in the DOM, and for example add an
 * event listener to it.
 *
 * You are free to use any integer for the group. It's ok to leave gaps. It's
 * ok to co-locate with widgets for another plugin, if you think they belong
 * together.
 *
 * See navigation-ui for an example.
 *
 * Copyright 2016 Henrik Ingo (@henrikingo)
 * Released under the MIT license.
 */

/* global document */

( function( document ) {
    "use strict";
    var toolbar = document.getElementById( "impress-toolbar" );
    var groups = [];

    /**
     * Get the span element that is a child of toolbar, identified by index.
     *
     * If span element doesn't exist yet, it is created.
     *
     * Note: Because of Run-to-completion, this is not a race condition.
     * https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop#Run-to-completion
     *
     * :param: index   Method will return the element <span id="impress-toolbar-group-{index}">
     */
    var getGroupElement = function( index ) {
        var id = "impress-toolbar-group-" + index;
        if ( !groups[ index ] ) {
            groups[ index ] = document.createElement( "span" );
            groups[ index ].id = id;
            var nextIndex = getNextGroupIndex( index );
            if ( nextIndex === undefined ) {
                toolbar.appendChild( groups[ index ] );
            } else {
                toolbar.insertBefore( groups[ index ], groups[ nextIndex ] );
            }
        }
        return groups[ index ];
    };

    /**
     * Get the span element from groups[] that is immediately after given index.
     *
     * This can be used to find the reference node for an insertBefore() call.
     * If no element exists at a larger index, returns undefined. (In this case,
     * you'd use appendChild() instead.)
     *
     * Note that index needn't itself exist in groups[].
     */
    var getNextGroupIndex = function( index ) {
        var i = index + 1;
        while ( !groups[ i ] && i < groups.length ) {
            i++;
        }
        if ( i < groups.length ) {
            return i;
        }
    };

    // API
    // Other plugins can add and remove buttons by sending them as events.
    // In return, toolbar plugin will trigger events when button was added.
    if ( toolbar ) {
        /**
         * Append a widget inside toolbar span element identified by given group index.
         *
         * :param: e.detail.group    integer specifying the span element where widget will be placed
         * :param: e.detail.element  a dom element to add to the toolbar
         */
        toolbar.addEventListener( "impress:toolbar:appendChild", function( e ) {
            var group = getGroupElement( e.detail.group );
            group.appendChild( e.detail.element );
        } );

        /**
         * Add a widget to toolbar using insertBefore() DOM method.
         *
         * :param: e.detail.before   the reference dom element, before which new element is added
         * :param: e.detail.element  a dom element to add to the toolbar
         */
        toolbar.addEventListener( "impress:toolbar:insertBefore", function( e ) {
            toolbar.insertBefore( e.detail.element, e.detail.before );
        } );

        /**
         * Remove the widget in e.detail.remove.
         */
        toolbar.addEventListener( "impress:toolbar:removeWidget", function( e ) {
            toolbar.removeChild( e.detail.remove );
        } );

        document.addEventListener( "impress:init", function( event ) {
            var api = event.detail.api;
            api.lib.gc.pushCallback( function() {
                toolbar.innerHTML = "";
                groups = [];
            } );
        } );
    } // If toolbar

} )( document );

},{}],"2xeXx":[function() {},{}],"56How":[function() {},{}],"3dboW":[function() {},{}],"4SjKI":[function() {},{}],"25569":[function() {},{}],"26bL1":[function() {},{}],"61VVo":[function() {},{}],"2O3uv":[function() {},{}]},{},["3NeHt","NPpSU"], "NPpSU", null)

//# sourceMappingURL=index.d298b871.js.map
