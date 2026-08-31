import { ScrollContext } from "@/context/ScrollContext";
import { useNavigate, useLocation } from "react-router";
import { useRef } from "react";

export function ScrollProvider({ children }) {
  const popularRef = useRef(null);
  const recentRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (ref) => {
    if (location.pathname !== "/") {
      return navigate("/");
    }
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext
      value={{
        popularRef,
        recentRef,
        scrollTo,
      }}
    >
      {children}
    </ScrollContext>
  );
}
