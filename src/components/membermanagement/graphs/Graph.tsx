import { getNPeople } from "../../../lib/actions";
import { treeData } from "../../../lib/placeholder-data";

import Tree from "./Tree";
const people = getNPeople(7);

const orgData = treeData;

interface GraphProps {
  width?: number;
  height?: number;
}

export default function Graph ({ width, height }: GraphProps) {
  const data = orgData;

  return (
    <div className="relative overflow-hidden l p-2 gap-2 panel-light uppercase">
      <p className="text-md font-bold absolute top-0 left-0 p-1 px-2 z-10">
        Graph Title
      </p>
      <Tree data={data} width={width} height={height} />
    </div>
  );
}
