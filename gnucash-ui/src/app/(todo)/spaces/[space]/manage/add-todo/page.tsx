'use client';

import ListItem from '@/components/ui/lists/list-item';
import LoaderListItem from '@/components/ui/lists/loader-list';
import HocForm from '@/components/ui/ui-hoc/hoc-form';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export default function AddTodoToSpace({ params }: any) {
  const formSchema = z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required();

  const { isLoading, data: spaceDetails } = trpc.space.getSpace.useQuery({
    spaceId: parseInt(params.space),
  });

  const { data, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  const formMeta: Record<string, any> = {
    title: {
      label: 'Todo title',
      type: 'text',
    },
    description: {
      label: 'Describe what needs to be done',
      type: 'textarea',
      useMarkdown:true,
      helpText:'Github Flavoured Markdown',
      rows: 4,
    },
  };

  const mutation = trpc.todo.createTodo.useMutation({
    onSuccess: (d, { todoCreateArgs: { title } }) => {
      const spaceOwner = d?.spaceOwner;
      const currentUser = data?.user.id;
      const isLoggedInUserOwnerOfTodoSpace = spaceOwner == currentUser;

      toast(`Created todo with title ${title}`);
      const previousPath = pathname.split('/').slice(0, -1).join('/');
      const redirectPath = isLoggedInUserOwnerOfTodoSpace
        ? previousPath
        : `/todos/${d?.id}`;

      router.push(redirectPath);
      router.refresh();
    },
  });

  async function onSubmit(todoCreateArgs: any) {
    mutation.mutate({
      spaceId: parseInt(params.space),
      todoCreateArgs,
    });
  }

  if (isLoading) {
    return <LoaderListItem />;
  }

  return (
    <>
      <ListItem variant='header'>{spaceDetails?.name}</ListItem>

      <HocForm
        formSchema={formSchema}
        title='New Todo'
        onSubmit={onSubmit}
        formMeta={formMeta}
        defaultValues={{ spaceName: '' }}
        mutation={mutation}
      />
    </>
  );
}
