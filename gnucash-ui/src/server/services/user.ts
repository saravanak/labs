import { TodoService } from "@/server/services/todo";
import { UserModel } from "@/lib/prisma/zod";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

export const UserService = {
  async defaultOrCreateOwnerSpace(user: User) {
    const name = `${user.email}'s space`;
    const space = await prisma.space.upsert({
      where: {
        owner_id_name: {
          owner_id: user.id,
          name: name,
        },
      },
      update: {},
      create: {
        name,
        owner_id: user.id,
      },
    });

    const todosForUser = await TodoService.getTodosForUser(user, null, {
      limit: 5,
      cursor: undefined,
    });

    console.log(`defaultOrCreateOwnerSpace:${todosForUser}`);
    

    if (todosForUser?.length == 0) {
      for (var i = 1; i < 5; i++) {
        TodoService.createDefaultTodos(space, user);
      }
    }
  },
};

