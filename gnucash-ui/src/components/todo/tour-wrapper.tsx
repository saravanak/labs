"use client";
import { useTour } from "@reactour/tour";
import { TramFront } from "lucide-react";
import { Button } from "../ui/button";
import { FlexJustifySpread } from "../ui/ui-hoc/flex-justify-spread";
import TodoTabBar from "./todo-tab-bar";
import { useRouter } from "next/navigation";

export default function TourWrapper({ children, session }: any) {
  const { setIsOpen } = useTour();
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 h-svh grid-rows-[3em,1fr,3em]">
      <FlexJustifySpread className="bg-primary text-primary-foreground py-4 h-[3em]">
        <div className="pl-4 grow font-bold text-lg">
          <span data-retour-step="tinja"> Tinja</span>
          <Button
            onClick={() => {
              router.push("/todos");
              setIsOpen(true);
            }}
          >
            <TramFront />
          </Button>
        </div>
        <div className="pr-4" data-retour-step="login">{session.user.email}</div>
      </FlexJustifySpread>
      <div className="h-full  overflow-y-auto">{children}</div>
      <TodoTabBar />
    </div>
  );
}

