import { faker } from '@faker-js/faker';
import { fakeComment, fakeRack, fakeShelf, fakeUser } from '../fake-data';
import prisma from '../index';
import { pgClient } from '../client';
import { omit, random } from 'lodash';
import { enhance } from '@zenstackhq/runtime';
import { seed_insertManyCommentsIntoTodo } from '@/lib/typed-queries/todo/action';
import { User } from '@prisma/client';

const db = enhance(prisma, {}, { kinds: ['delegate'] });

export async function seedCreateUsers({
  email,
  spacename,
  apiKey = undefined,
}: any) {
  const newUser = omit(fakeUser(), ['space_id']);
  newUser.email = email;
  newUser.api_key = apiKey;
  const user = await prisma.user.create({ data: newUser });

  const userSpace = await prisma.space.create({
    data: {
      owner_id: user.id,
      name: spacename,

      is_system_space: true,
    },
  });

  return {
    user,
    userSpace,
  };
}

export async function seedCreateTodos({
  user,
  title,
  description,
  commentsCount = 10,
  userSpaceId = -1,
  status = 'todo',
}: {
  user: User;
  title?: string;
  description?: string;
  commentsCount: number;
  userSpaceId?: number;
  status?: string;
}) {
  const statusMeta = await prisma.statusMeta.findFirst();
  const userSpace =
    userSpaceId == -1
      ? await prisma.space.findFirst({
          where: {
            owner_id: user.id,
          },
        })
      : await prisma.space.findFirst({
          where: {
            id: userSpaceId,
          },
        });

  const todo = await db.todo.create({
    data: {
      statusMeta: { connect: { id: statusMeta?.id } },
      title: title || faker.animal.bear(),
      description: description || faker.lorem.sentence(2),
      space: { connect: { id: userSpace?.id } },
    },
  });

  await prisma.statusTransitions.create({
    data: {
      status,
      todo_id: todo.id,
      comment: `Changed by ${user.email}`,
    },
  });

  const insertedComments = await seed_insertManyCommentsIntoTodo.run(
    {
      todos: Array(commentsCount)
        .fill(null)
        .map(() => ({
          commentContent: faker.lorem.lines(2),
          userId: user?.id,
        })),
    },
    pgClient
  );

  return await Promise.all(
    insertedComments.map(({ id: commentId }) => {
      return db.commentable.create({
        data: {
          commentee_id: todo.id,
          commentee_type: 'Todo',
          comment_id: commentId,
        },
      });
    })
  );
}

export async function resetDB() {
  await pgClient.query('Truncate users cascade');
}
