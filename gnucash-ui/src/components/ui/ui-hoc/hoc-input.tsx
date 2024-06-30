import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";

export default function HocInput({ name, formMeta }: any) {
  return (
    <FormField
      name={name}
      render={({ field }: any) => {
        return (
          <FormItem>
            <FormLabel>{formMeta[field.name].label}</FormLabel>
            <FormControl>
              <Input type={formMeta[field.name].type} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
}

