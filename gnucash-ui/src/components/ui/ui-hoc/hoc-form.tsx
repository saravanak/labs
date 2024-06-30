import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import { Form } from "../form";
import HocInput from "./hoc-input";
import { Button } from "../button";
import { ReactNode } from "react";



export default function HocForm({
  formSchema,
  onSubmit,
  formMeta,
  defaultValues,
}: any) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const additionalContext = {
    ...form,
    formMeta,
  };
  const propertyPaths = getPropertyPaths(formSchema);
  return (
    <Form {...additionalContext}>
      <form
        onSubmit={form.handleSubmit((d) => {
          console.log("Handle submit");

          onSubmit(d);
        })}
        className="space-y-8"
      >
        {propertyPaths.map((property) => {
          return (
            <HocInput key={property} name={property} formMeta={formMeta} />
          );
        })}
        <Button type="submit">{formMeta?.submit?.label || "Submit"}</Button>
      </form>
    </Form>
  );
}

