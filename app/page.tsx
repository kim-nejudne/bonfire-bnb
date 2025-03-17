"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  const handleClick = () => {
    toast("Event has been created",
      { description: "You have been signed out." }
    );
  };
  return (
    <div>
      <h1 className='text-3xl'>HomeAway Project - Starter</h1>
      <Button variant="outline" onClick={handleClick}>Hello</Button>
    </div>
  );
};
export default HomePage;
