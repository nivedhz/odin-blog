import { useAuth } from "../hooks/useAuth";
import { cn } from "#lib/utils";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [permission, setPermission] = useState(true);
  const { logout, user } = useAuth();

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
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 401) {
          logout();
          return;
        }
        if (response.status === 403) {
          setPermission(false);
          return;
        }
        const result = await response.json();
        setData(result);
        setError(null);
        setPermission(true);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [logout, user?.token]);
  return (
    <div
      className={cn("transition-all duration-500 ease-out", {
        "opacity-100 translate-y-0": loaded,
        "opacity-0 translate-y-10": !loaded,
      })}
    >
      {data?.map((item) => {
        return <p key={item.id}>{item.title}</p>;
      })}
    </div>
  );
};

export default Home;
