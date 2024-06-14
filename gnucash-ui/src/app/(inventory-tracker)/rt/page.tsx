"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message"
import queryClient from '@/utils/query-client';
import { getQueryKey } from '@trpc/react-query';

import { RackModel } from "@/lib/prisma/zod";
import ListRacks from "@/components/rt/list-racks";

export default function RTPageComponent() {
  const [searchFor, setSearchFor] = useState("");

  const [count, racks] = trpc.useQueries((t) => [
    t.rack.count({ s: searchFor }),
    t.rack.list(),
  ]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RackModel.omit({id: true})),
  });

  const queryKey = getQueryKey(trpc.rack.list, undefined, 'query')
  console.log({queryKey});
  
  const {mutate: rackFormSubmission} =     trpc.rack.create.useMutation({
    onSuccess: async () => {
      console.log("Running invalidatons");
      
      await queryClient.invalidateQueries({
        queryKey
      });
    },
  })

  const onSubmit = (data:any) => {
    rackFormSubmission(data);
  };

  

  function handleChange(e) {
    setSearchFor(e.target.value);
  }

  console.log(errors);
  

  return (
    <>
      <h1>
        {count?.data?.count}

        <input
          type="text"
          value={searchFor}
          onChange={(e) => handleChange(e)}
        />
        <ListRacks racks={racks} />
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} />
          <ErrorMessage errors={errors} name="name" />


          <input {...register("type")} />
          <ErrorMessage errors={errors} name="type" />

          <input {...register("comment")} />
          <ErrorMessage errors={errors} name="comment" />

          <input {...register("shortName")} />
          <ErrorMessage errors={errors} name="shortName" />

          <input type="submit" />
        </form>
      </div>
    </>
  );
}

