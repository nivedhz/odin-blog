import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button.jsx";

const ErrorElement = ({ error, setReload }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-180 gap-4">
      <div className="flex flex-col items-center">
        <h1 className={"text-4xl transition-all duration-500 ease-out"}>
          Error occured
        </h1>
        <p className={"text-muted-foreground"}>{error}</p>
      </div>
      <Button
        className={"cursor-pointer"}
        onClick={() => {
          setReload((prev) => prev + 1);
        }}
      >
        <RefreshCcw />
        Try Again?
      </Button>
    </div>
  );
};

export default ErrorElement;
