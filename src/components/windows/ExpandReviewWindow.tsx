import { Icon } from "@iconify/react/dist/iconify.js";
import { useCoursesStore } from "../../store/useCoursesStore";
import { cn } from "../../util/cn";
import type { IclassName } from "../../util/className";

// 模拟的推荐知识点数据
const recommendedPoints = [
  { id: "rec-1", label: "洛必达法则", reason: "通常与导数结合考察" },
  { id: "rec-2", label: "泰勒公式", reason: "是解决复杂极限问题的利器" },
  { id: "rec-3", label: "微分中值定理", reason: "导数应用的理论基础" },
];

// 模拟的练习题数据
const exercises = [
  {
    id: "ex-1",
    type: "选择题",
    question: "函数 f(x) = |x| 在 x=0 处的导数是？",
    options: ["A. 1", "B. -1", "C. 0", "D. 不存在"],
    answer: "D",
  },
  {
    id: "ex-2",
    type: "填空题",
    question: "曲线 y = x³ - 3x 在点 (2, 2) 处的切线方程是 __________。",
    answer: "y = 9x - 16",
  },
  {
    id: "ex-3",
    type: "解答题",
    question: "求函数 f(x) = x / (1 + x²) 的单调区间和极值。",
    answer: "单调增区间为(-1, 1)，单调减区间为(-∞, -1)和(1, +∞)。极大值为f(1)=1/2，极小值为f(-1)=-1/2。",
  },
];

export function ExpandReviewWindow({ className = "" }: IclassName) {
  const currentChapter = useCoursesStore((state) => state.selectedNode);

  return (
    <div className={cn("p-8 w-full h-full overflow-y-auto bg-gray-50", className)}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">拓展巩固</h1>
        <p className="text-gray-500 mb-8">
          当前章节:
          <span className="font-semibold text-gray-700 ml-2">
            {currentChapter?.label ?? "未选择"}
          </span>
        </p>

        {/* 引入推荐知识点组件 */}
        <RecommendedPoints />

        {/* 引入练习题组件 */}
        <PracticeExercises />
        
      </div>
    </div>
  );
}



function RecommendedPoints() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-6">
        相关知识点推荐
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedPoints.map((point) => (
          <div
            key={point.id}
            className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800">{point.label}</h3>
            <p className="text-sm text-gray-500 mt-2">{point.reason}</p>
            <button className="mt-4 text-blue-600 font-semibold flex items-center gap-2">
              前往学习 <Icon icon="material-symbols:arrow-forward" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PracticeExercises() {
    return (
        <section>
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-4 mb-6">
            巩固练习
          </h2>
          <div className="space-y-8">
            {exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-gray-700">
                    第 {index + 1} 题
                  </p>
                  <span className="px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full">
                    {exercise.type}
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed mb-4">
                  {exercise.question}
                </p>
                {exercise.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {exercise.options.map((option) => (
                      <div
                        key={option}
                        className="p-3 bg-gray-50 border rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                <details className="group">
                  <summary className="cursor-pointer text-blue-600 font-semibold">
                    查看答案
                  </summary>
                  <p className="mt-3 p-4 bg-green-50 text-green-800 rounded-lg animate-in fade-in duration-500">
                    {exercise.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </section>
    )
}