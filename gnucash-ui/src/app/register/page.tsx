"use client";
import { UserModel } from "@/lib/prisma/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { ErrorMessage } from "@hookform/error-message";
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";
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
import { Button } from "@/components/ui/button";
import { z } from "zod";
import AwesomeDebouncePromise from 'awesome-debounce-promise';


export default function RegisterPage() {
  const utils = trpc.useUtils();
  
  const debouncedAsync = useCallback(AwesomeDebouncePromise(async (email) => {
      const result = await utils.user.findBy.fetch(
        { email },
        {
          staleTime: 1000 * 60, //1 minute
          queryKey: [email],
        }
      );
      console.log({ result });
      return result?.count == 0;
  }, 500), []);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(
      z.object({
        name: z.string(),
        email: z.string().min(2).refine(debouncedAsync, {
          message: "We already have an user by that name",
        }),
      })
    ),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const mutation = trpc.user.register.useMutation({});
  const redirectedAlready = useRef<any>(false);

  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (mutation.data?.user && !redirectedAlready.current) {
      (redirectedAlready as any).current = true;
      signIn("email", { email: mutation.data?.user.email });
    }
  }, [mutation.data?.user]);

  return (
    <>
      <h1>Register here!</h1>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid}>
              Register Me
            </Button>
          </form>
        </Form>

        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <ErrorMessage errors={errors} name="name" />

          <input {...register("email")} />
          <ErrorMessage errors={errors} name="email" />

          <input type="submit" />
        </form> */}
      </div>
    </>
  );
}

