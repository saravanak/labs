import LinksListing from "@/components/ui/links-listing";
import AccountsListing from "../components/accounts";

export default function Home() {
  const recruiterLinks = [
    {
      href: "#portfolio",
      label: "Portfolio",
      isExternal: true,
    },
    {
      href: "#section-oss",
      label: "Open source",
      isExternal: true,
    },
    {
      href: "#asdasd",
      label: "Blog",
      isExternal: true,
    },
    {
      href: "#asdasd",
      label: "Projects",
      isExternal: false,
    },
  ];
  const gameLinks = [
    {
      href: "/games",
      label: "games for you to play!",
      
    }
  ];

  return (
    <div className="px-4">
      <p>Hi I am Saro, your host! I live in Coimbatore, India and I do coding for living.</p>
      <p>        
          Welcome to my sandbox environment where I keep by hobby projects.{" "}
        
      </p>
      <p>
        If you are a recruiter, please directly jump to my{" "}
        <LinksListing isSimpleLinks={true} links={recruiterLinks} />. You can also &nbsp;
        <LinksListing isSimpleLinks={true} links={[{ href: "bts", label: "look through "}]} /> how my online presence is setup

      </p>
      <p>
        If you are feeling bored,  there are some&nbsp;
        <LinksListing isSimpleLinks={true} links={gameLinks} />
      </p>
    </div>
  );
}

