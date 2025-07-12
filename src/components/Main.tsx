import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";
import type { mainContent } from "../store/useWindowStore";
import { type ReactNode } from "react";
import { cn } from "../util/cn";
import { CoursesWindow } from "./windows/CoursesWindow";
import { ExpandReviewWindow } from "./windows/ExpandReviewWindow";
import { MomentsWindow } from "./windows/MomentsWindow";

export function Main({ className = "" }: IclassName) {
  const currentMainWindow = useWindowStore((state) => state.currentMainWindow);

  const windowMap = new Map<mainContent, ReactNode>();
  windowMap.set("courses", <CoursesWindow className="w-full h-full" />);
  windowMap.set("expand-review", <ExpandReviewWindow className="w-full h-full" />);
  windowMap.set("moments", <MomentsWindow className="w-full h-full" />);

  return (
    <main className={cn("flex", className)}>
      {windowMap.get(currentMainWindow)}
    </main>
  );
}
