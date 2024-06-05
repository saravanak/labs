
"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();
  const computedClass = (routeName: string) =>
    classNames({
      "hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between         rounded-md py-1 pl-2 text-left text-sm text-gray-900":
        true,
      "font-bold": pathname == `/${routeName}` ? "font-bold" : "",
    });
  return (
    <>
    <img src="/game-shots/wip.jpg " className="w-1/2 object-cover"/>
    <ul>
      <li className="self-start sticky top-16 w-[248px] list-none mt-16 ">
        <Link className={computedClass("html-extractor")} href="/projects/html-extractor">
          HTML Extractor
        </Link>
        <Link className={computedClass("perfect-free-hand")} href="/projects/perfect-free-hand">
          Free hand drawing
        </Link>
      </li>
    </ul>
    </>
  );
}

