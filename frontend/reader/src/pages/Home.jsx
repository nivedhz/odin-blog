import { useAuth } from "../hooks/useAuth";
import { cn } from "#lib/utils";
import { useEffect, useState } from "react";
import Post from "#components/Post";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (data === null || loading || error) return;
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [data, loading, error]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/reader/post`,
          {
            method: "GET",
          },
        );
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="px-25 py-10 flex flex-col gap-4">
      <div
        className={cn("transition-all duration-500 ease-out", {
          "opacity-100 translate-y-0": loaded,
          "opacity-0 translate-y-10": !loaded,
        })}
      >
        <h1 className="text-4xl font-bold">Popular Posts</h1>
      </div>
      <div
        className={cn("px-4 flex flex-col gap-4", {
          "opacity-100 translate-y-0": loaded,
          "opacity-0 translate-y-10": !loaded,
        })}
      >
        {data?.map((item, index) => (
          <div
            key={item.id}
            style={{ transitionDelay: `${index * 50 + 50}ms` }}
            className={cn(
              "transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <Post item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
