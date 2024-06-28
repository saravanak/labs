/** Types generated for queries found in "src/lib/typed-queries/todo/action.ts" */

/** 'GetTodosWithLatestStatuses' parameters type */
export interface IGetTodosWithLatestStatusesParams {
  userEmail?: string | null | void;
}

/** 'GetTodosWithLatestStatuses' return type */
export interface IGetTodosWithLatestStatusesResult {
  comment: string;
  commentee_id: number;
  description: string;
  owner_name: string | null;
  space_name: string;
  status: string;
  task_id: number;
  title: string;
}

/** 'GetTodosWithLatestStatuses' query type */
export interface IGetTodosWithLatestStatusesQuery {
  params: IGetTodosWithLatestStatusesParams;
  result: IGetTodosWithLatestStatusesResult;
}

/** 'SeedInsertManyCommentsIntoTodo' parameters type */
export interface ISeedInsertManyCommentsIntoTodoParams {
  todos: readonly ({
    commentContent: string | null | void,
    userId: string | null | void
  })[];
}

/** 'SeedInsertManyCommentsIntoTodo' return type */
export interface ISeedInsertManyCommentsIntoTodoResult {
  id: number;
}

/** 'SeedInsertManyCommentsIntoTodo' query type */
export interface ISeedInsertManyCommentsIntoTodoQuery {
  params: ISeedInsertManyCommentsIntoTodoParams;
  result: ISeedInsertManyCommentsIntoTodoResult;
}

/** 'GetCommentsForTodo' parameters type */
export interface IGetCommentsForTodoParams {
  todoId?: number | null | void;
}

/** 'GetCommentsForTodo' return type */
export interface IGetCommentsForTodoResult {
  comment: string;
  commented_by: string;
  created_at: Date;
  id: number;
  title: string;
  user_id: string;
}

/** 'GetCommentsForTodo' query type */
export interface IGetCommentsForTodoQuery {
  params: IGetCommentsForTodoParams;
  result: IGetCommentsForTodoResult;
}

