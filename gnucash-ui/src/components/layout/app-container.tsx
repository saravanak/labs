'use client';

import Sidebar from './sidebar';
import AppContent from './app-content';
import NavBar from './nav-bar';
import { useToggle } from '@uidotdev/usehooks';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';

export default function AppContainer({ children }: any) {
  const [sidebarShown, setSidebarShown] = useToggle(false);
  const [burgerClicked, setBurgerClicked] = useState(false);
  return (
    <SessionProvider>
      <div className='grid grid-cols-[200px_1fr] grid-rows-[8rem_auto] h-screen md:grid-rows-[4rem_auto]'>
        <NavBar
          setSidebarShown={setSidebarShown}
          setBurgerClicked={setBurgerClicked}
        ></NavBar>
        <Sidebar
          sidebarShown={sidebarShown}
          hideSideBar={setSidebarShown}
          burgerClicked={burgerClicked}
        ></Sidebar>
        {sidebarShown ? null : <AppContent>{children}</AppContent>}
      </div>
    </SessionProvider>
  );
}
