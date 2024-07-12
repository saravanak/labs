import clsx from 'clsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Slider } from '../ui/slider';
import { AutoComplete, SearchItem } from '../ui/ui-hoc/autocomplete';
import HocFormSlider from '../ui/ui-hoc/hoc-form-slider';
import { useFormContext } from 'react-hook-form';

export default function FootprintGeneralQuestions({ countries }: any) {
  const { formMeta } = useFormContext() as any;

  return (
    <>
      <FormField
        name='country'
        render={({ field }: any) => {
          return (
            <FormItem>
              <FormLabel>{formMeta[field.name].label}</FormLabel>
              <FormControl>
                <AutoComplete
                  options={countries as SearchItem[]}
                  placeholder={formMeta[field.name].searchPlaceholder}
                  noMatches={formMeta[field.name].noMatches}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      ></FormField>

      <HocFormSlider min={2} max={6} step={1} name='houseSize' />
      <HocFormSlider min={10} max={120} step={10} name='householdIncome' />
    </>
  );
}
