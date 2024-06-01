import { useEffect, useState, useContext } from "react";
import CardSharedMd from "../../../cards/CardSharedMd";
import { SharedLinkType } from "../../../../lib/interfaces";
import { getSharedLinks } from "../../../../api/axios";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";

export default function Trend() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token || "";
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  async function getAndSetSharedLinks() {
    const sharedLinks = await getSharedLinks(token);

    setSharedLinks(sharedLinks);
  }

  useEffect(() => {
    getAndSetSharedLinks();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [sharedLinks]);

  return sharedLinks === null ? (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/images/assets/loading.svg"
        alt="loading"
        width="200px"
        className="mx-auto"
      />
    </div>
  ) : sharedLinks?.length > 0 ? (
    <SliderFlexWrapper
      sharedLinks={sharedLinks}
      CardComponent={CardSharedMd}
      setIsLoading={setIsLoading}
      multi={true}
    />
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
