import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";
import type { mainContent } from "../store/useWindowStore";
import { memo, useCallback, useState, type ReactNode } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "../util/cn";
import { TreeDirectory } from "./ChapterTree";
import { treeData } from "../util/data";
import { useCoursesStore } from "../store/useCoursesStore";
import { KnowledgeGraph } from "./KnowledgeGraph";

export function Main({ className = "" }: IclassName) {
  const currentMainWindow = useWindowStore((state) => state.currentMainWindow);

  const windowMap = new Map<mainContent, ReactNode>();
  windowMap.set("courses", <CoursesWindow className="w-full" />);
  windowMap.set("expand-review", <ExpandReviewWindow className="w-full" />);
  windowMap.set("moments", <MomentsWindow className="w-full" />);

  return (
    <main className={cn("flex", className)}>
      {windowMap.get(currentMainWindow)}
    </main>
  );
}

function CoursesWindow({ className = "" }: IclassName) {
  const [isAsideHidden, setAsideHidden] = useState<boolean>(false);
  const currentChapter = useCoursesStore((state) => state.selectedNode);

  const toggleAside = useCallback(() => {
    setAsideHidden((prev) => !prev);
  }, []);

  return (
    <div className={cn("flex relative", className)}>
      <aside
        className={cn(
          "transition-all bg-gray-50 border-r-1 border-gray-200 shadow-xl p-4",
          "absolute h-full w-60 z-1",
          isAsideHidden && "-translate-x-full"
        )}
      >
        <div className="font-bold text-lg mb-2 ml-2">课程列表</div>
        <TreeDirectory data={treeData} />
        <ExpandHideBtn
          toggleFunction={toggleAside}
          isHidden={isAsideHidden}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
        />
      </aside>
      <main className="w-full p-8 single-center text-xl text-gray-500">
        <KnowledgeGraph points={currentChapter?.knowledgePoints}/>
      </main>
    </div>
  );
}

function ExpandReviewWindow({ className = "" }: IclassName) {
  return (
    <div className={cn("single-center text-xl text-gray-500", className)}>
      复习巩固
    </div>
  );
}

function MomentsWindow({ className = "" }: IclassName) {
  return (
    <div className={cn("single-center text-xl text-gray-500", className)}>
      朋友圈
    </div>
  );
}

interface EHBtnProps extends IclassName {
  toggleFunction: () => void;
  isHidden: boolean;
}

const ExpandHideBtn = memo(
  ({ className = "", toggleFunction, isHidden }: EHBtnProps) => {
    return (
      <button
        type="button"
        className={cn(
          "single-center w-auto h-16 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-r-full cursor-pointer",
          className
        )}
        title="折叠/展开"
        onClick={toggleFunction}
      >
        <Icon
          icon="ic:baseline-keyboard-arrow-left"
          className={cn("text-lg transition-all", isHidden && "rotate-180")}
        />
      </button>
    );
  }
);
