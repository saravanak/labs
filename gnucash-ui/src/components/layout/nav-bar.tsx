'use client';
import { Menu } from "react-feather";
import LinksListing from "../ui/links-listing";


export default function ({setSidebarShown}:any) {
  const links = [
    {
      href: "",
      label: "Resume",
    },
    {
      href: "",
      label: "Portfolio",
    },
    {
      href: "",
      label: "Blog",
    },
  ];
  const homeLink ={
    href:"/",
    label: "Old Weaver",    
  }
  return (
    <div className="col-span-2 inverted-color p-2 justify-between items-center flex align-center sticky top-0 z-10">

        <div className="flex items-center">
        <Menu onClick={() => setSidebarShown()} className="md:hidden"/>
      
        <LinksListing additionalStyles="p-4 font-bold" links={[homeLink]}/>
        </div>
        <div className="">
            <LinksListing links={links} additionalStyles="p-4"/>
          
        </div>
      
    </div>
  );
}


// 370 ; 9791378237