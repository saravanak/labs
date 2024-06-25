import { useFormContext } from "react-hook-form";
import { FlexJustifySpread } from "./flex-justify-spread";
import { FormLabel } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { HelpCircle } from "react-feather";

export default function HocLabel({ field }: any) {
  const { formMeta } = useFormContext() as any;
  return (
    <FlexJustifySpread>
      <FormLabel>{formMeta[field.name].label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"><HelpCircle/></Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
        {formMeta[field.name].helpText}
        </PopoverContent>
      </Popover>
    </FlexJustifySpread>
  );
}

