import { Case } from "change-case-all";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { TextArea } from "../text-area";
import { AutoComplete, SearchItem } from "./autocomplete";
import HocSelect from "./hoc-select";
import TextareaAutosize from "react-textarea-autosize";

const inputByType = function ({ formMeta, field, trigger }: any) {
  const fieldMeta = formMeta[field.name];

  const matches = (fieldMeta?.matches || []).map((v: any) => ({
    value: `${v.id}`,
    label: v.name,
  }));
  const dataTestInput=`${Case.kebab(fieldMeta.label)}`;

  switch (fieldMeta.type) {
    case "text":
    case "email":
    case "number":
      return (
        <Input
          type={fieldMeta.type}
          data-test-input={dataTestInput}
          onChange={(v) => {
            field.onChange(v.target.value);
            if (trigger) {
              trigger(field.name);
            }
          }}
        />
      );

    case "textarea":
      return <TextareaAutosize data-test-input={dataTestInput} className="w-full p-4" type={fieldMeta.type} {...field} />;
    case "autocomplete":
      return (
        <AutoComplete
          options={matches as SearchItem[]}
          data-test-input={dataTestInput}
          placeholder={fieldMeta.searchPlaceholder}
          noMatches={"No matches"}
          value={field.value}
          onChange={() => {}}
          onSearchChange={(v) => {
            field.onChange(v);
            trigger(field.name);
          }}
          keyComparer="label"
        />
      );

    case "select":
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
            <div className="p-2">
              {formMeta[name].label ? (
                <FormLabel className=" font-bold pb-2">
                  {formMeta[name].label}
                </FormLabel>
              ) : null}
              <FormControl className="align-right text-sm text-gray-400 mt-2">
                {inputByType({ formMeta, field, trigger })}
              </FormControl>
            </div>
            {formMeta[name]?.matches
              ? formMeta[name]?.matches.map((v: any) => (
                  <div key={v.id}>{v.name}</div>
                ))
              : null}
            <FormMessage />
          </FormItem>
        );
      }}
    ></FormField>
  );
}

