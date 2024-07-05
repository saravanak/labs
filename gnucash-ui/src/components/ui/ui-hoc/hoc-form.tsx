import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TabBarContext } from "@/components/todo/app-wrapper";
import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import { useCallback, useContext, useEffect } from "react";
import { Form } from "../form";
import FormErrorContainer from "./form-error-container";
import HocInput from "./hoc-input";
import { clone } from "lodash";

export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
  mutation,
  title,
}: any) {
 
  const propertyPaths = getPropertyPaths(formSchema);

  console.log({defaultValues});
  

  const form = useForm({
    resolver: zodResolver({...formSchema, mode: "sync"}),
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
    }
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
  
  
  return (
    <div className="grid  grid-cols-1 ">
      <Form {...additionalContext}>
        <form
          onSubmit={form.handleSubmit((d) => {
            console.log("Handle submit");

            onSubmit(d);
          })}
          className=""
        >
          <fieldset disabled={mutation?.isLoading}>
            {propertyPaths.map((property) => {
              return (
                <HocInput key={property} name={property} formMeta={formMeta} trigger={form.trigger} />
              );
            })}
          </fieldset>
        </form>
      </Form>
      <FormErrorContainer></FormErrorContainer>
    </div>
  );
}

