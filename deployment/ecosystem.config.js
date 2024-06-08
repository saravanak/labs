module.exports = {
  apps: [
    {
      name: "sandbox",
      script: "npm run start",
      cwd: "../gnucash-ui"
    },
    {
      name: "blog",
      script: "serve",
      env: {
        PM2_SERVE_PATH: ".",
        PM2_SERVE_PORT: 8080,
        PM2_SERVE_SPA: "true",
        PM2_SERVE_HOMEPAGE: "/index.html",
      },
      cwd: '../diary/.app/dist/'
    },
  ],
};

