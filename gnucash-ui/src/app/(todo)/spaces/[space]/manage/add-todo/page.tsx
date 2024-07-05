"use client";

import ListItem from "@/components/ui/lists/list-item";
import LoaderListItem from "@/components/ui/lists/loader-list";
import HocForm from "@/components/ui/ui-hoc/hoc-form";
import { trpc } from "@/utils/trpc";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

export default function AddMemberToSpace({ params }: any) {
  const formSchema = z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required();

  const { isLoading, data: spaceDetails } = trpc.space.getSpace.useQuery({
    spaceId: parseInt(params.space),
  });

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

  if (isLoading) {
    return <LoaderListItem />;
  }

  return (
    <>
      <ListItem variant="header">{spaceDetails?.name}</ListItem>

      <HocForm
        formSchema={formSchema}
        title="New Todo"
        onSubmit={onSubmit}
        formMeta={formMeta}
        defaultValues={{ spaceName: "" }}
        mutation={mutation}
      />
    </>
  );
}

