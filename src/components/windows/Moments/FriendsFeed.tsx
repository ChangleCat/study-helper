import { Icon } from "@iconify/react/dist/iconify.js";

// 模拟好友动态数据
const feedData = [
  {
    id: 1,
    name: "张三",
    avatar: "material-symbols:face-retouching-natural",
    content: "今天搞定了函数极限的所有题型，原来泰勒公式这么好用！",
    path: "高等数学 -> 函数与极限 -> 泰勒公式",
    likes: 15,
    comments: 4,
  },
  {
    id: 2,
    name: "王五",
    avatar: "material-symbols:face-4",
    content: "分享一个线性代数中关于矩阵秩的理解，希望能帮助到大家。",
    path: "线性代数 -> 矩阵 -> 矩阵的秩",
    likes: 22,
    comments: 8,
  },
];

export function FriendsFeed() {
  return (
    <div className="space-y-8">
      {feedData.map((item) => (
        <div key={item.id} className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* 用户信息 */}
          <div className="flex items-center mb-4">
            <Icon icon={item.avatar} className="text-5xl text-gray-400 mr-4" />
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-xs text-gray-400">发布于 2小时前</p>
            </div>
          </div>
          {/* 动态内容 */}
          <p className="mb-4 text-gray-700">{item.content}</p>
          {/* 学习路径 */}
          <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="font-semibold text-gray-600">学习路径：</p>
            <p className="text-blue-600">{item.path}</p>
          </div>
          {/* 操作 */}
          <div className="flex justify-end gap-6 text-gray-500">
            <button className="flex items-center gap-2 hover:text-red-500">
              <Icon icon="material-symbols:favorite-outline" /> {item.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500">
              <Icon icon="material-symbols:chat-bubble-outline" /> {item.comments}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}