const { defineConfig, createNotesQuery } = require("./.app/app-config");

module.exports = defineConfig({
  title: "Saro's Thoughts",
  description: "The personal notes of Saro",
  lang: "en",
  wikilinks: {
    autoLabel: "title",
    anchorLabel: "arrow",
  },
  theme: {
    color: "sky",
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
    sections: [
      {
        label: "Tech notes",
        groups: [
          {
            label: "AWS",
            query: createNotesQuery({
              pattern: "/aws-certs/",
            }),
          },
        ]
        
      },
      {
        label: "Codewalkthru",
        groups: [
          {
            query: createNotesQuery({
              pattern: "/code-walkthrus/",
            }),
          },
        ]
        
      },
    ],
    tags: {
      showOnSidebar: false,
    },
  },
});

