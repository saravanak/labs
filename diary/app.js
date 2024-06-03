const { defineConfig } = require(".app/app-config");

module.exports = defineConfig({
  title: "John's Notes",
  description: "The personal notes of John Doe",
  lang: "en",
  wikilinks: {
    autoLabel: "title",
    anchorLabel: "arrow",
  },
  sidebar: {
    links: [
      {
        url: "/n/bookmarks",
        label: "Bookmarks",
        icon: "briefcase",
        openInNewTab: false,
      },
    ],
    notes: [
      {
        pattern: "^/aws-certs/index$",
      },      
    ],
    tags: {
      showOnSidebar: false,
    },
  },
});

