import { MessageCircle } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "./ui/empty.jsx";

const EmptyCommentElement = () => {
  return (
    <Empty className={"gap-2"}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircle />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No comments yet</EmptyTitle>
      <EmptyDescription>Be the first one to leave a comment</EmptyDescription>
    </Empty>
  );
};

export default EmptyCommentElement;
