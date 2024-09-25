import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

export function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  return (
    <button
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-4" : "right-4"
      } bg-sand/50 dark:bg-grape/50 text-coffee dark:text-sky p-2 rounded-full hover:bg-sand dark:hover:bg-grape transition-colors z-10`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={direction === "left" ? "Previous item" : "Next item"}
    >
      {direction === "left" ? (
        <ChevronLeft size={24} />
      ) : (
        <ChevronRight size={24} />
      )}
    </button>
  );
}
