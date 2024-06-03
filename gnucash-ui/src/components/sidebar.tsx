"use client";
import Link from "next/link";
import { ChevronDown } from "react-feather";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function Sidebar() {
  const pathname = usePathname();
  const computedClass = (routeName:string) => classNames({
"hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between         rounded-md py-1 pl-2 text-left text-sm text-gray-900" : true, 
"font-bold" : pathname == `/${routeName}` ? "font-bold" : ""
  })
  return (
    <li className="self-start sticky top-16 w-[248px] list-none mt-16">
      <Link
        className={computedClass("gnucash")}
        href="/gnucash"
      >
        Gnucash
        <ChevronDown />
      </Link>
      <Link
        className={computedClass("projects")}
        href="/projects"
      >
        Projects
        <ChevronDown />
      </Link>
      <Link
        className={computedClass("games")}
        href="/games"
      >
        Games
        <ChevronDown />
      </Link>
    </li>
  );
}

