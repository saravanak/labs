import { Edit, Save, X } from "lucide-react";
import { FlexJustifySpread } from "./flex-justify-spread";
import { Button } from "../button";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPropertyPaths } from "@/utils/zod/extract-keys-from-type";
import { Form } from "../form";
import HocInput from "./hoc-input";
import { Case } from "change-case-all";

export default function EditableText({
  model,
  type,
  mutationArgs,
  mutation,
  fieldName,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const iconSize = 20;

  const fieldEditorSchema = z.object({
    // field: z.string(),
    [fieldName]: z.string(),
    // value: z.string(),
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

  console.log({ propertyPaths, formComponent, formMeta, fieldEditorSchema });

  return (
    <div>
      <FlexJustifySpread className="border-b border-gray-300">
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
                      value: d[fieldName]
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
      </FlexJustifySpread>
      {isEditing ? <>{formComponent}</> : <>{value}</>}
    </div>
  );
}

