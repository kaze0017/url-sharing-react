import Controller from "./graphs/Controller";
import Graph from "./graphs/Graph";
import { Link } from "react-router-dom";

export default function Graphs() {
  return (
    <div>
      <Controller />
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-wrap gap-2 w-full">
          <Link to={`/networks/editor/${"t" + 1}`} key={1}>
            <Graph width={300} height={300} />
          </Link>
          <Link to={`/networks/editor/${"t" + 2}`} key={2}>
            <Graph width={300} height={300} />
          </Link>
        </div>
      </div>
    </div>
  );
}
