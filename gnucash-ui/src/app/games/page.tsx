"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const pathname = usePathname();
  const computedClass = (routeName: string) =>
    classNames({
      "hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between text-left text-sm text-gray-900":
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
  /*
   */
  return (
    <div className="grid grid-cols-[4rem_1fr_4rem] md:grid-cols-3 gap-4 grid-rows-auto place-content-center justify-items-center">
      {gamesMeta.map(({ urlSlug, label, image, shortDescription }) => {
        if(!image) {
          image = "/game-shots/wip.jpg"
        }
        return (
          <div key={urlSlug} className="col-start-2 md:col-start-auto flex w-5/6">
            <Link className={computedClass(urlSlug)} href={`/games/${urlSlug}`}>
              <div className="flex flex-col justify-center items-center border rounded-md box-content ">
                <div className="font-bold text-lg border-b-2 w-full text-center py-4   inverted-color hover:inverted-color-hover">
                  {label}
                </div>
                <img
                  className="font-bold text-lg border-b-2 w-[300px] h-[300px] text-center object-contain "
                  src={image}
                />
                <p className="p-2 min-h-20">{shortDescription}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

