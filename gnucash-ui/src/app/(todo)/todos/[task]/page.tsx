'use client';
import { Button } from '@/components/ui/button';
import ListItem from '@/components/ui/lists/list-item';
import LoaderListItem from '@/components/ui/lists/loader-list';
import PropertyListItem from '@/components/ui/lists/property-list-item';
import TwoLineListItem from '@/components/ui/lists/two-line-list-item';
import EditableText from '@/components/ui/ui-hoc/editable-text';
import { trpc } from '@/utils/trpc';
import { Case } from 'change-case-all';
import { Plus, Rows3 } from 'lucide-react';
import { DateTime } from 'luxon';
import { usePathname, useRouter } from 'next/navigation';

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
    const status = todo?.status;
    return (
      <>
        <ListItem variant='header' className="justify-between">
          <div> Todo #{todo?.id} </div>
          <Button
            variant='outline'
            onClick={() => {
              const previousPath = pathname.split('/').slice(0, -1).join('/');
              router.push(`${previousPath}`);
              router.refresh();
            }}
          >
            {' '}
            <Rows3 />
          </Button>
        </ListItem>
        <EditableText
          model={todo}
          fieldName='title'
          queryKey={[['todo', 'getDetailedView']]}
          type='text'
          mutationFunction={todoFieldUpdateMutation}
          mutationArgs={() => {
            return {
              todoId: todo?.id,
            };
          }}
        />
        <EditableText
          model={todo}
          fieldName='description'
          type='textarea'
          helpText='Github Flavoured Markdown'
          useMarkdown={true}
          mutationFunction={todoFieldUpdateMutation}
          queryKey={[['todo', 'getDetailedView']]}
          mutationArgs={() => {
            return {
              todoId: todo?.id,
            };
          }}
        />
        <PropertyListItem
          variant='heading2'
          onClick={() => router.push(`${pathname}/change-status`)}
          property='status'
          value={status}
          asTag={true}
          tagColor='bg-green-600 text-gray-200 font-bold'
        />

        <ListItem
          onClick={() => router.push(`${pathname}/add-comment`)}
          variant='heading2'
        >
          Comments
          <Button variant='ghost'>
            <Plus />
          </Button>
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
                      by <span className='font-bold'>{c.commented_by}</span>
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

        <ListItem variant='heading2'>Status History</ListItem>
        {statusHistory ? (
          statusHistory.map((statusLine, index) => {
            return (
              <TwoLineListItem
                key={index}
                firstLine={Case.title(statusLine.status)}
                model={statusLine}
                secondLineGenerator={() => {
                  return (
                    statusLine.comment +
                    ', ' +
                    DateTime.fromJSDate(statusLine.created_at).toRelative()
                  );
                }}
              />
            );
          })
        ) : (
          <ListItem> There are no comments yet</ListItem>
        )}
      </>
    );
  } else {
    return <LoaderListItem />;
  }
}
