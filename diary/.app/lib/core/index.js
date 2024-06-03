const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pageAssetsPlugin = require("eleventy-plugin-page-assets");
const blogTools = require("eleventy-plugin-blog-tools");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
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

    config.addPlugin(EleventyHtmlBasePlugin);
    config.addPlugin(syntaxHighlightPlugin);
    config.addPlugin(blogTools);
    config.addPlugin(pluginRss);

    config.addPlugin(pageAssetsPlugin, {
      mode: "parse",
      postsMatching: "*.md",
      assetsMatching: "*.png|*.jpg|*.jpeg|*.svg|*.webp|*.gif",
    });

    config.setServerOptions({
      watch: ["dist/app.js", "dist/app.*.css"],
    });

    config.addFilter("readableDate", (dateObj, format, zone) => {
      // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
      return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
    });
  
    config.addFilter('htmlDateString', (dateObj) => {
      // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    }); 
  
  },
};
