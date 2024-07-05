"use client";
import { Button } from "@/components/ui/button";
import ListItem from "@/components/ui/lists/list-item";
import ListActionButtons from "@/components/ui/ui-hoc/list-action-buttons";
import { trpc } from "@/utils/trpc";
import { Unlink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import TodoListing from "../todo-listing";

export default function ManageSpace({ spaceWithUsers }: any) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  console.log({ spaceWithUsers });

  if (!spaceWithUsers) {
    return null; //Loading ..??
  }

  const { id, name } = spaceWithUsers;

  const removeUserMutation = trpc.space.removeUserFromSpace.useMutation({
    onSuccess: () => {
      setSelectedUser(null);
      router.refresh();
      toast(`Removed the user from ${name}`);
    },
  });
  return (
    <>
      <ListItem variant="header">{name}</ListItem>
      <ListItem variant="heading2">
        Members
        <Button
          variant={"outline"}
          onClick={() => router.push(`${pathname}/add-member`)}
        >
          {" "}
          Add Member{" "}
        </Button>
      </ListItem>
      {spaceWithUsers?.spaceSharing.map(({ user }: any) => {
        return (
          <Fragment key={user.id}>
            <ListItem>
              <div className="flex"> {user.email}</div>
              <Button variant="outline" onClick={() => setSelectedUser(user)}>
                <Unlink className="text-gray-700 mr-2 w-[18px]" /> Remove
              </Button>
            </ListItem>
            {selectedUser ? (
              <ListActionButtons
                heading={
                  <span>
                    Do you really want to remove{" "}
                    <span className="font-bold">{user.email}</span> from{" "}
                    <span className="font-bold">{name}</span>?
                  </span>
                }
                actions={[
                  {
                    onClick: () => {
                      removeUserMutation.mutate({
                        spaceId: parseInt(id),
                        memberIdRemove: user.id,
                      });
                    },
                    label: "Yes",
                    variant: "default",
                    mutation: removeUserMutation,
                  },
                  {
                    onClick: () => {
                      setSelectedUser(null);
                    },
                    variant: "outline",
                    label: "No",
                  },
                ]}
              />
            ) : null}
          </Fragment>
        );
      })}
      <ListItem variant="heading2">
        Todos
        <Button
          variant={"outline"}
          onClick={() => router.push(`${pathname}/add-todo`)}
        >
          {" "}
          Add New Todo{" "}
        </Button>
      </ListItem>
      <TodoListing space={spaceWithUsers} statuses={[]} />
    </>
  );
}
