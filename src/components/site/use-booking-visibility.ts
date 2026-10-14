import { useEffect, useState, type RefObject } from "react";

export function useBookingVisibility(
  sectionRef: RefObject<HTMLElement | null>,
): boolean {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionRef]);
  return visible;
}
