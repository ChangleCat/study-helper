import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "../util/cn";
import type { KnowledgePoint } from "../util/data";
import { useCoursesStore } from "../store/useCoursesStore";
import { Fragment } from "react/jsx-runtime";

interface KnowledgeGraphProps {
  points?: KnowledgePoint[][];
}

// 知识点卡片的不同状态样式
const statusStyles = {
  learned: "bg-blue-100 border-blue-300 text-blue-800",
  learning: "bg-yellow-100 border-yellow-300 text-yellow-800 animate-pulse",
  todo: "bg-gray-100 border-gray-300 text-gray-600",
};

// 单个知识点卡片
function PointNode({ point }: { point: KnowledgePoint }) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border-2 shadow-sm cursor-pointer transition-all hover:shadow-md hover:-translate-y-1",
        statusStyles[point.status]
      )}
    >
      <div className="font-semibold">{point.label}</div>
    </div>
  );
}

// 知识图谱主组件
export function KnowledgeGraph({ points }: KnowledgeGraphProps) {
  const currentNode = useCoursesStore((state) => state.selectedNode);
  if (!points || points.length === 0) {
    return (
      <div className="w-full h-full single-center text-gray-400">
        <p>{currentNode === null ? "未选择章节" : "该章节暂无知识图谱"}</p>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-center gap-8 w-full h-full overflow-auto">
      {points.map((layer, layerIndex) => (
        <Fragment key={`fragment-${layerIndex}`}>
          {/* 渲染节点层 */}
          <div
            className="flex gap-12 justify-center border-2 border-blue-100 rounded-xl p-2"
          >
            {layer.map((point) => (
              <PointNode key={point.id} point={point} />
            ))}
          </div>

          {/* 如果不是最后一层，渲染向下的箭头连接线 */}
          {layerIndex < points.length - 1 && (
            <div
              className="flex justify-center text-gray-400 text-3xl"
            >
              <Icon icon="material-symbols:arrow-downward" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
