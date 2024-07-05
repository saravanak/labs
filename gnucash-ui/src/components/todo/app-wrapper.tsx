"use client";
import { FlexJustifySpread } from "../ui/ui-hoc/flex-justify-spread";
import TodoTabBar from "./todo-tab-bar";
import { createContext, useState } from "react";

export const TabBarContext = createContext({
  form: null,
  setForm: (x: any) => {},
});


  
export default function AppWrapper({ children, session }: any) {
  const [form, setForm] = useState(null);

  return (
    <>
      <TabBarContext.Provider value={{ form, setForm}}>
        <div className="grid grid-cols-1 h-svh grid-rows-[3em,1fr,3em]">
        <FlexJustifySpread className="bg-primary text-primary-foreground py-4 h-[3em]">
          <div className="pl-4 grow font-bold text-lg">Tinja</div>
          <div className="pr-4">{session.user.email}</div>
        </FlexJustifySpread>
        <div className="h-full  overflow-y-auto">
          {children}
        </div>
        <TodoTabBar />
        </div>
      </TabBarContext.Provider>
    </>
  );
}

