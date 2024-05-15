import { useEffect, useRef, useState } from "react";

const LazyComponent = ({
  children,
  onLoadMore,
}: {
  children: React.ReactNode;
  onLoadMore: () => void;
}) => {
  // Intersection Observer state
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer callback
  const observerCallback: IntersectionObserverCallback = ([entry]) => {
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // Trigger when 50% of the component is visible
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [observerCallback]);

  // Check if the component is visible and notify parent to load more items
  useEffect(() => {
    if (isVisible) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore]);

  // Render the LazyComponent with the provided children
  return <div ref={ref}>{children}</div>;
};

export default LazyComponent;
