import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
export default function TwoNumberEditor({
  firstNumber,
  secondNumber,
  maps,
}: any) {
  const divideMeta = z.coerce.number().gt(0).lt(999999);

  const divisionSchema = z.object({
    firstNumber: divideMeta,
    secondNumber: divideMeta,
  });

  const form = useForm<z.infer<typeof divisionSchema>>({
    resolver: zodResolver(divisionSchema),
    mode: "onChange",
    defaultValues: {
      firstNumber,
      secondNumber,
    },
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          {Object.keys(maps).map((v: any, index: number) => (
            <FormField
              control={form.control}
              name={v}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{maps[v].label}</FormLabel>
                  <FormControl>
                    <Input
                      type={maps[v].type}
                      {...field}
                      onChange={(event) => {
                        const changedNumber = event.target.value;
                        const { data } = divideMeta.safeParse(changedNumber);
                        if (data) {
                          maps[v].onValueChange(data);
                        }
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </>
  );
}
