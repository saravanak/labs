module.exports = {
  /**
   * Sets up the module
   * @param {import("@11ty/eleventy").UserConfig} config
   */
  setup(config) {

    // When `permalink` is false, the file is not written to disk
    config.addGlobalData("eleventyComputed.permalink", function() {
      return (data) => {
        // Always skip during non-watch/serve builds
        if(data.draft && !process.env.BUILD_DRAFTS) {
          return false;
        }

        return data.permalink;
      }
    });

    // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
    config.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function() {
      return (data) => {
        // Always exclude from non-watch/serve builds
        if(data.draft && !process.env.BUILD_DRAFTS) {
          return true;
        }

        return data.eleventyExcludeFromCollections;
      }
    });

    config.on("eleventy.before", ({runMode}) => {
      // Set the environment variable
      if(runMode === "serve" || runMode === "watch") {
        process.env.BUILD_DRAFTS = true;
      }
    });

    config.addFilter('htmlDateString', (dateObj) => {
      // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    }); 

    
  },
};

