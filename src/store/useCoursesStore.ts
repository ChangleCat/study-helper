import { create } from "zustand";
import { type TreeNodeData } from "../util/data";

interface coursesState {
  selectedNode: TreeNodeData | null;  // 当前被选中的节点
  expandedNodeIDs: Set<string>;       // 被展开的节点的 id 集合
  setSelectedNode: (newNode: TreeNodeData | null) => void;
  setExpandedNodeIDs: (newNodes: Set<string>) => void;
}

export const useCoursesStore = create<coursesState>((set) => ({
  selectedNode: null,
  expandedNodeIDs: new Set(),
  setSelectedNode: (newNode) => set(() => ({ selectedNode: newNode })),
  setExpandedNodeIDs: (newNodes) => set(() => ({ expandedNodeIDs: newNodes }))
}))