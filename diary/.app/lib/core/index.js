const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const blogTools = require("eleventy-plugin-blog-tools");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");

module.exports = {
  mdLibrary: require("./md.library"),

  configObj: {
    pathPrefix: process.env.ELEVENTY_NOTES_PATH_PREFIX || undefined,
    dir: {
      input: "./../",
      output: "dist",
      data: ".app/_data",
      includes: ".app/lib",
    },
    markdownTemplateEngine: false,
  },

  setup(config) {
    config.setLibrary("md", this.mdLibrary(config));

    config.on("eleventy.before", async () => {
      const shiki = await import("shiki");
      const shikiImport = await shiki;

      try {
        highlighter = await shikiImport.createHighlighter({
          themes: [await import("shiki/themes/dark-plus.mjs")],
          langs: [
            import("shiki/langs/javascript.mjs"),
            import("shiki/langs/bash.mjs"),
            import("shiki/langs/python.mjs"),
            import("shiki/langs/html.mjs"),
            import("shiki/langs/markdown.mjs"),
            import("shiki/langs/sql.mjs"),
          ],
        });
      } catch (error) {
        console.log(error);
      }

      config.amendLibrary("md", (mdLib) => {
        mdLib.set({
          highlight: (code, lang) => {
            return highlighter.codeToHtml(code, {
              lang,
              theme: "dark-plus",
            });
          },
        });
      });
    });
    config.amendLibrary("md", () => {});

    config.addPlugin(EleventyHtmlBasePlugin);
    // config.addPlugin(syntaxHighlightPlugin, {
    //   alwaysWrapLineHighlights: true,
    // });

    config.addPlugin(blogTools);
    config.addPlugin(pluginRss);

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.*.css"],
    });

    config.addFilter("readableDate", (dateObj, format, zone) => {
      // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
      return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
        format || "dd LLLL yyyy"
      );
    });

    config.addFilter("htmlDateString", (dateObj) => {
      // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
        "yyyy-LL-dd"
      );
    });

    config.addWatchTarget("./../app.js");
  },
};

