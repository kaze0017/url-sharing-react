import { useEffect, useState, useRef, useContext, Children, memo } from "react";
import { select, hierarchy, tree, linkVertical, drag } from "d3";
import { useDraggable } from "react-use-draggable-scroll";
import { useDrop } from "react-dnd";
import { PersonType } from "../../../lib/interfaces";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChartDragAndDropContext from "../../../context/ChartDragAndDropProvider";
import { set } from "react-hook-form";
import { TreeNode, TreeData } from "../graphs/TreeData";
// interface TreeNode {
//   id: number;
//   name: string;
//   profile_picture: string;
//   children?: TreeNode[];
//   collapsed?: boolean;
// }

export default function RawTree() {
  const [dropOneIsCompleted, setDropOneIsCompleted] = useState(false);
  const [droppedItem, setDroppedItem] = useState<any>(null);
  const [dropTwoIsCompleted, setDropTwoIsCompleted] = useState(false);
  const [nodeId, setNodeId] = useState<any>(null);
  const [updateTree, setUpdateTree] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PERSON",

    drop: (item) => {
      setDroppedItem(item);
      setDropOneIsCompleted(true);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  function addChildrenToNode(e: any, d: any) {
    if (e instanceof DragEvent) {
      setNodeId(d.data.id);
      setDropTwoIsCompleted(true);
    }
  }
  function checkForCompletion() {
    if (dropOneIsCompleted && dropTwoIsCompleted) {
      const newNode = new TreeNode(
        droppedItem.person.id,
        droppedItem.person.first_name,
        droppedItem.person.profile_picture
      );

      // Create a new instance of TreeData with updated data
      const updatedTreeData = new TreeData(treeData.root);
      updatedTreeData.addPerson(newNode, nodeId);

      // Update the state with the new treeData
      setTreeData(updatedTreeData);

      // Reset completion flags
      setDropOneIsCompleted(false);
      setDropTwoIsCompleted(false);
      setUpdateTree(!updateTree);
    }
  }

  useEffect(() => {
    checkForCompletion();
  }, [nodeId, droppedItem]);
  const svgRef = useRef<SVGSVGElement>(null);

  const { draggedPerson, treeData, setTreeData } = useContext(
    ChartDragAndDropContext
  );

  const [datatoRender, setDatatoRender] = useState<TreeNode | null>(null);

  let id = 0;

  useEffect(() => {
    id = draggedPerson.id;
  }, [draggedPerson]);

  useEffect(() => {
    if (!treeData) {
      return;
    }
    setDatatoRender(treeData.root);
    const offset = 35;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(treeData.root);

    const treeLayout = tree<TreeNode>();
    treeLayout.size([400, 500]);

    // Drag handler
    interface dragHandler {
      (event: any): void;
    }

    let cstartX = 0;
    let cstartY = 0;
    let cendX = 0;
    let cendY = 0;
    const dragHandler = drag<SVGGElement, d3.HierarchyPointNode<any>>()
      .on("start", function (event, d) {
        cstartX = event.x;
        cstartY = event.y;
      })

      .on("drag", function (event, d) {
        select(this)
          .attr("x", event.x - 25)
          .attr("y", event.y);
      })
      .on("end", function (event, d) {
        cendX = event.x;
        cendY = event.y;

        if (Math.abs(cstartX - cendX) < 5 && Math.abs(cstartY - cendY) < 5) {
          if (d.children) {
            // Collapse the d if it's expanded
            d.data._children = d.data.children;
            d.data.children = null;
            console.log(d.data);
            // sett collapsed
            d.data.collapsed = true;
          } else {
            // Expand the d if it's collapsed
            d.data.children = d.data._children;
            d.data._children = null;
            d.data.collapsed = false;
          }
        }

        // Delete
        let deleteNode = false;
        if (
          event.x > 500 - 30 &&
          event.x < 500 + 30 &&
          event.y > 500 - 30 &&
          event.y < 500 + 30
        ) {
          deleteNode = true;
        }

        if (deleteNode) {
          const id = event.subject.data.id;
          let temTreeData = treeData;
          temTreeData.removePerson(id);
          setTreeData(temTreeData);
        } else {
          select(this).attr("x", select(this).attr("data-x"));
          select(this).attr("y", select(this).attr("data-y"));
        }
        setUpdateTree(!updateTree);
      });

    treeLayout(root);

    const linkGenerator = linkVertical()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => (node as any).x)
      .y((node) => (node as any).y + offset);

    // Links svg
    function update() {
      console.log("update");
      svg.selectAll("*").remove();

      svg
        .selectAll<SVGPathElement, d3.HierarchyPointLink<any>>("path.link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", linkGenerator as any)
        .transition()
        .duration(1000)
        .attr("stroke-dashoffset", 0)
        .attr("fill", "none")
        .attr("stroke", "indigo");

      // Nodes photo

      svg
        .selectAll<SVGCircleElement, d3.HierarchyPointNode<any>>(
          "circle.node-circle"
        )
        .data(root.descendants())
        .enter()
        .append("circle")
        .attr("class", "node-circle")
        .attr("cx", (node) => (node as any).x)
        .attr("cy", (node) => (node as any).y + offset)
        .attr("r", 29)
        .attr("fill", "none")
        .attr("stroke", (d) => (d.data.collapsed ? "green" : "none"));

      svg
        .selectAll<SVGImageElement, d3.HierarchyPointNode<any>>("image")
        .data(root.descendants())
        .enter()
        .append("g")
        .append("image")
        .attr("xlink:href", (node) => (node.data as any).profile_picture)
        .attr("x", (node) => (node as any).x - 25)
        .attr("y", (node) => (node as any).y - 25 + offset)
        .attr("width", 50)
        .attr("height", 50)
        .attr("clip-path", "circle(50%)")
        .attr("data-id", (node) => (node.data as any).id)
        .attr("data-x", (node) => (node as any).x - 25)
        .attr("data-y", (node) => (node as any).y - 25 + offset)
        .attr("data-type", "node")
        .on("click", (e, d) => {
          handleClick({ e, d });
        })
        .call(dragHandler as any)
        .on("drop", (e, d) => handleDrop({ e, d }));

      // Add a indigo color trash icon to the bottom right corner of the svg
      svg
        .append("image")
        .attr(
          "xlink:href",
          "https://img.icons8.com/material-outlined/50/946BB2/trash.png"
        )
        .attr("x", 500 - 25)
        .attr("y", 500 - 25)
        .attr("width", 50)
        .attr("height", 50);
    }

    function handleDrop({ e, d }: any) {
      e.preventDefault();
      addChildrenToNode(e, d);
    }
    function handleClick({ event, d }: any) {
      event.preventDefault();
      console.log("click", d);

      if (d.children) {
        // Collapse the d if it's expanded
        d._children = d.children;
        d.children = null;
        // sett collapsed
        d.data.collapsed = true;
      } else {
        // Expand the d if it's collapsed
        d.children = d._children;
        d._children = null;
        d.data.collapsed = false;
      }
      update();
    }
    update();
  }, [updateTree]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    select("svg").classed("drag-over", true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    select("svg").classed("drag-over", false);
  };
  const mainWrapperClass =
    "relative p-2 max-h-full row flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full";

  // <div className={mainWrapperClass} {...events} ref={ref}

  //   // onDrop={(e) => onDrop(e)}
  //   onDragLeave={(e) => onDragLeave(e)}
  //   onDragOver={(e) => onDragOver(e)}
  // >

  return (
    <div className="flex">
      <div ref={drop}>
        <svg ref={svgRef} width={900} height={900}></svg>
      </div>
    </div>
    // </div>
  );
}

function findByID({
  item,
  id,
}: {
  item: TreeNode;
  id: number;
}): TreeNode | null {
  if (item.id === id) {
    return item;
  }

  if (item.children) {
    for (let child of item.children) {
      const found: TreeNode | null = findByID({ item: child, id });
      if (found) {
        return found;
      }
    }
  }

  return null;
}
