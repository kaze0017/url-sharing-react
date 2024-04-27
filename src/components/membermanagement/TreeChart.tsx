import { useEffect, useState, useRef } from "react";
import { select, hierarchy, tree, linkVertical, drag } from "d3";
import { useDraggable } from "react-use-draggable-scroll";

interface TreeNode {
  id: number;
  name: string;
  photo: string;
  children?: TreeNode[];
  collapsed?: boolean;
}
interface TreeChartProps {
  data: TreeNode;
}

export default function TreeChart({ data }: TreeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [datatoRender, setDatatoRender] = useState<TreeNode>(data);


  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);


  useEffect(() => {
    const offset = 35;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(datatoRender);
    const treeLayout = tree<TreeNode>();
    treeLayout.size([400, 500]);

    // Drag handler
    interface dragHandler {
      (event: any): void;
    }
    const dragHandler = drag<SVGGElement, d3.HierarchyPointNode<any>>()
      .on("drag", function (event) {
        select(this)
          .attr("x", event.x - 25)
          .attr("y", event.y);
      })
      .on("end", function (event) {
        // chech if the dragged element is in the trash area
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
          const id = select(this).attr("data-id");
          setDatatoRender((prevData) => {
            const deleteNode = (node: TreeNode) => {
              if (node.children) {
                node.children = node.children.filter(
                  (child) => child.id !== +id
                );
                node.children.forEach(deleteNode);
              }
            };
            const newTree = { ...prevData };
            deleteNode(newTree);
            update();
            return newTree;
          });
        } else {
          select(this).attr("x", select(this).attr("data-x"));
          select(this).attr("y", select(this).attr("data-y"));
        }
      });

    treeLayout(root);

    const linkGenerator = linkVertical()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => (node as any).x)
      .y((node) => (node as any).y + offset);

    // Links svg
    function update() {
      svg.selectAll("*").remove();

      svg
        .selectAll<SVGPathElement, d3.HierarchyPointLink<any>>("path.link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", linkGenerator as any)
        .attr("stroke-dasharray", function () {
          const length: any = this.getTotalLength();
          return `${length} ${length}`;
        })
        .attr("stroke-offset", function () {
          const length: any = this.getTotalLength();
          return `${length}`;
        })
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
        .attr("xlink:href", (node) => (node.data as any).photo)
        .attr("x", (node) => (node as any).x - 25)
        .attr("y", (node) => (node as any).y - 25 + offset)
        .attr("width", 50)
        .attr("height", 50)
        .attr("clip-path", "circle(50%)")
        .attr("data-id", (node) => (node.data as any).id)
        .attr("data-x", (node) => (node as any).x - 25)
        .attr("data-y", (node) => (node as any).y - 25 + offset)
        .attr("data-type", "node")
        .call(dragHandler as any)
        .on("drop", (e, d) => handleDrop({ e, d }))
        .on("click", (e, d) => handleClick({ e, d }));

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
      // 'd' represents the current data bound to the SVG element
      e.preventDefault(); // Prevent default drop behavior

      const dragDataString = e.dataTransfer.getData("application/json");
      const dragData = JSON.parse(dragDataString);
      console.log(dragData.dragObject);

      const tempdata = { ...datatoRender };
      const node = findByID({ item: tempdata, id: d.data.id });
      if (node) {
        if (node.children) {
          node.children.push(dragData.dragObject);
        } else {
          node.children = [dragData.dragObject];
        }
      }
      setDatatoRender(tempdata);
    }
    function handleClick({ e, d }: any) {
      e.preventDefault();

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
  }, [datatoRender]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    select("svg").classed("drag-over", true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    select("svg").classed("drag-over", false);
  };
  const mainWrapperClass =
    "relative p-2 max-h-full row flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full";


  return (
    <div className={mainWrapperClass} {...events} ref={ref}

      // onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
    >
      <svg ref={svgRef} width={900} height={900}>
        {/* Render tree chart here */}
      </svg>
    </div>
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
