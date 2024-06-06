"use client";

import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GamesPage() {
  const pathname = usePathname();
  const computedClass = (routeName: string) =>
    classNames({
      "hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between text-left text-sm text-gray-900":
        true,
      "font-bold": pathname == `/${routeName}` ? "font-bold" : "",
    });

  const gamesMeta = [
    {
      urlSlug: "crisp-games?number-jump",
      label: "Number Jump",
      shortDescription:
        "Jump over positive and negative numbers to move up the number ladder",
      image: "/game-shots/number-jump.gif",
    },
    {
      urlSlug: "15-puzzle",
      label: "15 Puzzle",
      shortDescription: "Slide to the empty space to order the numbers",
      image: "/game-shots/15-puzzle.png",
    },    
    {
      urlSlug: "multiply",
      label: "Math art",
      image: "/game-shots/multiply.png",
      shortDescription: "Display detailed multiplication steps",
    },
    {
      urlSlug: "seven-segment",
      label: "LCD - gud'ol days",
      image: "/game-shots/hello-react.png",
      shortDescription: "Display LCDs using Grid system!",
    },
  ];
  
  return (
    <div className="grid grid-cols-[4rem_1fr_4rem] lg:grid-cols-[repeat(3,1fr)] gap-4 grid-rows-auto place-content-center justify-items-center auto-cols-fr">
      {gamesMeta.map(({ urlSlug, label, image, shortDescription }) => {
        if(!image) {
          image = "/game-shots/wip.jpg"
        }
        return (
          <div key={urlSlug} className="col-start-2 lg:col-start-auto flex w-5/6">
            <Link className={computedClass(urlSlug)} href={`/games/${urlSlug}`}>
              <div className="flex flex-col justify-center items-center border rounded-md box-content w-[300px]">
                <div className="font-bold text-lg border-b-2 w-full text-center py-4   inverted-color hover:inverted-color-hover">
                  {label}
                </div>
                <Image
                  alt=""
                  width={300}
                  height={300}
                  unoptimized={image.endsWith("gif")}
                  className="font-bold text-lg border-b-2 w-[300px] h-[300px] text-center object-contain "
                  src={image}
                />
                <p className="p-2 min-h-20 w-5/6 inline">{shortDescription}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

