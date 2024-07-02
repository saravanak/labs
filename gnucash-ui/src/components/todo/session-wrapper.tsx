import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppWrapper from "./app-wrapper";

export default async function SessionWrapper({ children }: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin/email?callbackUrl="/todos/dashboard"`);
  } else {

    return (
      <div className="text-gray-800 ">

        <AppWrapper session={session}>
            {children}
        </AppWrapper>
      </div>
    );
  }
}

