"use client";
import ListItem from "@/components/ui/lists/list-item";
import LoaderListItem from "@/components/ui/lists/loader-list";
import PropertyListItem from "@/components/ui/lists/property-list-item";
import TwoLineListItem from "@/components/ui/lists/two-line-list-item";
import EditableText from "@/components/ui/ui-hoc/editable-text";
import { trpc } from "@/utils/trpc";
import { Case } from "change-case-all";
import { DateTime } from "luxon";
import { usePathname, useRouter } from "next/navigation";

export default function TaskDetailPage({ params }: any) {
  const todoIdInput = { todoId: parseInt(params.task) };
  const [todoDetail] = trpc.useQueries((t) => [
    t.todo.getDetailedView(todoIdInput),
  ]);

  const router = useRouter();
  const pathname = usePathname();

  const todoFieldUpdateMutation = trpc.todo.updateTodo;

  if (todoDetail.data) {
    const { comments, statusHistory, todo } = todoDetail.data;
    const status = todo?.StatusTransitions[0]?.status;
    return (
      <>
        <ListItem variant="header">Todo #{todo?.id}</ListItem>
        <EditableText
          model={todo}
          fieldName="title"
          queryKey={[["todo", "getDetailedView"]]}
          type="text"          
          mutationFunction={todoFieldUpdateMutation}
          mutationArgs={() => {
            return {
              todoId: todo?.id,
            };
          }}
        />
        <EditableText
          model={todo}
          fieldName="description"
          type="textarea"
          useMarkdown={true}
          mutationFunction={todoFieldUpdateMutation}
          queryKey={[["todo", "getDetailedView"]]}
          mutationArgs={() => {
            return {
              todoId: todo?.id,
            };
          }}
        />
        <PropertyListItem
          onClick={() => router.push(`${pathname}/change-status`)}
          property="status"
          value={status}
          asTag={true}
          tagColor="bg-green-600 text-gray-200 font-bold"
        />

        <ListItem
          onClick={() => router.push(`${pathname}/add-comment`)}
          variant="heading2"
        >
          Comments
        </ListItem>

        {comments.length ? (
          comments.map((c, index) => {
            return (
              <TwoLineListItem
                key={index}
                firstLine={c.comment}
                model={c}
                secondLineGenerator={() => {
                  return (
                    <>
                      by <span className="font-bold">{c.commented_by}</span>
                      ,&nbsp;
                      <span title={c.created_at}>
                        {DateTime.fromJSDate(c.created_at).toRelative()}
                      </span>
                    </>
                  );
                }}
              />
            );
          })
        ) : (
          <ListItem> There are no comments yet</ListItem>
        )}

        <ListItem variant="heading2">Status History</ListItem>
        {statusHistory &&
          statusHistory.StatusTransitions.map((statusLine, index) => {
            return (
              <TwoLineListItem
                key={index}
                firstLine={Case.title(statusLine.status)}
                model={statusLine}
                secondLineGenerator={() => {
                  return (
                    statusLine.comment +
                    ", " +
                    DateTime.fromJSDate(statusLine.created_at).toRelative()
                  );
                }}
              />
            );
          })}
      </>
    );
  } else {
    return <LoaderListItem />;
  }
}

