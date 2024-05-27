import  { useEffect, useState, useRef } from "react";
import { select, hierarchy, tree, linkVertical, drag } from "d3";

interface TreeNode {
  id: number;
  name: string;
  profile_picture?: string;
  children?: TreeNode[];
  collapsed?: boolean;
}
interface TreeChartProps {
  data: TreeNode;
  width?: number;
  height?: number;
}

export default function Tree({ data, width, height }: TreeChartProps) {
  let treeSize = {
    w: 350,
    h: 400,
  };

  width && (treeSize.w = width);
  height && (treeSize.h = height);

  const offset = 25;

  const svgRef = useRef<SVGSVGElement>(null);
  const [datatoRender, setDatatoRender] = useState<TreeNode>(data);

  // const ref =
  //   useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  // const { events } = useDraggable(ref);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const root = hierarchy(datatoRender);
    const treeLayout = tree<TreeNode>();
    treeLayout.size([treeSize.w, treeSize.h]);

    treeLayout(root);

    const linkGenerator = linkVertical()
      .source((link) => link.source)
      .target((link) => link.target)
      .x((node) => (node as any).x)
      .y((node) => (node as any).y + offset);
      // .y((node) => (node as any).y);

    // const ref = React;

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

      // Nodes profile_picture

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
        .attr("xlink:href", (node) => (node.data as any).profile_picture || "/images/defaults/personDefaultImage.png")
        .attr("x", (node) => (node as any).x - 25)
        .attr("y", (node) => (node as any).y - 25 + offset)
        .attr("width", 50)
        .attr("height", 50)
        .attr("clip-path", "circle(50%)")
        .attr("data-id", (node) => (node.data as any).id)
        .attr("data-x", (node) => (node as any).x - 25)
        .attr("data-y", (node) => (node as any).y - 25 + offset)
        .attr("data-type", "node");
    }
    update();
  }, []);

  const mainWrapperClass =
    "relative p-2 max-h-full row flex flex-wrap gap-x-2 gap-y-2 overflow-x-scroll overflow-y-scroll scrollbar-hide min-w-full";

  return (
    <div
      className={mainWrapperClass}
      // {...events} ref={ref}
    >
      <svg
        ref={svgRef}
        width={treeSize.w + 2 * offset}
        height={treeSize.h + 2 * offset}
      ></svg>
    </div>
  );
}
