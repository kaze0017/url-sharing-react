import { useEffect, useState, useContext } from "react";
import CardSharedMd from "../../../cards/CardSharedMd";
import CardSharedLg from "../../../cards/CardSharedLg";
import CardImgIconS from "../../../cards/CardImgIconS";
import { SharedLinkType } from "../../../../lib/interfaces";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";
import AuthContext from "../../../../context/AuthProvider";
import NotFound from "../../../NotFound";
import { getPopularLinks } from "../../../../api/getPopularLinks";
import { HomeContext } from "../../../../context/HomeProvider";

export default function Trend() {
  const { auth } = useContext(AuthContext);
  const { view, query } = useContext(HomeContext);
  const token = auth?.token || "";
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  async function getAndSetSharedLinks() {
    const sharedLinks = await getPopularLinks(token);

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
    <div className="w-full h-full overflow-hidden flex flex-col gap-2 p-2">
      {view === "grid" ? (
        <SliderFlexWrapper
          sharedLinks={sharedLinks}
          CardComponent={CardSharedMd}
          setIsLoading={setIsLoading}
          multi={true}
        />
      ) : view === "cardImgIconS" ? (
        <SliderFlexWrapper
          sharedLinks={sharedLinks}
          CardComponent={CardImgIconS}
          setIsLoading={setIsLoading}
        />
      ) : (
        <SliderFlexWrapper
          sharedLinks={sharedLinks}
          CardComponent={CardSharedLg}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  ) : (
    <NotFound title="shared links" size="text-md" />
  );
}
