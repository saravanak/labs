"use client";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "@/components/ui/ui-hoc/hoc-form";
import { toast } from "sonner";
import { navigateToParentRoute } from "@/utils/router/parent-go-back";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import ListItem from "@/components/ui/lists/list-item";
import PropertyListItem from "@/components/ui/lists/property-list-item";
import LoaderListItem from "@/components/ui/lists/loader-list";

export default function CreateCommentForTodoForm({ params }: any) {
  const router = useRouter();
  const pathname = usePathname();

  const todoId = parseInt(params.task);

  const [todo] = trpc.useQueries((t) => [t.todo.getTodo({ todoId: todoId })]);

  const formSchema = z.object({
    commentString: z.string(),
  });

  const formMeta: Record<string, any> = {
    commentString: {
      label: "Enter comment",
      type: "text",
    },
  };

  const mutation = trpc.todo.addComment.useMutation({
    onSuccess: () => {
      toast("Comment successfully added");
      navigateToParentRoute({ router, pathname });
    },
  });

  function onSubmit(formState: any) {
    mutation.mutate({
      todoId,
      ...formState,
    });
  }

  if (todo.isLoading) {
    return <LoaderListItem/>
  }

  return (
    <>
      <ListItem variant="header">Add new comment</ListItem>
      <PropertyListItem property="title" value={todo?.data?.title} />

      <PropertyListItem
        property="description"
        value={todo?.data?.description}
      />
      <PropertyListItem
        property="status"
        value={todo?.data?.StatusTransitions[0].status}
        asTag={true}
        tagColor="bg-green-600 text-gray-200 font-bold"
      />
      <HocForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        mutation={mutation}
        formMeta={formMeta}
        title="Add comment"
        defaultValues={{ commentString: "" }}
      />
    </>
  );
}

