'use client';
import { StepType, TourProvider } from '@reactour/tour';
import { SessionProvider } from 'next-auth/react';
import { createContext, useState } from 'react';
import TourWrapper from './tour-wrapper';
import Markdowned from '../markdown/md-viewer';
import { StepContentTexts } from './tour/step-content';
import { usePathname, useRouter } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';

export const TabBarContext = createContext({
  form: null,
  setForm: (x: any) => {},
});

function Content({
  content,
  setCurrentStep,
  transition,
  isHighlightingObserved,
  currentStep,
  setIsOpen,
}: any) {


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

  if (!session) {
    if (!['/login', '/credits/about-tinja'].includes(pathname)) {
      router.push('/login');
    }
  }

  return (
    <SessionProvider>
      <NextTopLoader />
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
