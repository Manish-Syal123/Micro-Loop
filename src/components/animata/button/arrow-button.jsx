"use client";
import React from "react";
import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

export default function ArrowButton({
  text = "Learn More",
  textColor = "#8230ff",
  buttonOverlayColor = "#8230ff",
  borderColor = "#8230ff",
  iconColor = "white",
  className,
  ...props
}) {
  return (
    <button
      style={{ borderColor: borderColor }}
      {...props}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#8230ff] bg-background px-8 py-2 font-medium shadow-md transition duration-300 ease-out",
        className
      )}
    >
      <span
        style={{ background: buttonOverlayColor }}
        className={cn(
          "ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-[#8230ff] text-white duration-300 group-hover:translate-x-0"
        )}
      >
        <MoveRight style={{ color: iconColor }} />
      </span>
      <span
        style={{ color: textColor }}
        className={cn(
          "absolute flex h-full w-full transform items-center justify-center font-bold transition-all duration-300 ease-in-out group-hover:translate-x-full"
        )}
      >
        {text}
      </span>
      <span className="invisible relative">Button</span>
    </button>
  );
}
