export default function PageHeader({ title, image_path, takeFullHeight, classname}) {


  const windowHight = window.innerHeight
  // However, i need to incorporate takefullhight later cause rn its just using hight based on if theres an image provided
  return (
    <div
      className="page-title bg-contain bg-center w-full h-[300px] aspect-[4/1] bg-no-repeat bg-center flex items-center image-center justify-center " {...classname}
      style={
        image_path
          ? { backgroundImage: `url(${image_path})`, backgroundSize: "cover", backgroundPosition: "center", height: `${windowHight}px`, borderBottom: "0px" }
          : {}
        
      }
    >
      <h1 className="heading-space text-[#E6FBFF] drop-shadow-[0_0_18px_#00D9FF] font-bold text-[80px] text-center font-orbitron"
        style={
          image_path
            ? { paddingBottom: "600px" }
            : {}

        }
      >
        {title}
      </h1>
    </div>
  );
}
