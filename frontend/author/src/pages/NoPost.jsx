import { Button } from "#components/ui/button";
import { useNavigate } from "react-router";

const NoPost = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-180 gap-4">
      <h1 className="text-4xl font-bold">No post found</h1>
      <Button
        className={"cursor-pointer"}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Go back to home?
      </Button>
    </div>
  );
};

export default NoPost;
