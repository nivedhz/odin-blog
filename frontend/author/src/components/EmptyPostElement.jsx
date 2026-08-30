import { Newspaper } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty.jsx";
import { cn } from "../lib/utils.js";
import { Button } from "./ui/button.jsx";
import { useNavigate } from "react-router";

const EmptyPostElement = ({ loaded }) => {
  const navigate = useNavigate();
  return (
    <Empty className={"py-50"}>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className={cn("transition-all duration-500 ease-out", {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          })}
        >
          <Newspaper />
        </EmptyMedia>
        <EmptyTitle
          className={cn("transition-all duration-500 ease-out delay-50", {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          })}
        >
          No Posts Yet
        </EmptyTitle>
        <EmptyDescription
          className={cn("transition-all duration-500 ease-out delay-100", {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          })}
        >
          You haven&apos;t created any posts yet. Get started by creating your
          first post.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button
          className={cn(
            "transition-all duration-500 ease-out delay-150 cursor-pointer",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
          onClick={() => {
            navigate("/post/new");
          }}
        >
          Create Post
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyPostElement;
