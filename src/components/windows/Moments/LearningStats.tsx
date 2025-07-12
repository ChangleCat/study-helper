import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

// 模拟每周学习数据
const weeklyData = [
  { day: "周一", time: 120 },
  { day: "周二", time: 180 },
  { day: "周三", time: 90 },
  { day: "周四", time: 210 },
  { day: "周五", time: 150 },
  { day: "周六", time: 300 },
  { day: "周日", time: 60 },
];

// 模拟科目分布数据
const subjectData = [
  { name: "高等数学", value: 400 },
  { name: "离散数学", value: 300 },
  { name: "线性代数", value: 300 },
  { name: "大学物理", value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function LearningStats() {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-gray-800">我的学习统计</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-80">
        {/* 柱状图 */}
        <div>
            <h4 className="font-semibold text-center mb-2">本周学习时长 (分钟)</h4>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" fill="#8884d8" name="学习时长" />
            </BarChart>
            </ResponsiveContainer>
        </div>
        {/* 饼图 */}
        <div>
            <h4 className="font-semibold text-center mb-2">科目学习分布</h4>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label
                >
                    {subjectData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}