'use client';
import { Button } from '@/components/ui/button';
import ListItem from '@/components/ui/lists/list-item';
import HocForm from '@/components/ui/ui-hoc/hoc-form';
import { TramFront } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export default function TodoLoginPage() {
  const [csrfToken, setCsrfToken] = useState();
  const formSchema = z
    .object({
      email: z.string().email().trim().toLowerCase(),
      csrfToken: z.string(),
    })
    .required();

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/auth/csrf');
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    })();
  }, []);

  const formMeta: Record<string, any> = {
    email: {
      label: 'Enter email for logging in',
      type: 'text',
      helpText: 'Hit login if you want a walkthrough.  Walkthrough will be readonly and you can\'t do any modifications on the demo.  Read below to know more'
    },
    csrfToken: {
      type: 'hidden',
    },
  };

  return (
    <>
      <div className='flex flex-col pt-8 items-center justify-center'>
        <div className='w-3/4 md:w-1/2'>
        {csrfToken && (
          <HocForm
            formSchema={formSchema}
            title='Login to Tinja'
            mode='internal'
            formMeta={formMeta}
            defaultValues={{ csrfToken, email: 'neo@example.com' }}
            action='/api/auth/callback/credentials'
          />
        )}
        
        <ListItem variant="heading2" className="justify-center mt-2">Using any email</ListItem>
        <ul >
          <li className='p-2 text-sm'>
            You can also use your/any email to login. &nbsp;
            <span className='text-destructive'>
              No passwords will be asked and no verification mails will be sent
            </span>
          </li>

          <li className='p-2 text-sm'>
            This is so because this is just a MVP and I am still
            figuring out email provider for sending verification emails! When you
            login using your email, the system will be fully functional, except
            that it will be world-viewable for whoever knows your email and whoever wants
            to snoop at you. When you login first, system will create a default
            set of todo's and spaces to get you started. So be careful creating todos. 
            No delete functionality is provided for todos at the moment
          </li>
        </ul>
        </div>
      </div>
    </>
  );
}
