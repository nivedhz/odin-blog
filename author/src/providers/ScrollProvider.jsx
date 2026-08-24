import { ScrollContext } from "@/context/ScrollContext";
import { useRef } from "react";

export function ScrollProvider({ children }) {
  const draftRef = useRef(null);
  const postRef = useRef(null);
  const publishRef = useRef(null);

  const scrollTo = (ref) => {
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
