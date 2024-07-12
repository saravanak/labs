import { resetDB } from "@/lib/prisma/seeds/seed-utils";
import { setupUsers } from "@/server/tests/utils/setup-utils";
const { defineConfig } = require("cypress");

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      //implement node event listeners here
      on("task", {
        async setupRedAndTeam() {
          await resetDB();
          const usersAndSpaces = await setupUsers();
          return null;
        },
      });
    },
  },
  chromeWebSecurity: false,
});

