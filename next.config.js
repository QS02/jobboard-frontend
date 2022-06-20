// Remove this if you're not using Fullcalendar features
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/list",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline",
]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    appName: process.env.APP_NAME,
    apiBaseUrl: process.env.API_BASE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/welcome",
        permanent: true,
      },
    ];
  },
});
