'use client';

import HocForm from '@/components/ui/ui-hoc/hoc-form';
import { navigateToParentRoute } from '@/utils/router/parent-go-back';
import { trpc } from '@/utils/trpc';
import { useQueryClient } from '@tanstack/react-query';
import { Case } from 'change-case-all';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

export default function ChangeStatus({ params }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const todoId = parseInt(params.task);

  const [validStatuses, todo] = trpc.useQueries((t) => [
    t.todo.getValidStatuses({ todoId: todoId }),
    t.todo.getTodo({ todoId: todoId }),
  ]);

  const formSchema = z.object({
    newStatus: z.string(),
    comment: z.string(),
  });

  const formMeta: Record<string, any> = {
    newStatus: {
      label: 'Choose status',
      type: 'select',
      statusOptions: validStatuses?.data?.map((v) => {
        return {
          value: v,
          label: Case.title(v),
        };
      }),
    },
    comment: {
      label: 'Enter comment',
      type: 'text',
    },
  };

  const mutation = trpc.todo.changeStatus.useMutation({
    onSuccess: (d, { newStatus }) => {
      toast(`Status changed to  ${newStatus} `);
      navigateToParentRoute({ router, pathname });
      queryClient.invalidateQueries({
        queryKey: [['todo', 'getDetailedView']],
      });
    },
  });

  function onSubmit(formState: any) {
    mutation.mutate({
      todoId: todoId,
      ...formState,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      title='Change Status'
      displayTitle={false}
      mutation={mutation}
      formMeta={formMeta}
      defaultValues={{
        newStatus: todo.data?.status,
        comment: '',
      }}
    />
  );
}
