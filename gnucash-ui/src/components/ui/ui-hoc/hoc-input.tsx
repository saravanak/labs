import { cn } from '@/lib/utils';
import { Case } from 'change-case-all';
import TextareaAutosize from 'react-textarea-autosize';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Input } from '../input';
import { AutoComplete, SearchItem } from './autocomplete';
import HocSelect from './hoc-select';
import ListItem from '../lists/list-item';

const inputByType = function ({ formMeta, field, trigger }: any) {
  const fieldMeta = formMeta[field.name];

  const matches = (fieldMeta?.matches || []).map((v: any) => ({
    value: `${v.id}`,
    label: v.name,
  }));
  const dataTestInput = fieldMeta.label && `${Case.kebab(fieldMeta.label)}`;
  const useMarkdown = fieldMeta.useMarkdown;

  switch (fieldMeta.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <Input
          type={fieldMeta.type}
          name={field.name}
          value={field.value}
          data-test-input={dataTestInput}
          onChange={(v) => {
            field.onChange(v.target.value);
            if (trigger) {
              trigger(field.name);
            }
          }}
        />
      );
    case 'hidden':
      return (
        <input name={field.name} type='hidden' defaultValue={field.value} />
      );
    case 'textarea':
      return (
        <TextareaAutosize
          data-test-input={dataTestInput}
          className={cn('w-full p-4', useMarkdown ? 'font-mono' : '')}
          type={fieldMeta.type}
          minRows={fieldMeta.rows || 4}
          {...field}
        />
      );
    case 'autocomplete':
      return (
        <AutoComplete
          options={matches as SearchItem[]}
          data-test-input={dataTestInput}
          placeholder={fieldMeta.searchPlaceholder}
          noMatches={'No matches'}
          value={field.value}
          onChange={() => {}}
          onSearchChange={(v) => {
            field.onChange(v);
            trigger(field.name);
          }}
          keyComparer='label'
        />
      );

    case 'select':
      return (
        <HocSelect
          selectLabelInline={null}
          options={fieldMeta.statusOptions || []}
          value={field.value}
          disabled={field.disabled}
          onValueChange={(v: any) => field.onChange(v)}
        ></HocSelect>
      );
  }

  return <></>;
};

export default function HocInput({ name, formMeta, trigger, disabled }: any) {
  return (
    <FormField
      name={name}
      disabled={disabled}
      render={({ field }: any) => {
        return (
          <FormItem>
            <div className='p-2'>
              {formMeta[name].label ? (
                <FormLabel className=' font-bold pb-2'>
                  {formMeta[name].label}
                </FormLabel>
              ) : null}
              <FormControl className='align-right text-sm mt-2'>
                {inputByType({ formMeta, field, trigger })}
              </FormControl>
              {formMeta[field.name].type == 'hidden' ? null : (
                <div className='text-sm font-light-bg p-2 font-sans text-gray-600'>
                  {formMeta[field.name].helpText}
                </div>
              )}
            </div>

            {formMeta[name]?.matches?.length
              ? <div className='text-sm'>
                <div className="px-4 font-bold" key="existing-spaces">We&apos;ve found some existing spaces by that name</div>
                {formMeta[name]?.matches.map((v: any) => (
                  <div className="px-4 py-2" key={v.id}>{v.name}</div>
                ))}
                </div>
              : null}
            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
}
