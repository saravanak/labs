import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

export default function PageCardItem({ linksMeta }: any) {
  const computedClass = (routeName: string) =>
    classNames({
      "hover:text-gray-1000 relative flex w-full cursor-pointer items-center justify-between text-left text-sm text-gray-900":
        true,
    });

  return (
    <>
      {linksMeta.map(({ urlSlug, label, image, shortDescription }: any) => {
        if (!image) {
          image = "/game-shots/wip.jpg";
        }
        return (
          <div
            key={urlSlug}
            className="col-start-2 lg:col-start-auto flex w-5/6"
          >
            <Link className={computedClass(urlSlug)} href={urlSlug}>
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
    </>
  );
}
