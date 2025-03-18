import type { ProxyConfig, ServerConfig } from "@rsbuild/core";
const url: Record<string, string> = {
  servebuild: "https://www.arenaplus.com",
  serve: "https://arenaplus.uatext66ap.com",
  // serve: 'http://10.32.3.68:8080',
  // 'serve:fat': 'http://c66-frontend-laroplus-mobile.fat.com',
  "serve:fat": "http://c66-frontend-laroplus-mobile.dgfat.com",
  "serve:prod": "https://autotest.arenaplus.ph",
  preview: "https://arenaplus.uatext66ap.com",
  // preview: 'https://autotest.arenaplus.ph',
};

const finallyUrl = url[process.env.npm_lifecycle_event!];

console.log(
  `\n+++++++++++++++++++++  proxy ==> ${finallyUrl}  +++++++++++++++++++++\n`
);

export default <ProxyConfig>[
  {
    context: ["/_thirdpart_api_", "/_front_api_"],
    logLevel: "debug",
    target: "https://arenaplus.uatext66ap.com",
    // pathRewrite: {
    //   "/_thirdpart_api_": "",
    //   "/_front_api_": "",
    // },
  },
];
