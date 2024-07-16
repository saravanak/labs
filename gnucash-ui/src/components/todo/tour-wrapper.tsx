'use client';
import { animated, config, useSpring } from '@react-spring/web';
import { useTour } from '@reactour/tour';
import { TramFront, TriangleAlert } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '../ui/button';
import ListItem from '../ui/lists/list-item';
import { FlexJustifySpread } from '../ui/ui-hoc/flex-justify-spread';
import TodoTabBar from './todo-tab-bar';
import { version} from 'package.json'

export default function TourWrapper({ children, session: userSession }: any) {
  const { setIsOpen } = useTour();
  const pathname = usePathname();
  
  const isDemoUser = userSession && userSession.user.isDemoUser;
  const router = useRouter();
  const toConfig = {
    to: [
      {
        borderColor: 'green',
        filter: 'brightness(2)',
      },
      {
        borderColor: 'yellow',
        filter: 'brightness(1.1)',
      },
    ],
    config: { ...config.molasses },
    loop: true,
    reset: true,
  };
  const onSigninClick = useCallback(async () => {
    await signOut();
    window.location.href = "/login"
  }, []);
  let springs = useSpring({
    ...toConfig,
  });

  const isLoginRoute = pathname == '/login';

  return (
    <div className='grid grid-cols-1 h-svh grid-rows-[3em,1fr,3em]  border-2 border-primary '>
      <FlexJustifySpread className='bg-primary text-primary-foreground py-4 h-[3em]'>
        <div className='pl-4 grow font-bold text-lg flex items-center'>
          <div data-retour-step='tinja'> Tinja <span className='text-[0.6rem] font-normal font-mono'>{version}</span></div>
          {isDemoUser && (
            <animated.div
              className='border-2 mx-4 rounded-md bg-primary'
              style={{ ...springs }}
            >
              <Button
                className='text-pink-400'
                enabledOnDemo={true}
                onClick={() => {
                  router.push('/todos');
                  setIsOpen(true);
                }}
              >
                <TramFront />
              </Button>
            </animated.div>
          )}
        </div>

        <Button
          variant='ghost'
          data-retour-step='login'
          data-test-data='user-logged-in'
          enabledOnDemo={true}
          onClick={() => router.push('/profile')}
        >
          {userSession && userSession?.user.email}
        </Button>
      </FlexJustifySpread>
      <div className='h-full  overflow-y-auto box-border bg-gradient-to-br from-gray-200 to-zinc-100 '>
        {!isLoginRoute && userSession && userSession.user.isDemoUser && (
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
                onClick={() => onSigninClick()}
              >
                Use my email
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
