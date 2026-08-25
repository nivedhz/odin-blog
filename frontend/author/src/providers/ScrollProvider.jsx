import { ScrollContext } from "@/context/ScrollContext";
import { useNavigate, useLocation } from "react-router";
import { useRef } from "react";

export function ScrollProvider({ children }) {
  const draftRef = useRef(null);
  const postRef = useRef(null);
  const publishRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (ref) => {
    if (location.pathname !== "/dashboard") {
      return navigate("/dashboard");
    }
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext
      value={{
        draftRef,
        postRef,
        publishRef,
        scrollTo,
      }}
    >
      {children}
    </ScrollContext>
  );
}
