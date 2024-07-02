import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TabBarContext } from "@/components/todo/app-wrapper";
import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import { useCallback, useContext, useEffect } from "react";
import { Form } from "../form";
import HocInput from "./hoc-input";

export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
  mutation,
  title
}: any) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues,
  });

  const { formState } = form;

  const { setForm } = useContext(TabBarContext);

  const formSubmitHandler = useCallback(
    form.handleSubmit(async (d) => {
      console.log("Handle submit");

      return await onSubmit(d);
    }),
    [form]
  );

  useEffect(() => {
    console.log("Setting form on context", formState.isSubmitting);
    setForm({
      hookForm: form,
      formState: form.formState,
      mutation,
      status: mutation.isLoading ? "Saving changes..." : "",
      title, 
      onSubmit: formSubmitHandler,
      onCancel: () => {},
    });
    
  }, [
    form,
    formState.submitCount,
    formState.isValid,
    formState.isSubmitted,
    formState.isSubmitting,
    mutation,
    title
  ]);

  const additionalContext = {
    ...form,
    formMeta,
  };
  const propertyPaths = getPropertyPaths(formSchema);

  return (
    <Form {...additionalContext} >
      <form 
        onSubmit={form.handleSubmit((d) => {
          console.log("Handle submit");

          onSubmit(d);
        })}
        className="space-y-8 container mx-auto"
      >
        <fieldset disabled={mutation.isLoading}>
          {propertyPaths.map((property) => {
            return (
              <HocInput key={property} name={property} formMeta={formMeta} />
            );
          })}
        </fieldset>
      </form>
    </Form>
  );
}

