import useAsyncValidation from "@/components/ui/ui-hoc/debounced-matcher";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import HocForm from "../../ui/ui-hoc/hoc-form";
import { toast } from "sonner";
import { navigateToParentRoute } from "@/utils/router/parent-go-back";
import { usePathname, useRouter } from "next/navigation";

export default function SpaceCreateForm() {
  const router = useRouter();
  const pathname = usePathname();

  const [debouncedAsync, matches] = useAsyncValidation({
    validatorUrlFor: (spaceName: any) => {
      console.log("Generating fetch url");

      return `http://localhost:3000/api/trpc/space.findByName?input=${encodeURIComponent(
        JSON.stringify({ json: { spaceName } })
      )}`;
    },
  });

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
        .refine(debouncedAsync, {
          message: "We already have an user by that name",
        }),
    })
    .required();

  const formMeta: Record<string, any> = {
    spaceName: {
      label: "Space name",
      type: "text",
      matches,
    },
  };

  const mutation = trpc.space.createSpace.useMutation({
    onSuccess: (d, { spaceName }) => {
      toast(`Created the new space ${spaceName}`);
      navigateToParentRoute({ router, pathname });
    },
  });

  async function onSubmit({ spaceName }: any) {
    mutation.mutate({
      spaceName,
    });
  }

  return (
    <>
      <HocForm
        formSchema={formSchema}
        title="Create Space"
        onSubmit={onSubmit}
        formMeta={formMeta}
        defaultValues={{ spaceName: "" }}
        mutation={mutation}
      />
    </>
  );
}

