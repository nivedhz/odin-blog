import moment from "moment";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const Post = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>
          {item.author.username} &middot;{" "}
          {moment(item.createdAt).fromNow()}{" "}
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            className={"cursor-pointer"}
            onClick={() => {
              navigate(`/post/${item.id}`);
            }}
          >
            View <ArrowRight />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
};

export default Post;
