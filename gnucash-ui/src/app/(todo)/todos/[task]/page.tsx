"use client";

import ChangeStatusForm from "@/components/todo/change-status-form";
import CreateCommentForTodoForm from "@/components/todo/create-comment-for-todo-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditableText from "@/components/ui/ui-hoc/editable-text";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TaskDetailPage({ params }: any) {
  const taskIdInput = { taskId: parseInt(params.task) };
  const [todoDetail] = trpc.useQueries((t) => [
    t.todo.getDetailedView(taskIdInput),
  ]);

  const todoFieldUpdateMutation = trpc.todo.updateTodo.useMutation({});

  if (todoDetail.data) {
    const { comments, statusHistory, todo } = todoDetail.data;
    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col py-2">
                <EditableText
                  model={todo}
                  fieldName="title"
                  type="text"
                  mutation={todoFieldUpdateMutation}
                  mutationArgs={() => {
                    return {
                      todoId: todo?.id,
                    };
                  }}
                />
              </div>
            </CardTitle>
            <div className="flex flex-col py-2">
                <EditableText
                  model={todo}
                  fieldName="description"
                  type="textarea"
                  mutation={todoFieldUpdateMutation}
                  mutationArgs={() => {
                    return {
                      todoId: todo?.id,
                    };
                  }}
                />
              </div>
          </CardHeader>

          <CardContent>
            <ChangeStatusForm
              todoId={todo?.id}
              todoStatus={todo?.StatusTransitions[0]?.status}
            />
            <CreateCommentForTodoForm todoId={todo?.id} />
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

