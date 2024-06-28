import { faker } from "@faker-js/faker";
import { UserModel } from "@/lib/prisma/zod";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Space, User } from "@prisma/client";
import {
  getCommentsForTodo,
  getTodosWithLatestStatuses,
} from "@/lib/typed-queries/todo/action";
import { seed_insertManyCommentsIntoTodo } from "@/lib/typed-queries/todo/action";
import { pgClient } from "@/lib/prisma/client";

export const TodoService = {
  async getTodosForUser(user: z.infer<typeof UserModel>) {
    console.log(user);

    return await getTodosWithLatestStatuses.run(
      { userEmail: user.email },
      pgClient
    );
  },

  async createDefaultTodos(userSpace: Space, user: User) {
    const statusMeta = await prisma.statusMeta.findFirst();
    const defaultTodoOptions: { statusMeta: any; space: any } = {
      statusMeta: { connect: { id: statusMeta?.id } },
      space: { connect: { id: userSpace?.id } },
    };
    const todo = await prisma.todo.create({
      data: {
        title: "Explore todo UI",
        description: "Explore the various todo features",
        ...defaultTodoOptions,
      } as any,
    });

    await prisma.statusTransitions.create({
      data: {
        todo_id: todo.id,
        status: "todo",
        comment: "Created..",
      },
    });

    const insertedComments = await seed_insertManyCommentsIntoTodo.run(
      {
        todos: Array(10)
          .fill(null)
          .map(() => ({
            commentContent: faker.lorem.paragraph(1),
            userId: user?.id,
          })),
      },
      pgClient
    );

    return await Promise.all(
      insertedComments.map(({ id: commentId }) => {
        return prisma.commentable.create({
          data: {
            commentee_id: todo.id,
            commentee_type: "Todo",
            comment_id: commentId,
          },
        });
      })
    );
  },
  async getDetailedTodo(todoId: number) {
    return getCommentsForTodo.run(
      {
        todoId,
      },
      pgClient
    );
  },
  async getStatuses(todoId: number) {
    const result = await prisma.todo.findFirst({
      select: {
        statusMeta: {
          select: {
            statuses: true,
          },
        },
      },
      where: {
        id: todoId,
      },
    });
    return result?.statusMeta?.statuses?.split(",");
  },
  async changeStatus(todoId: number, newStatus: string, user: User) {
    const availableStatuses = await this.getStatuses(todoId);

    if (!availableStatuses) {
      throw Error(`No valid status found for task. Contact admin`);
    }

    if (!availableStatuses?.includes(newStatus)) {
      throw Error(
        `Invalid status for this todo. Choose one of : ${availableStatuses?.join(
          ","
        )}`
      );
    }

    await prisma.statusTransitions.create({
      data: {
        status: newStatus,
        todo_id: todoId,
        comment: `Changed by ${user.email}`,
      },
    });
  },

  async createTodo(space: Space, user: User, todoCreateArgs: any) {
    const statusMeta = await prisma.statusMeta.findFirst();
    const newTodo = await prisma.todo.create({
      data: {
        title: todoCreateArgs.title,
        description: todoCreateArgs.description,
        statusMetaId: statusMeta?.id as number,
        space_id: space.id,
      },
    });

    await prisma.statusTransitions.create({
      data: {
        status: statusMeta?.statuses.split(",")[0] as string,
        todo_id: newTodo.id,
        comment: `Changed by ${user.email}`,
      },
    });
  },

  async addComment(todoId: number, user: User, commentContent: string)  {
    return await seed_insertManyCommentsIntoTodo.run(
      {
        todos: [
          {
            commentContent,
            userId: user.id,
          },
        ],
      },
      pgClient
    );
  },
};

