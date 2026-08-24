import { ScrollContext } from "@/context/ScrollContext";
import { useContext } from "react";

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used inside an ScrollProvider");
  }
  return context;
}
