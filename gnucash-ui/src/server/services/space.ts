import prisma from "@/lib/prisma";
import { pgClient } from "@/lib/prisma/client";
import { getUserSpaces } from "@/lib/typed-queries/user/action";
import { User } from "@prisma/client";

export const UserService = {
  async createSpace(user: User, spaceName: string) {
    const space = await prisma.space.create({
      data: {
        name: spaceName,
        owner_id: user.id,
      },
    });
  },

  async addUserToSpace(owner: User, spaceId: number, invitee: User) {
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
        id: invitee.id,
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
        user_id: invitee.id,
      },
    });
  },
};

