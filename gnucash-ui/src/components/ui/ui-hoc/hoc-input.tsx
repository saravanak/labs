import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { TextArea } from "../text-area";
import HocSelect from "./hoc-select";

const inputByType = function ({ formMeta, field }: any) {
  const fieldMeta = formMeta[field.name];

  switch (fieldMeta.type) {
    case "text":
    case "email":
    case "number":
      return <Input type={fieldMeta.type} {...field} />;
    case "textarea":
      return <TextArea type={fieldMeta.type} {...field} />;      
    case "select":
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
            {formMeta[name].label ? (
              <FormLabel className="text-lg font-bold">{formMeta[name].label}</FormLabel>
            ) : null}
            <FormControl>{inputByType({ formMeta, field })}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
}

