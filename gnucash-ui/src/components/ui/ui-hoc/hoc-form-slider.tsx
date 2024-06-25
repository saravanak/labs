import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "../slider";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { FlexJustifySpread } from "./flex-justify-spread";
import HocLabel from "./hoc-label";

export default function HocFormSlider({ min, max, step, name}: any) {
  const range = Math.floor((max - min)/step) + 1;
  const { formMeta } = useFormContext() as any;
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <>
          <FormItem>
            <HocLabel field={field}/>
            <FormControl>
              <Slider
                value={[field.value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(newValue) => field.onChange(newValue[0])}
              />
            </FormControl>
          </FormItem>
          <div className="mt-1.5 flex flex-row justify-between">
            {Array.from({ length: range }).map((_, i) => (
              <span
                key={`${i}`}
                className={clsx("text-sm font-light", {
                  "text-10 opacity-40": i > 0 && i < range,
                })}
                role="presentation"
              >
                {i === 0 || i === range - 1 ? i : "|"}
              </span>
            ))}
          </div>
        </>
      )}
    ></FormField>
  );
}
