import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  onLoad: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  observerOptions?: IntersectionObserverInit;
};

export const useInfiniteScroll = ({
  onLoad,
  hasNextPage = false,
  isLoading = false,
  observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  },
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const { root = null, rootMargin = "0px", threshold = 0.5 } = observerOptions;

  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoad();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [onLoad, hasNextPage, isLoading, root, rootMargin, threshold]);

  return observerRef;
};
