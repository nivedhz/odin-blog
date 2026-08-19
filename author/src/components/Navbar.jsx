import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
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

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-500">
        <Link to="/" className="text-2xl font-bold">
          Blogo
        </Link>
        {user ? (
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <User size={20} />
              <p>{user.username}</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    className="flex gap-2 cursor-pointer"
                    title="Logout"
                    variant="destructive"
                  >
                    Logout
                    <LogOut size={20} />
                  </Button>
                }
              />
              <AlertDialogContent className={"dark"}>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to logout?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    By logging out you won't be able to access or manage your
                    blog posts again without logging in
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className={"cursor-pointer"}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className={"cursor-pointer"}
                    onClick={logout}
                    variant="destructive"
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="flex items-center gap-1 cursor-pointer"
              to="/auth/login"
              title="Login"
            >
              <Button variant="ghost" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link className="cursor-pointer" to="/auth/sign-up" title="Sign Up">
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
