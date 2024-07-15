import { shieldedProcedure, t } from '@/utils/trpc-server';
import { last } from 'lodash';
import { z } from 'zod';
import { SpaceService } from '../services/space';
import prisma from '@/lib/prisma';
import { TRPCError } from '@trpc/server';

export const spaceRouter = t.router({
  getSpace: shieldedProcedure
    .input(
      z.object({
        spaceId: z.number(),
      })
    )
    .query(async (opts) => {
      const {
        session: { user },
      } = opts.ctx;
      return SpaceService.getSpace(user, opts.input);
    }),
  getMembers: shieldedProcedure
    .input(
      z.object({
        spaceId: z.number(),
      })
    )
    .query(async (opts) => {
      const {
        session: { user },
      } = opts.ctx;
      return SpaceService.getMembers(user, opts.input.spaceId);
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
  removeUserFromSpace: t.procedure
    .input(
      z.object({
        spaceId: z.number(),
        memberIdRemove: z.string(),
      })
    )
    .mutation(async (opts) => {
      return SpaceService.removeUserFromSpace(opts.input);
    }),
  spaceCounts: shieldedProcedure.query(async (opts) => {
    const {
      session: { user },
    } = opts.ctx;
    return SpaceService.getSpaceCounts(user);
  }),
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
  getAllSpaces: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await SpaceService.getAllSpaces(session.user, opts.input);
      return {
        items,
        nextCursor: last(items)?.id,
      };
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

      const spaceWithSameName = await prisma.space.findFirst({
        where: { name: opts.input.spaceName },
      });
      if (spaceWithSameName) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Space with that name already exists',
        });
      }
      return SpaceService.createSpace(session.user, opts.input.spaceName);
    }),
});
// export type definition of API
