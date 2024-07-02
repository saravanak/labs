import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../../ui/ui-hoc/hoc-form";

export default function SpaceCreateForm() {
  const formSchema = z
    .object({
      spaceName: z
        .string()
        .min(3, { message: "Too short" })
        .max(20, { message: "Too long" })
        .regex(/^[\u0000-\u0019\u0021-\uFFFF\s0-9\-']+$/, {
          message: "Not all special characters are allowed!",
        })
        .trim()
        .toLowerCase()
    })
    .required();

  const formMeta: Record<string, any> = {
    spaceName: {
      label: "Space name",
      type: "text",
    },
  };

  const mutation = trpc.todoUser.createSpace.useMutation();

  async function onSubmit({ spaceName }: any) {
    mutation.mutate({
      spaceName,
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

