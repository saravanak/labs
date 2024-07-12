import { trpc } from '@/utils/trpc';
import { z } from 'zod';
import HocForm from '../ui/ui-hoc/hoc-form';

export default function AddUserToSpace({ spaceId }: any) {
  const formSchema = z.object({
    email: z.string().email(),
  });

  const formMeta: Record<string, any> = {
    email: {
      label: 'Enter the email of the person you want to share this space to',
      type: 'email',
    },
  };

  const mutation = trpc.space.addUserToSpace.useMutation({});

  function onSubmit(formState: any) {
    mutation.mutate({
      spaceId,
      inviteeEmail: formState.email,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      mutation={mutation}
      formMeta={formMeta}
      defaultValues={{ email: '' }}
    />
  );
}
