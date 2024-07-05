import prisma from "@/lib/prisma";
import { TodoService, TodoWhereQueries } from "@/server/services/todo";
import { shieldedProcedure, t } from "@/utils/trpc-server";
import { Space, User } from "@prisma/client";
import { last, merge } from "lodash";
import { z } from "zod";

export const todoRouter = t.router({
  getOwnTodos: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
        statuses: z.string().array().optional(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const whereClause = merge(
        TodoWhereQueries.OwnTodosAcrossSpaces(session.user),
        opts.input.statuses
          ? TodoWhereQueries.ForStatus(opts.input.statuses)
          : {}
      );
      const items = await TodoService.getTodosForUser(
        session.user,
        whereClause,
        opts.input
      );
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
  getTodosForSpace: shieldedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.number().nullish(),
        spaceId: z.number(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;
      const items = await TodoService.getTodosForUser(
        session.user,
        TodoWhereQueries.ForSpace(opts.input.spaceId),
        opts.input
      );
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
        todo: await TodoService.getTodo(opts.input.taskId),
      };
    }),

  getTodo: shieldedProcedure
    .input(
      z.object({
        taskId: z.number(),
      })
    )
    .query(async (opts) => {
      return TodoService.getTodo(opts.input.taskId);
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
  updateTodo: shieldedProcedure
    .input(
      z.object({
        field: z.string(),
        value: z.string(),
        todoId: z.number(),
      })
    )
    .mutation((opts) => {
      return TodoService.updateTodo(opts.input);
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

