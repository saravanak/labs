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
        spaceId: z.number().nullish(),
        statuses: z.string().array().optional(),
        searchText: z.string().nullish(),
      })
    )
    .query(async (opts) => {
      const { session } = opts.ctx;

      const whereClause = merge(
        opts.input.spaceId
          ? TodoWhereQueries.ForSpace(session.user, opts.input.spaceId)
          : TodoWhereQueries.OwnTodosAcrossSpaces(session.user),
        opts.input.statuses?.length
          ? TodoWhereQueries.ForStatus(opts.input.statuses)
          : {},
        opts.input.searchText?.trim()?.length
          ? TodoWhereQueries.ForSearchText(opts.input.searchText.trim())
          : {}
      );
      
      const items = await TodoService.getTodosForUser(
        session.user,
        whereClause,
        opts.input
        );
        console.log(opts.input,  JSON.stringify(whereClause));
      console.log({items: JSON.stringify(items)});
      return {
        items,
        nextCursor: last(items)?.id,
      };
    }),
  getDetailedView: shieldedProcedure
    .input(
      z.object({
        todoId: z.number(),
      })
    )
    .query(async (opts) => {
      const { todo }: any = opts.ctx;
      return {
        comments: await TodoService.getDetailedTodo(opts.input.todoId),
        statusHistory: await TodoService.getStatusHistory(opts.input.todoId),
        todo,
      };
    }),

  getTodo: shieldedProcedure
    .input(
      z.object({
        todoId: z.number(),
      })
    )
    .query(async (opts) => {
      const { todo }: any = opts.ctx;
      return todo;
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
        todoId: z.number(),
        newStatus: z.string(),
      })
    )
    .mutation((opts) => {
      TodoService.changeStatus(
        opts.input.todoId,
        opts.input.newStatus,
        opts.ctx.session.user as User
      );
    }),
  getValidStatuses: shieldedProcedure
    .input(
      z.object({
        todoId: z.number(),
      })
    )
    .query(async (opts) => {
      return TodoService.getStatuses(opts.input.todoId);
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

