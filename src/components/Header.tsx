import { Icon } from "@iconify/react";
import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { cn } from "../util/cn";

export function Header({ className = "" }: IclassName) {
  const toggleMax = useWindowStore((state) => state.toggleMax);
  const isMax = useWindowStore((state) => state.isMax);

  const [searchContent, setSearchContent] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };

  const cleanInput = () => {
    setSearchContent("");
  };

  return (
    <header
      className={cn(
        "h-16 flex justify-between border-b-1 border-gray-700 items-center",
        className
      )}
    >
      <div className="text-2xl pl-6">Spark Master</div>
      <div className="rounded-xl flex items-center justify-between bg-gray-200 pt-2 pb-2 pl-4 pr-2 w-xs">
        <input
          type="text"
          placeholder="🔍智能搜索..."
          className={cn(
            "outline-none flex-1",
            "[&:placeholder-shown+button]:hidden" // 当搜索栏内没有东西时 清空按钮隐藏
          )}
          value={searchContent}
          onChange={handleChange}
        />
        <button
          title="清空搜索栏"
          type="button"
          className={cn(
            "cursor-pointer ml-1 p-1 rounded-[50%]",
            "active:scale-90 hover:bg-gray-300"
          )}
          onClick={cleanInput}
        >
          <Icon icon="ic:baseline-close" />
        </button>
      </div>
      <div
        className={cn(
          "h-full flex items-center text-2xl",
          "[&>*]:h-full [&>*]:pl-2 [&>*]:pr-2 [&>*]:cursor-pointer [&>*]:outline-none"
        )}
      >
        <button title="最小化" type="button" className="hover:bg-gray-100">
          <Icon icon="ic:baseline-minus" />
        </button>
        <button
          title="最大化"
          type="button"
          className="hover:bg-gray-100"
          onClick={toggleMax}
        >
          <Icon
            icon={isMax ? "material-symbols:web-asset" : "ic:sharp-crop-square"}
          />
        </button>
        <button
          title="关闭"
          type="button"
          className={cn("hover:bg-red-500", !isMax && "rounded-tr-xl")}
        >
          <Icon icon="ic:baseline-close" />
        </button>
      </div>
    </header>
  );
}
