import { Marked } from "marked";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const parser = new Marked({ async: false, gfm: true });

export function useMarkdown(mdText: any) {
  const formatted = useMemo(() => {
    return DOMPurify.sanitize(parser.parse(mdText) as string, {
      USE_PROFILES: { html: true },
    });
  }, [mdText]);

  return [formatted];
}

export default function Markdowned({ mdText, children, className }: any) {
  const [html] = useMarkdown(mdText);
  return (
    <Slot
      className={cn("markdowned", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    >
      {children}
    </Slot>
  );
}

