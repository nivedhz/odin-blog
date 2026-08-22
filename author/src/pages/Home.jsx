import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ArrowBigRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="min-w-full px-8 py-16 flex items-center gap-10 justify-center transition-all duration-500 ease-out">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1
          className={cn(
            "text-6xl text-wrap text-muted-foreground max-w-xl text-center transition-all duration-500 ease-out",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
        >
          Focus on Your Words.
          <span
            className={cn("text-foreground", {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            })}
          >
            We Handle the Rest
          </span>
        </h1>
        <p
          className={cn(
            "text-muted-foreground max-w-md text-center transition-all duration-500 ease-out delay-100",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
        >
          A distraction-free writing platform designed for creators, thinkers,
          and developers.
        </p>
        <Button
          size="lg"
          className={cn(
            "transition-all duration-500 ease-out delay-200 cursor-pointer",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
          onClick={() => {
            navigate("/auth/sign-up");
          }}
        >
          Start writing for free <ArrowBigRight />
        </Button>
      </div>
    </div>
  );
};

export default Home;
