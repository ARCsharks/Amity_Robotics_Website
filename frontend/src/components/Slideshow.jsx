export default function Slideshow({ photo_list }) {
  const images = photo_list || [];

  if (!images.length) {
    return (
      <section className="slideshow-shell w-screen overflow-hidden py-[28px]">
        <div className="mx-auto h-[220px] w-[78vw] max-w-[560px] rounded-[14px] border border-cyan-500/30 bg-black/30" />
      </section>
    );
  }

  return (
    <section className="slideshow-shell w-screen overflow-hidden py-[28px]">
      <div className="slideshow-track flex animate-scroll min-w-max">
        {[0, 1].map((group) => (
          <div className="slideshow-group" key={group} aria-hidden={group === 1}>
            {images.map((src, index) => (
              <div className="slideshow-card" key={`${group}-${src}-${index}`}>
                <img
                  src={src}
                  alt=""
                  className="slideshow-image"
                  loading={group === 0 && index < 2 ? "eager" : "lazy"}
                  fetchPriority={group === 0 && index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
