import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../ui/ui-hoc/hoc-form";

export default function TodoEditForm({ spaceId }: any) {
  const formSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const formMeta: Record<string, any> = {
    title: {
      label: "Title",
      type: "text",
    },
    description: {
      label: "Description",
      type: "text",
    },
    submit: {
      label: "Create Todo",
    },
  };

  const defaultValues = {
    title: "",
    desciption: "",
  };

  const mutation = trpc.todo.createTodo.useMutation({});

  function onSubmit(formState: any) {
    mutation.mutate({
      spaceId,
      todoCreateArgs: formState,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      mutation={mutation}
      formMeta={formMeta}
      defaultValues={defaultValues}
    />
  );
}

