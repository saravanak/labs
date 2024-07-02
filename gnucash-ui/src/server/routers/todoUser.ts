import { shieldedProcedure, t } from "@/utils/trpc-server";
import { last } from "lodash";
import { z } from "zod";
import { SpaceService } from "../services/space";

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
  createSpace: shieldedProcedure
    .input(
      z.object({
        spaceName: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { session } = opts.ctx;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 5000);
      });
      const items = await SpaceService.createSpace(
        session.user,
        opts.input.spaceName
      );
      return {};
    }),
});

