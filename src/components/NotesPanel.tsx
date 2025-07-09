import { useState, useMemo, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCoursesStore } from "../store/useCoursesStore";
import { cn } from "../util/cn";
import type { IclassName } from "../util/className";
import { useWindowStore } from "../store/useWindowStore";

// 笔记类型
interface Note {
  id: number;
  content: string;
  associatedNodeId: string | null; // 关联的章节ID
}

// 笔记数据
const initialMockNotes: Note[] = [
  {
    id: 1,
    content: "函数的三要素：定义域、值域、对应法则。",
    associatedNodeId: "1-1",
  },
  { id: 2, content: "极限是描述函数趋势的重要概念。", associatedNodeId: "1-1" },
  { id: 3, content: "导数的几何意义是切线的斜率。", associatedNodeId: "1-2" },
  // { id: 4, content: "这是一个全局笔记，不关联任何章节。", associatedNodeId: null },
];

export function NotesPanel({ className = "" }: IclassName) {
  const [notes, setNotes] = useState(initialMockNotes);
  const [newNoteContent, setNewNoteContent] = useState("");

  const selectedNode = useCoursesStore((state) => state.selectedNode);
  const selectedWindow = useWindowStore((state) => state.currentMainWindow);

  const [isGlobalState, setIsGlobalState] = useState<boolean>(true);

  const handleAddNote = useCallback(() => {
    if (newNoteContent.trim() === "") return;

    // 创建一个新笔记，用随机数作为简单的key
    const newNote: Note = {
      id: Math.random(),
      content: newNoteContent,
      // 如果没有选中节点，associatedNodeId 会自动变为 null，成为全局笔记
      associatedNodeId: isGlobalState ? null : selectedNode?.id ?? null,
    };

    // 更新本地state，让新笔记显示在列表最前面
    setNotes([newNote, ...notes]);
    setNewNoteContent(""); // 清空输入框
  }, [isGlobalState, newNoteContent, notes, selectedNode?.id]);

  const handleDeleteNote = (idToDelete: number) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  // 根据当前选中的章节，筛选出相关的笔记
  const filteredNotes = useMemo(() => {
    if (!selectedNode || selectedWindow !== "courses") {
      // 如果没有选中任何节点，只显示全局笔记 (associatedNodeId 为 null)
      return notes.filter((note) => note.associatedNodeId === null);
    }
    return notes.filter((note) => note.associatedNodeId === selectedNode.id);
  }, [notes, selectedNode, selectedWindow]);

  // 自动更新 global state
  useEffect(() => {
    setIsGlobalState(selectedWindow !== "courses" || selectedNode === null);
  }, [selectedWindow, selectedNode]);

  return (
    <aside className={cn("w-80 flex flex-col p-4 bg-white", className)}>
      <div className="flex-shrink-0 pb-2 border-b-2 border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">
          {isGlobalState ? "全局笔记" : `关于「${selectedNode?.label}」的笔记`}
        </h2>
      </div>

      {/* 笔记列表 */}
      <div className="flex-1 my-4 space-y-3 overflow-y-auto">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-yellow-50 rounded-lg group relative animate-in fade-in duration-300"
            >
              <p className="text-gray-700 whitespace-pre-wrap">
                {note.content}
              </p>
              <button
                type="button"
                onClick={() => handleDeleteNote(note.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-yellow-100 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="删除笔记"
              >
                <Icon icon="ic:baseline-close" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 pt-10">
            {isGlobalState
              ? "暂无全局笔记，快写下第一条吧！"
              : "暂无相关笔记，快写下第一条吧！"}
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="flex-shrink-0 mt-auto">
        <textarea
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          placeholder="在这里输入你的想法..."
          className="w-full h-24 p-2 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleAddNote}
          className="w-full mt-2 p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:scale-95 transition-all"
        >
          添加笔记
        </button>
      </div>
    </aside>
  );
}
