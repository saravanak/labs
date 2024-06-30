import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import HocSelect from "./hoc-select";

const inputByType = function ({ formMeta, field }: any) {
  const fieldMeta = formMeta[field.name];

  switch (fieldMeta.type) {
    case "text":
    case "email":
    case "number":
      return <Input type={fieldMeta.type} {...field} />;
    case "select":
      console.log({ fieldMeta });
      return (
        <HocSelect
          selectLabelInline={null}
          options={fieldMeta.statusOptions || []}
          value={field.value}
          onValueChange={(v: any) => field.onChange(v)}
        ></HocSelect>
      );
  }

  return <></>;
};

export default function HocInput({ name, formMeta }: any) {
  return (
    <FormField
      name={name}
      render={({ field }: any) => {
        return (
          <FormItem>
            <FormLabel>{formMeta[name].label}</FormLabel>
            <FormControl>{inputByType({ formMeta, field })}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
}

