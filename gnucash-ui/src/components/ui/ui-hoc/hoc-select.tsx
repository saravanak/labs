import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HocSelect({
  options,
  selectLabelInline,
  placeholder,
  className,
  dataTestPrefix,
  ...props
}: any) {
  return (
    <Select {...props}>
      <SelectTrigger
        className='grow'
        data-test-action={`trigger-${dataTestPrefix}`}
      >
        {selectLabelInline ? (
          <span className='text-gray-400'>{selectLabelInline}</span>
        ) : null}
        <SelectValue placeholder={placeholder || 'Select...'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option: any, index: any) => {
          return (
            <SelectItem
              data-test-action={`select-item-${option.value}`}
              key={index}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
