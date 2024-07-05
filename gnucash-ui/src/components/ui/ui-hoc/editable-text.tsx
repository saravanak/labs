import { zodResolver } from "@hookform/resolvers/zod";
import { Case } from "change-case-all";
import { Edit, Save, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../button";
import { Form } from "../form";
import { FlexJustifySpread } from "./flex-justify-spread";
import HocInput from "./hoc-input";
import ListItem from "../lists/list-item";

export default function EditableText({
  model,
  type,
  mutationArgs,
  mutation,
  fieldName,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const iconSize = 15;

  const fieldEditorSchema = z.object({
    [fieldName]: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(fieldEditorSchema),
    defaultValues: model,
  });

  const onSubmit = useCallback(
    (formState: any) => {
      mutation.mutate({
        ...mutationArgs(),
        ...formState,
      });
    },
    [isEditing]
  );

  const label = Case.title(fieldName);
  const value = model[fieldName];
  const formMeta = {
    [fieldName]: {
      label: false,
      type,
    },
  };

  const additionalContext = {
    ...form,
    formMeta,
  };
  const propertyPaths = [fieldName];

  const formComponent = isEditing ? (
    <Form {...additionalContext}>
      <form className="space-y-8">
        <HocInput key={fieldName} name={fieldName} formMeta={formMeta} />
      </form>
    </Form>
  ) : null;

  return (
    <>
      <ListItem className="pt-2 min-h-[1em]">
        <div className="text-sm text-gray-400 mb-[0.5em]"> {label}</div>

        {isEditing ? (
          <div>
            <Button
              variant="ghost"
              size={"xs"}
              onClick={() => {
                console.log("Button click handler", form.formState.errors);

                form.handleSubmit(
                  (d) => {
                    console.log("Handle submit");
                    onSubmit({
                      field: fieldName,
                      value: d[fieldName],
                    });
                  },
                  (e) => console.log(e)
                )();
              }}
            >
              <Save size={iconSize} />
            </Button>
            <Button
              variant="ghost"
              size={"xs"}
              onClick={() => setIsEditing(false)}
            >
              <X size={iconSize} />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="ghost"
              size={"xs"}
              onClick={() => setIsEditing(true)}
            >
              <Edit size={iconSize}></Edit>
            </Button>
          </div>
        )}
      </ListItem>
      <div className="px-2 border-b border-gray-300 pb-[1px] mb-2">
        {isEditing ? <>{formComponent}</> : <>{value}</>}
      </div>
    </>
  );
}

