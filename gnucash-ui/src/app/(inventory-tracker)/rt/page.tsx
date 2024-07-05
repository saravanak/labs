"use client";
import queryClient from "@/utils/query-client";
import { trpc } from "@/utils/trpc";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { getQueryKey } from "@trpc/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ListRacks from "@/components/rt/list-racks";
import { RackModel } from "@/lib/prisma/zod";

export default function RTPageComponent() {
  const [searchFor, setSearchFor] = useState("");

  const [count, racks] = trpc.useQueries((t) => [
    t.rack.count({ s: searchFor }),
    t.rack.listRacks(),
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RackModel.omit({ id: true })),
  });

  const queryKey = getQueryKey(trpc.rack.listRacks, undefined, "query");

  const { mutate: rackFormSubmission } = trpc.rack.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const onSubmit = (data: any) => {
    rackFormSubmission(data);
  };

  function handleChange(e: any) {
    setSearchFor(e.target.value);
  }

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

