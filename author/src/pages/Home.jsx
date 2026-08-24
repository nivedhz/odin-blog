import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { user, setLoading } = useAuth();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });
    setLoading(false);

    return () => cancelAnimationFrame(animationFrame);
  }, [setLoading]);

  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="relative">
      <title>Blogo</title>
      <Particles
        className={"min-h-190 absolute inset-0"}
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={150}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="min-w-full h-180 px-8 py-16 flex items-center gap-10 justify-center transition-all duration-500 ease-out absolute inset-0">
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
                "opacity-100 translate-y-0 scale-[1]": loaded,
                "opacity-0 translate-y-10 scale-[0.8]": !loaded,
              },
            )}
            onClick={() => {
              navigate("/auth/sign-up");
            }}
          >
            Start writing for free{" "}
            <ArrowRight className="animate-[arrow-bounce_3s_ease-in-out_infinite]" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
