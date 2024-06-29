import { TodoService } from "@/server/services/todo";
import { UserModel } from "@/lib/prisma/zod";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

export const UserService = {
  async defaultOrCreateOwnerSpace(user: User) {
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

    const todosForUser = await TodoService.getTodosForUser(user, {limit: 1, cursor: 0});

    if (todosForUser?.length == 0) {
      for(var i= 1; i< 500; i++) {
        TodoService.createDefaultTodos(space, user);
      }
    }
  },
  
};
