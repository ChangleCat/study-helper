import { Icon } from "@iconify/react/dist/iconify.js";
import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";
import type { mainContent } from "../store/useWindowStore";
import { Main } from "./Main";
import { cn } from "../util/cn";
import { NotesPanel } from "./NotesPanel";

type navButtonType = {
  title: string;
  icon: string;
  target: mainContent;
};

export function Body({ className = "" }: IclassName) {
  return (
    <div
      className={cn(
        "flex [&>*]:not-last:border-r-2 [&>*]:border-gray-300 [&>*]:h-full",
        className
      )}
    >
      <aside className="flex flex-col w-21 z-10 bg-white">
        <div className="flex flex-col items-center w-full p-4 border-b-2 border-gray-300">
          <Icon
            icon="ic:round-account-circle"
            className="text-6xl text-gray-400 cursor-pointer"
          />
          <div>
            <small className="text-gray-700">李华</small>
          </div>
        </div>
        <Nav className="mt-4 w-full" />
      </aside>
      <Main className="flex-1" />
      <NotesPanel className="w-80"/>
    </div>
  );
}

function Nav({ className = "" }: IclassName) {
  const currentMainWindow = useWindowStore((state) => state.currentMainWindow);
  const changTo = useWindowStore((state) => state.changeTo);

  const navButtons: navButtonType[] = [
    {
      title: "课程学习",
      target: "courses",
      icon: "material-symbols:book-ribbon-outline",
    },
    {
      title: "拓展巩固",
      target: "expand-review",
      icon: "material-symbols:target",
    },
    {
      title: "朋友圈",
      target: "moments",
      icon: "material-symbols:chat-bubble-outline",
    },
  ];

  return (
    <nav className={cn("flex flex-col items-center gap-3", className)}>
      {navButtons.map((value) => (
        <div className="flex flex-col items-center gap-0.5" key={value.target}>
          <button
            type="button"
            title={value.title}
            className={cn(
              "single-center h-11 w-11 rounded-xl active:scale-95",
              value.target === currentMainWindow
                ? "bg-blue-200"
                : "bg-gray-200 hover:bg-blue-100"
            )}
            onClick={() => changTo(value.target)}
          >
            <Icon icon={value.icon} className="text-2xl" />
          </button>
          <div className="text-gray-700 text-[0.75rem]">{value.title}</div>
        </div>
      ))}
    </nav>
  );
}