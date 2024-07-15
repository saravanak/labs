import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TabBarContext } from '@/components/todo/app-wrapper';
import { cn } from '@/lib/utils';
import { getPropertyPaths } from '@/utils/zod/extract-keys-from-type';
import { LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '../button';
import { Form } from '../form';
import ListItem from '../lists/list-item';
import FormErrorContainer from './form-error-container';
import HocInput from './hoc-input';

export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
  mutation,
  title,
  mode = 'global',

  className,
  enabledOnDemo,
  displayTitle = true,
}: any) {
  const propertyPaths = getPropertyPaths(formSchema);

  const { data: userSession }: any = useSession();

  const isDemoUser = userSession && userSession.user.isDemoUser;

  const form = useForm({
    resolver: zodResolver({ ...formSchema, mode: 'sync' }),
    mode: 'onSubmit',
    defaultValues,
  });

  const { formState, setError } = form;

  const { setForm } = useContext(TabBarContext);

  const formSubmitHandler = useCallback(
    form.handleSubmit(async (d) => {
      return await onSubmit(d);
    }),
    []
  );

  useEffect(() => {
    if (mode == 'global') {
      setForm({
        hookForm: form,
        formState: form.formState,
        mutation,
        status: mutation?.isLoading ? 'Saving changes...' : '',
        title,
        onSubmit: formSubmitHandler,
        onCancel: () => {},
      });
    }
    return () => {
      setForm(null);
    };
  }, [
    form,
    formState.submitCount,
    formState.isValid,
    formState.isSubmitted,
    formState.isSubmitting,
    mutation,
    title,
  ]);

  const additionalContext = {
    ...form,
    formMeta,
  };

  const isLoading = mutation?.isLoading;

  const isFormDisabled = (enabledOnDemo ? false : isDemoUser) || isLoading;
  return (
    <div className={cn('grid  grid-cols-1 ', className)}>
      {displayTitle && (
        <ListItem variant='heading2' className='justify-center text-sm'>
          {title}
        </ListItem>
      )}
      <Form {...additionalContext}>
        <form
          onSubmit={() => form.handleSubmit((d) => {
            onSubmit(d);
          })}
        >
          <fieldset disabled={isFormDisabled}>
            {propertyPaths.map((property) => {
              return (
                <HocInput
                  key={property}
                  name={property}
                  formMeta={formMeta}
                  trigger={form.trigger}
                  disabled={isFormDisabled}
                />
              );
            })}
          </fieldset>

          <div className='flex justify-center'>
            {mode == 'internal' && (
              <Button
                type='submit'
                disabled={!formState.isValid || isLoading}
                enabledOnDemo={enabledOnDemo}
                loading={isLoading}
              >
                {formState.isSubmitting ? <LoaderIcon /> : null}
                Login
              </Button>
            )}
          </div>
        </form>
      </Form>
      <FormErrorContainer></FormErrorContainer>
    </div>
  );
}
