import { memo, useCallback, useRef, useState, type MouseEventHandler } from "react";
import { useCoursesStore } from "../../store/useCoursesStore";
import type { IclassName } from "../../util/className";
import { cn } from "../../util/cn";
import { treeData } from "../../util/data";
import { TreeDirectory } from "../ChapterTree";
import { KnowledgeGraph } from "../KnowledgeGraph";
import { KnowledgePointDetail } from "../KnowledgePointDetail";
import { Icon } from "@iconify/react/dist/iconify.js";

export function CoursesWindow({ className = "" }: IclassName) {
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