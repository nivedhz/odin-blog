import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Edit,
  EllipsisVertical,
  Eye,
  Globe,
  GlobeOff,
  Trash,
} from "lucide-react";

const PostCard = ({ item, handleDelete, handleUnpublish, handlePublish }) => {
  return (
    <Card className="flex flex-col  overflow-hidden">
      <CardHeader className="px-4 py-1  overflow-hidden max-w-xl text-wrap flex flex-col">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="font-bold text-xl wrap-anywhere max-h-8">
            {item.title.length > 25
              ? item.title.slice(0, 25) + "..."
              : item.title}
          </CardTitle>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className={"cursor-pointer"}>
                    <EllipsisVertical />
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem className={"cursor-pointer"}>
                    <Eye />
                    View post
                  </DropdownMenuItem>
                  {item.publishStatus ? (
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        handleUnpublish(item.id);
                      }}
                    >
                      <GlobeOff />
                      Unpublish
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className={"cursor-pointer"}
                      onClick={() => {
                        handlePublish(item.id);
                      }}
                    >
                      <Globe />
                      Publish
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className={"cursor-pointer"}>
                    <Edit />
                    Edit
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={
                        <Button
                          variant="destructive"
                          className={"cursor-pointer w-full justify-start"}
                        >
                          <Trash />
                          Delete
                        </Button>
                      }
                    ></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You will lose this post forever
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className={"cursor-pointer"}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          className={"cursor-pointer"}
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </div>
        <CardDescription
          className={"flex gap-2 lg:flex-row md:flex-col sm:flex-col"}
        >
          {item.publishStatus ? <p>Published</p> : <p>Draft</p>}
          <p>
            {new Date(item.createdAt).toDateString() +
              " at " +
              new Date(item.createdAt)
                .toLocaleTimeString()
                .split(":")
                .slice(0, 2)
                .join(":") +
              " " +
              new Date(item.createdAt).toLocaleTimeString().split(" ")[1]}
          </p>
        </CardDescription>
      </CardHeader>
      <hr />
      <CardDescription className="px-4 max-h-32 overflow-hidden wrap-anywhere max-w-xl text-wrap">
        {item.content.length > 50
          ? item.content.slice(0, 50) + "..."
          : item.content}
      </CardDescription>
    </Card>
  );
};

export default PostCard;
