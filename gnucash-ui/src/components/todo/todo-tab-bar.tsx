'use client';

import { Case } from 'change-case-all';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useContext, useMemo } from 'react';
import { Button } from '../ui/button';
import { FlexJustifySpread } from '../ui/ui-hoc/flex-justify-spread';
import { TabBarContext } from './app-wrapper';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function TodoTabBar() {
  const segment = useSelectedLayoutSegment();
  const router = useRouter();
  const pathname = usePathname();
  const { form, setForm } = useContext(TabBarContext) as any;

  const { hookForm, formState, onSubmit, onCancel, mutation, title, status } =
    form || {};

  let tabButtons = useMemo(() => {
    if (pathname == '/login') {
      return [
        { key: 'what', label: "What's this?", path: 'about-tinja' },
        { key: 'spaces', label: 'About me', path: 'sandbox' },
      ].map(({ key, label, path }) => {
        return (
          <Link
            href={`/${path}`}
            key={key}
            className={cn(
              'pl-4 basis-1/2  h-full text-center font-bold content-center border-r-2 border-primary ml-[1px] box-border first:border-l-2 border-b-2'
            )}
          >
            {label}
          </Link>
        );
      });
    }
    switch (form) {
      case null:
        return ['todos', 'spaces'].map((v) => {
          return (
            <Link
              href={`/${v}`}
              key={v}
              data-retour-step={v}
              data-test-action={`go-to-${v}`}
              className={cn(
                'pl-4 basis-1/2  h-full text-center font-bold content-center',
                v == segment
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground'
              )}
            >
              {Case.title(v)}
            </Link>
          );
        });
      default:
        const controls = [
          {
            action: 'save',
            handler: onSubmit,
          },
          {
            action: 'cancel',
            handler: () => {
              hookForm.reset();
              setForm(null);
              history.back();
            },
          },
        ].map(({ action, handler }, index) => {
          return (
            <Button
              onClick={handler}
              key={action}
              variant='formAction'
              data-test-action={`tab-bar-${Case.kebab(action)}`}
              size='formAction'
              btnColor={action == 'save' ? 'userAgree' : 'userCancel'}
              enabledOnDemo={action == 'cancel'}
              disabled={
                action == 'save'
                  ? !formState.isValid || mutation?.isLoading
                  : false
              }
            >
              {action == 'save' && mutation?.isLoading ? <Loader /> : null}{' '}
              {Case.title(action)}
            </Button>
          );
        });

        controls.splice(
          1,
          0,
          <div
            key='form-title'
            className='grow h-full text-center content-center font-bold'
          >
            {title}
          </div>
        );

        return controls;
    }
  }, [
    form,
    formState?.isSubmitting,
    formState?.submitCount,
    mutation,
    status,
    segment,
    pathname,
  ]);

  return (
    <div className='mb-4 h-full'>
      <FlexJustifySpread
        className={cn(
          'bg-blue-300 h-full justify-around items-center border-blue-200',
          ` ${form ? 'justify-center' : ''}`
        )}
      >
        {tabButtons}
      </FlexJustifySpread>
    </div>
  );
}
