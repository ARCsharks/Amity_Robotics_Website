import { useEffect, useRef, useState } from "react";

export default function LazyIframe({ src, title, className = "" }) {
  const frameRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !frameRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );

    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={frameRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="h-full w-full rounded-xl"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl border border-cyan-500/40 bg-black/40 text-cyan-300">
          Loading sponsor packages...
        </div>
      )}
    </div>
  );
}
