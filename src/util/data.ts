
export interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
}

export const treeData: TreeNodeData[] = [
  {
    id: "1",
    label: "高等数学",
    children: [
      {
        id: "1-1",
        label: "一、函数与极限",
      },
      {
        id: "1-2",
        label: "二、微分与导数"
      }
    ]
  },
  {
    id: "2",
    label: "离散数学",
    children: [
      {
        id: "2-1",
        label: "一、命题与推理",
      },
      {
        id: "2-2",
        label: "二、集合"
      }
    ]
  },
  {
    id: "3",
    label: "线性代数",
    children: [
      {
        id: "3-1",
        label: "一、矩阵",
      },
      {
        id: "3-2",
        label: "二、行列式"
      }
    ]
  }
]