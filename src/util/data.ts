export interface KnowledgePoint {
  id: string;
  label: string;
  status: 'learned' | 'learning' | 'todo'; // 学习状态，用于将来给卡片上色
}

export interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
  knowledgePoints?: KnowledgePoint[][];
}

export const treeData: TreeNodeData[] = [
  {
    id: "1",
    label: "高等数学",
    children: [
      {
        id: "1-1",
        label: "一、函数与极限",
        knowledgePoints: [
          // 第1层
          [
            { id: 'kp-1-1', label: '集合与元素', status: 'learned' },
            { id: 'kp-1-2', label: '函数概念', status: 'learned' },
          ],
          // 第2层
          [
            { id: 'kp-2-1', label: '函数的性质', status: 'learning' },
            { id: 'kp-2-2', label: '反函数', status: 'todo' },
          ],
          // 第3层
          [
            { id: 'kp-3-1', label: '数列极限', status: 'todo' },
            { id: 'kp-3-2', label: '函数极限', status: 'todo' },
          ],
        ]
      },
      {
        id: "1-2",
        label: "二、微分与导数",
        knowledgePoints: [
          [
            { id: 'kp-d-1', label: '导数定义', status: 'todo' },
            { id: 'kp-d-2', label: '求导法则', status: 'todo' },
          ],
          [
            { id: 'kp-d-3', label: '高阶导数', status: 'todo' },
          ]
        ]
      }
    ],

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