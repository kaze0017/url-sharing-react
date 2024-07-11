import { useParams } from "react-router-dom";
import CardSingle from "../components/cards/CardSingle";
import PanelTop from "../components/home/PanelTop";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { getLinkById } from "../api/gets/getLinkById";
import { SharedLinkType } from "../lib/interfaces";
import NotFound from "../components/NotFound";

export default function SharedLink() {
  const params = useParams();
  const { id } = params as { id: string };

  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const userId = auth?.userProfile?.user_id;
  const [sharedLink, setSharedLink] = useState<SharedLinkType>(
    {} as SharedLinkType
  );
  const [editable, setEditable] = useState(false);
  async function fetchSharedLink() {
    const link = await getLinkById({ token, id: id });
    console.log("Link", link);
    if (link) {
      setSharedLink(link);
      if (userId === link.owner.user_id) {
        setEditable(true);
      }
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchSharedLink();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full flex-grow gap-1">
        <PanelTop mode="link" />
        {isLoading && <NotFound title="Link" size="text-xl" />}
        {!isLoading && (
          <CardSingle sharedLink={sharedLink} editable={editable} />
        )}
      </div>
    </>
  );
}
