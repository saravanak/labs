import prisma from '@/lib/prisma';
import { pgClient } from '@/lib/prisma/client';
import { UserModel } from '@/lib/prisma/zod';
import {
  getCommentsForTodo,
  seed_insertManyCommentsIntoTodo,
} from '@/lib/typed-queries/todo/action';
import { faker } from '@faker-js/faker';
import { Space, User } from '@prisma/client';
import { space } from 'postcss/lib/list';
import { z } from 'zod';

export const returnPaginatedQuery = (
  baseQuery: any,
  { limit, cursor }: any
) => {
  const queryInput = {
    take: limit,
    skip: 0,
    orderBy: {
      id: 'asc',
    },
    ...baseQuery,
  } as any;

  if (cursor) {
    queryInput.cursor = {
      id: cursor,
    };
    queryInput.skip = 1;
  }
  return queryInput;
};

export const TodoWhereQueries = {
  OwnTodosAcrossSpaces: (user: any) => ({
    where: {
      space: {
        OR: [
          {
            user: {
              is: {
                id: user.id,
              },
            },
          },
          {
            spaceSharing: {
              some: {
                user_id: user.id,
              },
            },
          },
        ],
      },
    },
  }),
  ForSpace: (user: User, spaceId: number) => ({
    where: {
      space: {
        is: {
          id: spaceId,
        },
      },
    },
  }),
  ForStatus: (statuses: string[]) => ({
    where: {
      StatusTransitions: {
        some: {
          status: {
            in: statuses,
          },
        },
      },
    },
  }),
  ForSearchText: (searchText: string) => ({
    where: {
      OR: [
        {
          title: {
            contains: searchText,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchText,
            mode: 'insensitive',
          },
        },
      ],
    },
  }),
};

export const TodoService = {
  async getTodosForUser(
    user: z.infer<typeof UserModel>,
    whereClause: any = { where: {} },
    { limit, cursor, spaceId }: any
  ) {
    const queryInput = returnPaginatedQuery(
      {
        select: {
          space: {
            select: {
              name: true,
              id: true,
              owner_id: true,
            },
          },
          id: true,
          title: true,
          description: true,
          StatusTransitions: {
            select: {
              status: true,
              todo_id: true,
            },
            orderBy: {
              created_at: 'desc',
            },
            distinct: ['todo_id'],
          },
        },
        ...whereClause,
        orderBy: {
          space: {
            owner_id: 'desc',
          },
        },
      },
      { limit, cursor }
    );

    const todos = await prisma.todo.findMany(queryInput);

    return todos.map((v: any) => ({
      id: v.id,
      title: v.title,
      description: v.description,
      status: v.StatusTransitions[0].status,
      spaceName: v.space.name,
      spaceId: v.space.id,
    }));
  },

  async createDefaultTodos(userSpace: Space, user: User) {
    const statusMeta = await prisma.statusMeta.findFirst();
    const defaultTodoOptions: { statusMeta: any; space: any } = {
      statusMeta: { connect: { id: statusMeta?.id } },
      space: { connect: { id: userSpace?.id } },
    };
    const todo = await prisma.todo.create({
      data: {
        title: 'Explore todo UI',
        description: 'Explore the various todo features',
        ...defaultTodoOptions,
      } as any,
    });

    await prisma.statusTransitions.create({
      data: {
        todo_id: todo.id,
        status: 'todo',
        comment: 'Created..',
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
            commentee_type: 'Todo',
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
    return result?.statusMeta?.statuses?.split(',');
  },
  async getStatusHistory(todoId: number) {
    const transitions = await prisma.todo.findFirst({
      select: {
        StatusTransitions: {
          select: {
            status: true,
            comment: true,
            created_at: true,
          },
          orderBy: {
            created_at: 'desc',
          },
        },
      },
      where: {
        id: todoId,
      },
    });
    return transitions && transitions.StatusTransitions;
  },
  async changeStatus(todoId: number, newStatus: string, user: User) {
    const availableStatuses = await this.getStatuses(todoId);

    if (!availableStatuses) {
      throw Error(`No valid status found for task. Contact admin`);
    }

    if (!availableStatuses?.includes(newStatus)) {
      throw Error(
        `Invalid status for this todo. Choose one of : ${availableStatuses?.join(
          ','
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
        status: statusMeta?.statuses.split(',')[0] as string,
        todo_id: newTodo.id,
        comment: `Changed by ${user.email}`,
      },
    });

    return TodoService.getTodo(newTodo.id);
  },
  async updateTodo({ field, value, todoId }: any) {
    return await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        [field]: value,
      },
    });
  },

  async getTodo(todoId: number) {
    const todo = await prisma.todo.findFirst({
      select: {
        StatusTransitions: {
          select: {
            status: true,
            todo_id: true,
          },
          orderBy: {
            created_at: 'desc',
          },
          distinct: ['todo_id'],
        },
        space: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },

        id: true,
        title: true,
        description: true,
      },
      where: {
        id: todoId,
      },
    });

    return (
      todo && {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        spaceOwner: todo.space.user.id,
        spaceId: todo.space.id,
        status: todo.StatusTransitions[0].status,
      }
    );
  },

  async addComment(todoId: number, user: User, commentContent: string) {
    const insertedComment = await seed_insertManyCommentsIntoTodo.run(
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

    return prisma.commentable.create({
      data: {
        commentee_id: todoId,
        commentee_type: 'Todo',
        comment_id: insertedComment[0].id,
      },
    });
  },
};
