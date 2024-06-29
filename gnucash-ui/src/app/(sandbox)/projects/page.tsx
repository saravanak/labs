
"use client";

import CardListing from "@/components/ui/card-listing";
import PageCardItem from "@/components/ui/page-card-item";
import { usePathname } from "next/navigation";

export default function ProjectsPage() {
  const pageLinks = [
    {
      urlSlug: "/html-extractor",
      label: "HTML Extractor",
      image: "/project-shots/html-extract-dsl.png",
      shortDescription: "Scrap HTML content using a DSL "
    },
    {
      urlSlug: "/perfect-free-hand",
      label: "Scribble",    
      image: "/project-shots/free-hand.png",
      shortDescription: "Demo for perfect-freehand library"
      
    }
  ].map(v => {
    return {
      ...v,
      urlSlug: `/projects/${v.urlSlug}`
    }
  });
  return (
    <CardListing>
      <PageCardItem linksMeta={pageLinks} />
    </CardListing>

    
  );
}

