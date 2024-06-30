"use client";

import CreatCommentForTodoForm from "@/components/todo/create-comment-for-todo-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/utils/trpc";
import { DateTime } from "luxon";

export default function TaskDetailPage({ params }: any) {
  const taskIdInput = { taskId: parseInt(params.task) };
  const [todoDetail] = trpc.useQueries((t) => [
    t.todo.getDetailedView(taskIdInput),
  ]);

  if (todoDetail.data) {
    const { comments, statusHistory, todo } = todoDetail.data;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>{todo?.title}</CardTitle>
            {todo?.description}
          </CardHeader>

          <CardContent>
            <CreatCommentForTodoForm  todoId={todo?.id}/>
            {comments.map((c, index) => {
              return <div key={index}>{c.comment}</div>;
            })}
            {statusHistory &&
              statusHistory.StatusTransitions.map((statusLine, index) => {
                return (
                  <div key={index}>
                    {statusLine.status}
                    {DateTime.fromJSDate(statusLine.created_at).toRelative()}
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </>
    );
  } else {
    return <h1>Loading..</h1>;
  }
}

