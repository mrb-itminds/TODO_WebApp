// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");
const { join } = require("path");
const { readdirSync } = require("fs");

const startPath = join(process.cwd(), "src", "i18n");
const locales = readdirSync(startPath)
  .filter(x => !/^Locale\.ts$/.test(x))
  .map(x => /^([a-z]{2}-[A-Z]{2})\.ts$/.exec(x)[1]);

const defaultLocale = "da-DK";

if (!locales.includes(defaultLocale)) {
  throw Error("Default Locale not part of other locales: " + locales.join(","));
}

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    register: false,
    skipWaiting: false,
    dest: "public"
  },
  i18n: {
    locales,
    defaultLocale
  }
});
