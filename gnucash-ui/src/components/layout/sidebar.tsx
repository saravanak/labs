"use client";
import LinksListing from "../ui/links-listing";

export default function Sidebar({sidebarShown, hideSideBar, burgerClicked}:any) {

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
      href: "/",
      label: "Home",
      markActive: false
    },
    {
      href: "/projects",
      label: "Projects"
    },
    {
      href: "/games",
      label: "Games"
    },
 
  ]

  
  return (
    <div className={`inverted-color col-span-2 pl-8 md:pl-4 md:col-span-1 md:block md:left-0 h-[calc(100vh-4rem)] ${sidebarShown ? "block" : "hidden"}`}>
      <LinksListing 
        links={links} 
        additionalStyles="flex w-full justify-stretch pl-2 py-4 md:py-2 hover:inverted-color-hover"
        markActive={true}
        onClick={() => burgerClicked ? hideSideBar(): null}
        />
      </div>
  );
}

