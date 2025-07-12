import { Icon } from "@iconify/react/dist/iconify.js";

export function PostStatus() {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm mb-8">
       <h3 className="text-xl font-bold mb-4 text-gray-800">分享我的学习路径</h3>
      <textarea
        placeholder="记录一下今天的学习心得，或者分享你高效的学习路径吧..."
        className="w-full h-24 p-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-400"
      />
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
            <Icon icon="material-symbols:image-outline" className="text-2xl" />
            <span>添加学习子图</span>
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:scale-95 transition-all">
          发布
        </button>
      </div>
    </div>
  );
}