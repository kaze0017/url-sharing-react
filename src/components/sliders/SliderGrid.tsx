import { useRef, useEffect, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

interface SliderProps {
  CardComponent: React.ComponentType<any>;
  getData: () => any[];
  cardSize: "small" | "medium" | "large" | "xlarge";
  cardType?: "category" | "link";
  query?: string;
  sort?: string;
}

export default function SliderGrid({
  CardComponent,
  getData,
  cardSize,
  cardType,
  query,
  sort,
}: SliderProps) {
  const cardWidth =
    cardSize === "small"
      ? 100
      : cardSize === "medium"
      ? 200
      : cardSize === "large"
      ? 300
      : 400;

  const cardHeight = cardType === "category" ? 80 : 150;

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [cardsData, setCardsData] = useState<any[]>([]);
  const [cardsDataToDisplay, setCardsDataToDisplay] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [sortType, setSortType] = useState(sort);

  useEffect(() => {
    setCardsData(getData());
    setCardsDataToDisplay(getData());
  }, [getData]);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    setSortType(sort);
  }, [sort]);

  useEffect(() => {
    const filteredData = cardsData.filter((data) =>
      data.title.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setCardsDataToDisplay(filteredData);
  }, [searchQuery, cardsData]);

  useEffect(() => {
    if (sortType === "saved") {
      const sortedData = cardsData.sort((a, b) => b.saved - a.saved);
      setCardsDataToDisplay(sortedData);
    } else if (sortType === "shared") {
      const sortedData = cardsData.sort((a, b) => b.shared - a.shared);
      setCardsDataToDisplay(sortedData);
    } else if (sortType === "ranked") {
      const sortedData = cardsData.sort((a, b) => b.ranked - a.ranked);
      setCardsDataToDisplay(sortedData);
    }
  }, [sortType, cardsData]);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);

  const wrapperClass = `p-2 flex flex-wrap grow gap-1 w-[100%] overflow-x-hidden overflow-y-hidden scrollbar-hide `;

  return (
    <div
      ref={ref}
      className={wrapperClass}
      style={{ width: "100%" }}
      {...events}
    >
      {cardsDataToDisplay.map((data, index) => (
        <CardComponent key={index} sharedLink={data} />
      ))}
    </div>
  );
}
