import js from "@eslint/js";
import esX from "eslint-plugin-es-x";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: {
      // Parser setting, not a statement about what PA can run - Chrome 40 support is
      // enforced by es-x's restrict-to-es5 in the ui/** block below. 6 is both a floor
      // and a ceiling. Floor: Chrome 40 has `for...of` and shipped code uses it, but
      // at ecmaVersion 5 it is a parse error, and no rule can suppress one - the file
      // is abandoned mid-parse and every other rule in it silently stops running, so
      // dropping to 5 would lint less, not more. Ceiling: holding it at 6 makes
      // anything past ES2015 (`?.`, `**`, async/await) fail to parse outright, a free
      // second line of defence if an es-x rule is ever switched off by mistake.
      ecmaVersion: 6,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jquery,
        ...globals.amd,
        model: "writable",
        _: "readonly",
        loc: "readonly",
      },
      sourceType: "script",
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      curly: ["error", "all"],
      "no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
    },
  },
  {
    // Shipped game code. The parser above accepts all of ES2015, much of which PA's
    // Chrome 40 cannot run, so the real enforcement happens here instead.
    // restrict-to-es5 forbids every post-ES5 feature - syntax *and* builtins - so the
    // block below is the whitelist: the specific things Chrome 40 does support. That
    // inversion is deliberate. A syntax-only denylist can't see `Object.assign`
    // (Chrome 45) or `Array.from` (45), and those fail at call time with
    // "undefined is not a function" rather than at parse time, so a stray one ships.
    files: ["ui/**/*.js"],
    ...esX.configs["flat/restrict-to-es5"],
  },
  {
    // Every post-ES5 feature Chrome 40 supports, whether the repo uses it yet or not -
    // this list is the answer to "may I use X here?". The trailing comment is the
    // Chrome release the feature landed in, sourced from MDN browser-compat-data
    // (@mdn/browser-compat-data, javascript.*); a rule only belongs here if that
    // number is <= 40. Everything absent from this list stays forbidden by
    // restrict-to-es5 above, so no entry means no.
    files: ["ui/**/*.js"],
    rules: {
      // Array iterators. Note `Array.prototype.values` is deliberately NOT here:
      // unlike entries/keys it did not land until Chrome 66.
      "es-x/no-array-prototype-entries": "off", // Chrome 38
      "es-x/no-array-prototype-keys": "off", // Chrome 38
      "es-x/no-for-of-loops": "off", // Chrome 38
      "es-x/no-generators": "off", // Chrome 39
      "es-x/no-map": "off", // Chrome 38
      "es-x/no-math-acosh": "off", // Chrome 38
      "es-x/no-math-asinh": "off", // Chrome 38
      "es-x/no-math-atanh": "off", // Chrome 38
      "es-x/no-math-cbrt": "off", // Chrome 38
      "es-x/no-math-clz32": "off", // Chrome 38
      "es-x/no-math-cosh": "off", // Chrome 38
      "es-x/no-math-expm1": "off", // Chrome 38
      "es-x/no-math-fround": "off", // Chrome 38
      "es-x/no-math-hypot": "off", // Chrome 38
      "es-x/no-math-imul": "off", // Chrome 28
      "es-x/no-math-log10": "off", // Chrome 38
      "es-x/no-math-log1p": "off", // Chrome 38
      "es-x/no-math-log2": "off", // Chrome 38
      "es-x/no-math-sign": "off", // Chrome 38
      "es-x/no-math-sinh": "off", // Chrome 38
      "es-x/no-math-tanh": "off", // Chrome 38
      "es-x/no-math-trunc": "off", // Chrome 38
      "es-x/no-number-epsilon": "off", // Chrome 34
      "es-x/no-number-isfinite": "off", // Chrome 19
      "es-x/no-number-isinteger": "off", // Chrome 34
      "es-x/no-number-isnan": "off", // Chrome 25
      "es-x/no-number-issafeinteger": "off", // Chrome 34
      "es-x/no-number-maxsafeinteger": "off", // Chrome 34
      "es-x/no-number-minsafeinteger": "off", // Chrome 34
      "es-x/no-number-parsefloat": "off", // Chrome 34
      "es-x/no-number-parseint": "off", // Chrome 34
      "es-x/no-object-getownpropertysymbols": "off", // Chrome 38
      "es-x/no-object-is": "off", // Chrome 19
      "es-x/no-object-setprototypeof": "off", // Chrome 34
      "es-x/no-promise": "off", // Chrome 32
      "es-x/no-set": "off", // Chrome 38
      "es-x/no-string-prototype-normalize": "off", // Chrome 34
      "es-x/no-symbol": "off", // Chrome 38
      "es-x/no-typed-arrays": "off", // Chrome 7
      "es-x/no-weak-map": "off", // Chrome 36
      "es-x/no-weak-set": "off", // Chrome 36
    },
  },
  {
    // Restated as errors purely to document *why* - both would otherwise look like
    // oversights next to the whitelist above. restrict-to-es5 already errors on them.
    files: ["ui/**/*.js"],
    rules: {
      // let/const. Chrome 41, and strict mode only even there, so out of reach
      // regardless - but const stays excluded on its own merits even if that changes.
      // Chrome 40's block scoping does not create the per-iteration binding ES2015
      // specifies, so a const/let declared in a loop head misbehaves. Use var.
      "es-x/no-block-scoped-variables": "error",
      // A function declaration inside a block only gets ES2015 block scoping from
      // Chrome 49. Chrome 40 hoists it to the enclosing function scope under legacy
      // sloppy-mode rules, so the scoping you write is not the scoping you get.
      // Declare it outside the block, or assign a function expression to a var.
      "es-x/no-block-scoped-functions": "error",
      // Chrome 40 lacks both (MDN dates them to Chrome 41, which is correct), so the
      // guard in ui/main/shared/js/helpers.js:130-142 passes and PA's own polyfill
      // installs - taking a single parameter:
      //     String.prototype.startsWith = function (prefix) {
      //         return this.substring(0, prefix.length) === prefix;
      //     };
      // A second argument is therefore dropped in silence, so
      // "foobar".startsWith("bar", 3) is false and "foobar".endsWith("foo", 3) is
      // false - both should be true. Verified against Chrome/40.0.2214.28 over the
      // DevTools protocol: the installed function is not native code, its arity is 1,
      // and its source is the above, in the main, atlas and uberbar contexts alike.
      // That the polyfill installed at all is itself the proof the natives are absent,
      // since it only runs when typeof is not 'function'. A wrong answer is worse than
      // a missing method - nothing throws, the logic just takes the wrong branch - so
      // they stay forbidden. Use indexOf/slice. String.prototype.includes and .repeat
      // are genuinely absent here, as is the legacy .contains spelling.
      "es-x/no-string-prototype-startswith": "error",
      "es-x/no-string-prototype-endswith": "error",
    },
  },
  {
    // Node-side test/CI tooling - not shipped to the game, not bound to its Chrome 40
    // constraint, so these get real Node globals instead of the browser/engine ones above.
    files: ["scripts/**/*.js", "test/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
  // Prettier config last to disable conflicting rules
  prettier,
]);
