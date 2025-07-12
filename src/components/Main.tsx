import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";
import type { mainContent } from "../store/useWindowStore";
import {
  memo,
  useCallback,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "../util/cn";
import { TreeDirectory } from "./ChapterTree";
import { treeData } from "../util/data";
import { useCoursesStore } from "../store/useCoursesStore";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { KnowledgePointDetail } from "./KnowledgePointDetail";

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
  const setCurrentChapter = useCoursesStore((state) => state.setSelectedNode);
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleAside = useCallback(() => {
    setAsideHidden((prev) => !prev);
  }, []);

  const cancelSelect = useCallback<MouseEventHandler>(
    (event) => {
      if (event.target === sidebarRef.current) {
        setCurrentChapter(null);
      }
    },
    [setCurrentChapter]
  );

  return (
    <div className={cn("flex relative", className)}>
      <aside
        className={cn(
          "transition-all bg-gray-50 border-r-2 border-gray-300 shadow-xl p-4",
          "absolute h-full w-60 z-1", 
          isAsideHidden && "-translate-x-full"
        )}
        onClick={cancelSelect}
        ref={sidebarRef}
      >
        <div className="font-bold text-lg mb-2 ml-2">课程列表</div>
        <TreeDirectory data={treeData} />
        <ExpandHideBtn
          toggleFunction={toggleAside}
          isHidden={isAsideHidden}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
        />
      </aside>
      {/* 主内容区变为左右两栏 */}
      <main className="w-full flex">
        <div className="w-1/2 border-r-2 border-gray-300">
          <KnowledgeGraph points={currentChapter?.knowledgePoints} />
        </div>
        <div className="w-1/2">
          <KnowledgePointDetail />
        </div>
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
