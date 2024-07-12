import prisma from '@/lib/prisma';
import { pgClient } from '@/lib/prisma/client';
import { getUserSpaces } from '@/lib/typed-queries/user/action';
import { User } from '@prisma/client';
import { returnPaginatedQuery } from './todo';
import { merge, orderBy, startsWith } from 'lodash';
import { sleep } from './utils';
import { sql_getAllSpaces } from '@/lib/typed-queries/space/action';
import { TRPCError } from '@trpc/server';

const SpaceWhereQueries = {
  ownedBy: (user: User) => ({
    where: {
      owner_id: user.id,
    },
  }),
  name: (value: string) => ({
    where: {
      name: {
        startsWith: value,
        mode: 'insensitive',
      },
    },
  }),
  shared: (user: User) => {
    return {
      where: {
        spaceSharing: {
          some: {
            user_id: user.id,
          },
        },
      },
    };
  },
};

export const SpaceService = {
  async createSpace(user: User, spaceName: string) {
    const space = await prisma.space.create({
      data: {
        name: spaceName,
        owner_id: user.id,
      },
    });
    return space;
  },
  async getSpace(user: User, { spaceId }: any) {
    const space = await prisma.space.findFirst({
      where: {
        id: spaceId,
      },
      select: {
        name: true,
        id: true,
      },
    });
    return space;
  },

  async getMembers(user: User, spaceId: number) {
    /** First try to get if the spaced is owned by the current user
     * Else, we try for the shared space
     * */
    const ownedSpace = await prisma.space.findFirst({
      where: {
        id: spaceId,
        owner_id: user.id,
      },
      select: {
        spaceSharing: {
          select: {
            user: {
              select: {
                email: true,
                id: true,
              },
            },
          },
        },
        name: true,
        id: true,
      },
    });
    if (ownedSpace) {
      return { ...ownedSpace, isOwning: true };
    }
    const sharedSpace = await prisma.space.findFirst({
      where: {
        id: spaceId,
        spaceSharing: {
          some: {
            user: {
              id: user.id,
            },
          },
        },
      },
      select: {
        spaceSharing: {
          select: {
            user: {
              select: {
                email: true,
                id: true,
              },
            },
          },
        },
        name: true,
        id: true,
      },
    });
    return { ...sharedSpace, isOwning: false };
  },

  async getAllSpaces(user: User, { limit, cursor, email }: any) {
    return sql_getAllSpaces.run(
      {
        email: user.email,
        limit,
        cursor,
      },
      pgClient
    );
  },

  async removeUserFromSpace(o: { spaceId: number; memberIdRemove: string }) {
    return await prisma.spaceSharing.deleteMany({
      where: {
        user_id: o.memberIdRemove,
        space_id: o.spaceId,
      },
    });
  },

  async addUserToSpace(owner: User, spaceId: number, invitee: string) {
    const userSpace = getUserSpaces.run(
      {
        userId: owner.id,
        spaceName: null,
        spaceId,
      },
      pgClient
    );

    if (!userSpace) {
      throw Error(
        'the space is not owned by the current user or the space does not exist'
      );
    }

    const inviteeExists = await prisma.user.findFirst({
      where: {
        email: invitee,
      },
    });

    if (!inviteeExists) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: 'Your request cannot be processed at this time',
      });
    }

    const space = await prisma.spaceSharing.create({
      data: {
        space_id: spaceId,
        user_id: inviteeExists.id,
      },
    });
  },
  async getSpaceCounts(
    user: User
  ): Promise<{ owningSpaces: number; sharedSpaces: number }> {
    return {
      owningSpaces: await prisma.space.count(SpaceWhereQueries.ownedBy(user)),
      sharedSpaces: await prisma.space.count(SpaceWhereQueries.shared(user)),
    };
  },
  async getUserSpaces(user: User, { limit, cursor, nameFilter }: any) {
    const queryInput = returnPaginatedQuery(
      {
        ...merge(
          SpaceWhereQueries.ownedBy(user),
          nameFilter ? SpaceWhereQueries.name(nameFilter) : {}
        ),
        orderBy: {
          id: 'asc',
        },
        select: {
          _count: {
            select: { todos: true, spaceSharing: true },
          },
          name: true,
          id: true,
        },
      },
      { limit, cursor }
    );

    const result = await prisma.space.findMany(queryInput);

    return (
      result &&
      result.map((v: any) => ({
        name: v.name,
        id: v.id,
        todosCount: v._count.todos,
        sharedWithCount: v._count.spaceSharing,
      }))
    );
  },
  async getSharedSpaces(user: User, { limit, cursor }: any) {
    const queryInput = returnPaginatedQuery(
      {
        ...SpaceWhereQueries.shared(user),
        orderBy: {
          id: 'asc',
        },
        select: {
          _count: {
            select: { todos: true, spaceSharing: true },
          },
          name: true,
          id: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      { limit, cursor }
    );
    const spaces = await prisma.space.findMany(queryInput);
    return spaces.map((v: any) => ({
      id: v.id,
      name: v.name,
      owner: v.user.email,
      todosCount: v._count.todos,
      sharedWithCount: v._count.spaceSharing,
    }));
  },

  async isSharedWithUser(spaceId: number, user: User) {
    return prisma.space.findFirst({
      where: {
        OR: [
          {
            spaceSharing: {
              some: {
                user: {
                  id: user.id,
                },
              },
            },
          },
          {
            user: {
              id: user.id,
            },
          },
        ],
        id: spaceId,
      },
    });
  },
  async isOwner(spaceId: number, user: User) {
    return prisma.space.findFirst({
      where: {
        user: {
          id: user.id,
        },

        id: spaceId,
      },
    });
  },
};
