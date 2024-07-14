import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { TabBarContext } from '@/components/todo/app-wrapper';
import { getPropertyPaths } from '@/utils/zod/extract-keys-from-type';
import { useCallback, useContext, useEffect } from 'react';
import { Form } from '../form';
import FormErrorContainer from './form-error-container';
import HocInput from './hoc-input';
import { useSession } from 'next-auth/react';
import ListItem from '../lists/list-item';
import { Button } from '../button';

export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
  mutation,
  title,
  mode = 'global',
  action,
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
    [form]
  );

  useEffect(() => {
    if (mutation?.error) {

      mutation.error.shape.cause.errors.forEach(({ key, error }: any) => {
        setError(key, error);
      });
    }
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

  const isFormDisabled = isDemoUser || mutation?.isLoading;
  return (
    <div className='grid  grid-cols-1 '>
      <ListItem variant='heading2' className="justify-center text-sm">{title}</ListItem>
      <Form {...additionalContext}>
        <form
          onSubmit={
            action
              ? (null as any)
              : form.handleSubmit((d) => {
                  onSubmit(d);
                })
          }
          action={action}
          method={action ? 'POST' : (null as any)}
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
            {action && (
              <Button type='submit' disabled={!formState.isValid}>
                {' '}
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
