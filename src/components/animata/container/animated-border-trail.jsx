"use client";
import { cn } from "@/lib/utils";

const sizes = {
  sm: 10,
  md: 20,
  lg: 30,
};

export default function AnimatedBorderTrail({
  children,
  className,
  duration = "5s",
  trailColor = "purple",
  trailSize = "md",
  contentClassName,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "relative h-fit w-fit overflow-hidden rounded-2xl bg-gray-200 p-px",
        className
      )}
    >
      <div
        className="absolute inset-0 h-full w-full animate-trail"
        style={{
          "--duration": duration ?? "10s",
          "--angle": "0deg",
          background: `conic-gradient(from var(--angle) at 50% 50%, transparent ${
            100 - sizes[trailSize]
          }%, ${trailColor})`,
        }}
      />
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[15px] bg-white",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
