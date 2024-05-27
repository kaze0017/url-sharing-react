import TreeChart from "../TreeChartCopy";
import { getNPeople } from "../../../lib/actions";

const people = getNPeople(7);

const orgData = {
  id: 31,
  name: "John Doe",
  profile_picture: people[4].profile_picture,
  children: [
    {
      id: 32,
      name: "Jane Smith",
      profile_picture: people[2].profile_picture,
      children: [
        {
          id: 33,
          name: "John Smith",
          profile_picture: people[3].profile_picture,
          children: [
            {
              id: 34,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
            {
              id: 35,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
          ],
        },
      ],
    },
    {
      id: 36,
      name: "Jane Smith",
      profile_picture: people[6].profile_picture,
    },
    {
      id: 37,
      name: "Jane Smith",
      profile_picture: people[3].profile_picture,
      children: [
        {
          id: 38,
          name: "John Smith",
          profile_picture: people[6].profile_picture,
          children: [
            {
              id: 39,
              name: "Jane Doe",
              profile_picture: people[5].profile_picture,
            },
            {
              id: 40,
              name: "Jane Doe",
              profile_picture: people[4].profile_picture,
            },
          ],
        },
      ],
    },
  ],
};



interface TreeEditorProps {
  treeId: string;
}
export default function TreeEditor({ treeId }: TreeEditorProps) {
  return (
    <div>
      <TreeChart  data={orgData} />
    </div>
  );
}
