import { TodoService } from "@/server/services/todo";
import { UserModel } from "@/lib/prisma/zod";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const UserService = {
  async defaultOrCreateOwnerSpace(user: z.infer<typeof UserModel>) {
    const space = await prisma.space.upsert({
      where: {
        owner_id: user.id,
      },
      update: {},
      create: {
        name: `${user.email}'s space`,
        owner_id: user.id,
      },
    });

    const todosForUser = await TodoService.getTodosForUser(user);

    if (todosForUser?.length == 0) {
      await TodoService.createDefaultTodos(space, user);
    }
  },
};
