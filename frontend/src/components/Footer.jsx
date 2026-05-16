import { Link } from "react-router-dom";
import logo from "../assets/arcSharksLogo.png"

export default function Footer() {
  return (
    <footer className="footer mt-15 min-h-[200px] border-t border-cyan-500">

      <div className="max-w-[1200px] mx-auto px-[24px] py-[50px]">

        <div className="flex flex-col md:flex-row justify-between items-center gap-[30px]">

          <h2 className="text-cyan-400 font-bold text-xl">
            <img src={logo} alt="Logo" width={100} height={100} />
            
          </h2>

          <div className="flex gap-[30px] text-gray-300">
            <Link className="hover:text-cyan-400" to="/">Home</Link>
            <Link className="hover:text-cyan-400" to="/robots">Robots</Link>
            <Link className="hover:text-cyan-400" to="/team">Team</Link>
          </div>

        </div>

        <div className="h-[1px] bg-cyan-500/30 my-[30px]" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-[20px] text-gray-400 text-sm">

          <p>
            © {new Date().getFullYear()} ARC Sharks. All rights reserved.
          </p>

          <div className="flex gap-[20px]">
            <a href="https://www.youtube.com/@ARCSharksRobotics" target="_blank" className="hover:text-cyan-400">Youtube</a>
            <a href="https://www.tiktok.com/@arcsharksrobotics" target="_blank" className="hover:text-cyan-400">TikTok</a>
            <a href="https://www.instagram.com/arcsharksrobotics/" target="_blank" className="hover:text-cyan-400">Instagram</a>
          </div>

        </div>

      </div>

    </footer>
  );
}