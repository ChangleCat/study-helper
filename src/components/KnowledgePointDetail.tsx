import { useCoursesStore } from "../store/useCoursesStore";
import { type IclassName } from "../util/className";
import { cn } from "../util/cn";

export function KnowledgePointDetail({ className = "" }: IclassName) {
  const selectedKnowledgePoint = useCoursesStore(
    (state) => state.selectedKnowledgePoint
  );

  if (!selectedKnowledgePoint) {
    return (
      <div className={cn("w-full h-full single-center text-gray-400", className)}>
        <p>从左侧知识图谱中选择一个知识点以查看详情</p>
      </div>
    );
  }

  return (
    <div className={cn("p-8 h-full overflow-y-auto", className)}>
      <h2 className="text-2xl font-bold mb-4">
        {selectedKnowledgePoint.label}
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">知识点概述</h3>
          <p className="text-gray-700 leading-relaxed">
            这里是关于“{selectedKnowledgePoint.label}
            ”的详细概述。这个知识点是理解后续章节的基础，请务必掌握。
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">相关课件/资料</h3>
          <div className="p-4 border rounded-lg bg-gray-50 space-y-2">
              <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>📄</span>
                <span>{selectedKnowledgePoint.label}_讲义.pdf</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline">
                <span>🔗</span>
                <span>相关在线文章：{selectedKnowledgePoint.label}的核心思想</span>
              </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">教学视频/MOOC</h3>
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="aspect-video">
              {/* 这里用了一个通用的B站嵌入视频做示例 */}
              <iframe
                src="//player.bilibili.com/player.html?bvid=BV187411h7De&page=1&high_quality=1&autoplay=0&mute=1"
                title="教学视频"
                allowFullScreen={true}
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}