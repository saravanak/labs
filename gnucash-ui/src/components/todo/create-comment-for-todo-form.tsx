import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../ui/ui-hoc/hoc-form";

export default function CreatCommentForTodoForm({ todoId }: any) {
  const formSchema = z.object({
    commentString: z.string(),
  });

  const formMeta: Record<string, any> = {
    commentString: {
      label: "Enter comment",
      type: "text",
    },
  };

  const mutation = trpc.todo.addComment.useMutation({});

  function onSubmit(formState: any) {
    mutation.mutate({
      todoId,
      ...formState,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      formMeta={formMeta}
      defaultValues={{ commentString: "" }}
    />
  );
}
