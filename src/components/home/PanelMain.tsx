import Feed from "./mainPanel/Feed";

interface Props {
  mode: string;
}

export default function PanelMain(props: Props) {
  return (
      <Feed />
  );
}
