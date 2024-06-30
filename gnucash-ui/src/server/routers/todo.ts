import { z } from "zod";
import { TodoService } from "@/server/services/todo";
import { shieldedProcedure, t } from "@/utils/trpc-server";
import prisma from "@/lib/prisma";
import { Space, User } from "@prisma/client";
import { last } from "lodash";

export const todoRouter = t.router({
  getOwnTodos: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await TodoService.getTodosForUser(session.user, opts.input);
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
  getDetailedView: shieldedProcedure
    .input(
      z.object({
        taskId: z.number(),
      })
    )
    .query(async (opts) => {
      return {
        comments: await TodoService.getDetailedTodo(opts.input.taskId),
        statusHistory: await TodoService.getStatusHistory(opts.input.taskId),
        todo: await prisma.todo.findFirst({ where: { id: opts.input.taskId } }),
      };
    }),
  createTodo: shieldedProcedure
    .input(
      z.object({
        spaceId: z.number(),
        todoCreateArgs: z.object({
          title: z.string(),
          description: z.string(),
        }),
      })
    )
    .mutation((opts) => {
      return TodoService.createTodo(
        { id: opts.input.spaceId } as Space,
        opts.ctx.session.user,
        opts.input.todoCreateArgs
      );
    }),
  changeStatus: shieldedProcedure
    .input(
      z.object({
        taskId: z.number(),
        newStatus: z.string(),
      })
    )
    .mutation((opts) => {
      TodoService.changeStatus(
        opts.input.taskId,
        opts.input.newStatus,
        opts.ctx.session.user as User
      );
    }),
  getValidStatuses: shieldedProcedure
    .input(
      z.object({
        taskId: z.number(),
      })
    )
    .query(async (opts) => {
      return TodoService.getStatuses(opts.input.taskId);
    }),

  addComment: shieldedProcedure
    .input(
      z.object({
        todoId: z.number(),
        commentString: z.string(),
      })
    )
    .mutation(async (opts) => {
      return TodoService.addComment(
        opts.input.todoId,
        opts.ctx.session.user as User,
        opts.input.commentString
      );
    }),
});

