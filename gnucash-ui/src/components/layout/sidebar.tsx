"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LinksListing from "../ui/links-listing";


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
      href: "/",
      label: "Home",
      markActive: false,
    },
    {
      href: "/projects",
      label: "Projects",
    },
    {
      href: "/games",
      label: "Games",
    },
  ];
  const router = useRouter();
  return (
    <div
      className={`inverted-color col-span-2 pl-8 md:pl-4 md:col-span-1 md:block md:left-0 h-[calc(100vh-4rem)] ${
        sidebarShown ? "block" : "hidden"
      }`}
    >
      <LinksListing
        links={links}
        additionalStyles="flex w-full justify-stretch pl-2 py-4 md:py-2 hover:inverted-color-hover"
        markActive={true}
        onClick={() => (burgerClicked ? hideSideBar() : null)}
      />

      {session?.user?.name ? (
        <button
          onClick={() => {
            signOut();
          }}
          title="Signout"
          className="flex w-full justify-stretch pl-2 py-4 md:py-2 hover:inverted-color-hover text-yellow-600 font-bold"
        >
          Signout {session?.user?.name}
        </button>
      ) : (
        <Link
          href="/register"
          title="Signin"
          className="flex w-full justify-stretch pl-2 py-4 md:py-2 hover:inverted-color-hover text-yellow-600 font-bold"
        >
          Login
        </Link>
      )}
    </div>
  );
}

