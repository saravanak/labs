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

  const gamesMeta = [
    {
      urlSlug: "15-puzzle",
      label: "15 Puzzle",
      shortDescription: "Slide to the empty space to order the numbers",
      image: "/game-shots/15-puzzle.png",
    },
    {
      urlSlug: "crisp-games?number-jump",
      label: "Number Jump",
      shortDescription:
        "Jump over positive and negative numbers to move up the number ladder",
        image: "/game-shots/number-jump.gif",
    },
    {
      urlSlug: "art-gen",
      label: "Generate art mathematically",
      shortDescription: "Generate art using mathematical equations",
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
        {gamesMeta.map(({ urlSlug, label, image, shortDescription }) => {
          return (
            <Link key={urlSlug} className={computedClass(urlSlug)} href={`/games/${urlSlug}`}>
              <div className="flex flex-col justify-center items-center border rounded-md p-2 box-content hover:bg-gray-200">
                <div className="font-bold text-lg border-b-2 w-full text-center  p-2">{label}</div>
                {image ? <img className="font-bold text-lg border-b-2 w-full text-center p-2 w-64" src={image} /> : null}
                <p className="p-2">{shortDescription}</p>
              </div>
            </Link>
          );
        })}
        </div>
  );
}

