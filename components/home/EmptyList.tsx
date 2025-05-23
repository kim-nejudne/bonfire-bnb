import Link from "next/link";
import { Button } from "../ui/button";

const EmptyList = ({
  heading = "No items found",
  message = "Keep looking for something you like",
  btnText = "Go to home",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold ">{heading}</h2>
      <p className="text-lg">{message}</p>
      <Button asChild className="mt-4 capitalize" size="lg">
        <Link href="/">{btnText}</Link>
      </Button>
    </div>
  );
};

export default EmptyList;
