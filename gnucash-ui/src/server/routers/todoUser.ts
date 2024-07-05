import { shieldedProcedure, t } from "@/utils/trpc-server";
import { last } from "lodash";
import { z } from "zod";
import { SpaceService } from "../services/space";
import { TRPCError } from "@trpc/server";

export const todoUserRouter = t.router({
  getUserSpaces: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await SpaceService.getUserSpaces(session.user, opts.input);
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
  getSharedSpaces: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await SpaceService.getSharedSpaces(
        session.user,
        opts.input
      );
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
  addUserToSpace: shieldedProcedure
    .input(
      z.object({
        inviteeEmail: z.string(),
        spaceId: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { session } = opts.ctx;
      const items = await SpaceService.addUserToSpace(
        session.user,
        opts.input.spaceId,
        opts.input.inviteeEmail
      );
      return {};
    }),
  findByName: shieldedProcedure
    .input(
      z.object({
        spaceName: z.string(),
      })
    )
    .query(async (opts) => {
      const {
        session: { user },
      } = opts.ctx;
      return SpaceService.getUserSpaces(user, {
        limit: 5,
        cursor: undefined,
        nameFilter: opts.input.spaceName,
      });
    }),
  createSpace: shieldedProcedure
    .input(
      z.object({
        spaceName: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { session } = opts.ctx;

      try {
        const items = await SpaceService.createSpace(
          session.user,
          opts.input.spaceName
        );
        throw new Error("");
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          // optional: pass the original error to retain stack trace
          cause: {
            errors: [
              {
                key: "spaceName",
                error: {
                  type: "validation",
                  message: "The field error that is",
                },
              },
              {
                key: "root",
                error: {
                  type: "form validation",
                  message: "The global error that is",
                },
              },
            ],
          },
        });
      }
    }),
});

