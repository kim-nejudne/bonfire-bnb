"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "./Title";

const Description = ({ description }: { description: string }) => {
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const words = description.split(" ");
  const descriptionLimit = 30;
  const isLongDescription = words.length > descriptionLimit;

  const toggleDescription = () => {
    setIsFullDescriptionShown(!isFullDescriptionShown);
  };

  const displayedDescription =
    isLongDescription && !isFullDescriptionShown
      ? words.slice(0, descriptionLimit).join(" ") + "..."
      : description;

  return (
    <article className="mt-4">
      <Title text="Description" />
      <p className="text-muted-foreground font-light leading-loose">
        {displayedDescription}
      </p>
      {isLongDescription && (
        <Button variant="link" className="pl-0" onClick={toggleDescription}>
          {isFullDescriptionShown ? "Show less" : "Show more"}
        </Button>
      )}
    </article>
  );
};

export default Description;
