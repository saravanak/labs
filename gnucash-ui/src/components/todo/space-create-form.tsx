import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../ui/ui-hoc/hoc-form";

export default function SpaceCreateForm() {
  const formSchema = z.object({
    spaceName: z.string(),
  });

  const formMeta: Record<string, any> = {
    spaceName: {
      label: "Space name",
      type: "text",
    },
  };

  const mutation = trpc.todoUser.createSpace.useMutation({});

  function onSubmit({ spaceName }: any) {
    mutation.mutate({
      spaceName,
    });
  }

  return (
    <HocForm formSchema={formSchema} onSubmit={onSubmit} formMeta={formMeta} />
  );
}

