import { useAuth } from "../hooks/useAuth";
import moment from "moment";
import { Avatar, AvatarFallback } from "./ui/avatar.jsx";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "./ui/dropdown-menu.jsx";
import { Button } from "./ui/button.jsx";
import { EllipsisVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog.jsx";

const Comment = ({ item, handleDelete }) => {
  const { user } = useAuth();
  return (
    <Card className={"flex flex-row items-center gap-0 px-4"}>
      <Avatar>
        <AvatarFallback>{item.creator.username[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-full flex justify-between items-center px-4">
        <div className="flex flex-col">
          <CardHeader
            className={"flex justify-between items-center min-w-full"}
          >
            <CardTitle
              className={"text-sm flex gap-1 items-center w-full min-w-xl"}
            >
              <span>{item.creator.username}</span>

              {item.creator.username === user?.username ? (
                <span>(you)</span>
              ) : null}
              <span className="text-muted-foreground">&bull;</span>
              <span className="text-muted-foreground">
                {moment(item.createdAt).fromNow()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className={"text-muted-foreground w-full"}>
            {item.content}
          </CardContent>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Comment</DropdownMenuLabel>
              <div className="">
                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button
                        variant="destructive"
                        className="min-w-full justify-start"
                      >
                        Delete
                      </Button>
                    }
                  />
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default Comment;
