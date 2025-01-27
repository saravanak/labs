'use client';
import { Button } from '@/components/ui/button';
import ListItem from '@/components/ui/lists/list-item';
import CircledNumber from '@/components/ui/minions/circled-number';
import ListActionButtons from '@/components/ui/ui-hoc/list-action-buttons';
import { trpc } from '@/utils/trpc';
import { Unlink } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import TodoListing from '../todo-listing';

export default function ManageSpace({ spaceWithUsers }: any) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { id, name, isOwning } = spaceWithUsers || {};

  const removeUserMutation = trpc.space.removeUserFromSpace.useMutation({
    onSuccess: () => {
      setSelectedUser(null);
      router.refresh();
      toast(`Removed the user from ${name}`);
    },
  });

  return (
    <>
      <ListItem variant='header' data-test-data='heading'>
        Manage {name}
      </ListItem>
      {isOwning && (
        <ListItem variant='heading2'>
          <div className='flex'>
            <div className='mr-4'>Members</div>
            <CircledNumber value={spaceWithUsers?.spaceSharing.length} />{' '}
          </div>
          <Button
            variant={'outline'}
            onClick={() => router.push(`${pathname}/add-member`)}
            data-retour-step='add-member'
          >
            Add Member
          </Button>
        </ListItem>
      )}
      {isOwning &&
        spaceWithUsers?.spaceSharing.map(({ user }: any) => {
          return (
            <div
              key={user.id}
              className={
                selectedUser == user ? 'border-2 border-yellow-500' : ''
              }
            >
              <ListItem>
                <div className='flex'> {user.email}</div>
                <Button variant='outline' onClick={() => setSelectedUser(user)}>
                  <Unlink className='text-gray-700 mr-2 w-[18px]' /> Remove
                </Button>
              </ListItem>
              {selectedUser && selectedUser == user ? (
                <ListActionButtons
                  heading={
                    <span>
                      <span className='mr-2'>Do you really want to remove</span>
                      <span className='font-bold'>{user.email}</span> from{' '}
                      <span className='font-bold'>{name}</span>?
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
                      label: 'Yes',
                      variant: 'default',
                      mutation: removeUserMutation,
                    },
                    {
                      onClick: () => {
                        setSelectedUser(null);
                      },
                      variant: 'outline',
                      label: 'No',
                    },
                  ]}
                />
              ) : null}
            </div>
          );
        })}
      <ListItem variant='heading2'>
        Todos
        <Button
          variant={'outline'}
          onClick={() => router.push(`${pathname}/add-todo`)}
        >
          Add New Todo
        </Button>
      </ListItem>
      <TodoListing space={spaceWithUsers} statuses={[]} searchText={null} />
    </>
  );
}
