import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import {
  TreeData,
  TreeNode,
} from "../components/membermanagement/graphs/TreeData";

interface ChartDragAndDropProviderProps {
  draggedPerson: any;
  setDraggedPerson: Dispatch<SetStateAction<any>>;
  treeData: any;
  setTreeData: Dispatch<SetStateAction<any>>;
}

const ChartDragAndDropContext = createContext<ChartDragAndDropProviderProps>({
  draggedPerson: {},
  setDraggedPerson: () => {},
  treeData: null,
  setTreeData: () => {},
});

interface ModeProviderProps {
  children: ReactNode;
}

export function ChartDragAndDropProvider({ children }: ModeProviderProps) {
  const emptyNode = new TreeNode(0, "", "");
  const [draggedPerson, setDraggedPerson] = useState<any>({});
  const [treeData, setTreeData] = useState<any>(new TreeData(emptyNode));
  return (
    <ChartDragAndDropContext.Provider
      value={{ draggedPerson, setDraggedPerson, treeData, setTreeData }}
    >
      {children}
    </ChartDragAndDropContext.Provider>
  );
}

export default ChartDragAndDropContext;
