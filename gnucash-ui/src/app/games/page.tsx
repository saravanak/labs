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
    <ul>
      <li className="self-start sticky top-16 w-[248px] list-none mt-16">
        <Link className={computedClass("gnucash")} href="/games/15-puzzle">
          15 Puzzle
        </Link>
        <Link className={computedClass("gnucash")} href="/games/crisp-games?number-jump">
          15 Puzzle
        </Link>
      </li>
    </ul>
  );
}

