import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import HocSelect from '../ui/ui-hoc/hoc-select';
import { FlexJustifySpread } from '../ui/ui-hoc/flex-justify-spread';
import { Button } from '../ui/button';
import { Trash2, X } from 'react-feather';
import HocFormSlider from '../ui/ui-hoc/hoc-form-slider';

export default function FootprintVehicleData({ form, dataKey }: any) {
  const { register } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: form.control,
      name: dataKey,
    }
  );

  const { formMeta } = useFormContext() as any;

  return (
    <>
      <FormField
        name={`vehicles`}
        render={({ field, fieldState }) => {

          return (
            <FlexJustifySpread>
              <FormLabel>{formMeta[field.name].label}</FormLabel>
              <Button
                onClick={() =>
                  append({
                    fuelType: 'gasoline',
                    milesPerGallon: 3,
                    milesPerYear: 5,
                  })
                }
              >
                {formMeta[field.name].addLabel}
              </Button>
            </FlexJustifySpread>
          );
        }}
      ></FormField>
      <ul>
        {fields.map((item, index: number) => (
          <FormField
            name={`vehicles.${index}`}
            key={index}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehicle #{index + 1}</FormLabel>
                <FormControl>
                  <div className='flex'>
                    <HocSelect
                      className='grow'
                      placeholder='Vehicle type'
                      value={field.value.fuelType}
                      onValueChange={(v: any) => field.onChange(v)}
                      options={[
                        { value: 'diesel', label: 'Diesel' },
                        { value: 'gasoline', label: 'Gasoline' },
                        { value: 'electric', label: 'Electric' },
                      ]}
                    ></HocSelect>

                    <input {...register(`vehicles.${index}.milesPerGallon`)} />
                    <Button onClick={() => remove(index)}>
                      <X />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        ))}
      </ul>
    </>
  );
}
