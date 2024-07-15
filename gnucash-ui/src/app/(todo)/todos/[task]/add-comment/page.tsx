'use client';
import LoaderListItem from '@/components/ui/lists/loader-list';
import HocForm from '@/components/ui/ui-hoc/hoc-form';
import { navigateToParentRoute } from '@/utils/router/parent-go-back';
import { trpc } from '@/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

export default function CreateCommentForTodoForm({ params }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const todoId = parseInt(params.task);

  const [todo] = trpc.useQueries((t) => [t.todo.getTodo({ todoId: todoId })]);

  const formSchema = z.object({
    commentString: z.string().min(6),
  });

  const formMeta: Record<string, any> = {
    commentString: {
      label: 'Enter comment',
      type: 'text',
    },
  };

  const mutation = trpc.todo.addComment.useMutation({
    onSuccess: () => {
      toast('Comment successfully added');
      navigateToParentRoute({ router, pathname });
      queryClient.invalidateQueries({
        queryKey: [['todo', 'getDetailedView']],
      });
    },
  });

  function onSubmit(formState: any) {
    mutation.mutate({
      todoId,
      ...formState,
    });
  }

  if (todo.isLoading) {
    return <LoaderListItem />;
  }

  return (
    <>
      <HocForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        mutation={mutation}
        formMeta={formMeta}
        title='Add comment'
        defaultValues={{ commentString: '' }}
      />
    </>
  );
}
