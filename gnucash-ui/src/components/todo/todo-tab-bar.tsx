"use client";

import { Case } from "change-case-all";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useMemo } from "react";
import { Button } from "../ui/button";
import { FlexJustifySpread } from "../ui/ui-hoc/flex-justify-spread";
import { TabBarContext } from "./app-wrapper";
import { cn } from "@/lib/utils";

export default function TodoTabBar() {
  const segment = useSelectedLayoutSegment();
  const { form, setForm } = useContext(TabBarContext) as any;

  const { hookForm, formState, onSubmit, onCancel, mutation, title, status } =
    form || {};

  console.log({ form, isSubmit: formState?.isSubmitting });
  let tabButtons = useMemo(() => {
    console.log("Memo running...");

    switch (form) {
      case null:
        return ["spaces", "todos"].map((v) => {
          return (
            <Link
              href={`/${v}`}
              key={v}
              className={`pl-4 basis-1/2  h-full text-center font-bold text-primary-foreground ${
                v == segment ? "bg-primary " : "bg-muted "
              } content-center`}
            >
              {Case.title(v)}
            </Link>
          );
        });
      default:
        const controls = [
          {
            action: "save",
            handler: onSubmit,
          },
          {
            action: "cancel",
            handler: () => {
              hookForm.reset();
              setForm(null);
              history.back();
            },
          },
        ].map(({ action, handler }, index) => {
          return (
            <Button
              onClick={handler}
              key={action}
              variant="formAction"
              size="formAction"
              btnColor={action == "save" ? "userAgree" : "userCancel"}
              disabled={
                action == "save"
                  ? !formState.isValid || mutation.isLoading
                  : false
              }
            >
              {action == "save" && mutation.isLoading ? <Loader /> : null}{" "}
              {Case.title(action)}
            </Button>
          );
        });

        controls.splice(
          1,
          0,
          <div
            key="form-title"
            className="grow h-full text-center content-center font-bold"
          >
            {title}
          </div>
        );

        return controls;
    }
  }, [form, formState?.isSubmitting, formState?.submitCount, mutation, status]);

  return (
    <div className="mb-4 h-full">
      <FlexJustifySpread
        className={cn(
          "bg-blue-300 h-full justify-around items-center border-blue-200 border-t",
          ` ${form ? "justify-center" : ""}`
        )}
      >
        {tabButtons}
      </FlexJustifySpread>
    </div>
  );
}

