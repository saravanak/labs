import { authOptions } from "@/lib/auth-options";

import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FlexJustifySpread } from "../ui/ui-hoc/flex-justify-spread";
import TodoTabBar from "./todo-tab-bar";

export default async function TodoNavbar({ children }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin/email?callbackUrl=/todos`);
  } else {

    return (
      <div className="text-gray-800 ">
        <FlexJustifySpread className="bg-blue-300 py-4 h-[50px]">
          <div className="pl-4 grow font-bold text-lg">Tinja</div>
          <div className="pr-4">{session.user.email}</div>
        </FlexJustifySpread>
        <div className="h-[calc(100svh-100px)]  overflow-y-auto">
        {children}
        </div>
        <TodoTabBar />
      </div>
    );
  }
}

