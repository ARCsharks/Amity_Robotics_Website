import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center mx-auto">
      
      {/* Background glow */}
      <div className="absolute bg-cyan-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00f0ff] drop-shadow-[0_0_25px_#00f0ff]"
        >
          ARC Sharks
        </motion.h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          We're broke. We need money 😭
        </p>

      </div>
    </div>
  );
}