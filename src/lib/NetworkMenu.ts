export type menuType = {
  name: string;
  icon?: string;
  path?: string;
  children?: menuType[];
};

export const networkMenu: menuType[] = [
  {
    name: "Create",
    path: "/networks/editor/",
  },
  {
    name: "filter",
    children: [
      {
        name: "All",
      },
      {
        name: "Groups",
      },
      {
        name: "Graphs",
      },
    ],
  },
  {
    name: "View",
    children: [
      {
        name: "List",
      },
      {
        name: "Grid",
      },
    ],
  },
  {
    name: "Auto Layout",
  },
];
