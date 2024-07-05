"use client";

import HocForm from "@/components/ui/ui-hoc/hoc-form";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export default function AddMemberToSpace({ params }: any) {
  const formSchema = z
    .object({
      email: z.string().email().trim().toLowerCase(),
    })
    .required();

  const router = useRouter();
  const pathname = usePathname();

  const formMeta: Record<string, any> = {
    email: {
      label: "Email of the member to invite",
      type: "text",
    },
  };

  const mutation = trpc.todoUser.addUserToSpace.useMutation({
    onSuccess: (d, { inviteeEmail }) => {
      toast(`Invited ${inviteeEmail} to your space`);
      const previousPath = pathname.split("/").slice(0, -1).join("/");
      console.log(previousPath);
      
      router.push(`${previousPath}`);
      router.refresh();
    },
  });

  async function onSubmit({ email }: any) {
    mutation.mutate({
      spaceId: parseInt(params.space),
      inviteeEmail: email,
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

