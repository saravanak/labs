import LinksListing from "@/components/ui/links-listing";
import Hydrate from "@/utils/hydrate-client";
import { dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "../api/trpc/trpc-router";

export default async function Home() {
  const recruiterLinks = [
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/resume?#section-portfolio`,
      label: "Portfolio",
      isExternal: true,
    },
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/resume?#section-oss`,
      label: "Open source",
      isExternal: true,
    },

    {
      href: "/projects",
      label: "Projects",
      isExternal: false,
    },
  ];
  const gameLinks = [
    {
      href: "/games",
      label: "games for you to play!",
    },
  ];
  const blogLinks = [
    {
      href: `${process.env.NEXT_PUBLIC_DIARY_URL}/blog`,
      label: "Blog",
      isExternal: true,
    },
  ];
  const helpers = createSSRHelper();

  // await helpers.getUsers.prefetch({ limit: 10, page: 1 });

  return (
    <Hydrate state={dehydrate(helpers.queryClient)}>
      <div className="px-4">
        <p>
          Hi I am Saro, your host! I live in Coimbatore, India and I do coding
          for living. <b> I am currently open to work</b>
        </p>
        <p>
          Here is my <LinksListing isSimpleLinks={true} links={blogLinks} />
        </p>

        <p>
          Welcome to my sandbox environment where I keep by hobby projects. And
          yes, none of this was borrowed from AI.
        </p>
        <p>
          If you are a recruiter, see{" "}
          <LinksListing isSimpleLinks={true} links={recruiterLinks} />.
          {/* You can also &nbsp;
        <LinksListing isSimpleLinks={true} links={[{ href: "bts", label: "look through "}]} /> 
        how my online presence is setup */}
        </p>
        <p>
          If you are feeling bored, there are some&nbsp;
          <LinksListing isSimpleLinks={true} links={gameLinks} />
        </p>
      </div>
    </Hydrate>
  );
}
