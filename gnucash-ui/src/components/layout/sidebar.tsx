'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import LinksListing from '../ui/links-listing';

export default function Sidebar({
  sidebarShown,
  hideSideBar,
  burgerClicked,
}: any) {
  const { data: session, status } = useSession();

  const links = [
    // {
    //   href: "/gnucash",
    //   label: "Gnucash"
    // },
    // {
    //   href: "/d3",
    //   label: "D3 showcase"
    // }
    {
      href: '/',
      label: 'Home',
      markActive: false,
    },
    {
      href: '/projects',
      label: 'Projects',
    },
    {
      href: '/games',
      label: 'Games',
    },
    {
      href: '/todos',
      label: 'Tinja',
    },
  ];
  const router = useRouter();
  return (
    <div
      className={`col-span-2 border-r-2 border-r-gray-300  md:col-span-1 md:block  h-[calc(100vh-4rem)] ${
        sidebarShown ? 'block' : 'hidden'
      }`}
    >
      <LinksListing
        links={links}
        additionalStyles='flex w-full justify-stretch  pl-4 py-4 py-4 font-bold text-gray-600'
        markActive={true}
        onClick={() => (burgerClicked ? hideSideBar() : null)}
      />

      {session ? null : (
        <Button
          onClick={() => router.push('/login')}
          variant='ghost'
          title='Signin'
          data-test-action='login'
          className='flex w-full justify-stretch pl-2 py-4 md:py-2 font-bold'
        >
          Login
        </Button>
      )}
    </div>
  );
}
