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

      return SpaceService.createSpace(session.user, opts.input.spaceName);
    }),
});

