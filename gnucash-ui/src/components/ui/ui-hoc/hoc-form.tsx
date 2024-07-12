import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TabBarContext } from "@/components/todo/app-wrapper";
import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import { useCallback, useContext, useEffect } from "react";
import { Form } from "../form";
import FormErrorContainer from "./form-error-container";
import HocInput from "./hoc-input";
import { useSession } from "next-auth/react";
import ListItem from "../lists/list-item";

export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
  mutation,
  title,
}: any) {
  const propertyPaths = getPropertyPaths(formSchema);

  const { data: userSession }: any = useSession();

  const isDemoUser = userSession && userSession.user.isDemoUser;

  const form = useForm({
    resolver: zodResolver({ ...formSchema, mode: "sync" }),
    mode: "onSubmit",
    defaultValues,
  });

  const { formState, setError } = form;

  const { setForm } = useContext(TabBarContext);

  const formSubmitHandler = useCallback(
    form.handleSubmit(async (d) => {
      console.log("Handle submit");

      return await onSubmit(d);
    }),
    [form]
  );

  const nameWatcher = form.watch("spaceName");

  useEffect(() => {
    if (mutation?.error) {
      console.log(mutation?.error);
      
      mutation.error.shape.cause.errors.forEach(({ key, error }: any) => {
        setError(key, error);
      });
    }
    setForm({
      hookForm: form,
      formState: form.formState,
      mutation,
      status: mutation?.isLoading ? "Saving changes..." : "",
      title,
      onSubmit: formSubmitHandler,
      onCancel: () => {},
    });
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
    <div className="grid  grid-cols-1 ">
      <ListItem variant="header">{title}</ListItem>
      <Form {...additionalContext}>
        <form
          onSubmit={form.handleSubmit((d) => {
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
        </form>
      </Form>
      <FormErrorContainer></FormErrorContainer>
    </div>
  );
}

