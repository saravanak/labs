import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HocSelect({ options, selectLabelInline, placeholder, ...props }: any) {
  return (
    <Select  {...props}>
      <SelectTrigger className="w-[200px]">
        {selectLabelInline ? (
          <span className="text-gray-400">{selectLabelInline}</span>
        ) : null}
        <SelectValue placeholder={placeholder || "Select..."} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any, index:any) => {
          return (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
