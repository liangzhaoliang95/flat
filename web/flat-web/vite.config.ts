import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { defineConfig } from "vite";
import { dotenv } from "./scripts/vite-plugin-dotenv";
import { injectHtmlHash } from "./scripts/vite-plugin-html-hash";
import { version } from "./scripts/vite-plugin-version";
import { inlineAssets } from "./scripts/vite-plugin-inline-assets";
import { reactVirtualized } from "./scripts/vite-plugin-react-virtualized";
import { mainPackageJSONPath } from "../../scripts/constants";
import { autoChooseConfig } from "../../scripts/utils/auto-choose-config";

export default defineConfig({
    server: { port: 3001 },
    plugins: [
        react(),
        !process.env.noLegacy && legacy(),
        dotenv(autoChooseConfig()),
        injectHtmlHash(),
        version(mainPackageJSONPath),
        inlineAssets(),
        reactVirtualized(),
    ],
    resolve: {
        alias: [
            // replace webpack alias
            { find: /^~/, replacement: "" },
        ],
    },
    build: {
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
        postcss: {
            plugins: [
                {
                    // see: https://github.com/vitejs/vite/issues/5833
                    // don't worry about causing any side effects, see: https://developer.mozilla.org/en-US/docs/Web/CSS/@charset
                    postcssPlugin: "internal:charset-removal",
                    AtRule: {
                        charset: atRule => {
                            if (atRule.name === "charset") {
                                atRule.remove();
                            }
                        },
                    },
                },
            ],
        },
    },
});
