'use client';
import { StepType, TourProvider } from '@reactour/tour';
import { SessionProvider } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { createContext, useEffect, useState } from 'react';
import Markdowned from '../markdown/md-viewer';
import TourWrapper from './tour-wrapper';
import { StepContentTexts } from './tour/step-content';

export const TabBarContext = createContext({
  form: null,
  setForm: (x: any) => {},
});

function Content({ content }: any) {
  const stepText = content ? StepContentTexts[content] : '';
  return (
    <Markdowned mdText={stepText} className='w-full rounded-md'>
      <div></div>
    </Markdowned>
  );
}

export default function AppWrapper({ children, session }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const styles = {
    popover: (base: any) => ({ ...base, maxWidth: '100%' }),
  };

  const [form, setForm] = useState(null);
  const steps: StepType[] = [
    {
      selector: '[data-retour-step="tinja"]',
      content: 'tinja',
    },
    {
      selector: '[data-retour-step="todos"]',
      content: 'todos',
      actionAfter: () => router.push('/spaces'),
    },
    {
      selector: '[data-retour-step="spaces"]',
      content: 'spaces',
    },
    {
      selector: '[data-retour-step="my-spaces"]',
      content: 'my-spaces',
      action: (element: any) => element?.click(),
    },
    {
      selector: '[data-retour-step="create-space"]',
      content: 'create-space',
      actionAfter: () => {
        document
          .querySelector<HTMLElement>('[data-retour-step="my-spaces"]')
          ?.click();
      },
    },
    {
      selector: '[data-retour-step="shared-spaces"]',
      content: 'shared-spaces',
    },
    {
      selector: '[data-retour-step="login"]',
      content: 'login',
    },
  ];

  useEffect(() => {
    if (!session) {
      if (!['/login', '/credits/about-tinja'].includes(pathname)) {
        router.push('/login');
      }
    }
    if (session) {
      if (['/login'].includes(pathname)) {
        router.push('/todos');
      }
    }
  }, [session, pathname]);

  return (
    <SessionProvider>
      <NextTopLoader
          height={10}

      />
      <TabBarContext.Provider value={{ form, setForm }}>
        <TourProvider
          steps={steps}
          components={{ Content }}
          className='w-screen md:w-[calc(100vw-50vw)] m-4'
          styles={styles}
        >
          <TourWrapper session={session}>{children}</TourWrapper>
        </TourProvider>
      </TabBarContext.Provider>
    </SessionProvider>
  );
}
