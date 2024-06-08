"use client";

import CardListing from "@/components/ui/card-listing";
import PageCardItem from "@/components/ui/page-card-item";

export default function GamesPage() {
  const pageLinks = [
    {
      urlSlug: "crisp-games?number-jump",
      label: "Number Jump",
      shortDescription:
        "Jump over positive and negative numbers to move up the number ladder",
      image: "/game-shots/number-jump.gif",
    },
    {
      urlSlug: "15-puzzle",
      label: "15 Puzzle",
      shortDescription: "Slide to the empty space to order the numbers",
      image: "/game-shots/15-puzzle.png",
    },
    {
      urlSlug: "multiply",
      label: "Math art",
      image: "/game-shots/multiply.png",
      shortDescription: "Display detailed multiplication steps",
    },
    {
      urlSlug: "seven-segment",
      label: "LCD - gud'ol days",
      image: "/game-shots/hello-react.png",
      shortDescription: "Display LCDs using Grid system!",
    },
    {
      urlSlug: "twenty48",
      label: "2048",
      image: "/game-shots/2048.png",
      shortDescription: "Implemented in React",
    },
  ].map(v => {
    return {
      ...v,
      urlSlug: `/games/${v.urlSlug}`
    }
  });;

  return (
    <CardListing>
      <PageCardItem linksMeta={pageLinks} />
    </CardListing>
  );
}

