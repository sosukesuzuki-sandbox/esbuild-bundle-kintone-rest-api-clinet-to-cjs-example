import { build } from "esbuild";
import replacementCJSPlugin from "./plugins/replacement-cjs-plugin.js";

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./src/index.js"],
  minify: true,
  bundle: true,
  outfile: "./dist/index.cjs",
  target: "node14.11",
  platform: "node",
  format: "cjs",
  plugins: [replacementCJSPlugin],
};

if (process.env.WATCH === "true") {
  options.watch = {
    onRebuild(error, result) {
      if (error) {
        console.error("watch build failed:", error);
      } else {
        console.log("watch build succeeded:", result);
      }
    },
  };
}

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
