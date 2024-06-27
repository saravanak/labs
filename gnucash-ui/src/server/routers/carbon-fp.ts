import { prisma } from "@/lib/prisma/client";
import lorem from "@/utils/lorem-ipsum";
import { t } from "@/utils/trpc-server";
import { z } from "zod";

export const carbonFootprintRouter = t.router({
  formMeta: t.procedure
    .query(async () => {
      return {
        householdIncome: {
          label: "What is your gross annual household income?",
          helpText: lorem.generateSentences(1),
        },
        houseSize: {
          label: "How many people live in your household?",
          helpText: lorem.generateSentences(1),
        },
        country:{
          label: "In which country do you live?",
          searchPlaceholder: "Pick a country...",
          noMatches: "No matching countries"
        },
        vehicles:{
          addLabel: "Add",
          label: "Your vehicles",
          units: {
            milesPerGallon: "mileage",
            milesPerYear: "distanceYear"
          },
          limits: {
            
          }
        },
        units: {
          mileage: {
            standard: "mpg",
            metric: "ltr/km"
          },
          distanceYear: {
            standard: "miles/year",
            metric: "km/year"
          },
          distanceMonth: {
            standard: "miles/month",
            metric: "km/month"
          }
        }

      }
    }),  
});


