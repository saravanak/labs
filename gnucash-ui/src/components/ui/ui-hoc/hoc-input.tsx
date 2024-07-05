import { debounce } from "lodash";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { Input } from "../input";
import { TextArea } from "../text-area";
import HocSelect from "./hoc-select";
import { AutoComplete, SearchItem } from "./autocomplete";
import ListItem from "../lists/list-item";
import TwoLineListItem from "../lists/two-line-list-item";

const inputByType = function ({ formMeta, field, trigger }: any) {
  const fieldMeta = formMeta[field.name];

  const matches = (fieldMeta?.matches || []).map((v: any) => ({
    value: `${v.id}`,
    label: v.name,
  }));

  switch (fieldMeta.type) {
    case "text":
    case "email":
    case "number":
      return (
        <Input
          type={fieldMeta.type}
          onChange={(v) => {
            field.onChange(v.target.value);
            trigger(field.name);
          }}
        />
      );

    case "textarea":
      return <TextArea type={fieldMeta.type} {...field} />;
    case "autocomplete":
      return (
        <AutoComplete
          options={matches as SearchItem[]}
          placeholder={fieldMeta.searchPlaceholder}
          noMatches={"No matches"}
          // {...field}
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
          onValueChange={(v: any) => field.onChange(v)}
        ></HocSelect>
      );
  }

  return <></>;
};


export default function HocInput({ name, formMeta, trigger }: any) {
  return (
    <FormField
      name={name}
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

