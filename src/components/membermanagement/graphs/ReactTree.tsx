import React from "react";
import Tree, { Point } from "react-d3-tree";
import MainPanelWrapper from "../../MainPanelWrapper";
import { useCenteredTree } from "./reactTree/helpers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
import Search from "../Search";
import { useDrop } from "react-dnd";

const orgChart = {
  name: "CEO",
  attributes: {
    id: 0,
  },
  children: [
    {
      name: "Manager",
      attributes: {
        id: 1,
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            id: 2,
          },
          children: [
            {
              name: "Worker",
              attributes: {
                id: 2,
              },
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            id: 3,
          },
          children: [
            {
              name: "Worker",
              attributes: {
                id: 4,
              },
            },
          ],
        },
      ],
    },
  ],
};

const containerStyles: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

interface TreeNode {
  name: string;
  attributes?: {
    department?: string;
    id: number; // Make sure id is present
  };
  children?: TreeNode[];
}

function dragHandler(node: any) {
  console.log(node);
}

const renderRectSvgNode = ({ nodeDatum, toggleNode }: any) => (
  <g
    onClick={(e) => console.log("click", e)}
    onDrag={(e) => {
      console.log("mousedown", e);
    }}
    style={{
      zIndex: 1000,
    }}
    ref={(node) => {
      dragHandler(node);
    }}
  >
    <image
      href="https://randomuser.me/api/portraits/men/75.jpg"
      width={20}
      height={20}
      onDrag={(e) => console.log("hi")}
    />
    {/* <rect width="20" height="20" x="-10" onClick={toggleNode} /> */}
    <text fill="black" strokeWidth="1" x="20">
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.id && (
      <text fill="black" x="20" dy="20" strokeWidth="1">
        id: {nodeDatum.attributes?.id}
      </text>
    )}
  </g>
);
function handleClick({ nodeData, evtData }: any) {
  // your code
  console.log(nodeData);
  return;
}
console.log(Tree);

export default function ReactTree() {
  //   const [dimensions, translate, containerRef] = useCenteredTree<Point>();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",

    drop: (item) => {
      console.log("drop", item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <MainPanelWrapper>
      <div className="flex">
        <Search />
        <div style={containerStyles} ref={drop}>
          <Tree
            data={orgChart}
            //   dimensions={dimensions} // Pass dimensions
            //   translate={translate} // Pass translate
            orientation="vertical"
            pathFunc="straight"
            renderCustomNodeElement={renderRectSvgNode} // Render custom node
            onNodeClick={(nodeData, evtData) => handleClick(nodeData)}
          />
        </div>
      </div>
    </MainPanelWrapper>
  );
}
