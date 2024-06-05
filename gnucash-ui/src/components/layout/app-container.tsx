'use client';

import Sidebar from "./sidebar";
import AppContent from "./app-content";
import NavBar from "./nav-bar";
import { useToggle } from "@uidotdev/usehooks";

export default function ({children}:any){
    const [sidebarShown, setSidebarShown] = useToggle(false) ;
return <div className="grid grid-cols-[200px_1fr] grid-rows-[75px_auto] h-screen">
            <NavBar  setSidebarShown={setSidebarShown}></NavBar>
            <Sidebar sidebarShown={sidebarShown}></Sidebar>
            <AppContent>{children}</AppContent>
            
          </div>
}