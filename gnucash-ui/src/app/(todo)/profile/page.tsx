'use client';
import { Button } from '@/components/ui/button';
import ListItem from '@/components/ui/lists/list-item';
import LoaderListItem from '@/components/ui/lists/loader-list';
import PropertyListItem from '@/components/ui/lists/property-list-item';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
  const { data, status } = useSession();

  if (status == 'loading') {
    return <LoaderListItem />;
  }
  return (
    <>
      <ListItem variant='header'>User Profile</ListItem>
      <ListItem variant='heading2' data-test-data='user-profile-name'>
        {data?.user.email}
        {data?.user && (data?.user as any).isDemoUser ? 'Demo' : ''}
      </ListItem>
      <PropertyListItem
        property='Signout'
        valueRenderer={() => {
          return (
            <Button
              variant='outline'
              onClick={() => signOut()}
              data-test-action='logout-user'
            >
              Signout
            </Button>
          );
        }}
      ></PropertyListItem>
    </>
  );
}
