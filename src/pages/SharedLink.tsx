import { useParams } from "react-router-dom";
import CardSingle from "../components/cards/CardSingle";
import PanelTop from "../components/home/PanelTop";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { getSharedLinks } from "../api/axios";
import { SharedLinkType } from "../lib/interfaces";
import NotFound from "../components/NotFound";

export default function SharedLink() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const [sharedLink, setSharedLink] = useState<SharedLinkType>(
    {} as SharedLinkType
  );
  const token = auth?.token || "";

  const params = useParams();
  const { linkId } = params as { linkId: string };

  async function fetchSharedLink() {
    const response = await getSharedLinks(token);

    const link = response?.find(
      (link: SharedLinkType) => link.id.toString() === linkId
    );
    if (link) {
      setSharedLink(link);
    }
  }

  useEffect(() => {
    fetchSharedLink();
  }, [linkId]);

  useEffect(() => {
    sharedLink.title ? setIsLoading(false) : setIsLoading(true);
  }, [sharedLink]);

  return !isLoading ? (
    <div className="flex flex-col h-full flex-grow gap-1">
      <PanelTop mode="link" />
      <CardSingle sharedLink={sharedLink} />
    </div>
  ) : (
    <NotFound title="Link" size="text-xl" />
  );
}
