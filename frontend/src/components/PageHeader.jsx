export default function PageHeader({ title, image_path }) {
  return (
    <div
      className="page-title bg-contain bg-center w-full h-[300px] aspect-[4/1] bg-no-repeat bg-center flex items-center image-center justify-center"
      style={
        image_path
          ? { backgroundImage: `url(${image_path})`, backgroundSize: "cover", backgroundPosition: "center" }
          : {}
      }
    >
      <h1 className="heading-space text-[#E6FBFF] drop-shadow-[0_0_18px_#00D9FF] font-bold text-[64px] text-center font-orbitron">
        {title}
      </h1>
    </div>
  );
}
