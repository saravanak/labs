"use client";
import SharedSpaceListing from "@/components/todo/spaces/shared-space-listing";
import SpaceListing from "@/components/todo/spaces/space-listing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CircledNumber from "@/components/ui/minions/circled-number";
import { FlexJustifySpread } from "@/components/ui/ui-hoc/flex-justify-spread";

export default function PagesIndexPage(props: any) {
  const { owningSpaces, sharedSpaces } = props;
  const triggerClassNames =
    "bg-blue-100 p-2 h-[4em] border-blue-200 border-b hover:no-underline";
  return (
    <>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className={triggerClassNames}>
            <FlexJustifySpread className="grow pr-4">
              <div>My spaces</div>
              <CircledNumber value={owningSpaces} />
            </FlexJustifySpread>
          </AccordionTrigger>
          <AccordionContent className="text-base pb-0">
            <SpaceListing />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={triggerClassNames}>
            <FlexJustifySpread className="grow pr-4">
              <div>Spaces shared with me</div>
              <CircledNumber value={sharedSpaces} />
            </FlexJustifySpread>
          </AccordionTrigger>
          <AccordionContent className="text-base pb-0">
            <SharedSpaceListing />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

