import prisma from "@/lib/prisma";
import { pgClient } from "@/lib/prisma/client";
import { getUserSpaces } from "@/lib/typed-queries/user/action";
import { User } from "@prisma/client";
import { returnPaginatedQuery } from "./todo";
import { orderBy } from "lodash";

const SpaceWhereQueries = {
  ownedBy: (user: User) => ({
    where: {
      owner_id: user.id,
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
        "the space is not owned by the current user or the space does not exist"
      );
    }

    const inviteeExists = await prisma.user.findFirst({
      where: {
        email: invitee,
      },
    });

    if (!inviteeExists) {
      throw new Error(
        "The invitee does not exist on the system. Please ask the user to register on this site using the email id you provided"
      );
    }

    const space = await prisma.spaceSharing.create({
      data: {
        space_id: spaceId,
        user_id: inviteeExists.id,
      },
    });
  },
  async getSpaceCounts(user: User) : Promise<{ owningSpaces: number, sharedSpaces: number}>{
    return {
      owningSpaces: await prisma.space.count(SpaceWhereQueries.ownedBy(user)),
      sharedSpaces: await prisma.space.count(SpaceWhereQueries.shared(user)),
    };
  },
  async getUserSpaces(user: User, { limit, cursor }: any) {
    const queryInput = returnPaginatedQuery(
      {
        ...SpaceWhereQueries.ownedBy(user),
        orderBy: {
          id: "asc",
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
    return prisma.space.findMany(queryInput);
  },
  async getSharedSpaces(user: User, { limit, cursor }: any) {
    const queryInput = returnPaginatedQuery(
      {
        ...SpaceWhereQueries.shared(user),
        orderBy: {
          id: "asc",
        },
        select: {
          _count: {
            select: { todos: true },
          },
          name: true,
        },
      },
      { limit, cursor }
    );
    return prisma.space.findMany(queryInput);
  },
};

