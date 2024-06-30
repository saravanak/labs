import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import {
    Form
} from "../form";
import HocInput from "./hoc-input";

export default function HocForm({ formSchema, onSubmit, formMeta }: any) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
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
          onSubmit(d);
        })}
        className="space-y-8"
      >
        {propertyPaths.map((property) => {
          return (
            <HocInput key={property} name={property} formMeta={formMeta} />
          );
        })}
      </form>
    </Form>
  );
}

