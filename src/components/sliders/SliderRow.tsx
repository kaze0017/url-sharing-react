import { get } from "http";
import React, { useRef, useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";


interface SliderProps {
  CardComponent: React.ComponentType<any>; // Accepts any React component
  data : any;
  cardsSize: "small" | "medium" | "large" | "xlarge";
  cardType?: "category" | "link";
}

export default function SliderRow({
  CardComponent,
  cardsSize,
  cardType,
  data,
}: SliderProps) {

  console.log("data from slider", data);
  const cardWidth =
    cardsSize === "small"
      ? 100
      : cardsSize === "medium"
      ? 200
      : cardsSize === "large"
      ? 300
      : 400;

  const cardHeight = cardType === "category" ? 80 : 150;

  const sliderRef = useRef<HTMLDivElement>(null);

  // Container width
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfCardsPerSlide, setNumberOfCardsPerSlide] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [cardsData, setCardsData] = useState<any[]>(data);
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0]?.contentRect.width || 0;
      setContainerWidth(newWidth);
    });

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const loadingCardStyle = `flex justify-center items-center ${
    "w-[" + cardWidth + "px]"
  } ${cardType === "category" ? "h-[70px]" : "aspect-video"} mx-auto`;

  useEffect(() => {
    if (containerWidth === 0) {
      return;
    }

    setNumberOfCardsPerSlide(Math.floor(containerWidth / (cardWidth + 20)));
    setCurrentSlideIndex(0);
  }, [containerWidth, cardWidth]);

  function handlePrev() {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else {
      // setIsLoading(true);
      setTimeout(() => {
        const numberOfSlides = Math.ceil(
          cardsData.length / numberOfCardsPerSlide
        );
        setCurrentSlideIndex(numberOfSlides - 1);
        setCurrentPage(currentPage - 1);
        // setIsLoading(false);
      }, 0);
    }
  }

  function handleNext() {
    const numberOfSlides = Math.ceil(cardsData.length / numberOfCardsPerSlide);
    if (currentSlideIndex < numberOfSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      // setIsLoading(true);

      setTimeout(() => {
        setCurrentSlideIndex(0);
        setCurrentPage(currentPage + 1);
        // setIsLoading(false);
      }, 0);
    }
  }

  const loadingWidth = cardType === "category" ? "50" : "100";

  return (
    <>
      {isLoading ? (
        <div className={loadingCardStyle}>
          <img
            src="/images/assets/loading.svg"
            alt=""
            width={loadingWidth}
            height={"150"}
          />
        </div>
      ) : (
        <div
          ref={sliderRef}
          className="relative justify-center flex overflow-hidden w-full p-2 gap-4"
          style={{ cursor: "grab" }}
          onMouseDown={(e) => {
            e.preventDefault();
            let isDown = true;
            let startX = e.pageX - (sliderRef.current?.offsetLeft || 0);
            let scrollLeft = sliderRef.current?.scrollLeft || 0;

            const onMouseMove = (e: MouseEvent) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
              const walk = (x - startX) * 3; //scroll-fast
              if (sliderRef.current) {
                sliderRef.current.scrollLeft = scrollLeft - walk;
              }
            };

            const onMouseUp = () => {
              isDown = false;
              if (sliderRef.current) {
                sliderRef.current.style.cursor = "grab";
              }
            };

            const onMouseLeave = () => {
              isDown = false;
              if (sliderRef.current) {
                sliderRef.current.style.cursor = "grab";
              }
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            document.addEventListener("mouseleave", onMouseLeave);

            if (sliderRef.current) {
              sliderRef.current.style.cursor = "grabbing";
            }
          }}
          onWheel={(e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
              handlePrev();
            } else {
              handleNext();
            }
          }}
        >
          <button
            className="absolute top-[50%] left-0 transform -translate-y-1/2"
            onClick={handlePrev}
          >
            <FcPrevious className="text-3xl" />
          </button>
          {cardsData
            .slice(
              currentSlideIndex * numberOfCardsPerSlide,
              (currentSlideIndex + 1) * numberOfCardsPerSlide
            )
            .map((cardData, index) => (
              <div key={index} className={`w-${100 / numberOfCardsPerSlide}%`}>
                <CardComponent link={cardData} variant={cardsSize} />
              </div>
            ))}
          <button
            className="absolute top-[50%] right-0 transform -translate-y-1/2"
            onClick={handleNext}
          >
            <FcNext className="text-3xl" />
          </button>
        </div>
      )}
    </>
  );
}
