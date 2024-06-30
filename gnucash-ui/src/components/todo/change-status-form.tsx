import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../ui/ui-hoc/hoc-form";
import { Case } from "change-case-all";

export default function ChangeStatusForm({ todoId, todoStatus }: any) {
  const { data } = trpc.todo.getValidStatuses.useQuery({
    taskId: todoId,
  });

  const formSchema = z.object({
    newStatus: z.string(),
    comment: z.string(),
  });

  const formMeta: Record<string, any> = {
    newStatus: {
      label: "Choose status",
      type: "select",
      statusOptions: data?.map((v) => {
        return {
          value: v,
          label: Case.title(v),
        };
      }),
    },
    comment: {
        label: "Enter comment",
        type: "text",        
      },
  };

  const mutation = trpc.todo.changeStatus.useMutation({});

  function onSubmit(formState: any) {
    mutation.mutate({
      taskId: todoId,
      ...formState,
    });
  }

  return (
    <HocForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      formMeta={formMeta}
      defaultValues={{ newStatus: todoStatus, comment: "" }}
    />
  );
}

