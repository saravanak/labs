"use client";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { AutoComplete, SearchItem } from "../ui/ui-hoc/autocomplete";

export default function CarbonFootprintCalculator() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        country: z.string(),
      })
    ),
    defaultValues: {
      country: "",
    },
  });

  const companyLookupData = trpc.country.list.useQuery(undefined, {
    select: (d) => {
      return d.map(({ name, id }) => {
        return {
          label: name,
          value: name,
        };
      });
    },
    staleTime: 10000,
  });

  console.log(form.getValues());

  return (
    <>
      {companyLookupData?.data ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => console.log(d))}
            className="space-y-8"
          >
            <FormField
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <AutoComplete
                      frameworks={companyLookupData?.data as SearchItem[]}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>
      ) : null}
    </>
  );
}

