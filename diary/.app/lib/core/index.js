const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const blogTools = require("eleventy-plugin-blog-tools");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const linenumber = require('prismjs/plugins/line-numbers/prism-line-numbers')

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
    config.addPlugin(syntaxHighlightPlugin, {
      alwaysWrapLineHighlights: true,
      init: function({Prism}) {
        Prism.plugins =['line-numbers']
      }

    });
    config.addPlugin(blogTools);
    config.addPlugin(pluginRss);


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

    config.addWatchTarget("./../app.js");
  },
};
