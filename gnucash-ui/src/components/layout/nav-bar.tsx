'use client';
import { Menu } from 'react-feather';
import LinksListing from '../ui/links-listing';
import { useSession } from 'next-auth/react';

export default function NavbarComponent({
  setSidebarShown,
  setBurgerClicked,
}: any) {
  const links = [
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/resume`,
      label: 'Resume',
      isExternal: true,
    },
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/resume?#section-portfolio`,
      label: 'Portfolio',
      isExternal: true,
    },
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/blog`,
      label: 'Blog',
      isExternal: true,
    },
  ];
  const homeLink = {
    href: '/',
    label: 'Old Weaver',
  };

  return (
    <div className='col-span-2 inverted-color p-2 justify-between items-center grid grid-rows-[4rem] md:flex align-center sticky top-0 z-10 '>
      <div className='flex items-center'>
        <Menu
          className='m-4 md:hidden'
          onClick={() => {
            setBurgerClicked(true);
            setSidebarShown();
          }}
        />

        <LinksListing additionalStyles='p-4 font-bold' links={[homeLink]} />
        <span className='bg-yellow-200 text-italics text-sky-500 rounded-lg p-2'>
          {' '}
          <a href='mailto: vsk62.gate@gmail.com'>is open to work!</a>
        </span>
      </div>
      <div className=''>
        <LinksListing links={links} additionalStyles='p-4' />
      </div>
    </div>
  );
}

// 370 ; 9791378237
