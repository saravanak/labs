'use client';
import classNames from "classnames";
import { ExternalLink } from "react-feather";
import { usePathname } from "next/navigation";

export default function ({
  links,
  isSimpleLinks,
  additionalStyles,
  markActive,
}: any) {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label, isExternal }: any, index: any) => {
        let anchorClasses: any = {};
        const computedClass = {
          "bg-sky-600": pathname == href ? true : null,
        };
        if (additionalStyles) {
          anchorClasses[additionalStyles] = true;
        }
        if (isSimpleLinks) {
          anchorClasses[
            "text-blue-500 active:text-blue-600 visited:text-purple-600 leading-6"
          ] = true;
        }
        if (markActive) {
          anchorClasses = { ...anchorClasses, ...computedClass };
        }
        return (
          <a
            key={href+index}
            target={isExternal ? "_blank" : "_self"}
            className={classNames(anchorClasses)}
            href={href}
          >
            {label}
            {isExternal ? (
              <ExternalLink size={18} className="relative -top-1 inline ml-1" />
            ) : null}
            {isSimpleLinks && index < links.length - 1 ? ", " : null}
          </a>
        );
      })}
    </>
  );
}

