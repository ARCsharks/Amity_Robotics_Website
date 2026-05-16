export default function Slideshow({ photo_list }) {
  const images = photo_list?.length
    ? photo_list
    : [
        "https://picsum.photos/id/1015/400/250",
        "https://picsum.photos/id/1016/400/250",
      ];

  return (
    <div className="w-screen overflow-hidden bg-black py-6">
      <div className="flex animate-scroll gap-6 min-w-max">
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            className="w-[70vw] sm:w-[400px] h-[200px] sm:h-[250px] object-cover rounded-2xl flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
