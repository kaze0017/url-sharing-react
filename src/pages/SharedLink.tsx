import { useParams } from "react-router-dom";
import CardSingle from "../components/cards/CardSingle";
import PanelTop from "../components/home/PanelTop";

export default function SharedLink() {
  const params = useParams();
  const { linkId } = params as { linkId: string };

  return (
    <div className="flex flex-col h-full flex-grow gap-1  ">
      <PanelTop mode="link" />
      <CardSingle linkId={linkId} />
    </div>
  );
}
