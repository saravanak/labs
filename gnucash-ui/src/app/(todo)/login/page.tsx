'use client';
import ListItem from '@/components/ui/lists/list-item';
import LoaderListItem from '@/components/ui/lists/loader-list';
import HocForm from '@/components/ui/ui-hoc/hoc-form';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState} from 'react';
import { z } from 'zod';

export default function TodoLoginPage() {
  const { data, update } = useSession();
  const [ loggingIn, setloggingIn ] = useState(false);
  const formSchema = z
    .object({
      email: z.string().email().trim().toLowerCase(),
    })
    .required();

  const router = useRouter();

  const formMeta: Record<string, any> = {
    email: {
      label: 'Enter email for logging in',
      type: 'text',
      helpText:
        "Hit login if you want a walkthrough.  Walkthrough will be readonly and you can't do any modifications. Read below to know more",
    },
  };

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/auth/csrf');
      const csrfToken = await response.json();
      await fetch('/api/auth/callback/credentials', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          ...csrfToken,
        }),
        redirect:'manual',
        headers: { 'Content-Type': 'application/json' },
      });
      
    },
    onSettled: () => {
      window.location.href="/todos";
    },
  });

  async function onSubmit(data: any) {
    mutation.mutate({ ...data });
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center mx-auto container'>
        <div className='flex flex-col items-center w-full'>
          {!loggingIn && (
            <HocForm
              className='w-1/2 border-2 rounded-md my-8 p-4 bg-blue-200'
              formSchema={formSchema}
              title='Login to Tinja'
              mode='internal'
              enabledOnDemo={true}
              formMeta={formMeta}
              defaultValues={{ email: 'neo@example.com' }}
              onSubmit={onSubmit}
              mutation={mutation}
            />
          )}

          <ListItem variant='heading2' className='justify-center mt-2 w-full'>
            Using dummy emails
          </ListItem>
          <ul>
            <li className='p-2 text-sm'>
              You can also use dummy emails to login. &nbsp;
              <span className='text-destructive'>
                No passwords will be asked and no verification mails will be
                sent. Use with caution. Don&apos;t enter any personal
                information. This is a toy right now. You&apos;ve been warned.
              </span>
            </li>

            <li className='p-2 text-sm'>
              This is so because this is just a toy and I am still figuring out
              email provider for sending verification emails! When you login
              using your email, the system will be fully functional, except that
              it will be world-viewable for whoever knows your email and whoever
              wants to snoop at you. When you login first, system will create a
              default set of todo&apos;s and spaces to get you started. So be
              careful creating todos. No delete functionality is provided for
              todos/spaces at the moment
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
