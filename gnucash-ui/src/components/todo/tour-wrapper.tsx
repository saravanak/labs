'use client';
import { useTour } from '@reactour/tour';
import { TramFront, TriangleAlert } from 'lucide-react';
import { Button } from '../ui/button';
import { FlexJustifySpread } from '../ui/ui-hoc/flex-justify-spread';
import TodoTabBar from './todo-tab-bar';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import ListItem from '../ui/lists/list-item';

export default function TourWrapper({ children, session }: any) {
  const { setIsOpen } = useTour();
  const { data: userSession }: any = useSession();
  const router = useRouter();
  return (
    <div className='grid grid-cols-1 h-svh grid-rows-[3em,1fr,3em]'>
      <FlexJustifySpread className='bg-primary text-primary-foreground py-4 h-[3em]'>
        <div className='pl-4 grow font-bold text-lg flex items-center'>
          <div data-retour-step='tinja'> Tinja</div>
          <Button
            enabledOnDemo={true}
            onClick={() => {
              router.push('/todos');
              setIsOpen(true);
            }}
          >
            <TramFront />
          </Button>
        </div>

        <Button
          variant='ghost'
          data-retour-step='login'
          data-test-data='user-logged-in'
          enabledOnDemo={true}
          onClick={() => router.push('/profile')}
        >
          {session.user.email}
        </Button>
      </FlexJustifySpread>
      <div className='h-full  overflow-y-auto'>
        {userSession && userSession.user.isDemoUser && (
          <>
            <ListItem
              className='text-muted text-xs grow text-center justify-center'
              drawBorder={true}
            >
              <TriangleAlert className='mr-2 text-destructive' />
              <div>
                You are viewing the demo. You can move around, but most actions
                will be restricted
              </div>
            </ListItem>
            <ListItem className='text-muted text-xs grow text-center '>
              To create your own todos
              <Button
                variant='outline'
                enabledOnDemo={true}
                onClick={() => signOut({ callbackUrl: '/todos' })}
              >
                Sign in
              </Button>
            </ListItem>
          </>
        )}
        {children}
      </div>
      <TodoTabBar />
    </div>
  );
}
