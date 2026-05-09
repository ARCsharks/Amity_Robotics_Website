import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import media from "../assets/media.jpg"

export default function Home() {
  return (
    <div>
      <PageHeader title="ARC Sharks" image_path={media} />
      <div className="relative min-h-screen flex items-center justify-center text-center mx-auto">
    
        {/* Background glow */}
        <div className="absolute bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

        {/* Content */}
        <div className="z-10 flex flex-col items-center ">
        
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00f0ff] drop-shadow-[0_0_25px_#00f0ff]"
          >
            Who are we?
          </motion.h1>

          <p className="mt-6 text-cyan-400 max-w-xl">
            ARC Sharks is a robotics club based in Amity College Prestons. ARC stands for Amity Robotics Club. We are a group of passionate students, guided by teachers, who want to explore further innovation.
            Currently, we are registered for the FRC (First Robotics Competition) and FTC (First Tech Challenge). These competitions host multiple events that our team can attend. 
          </p>

        </div>
      </div>
    </div>  
  );
}