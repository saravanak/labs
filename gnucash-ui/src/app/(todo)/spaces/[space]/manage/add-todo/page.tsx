"use client";

import HocForm from "@/components/ui/ui-hoc/hoc-form";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export default function AddMemberToSpace({ params }: any) {
  const formSchema = z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required();

  const router = useRouter();
  const pathname = usePathname();

  const formMeta: Record<string, any> = {
    title: {
      label: "Todo title",
      type: "text",
    },
    description: {
      label: "Describe what needs to be done",
      type: "text",
    },
  };

  const mutation = trpc.todo.createTodo.useMutation({
    onSuccess: (d, { todoCreateArgs: { title } }) => {
      toast(`Created todo with title ${title}`);
      const previousPath = pathname.split("/").slice(0, -1).join("/");
      router.push(`${previousPath}`);
      router.refresh();
    },
  });

  async function onSubmit(todoCreateArgs: any) {
    mutation.mutate({
      spaceId: parseInt(params.space),
      todoCreateArgs,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      title="Create Space"
      onSubmit={onSubmit}
      formMeta={formMeta}
      defaultValues={{ spaceName: "" }}
      mutation={mutation}
    />
  );
}

