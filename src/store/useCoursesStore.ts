import { create } from "zustand";
import { type TreeNodeData, type KnowledgePoint } from "../util/data";

interface coursesState {
  selectedNode: TreeNodeData | null;  // 当前被选中的章节
  expandedNodeIDs: Set<string>;       // 被展开的节点的 id 集合
  selectedKnowledgePoint: KnowledgePoint | null;  // 当前被选中的知识点
  setSelectedNode: (newNode: TreeNodeData | null) => void;
  setExpandedNodeIDs: (newNodes: Set<string>) => void;
  setSelectedKnowledgePoint: (newPoint: KnowledgePoint | null) => void;
}

export const useCoursesStore = create<coursesState>((set) => ({
  selectedNode: null,
  expandedNodeIDs: new Set<string>(),
  selectedKnowledgePoint: null,
  // 分割线
  setSelectedNode: (newNode) => set(() => ({ selectedNode: newNode })),
  setExpandedNodeIDs: (newNodes) => set(() => ({ expandedNodeIDs: newNodes })),
  setSelectedKnowledgePoint: (newPoint) => set(() => ({ selectedKnowledgePoint: newPoint })),
}))