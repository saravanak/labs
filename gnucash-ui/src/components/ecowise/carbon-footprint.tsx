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
import { Slider } from "../ui/slider";
import clsx from "clsx";

export default function CarbonFootprintCalculator() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        country: z.string(),
        houseSize: z.number().min(2.5).max(6),
        householdIncome: z.number().min(10).max(100),
      })
    ),
    defaultValues: {
      country: "",
      houseSize: 2.5,
      hosueholdIncome: 10,
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
            <FormField
              name="houseSize"
              render={({ field }) => (
                <>
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      min={2}
                      max={6}
                      step={1}
                      onValueChange={(newValue) => field.onChange(newValue[0])}
                    />
                  </FormControl>
                </FormItem>
                <div className='mt-1.5 flex flex-row justify-between'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={`${name}-${i}`}
                    className={clsx('text-sm font-light', { 'text-10 opacity-40': i > 0 && i < 5 })}
                    role='presentation'
                  >
                    {i === 0 || i === 4 ? i : '|'}
                  </span>
                ))}
              </div>
              </>
              )}
            />
            <FormField
              name="hosueholdIncome"
              render={({ field }) => (
                <>
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      min={10}
                      max={120}
                      step={10}
                      onValueChange={(newValue) => field.onChange(newValue[0])}
                    />
                  </FormControl>
                </FormItem>
                <div className='mt-1.5 flex flex-row justify-between'>
                {Array.from({ length: 11 }).map((_, i) => (
                  <span
                    key={`${name}-${i}`}
                    className={clsx('text-sm font-light', { 'text-10 opacity-40': i > 0 && i < 11 })}
                    role='presentation'
                  >
                    {i === 0 || i === 10 ? i : '|'}
                  </span>
                ))}
              </div>
              </>
              )}
            />
          </form>
        </Form>
      ) : null}
    </>
  );
}

