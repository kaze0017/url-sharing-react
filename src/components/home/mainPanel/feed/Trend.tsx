"use client";
import { useEffect, useState } from "react";
import CardSharedMd from "../../../cards/CardSharedMd";
import { SharedLinkType } from "../../../../lib/interfaces";
import { getSharedLinks } from "../../../../lib/actions";
import SliderFlexWrapper from "../../../sliders/SliderFlexWrapper";

export default function Trend() {
  const [sharedLinks, setSharedLinks] = useState<SharedLinkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setSharedLinks(getSharedLinks());
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [sharedLinks]);

  return (
    <SliderFlexWrapper
      sharedLinks={sharedLinks}
      CardComponent={CardSharedMd}
      setIsLoading={setIsLoading}
      multi={true}
    />
  );
}
