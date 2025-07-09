import type { IclassName } from "../util/className";
import { cn } from "../util/cn";
import { type TreeNodeData } from "../util/data";
import { useCoursesStore } from "../store/useCoursesStore";
import { Icon } from "@iconify/react/dist/iconify.js";

interface TreeNodeProps {
  node: TreeNodeData;
  isSelected: boolean;
  isExpanded: boolean;
  onNodeClick: (node: TreeNodeData) => void;
  level: number;
}

function TreeNode({
  node,
  isSelected,
  isExpanded,
  onNodeClick,
  level,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const expandedNodeIDs = useCoursesStore((state) => state.expandedNodeIDs);
  const selectedNode = useCoursesStore((state) => state.selectedNode);

  return (
    <div className={cn("flex flex-col items-stretch cursor-pointer",
      "transition-all"
    )}>
      <div
        className={cn(
          "p-2 pt-1.5 pb-1.5 rounded-xl flex items-center",
          isSelected ? "bg-blue-100" : "hover:bg-blue-50"
        )}
        onClick={() => onNodeClick(node)}
      >
        {hasChildren && (
          <Icon
            icon="ic:baseline-arrow-right"
            className={cn(
              "transition-transform text-lg",
              isExpanded && "rotate-90"
            )}
          />
        )}
        {node.label}
      </div>
      {isExpanded && hasChildren && (
        <div className={cn("pl-2 flex flex-col items-stretch transition-all overflow-hidden"
        )}>
          {node.children?.map((childnode) => (
            <TreeNode
              key={childnode.id}
              node={childnode}
              isSelected={selectedNode?.id === childnode.id}
              isExpanded={expandedNodeIDs.has(childnode.id)}
              level={level + 1}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TreeDirectoryProps extends IclassName {
  data: TreeNodeData[];
}

export function TreeDirectory({ data, className }: TreeDirectoryProps) {
  const selectedNode = useCoursesStore((state) => state.selectedNode);
  const setSelectedNode = useCoursesStore((state) => state.setSelectedNode);
  const expandedNodeIDs = useCoursesStore((state) => state.expandedNodeIDs);
  const setExpandedNodeIDs = useCoursesStore((state) => state.setExpandedNodeIDs);

  const handleNodeClick = (node: TreeNodeData) => {
    setSelectedNode(node);

    if (node.children && node.children.length > 0) {
      const newExpandedNodes = new Set(expandedNodeIDs);

      if (newExpandedNodes.has(node.id)) {
        // 如果已经展开，则折叠它
        newExpandedNodes.delete(node.id);
      } else {
        // 如果未展开，则展开它
        newExpandedNodes.add(node.id);
      }

      setExpandedNodeIDs(newExpandedNodes);
    }
  };

  return (
    <div className={cn("flex flex-col items-stretch", className)}>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          isSelected={node.id === selectedNode?.id}
          isExpanded={expandedNodeIDs.has(node.id)}
          onNodeClick={handleNodeClick}
          level={1}
        />
      ))}
    </div>
  );
}
