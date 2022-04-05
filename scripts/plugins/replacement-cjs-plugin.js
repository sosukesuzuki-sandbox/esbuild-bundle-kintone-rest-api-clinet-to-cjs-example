import path from "node:path";
import module from "node:module";

const require = module.createRequire(import.meta.url);

/** @type {import('esbuild').Plugin} */
const replacementCJSPlugin = {
  name: "replacementCJS",
  setup(build) {
    build.onResolve(
      { filter: new RegExp("@kintone/rest-api-client") },
      (args) => {
        return {
          path: path.join(require.resolve(args.path)),
        };
      }
    );
  },
};

export default replacementCJSPlugin;
