import { Link } from "react-router-dom";
import logo from "../assets/arcSharksLogo.png"
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);

    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)

  });

  return (
    <nav
      className={`navbar fixed z-[9999] transition-all duration-300
        ${
          isMobile
            ? "top-0 left-0 w-full"
            : "top-[16px] left-1/2 -translate-x-1/2 w-full max-w-[1000px] px-[16px]"
        }
      `}
    >
  
      <div
        className={`noot flex items-center justify-between px-[12px] h-[42px]
          border border-cyan-500 bg-black/60 backdrop-blur-lg pt-[4px]
          ${
            isMobile
              ? "rounded-none border-x-0 border-t-0"
              : "rounded-[15px] mx-[16px] "
          }
        `}
      >

        <Link to="/">
      
          <h1 className="text-cyan-400 font-bold text-[30px] flex items-center gap-2">
            <img src={logo} alt="ARC Sharks Logo" width="30" height="30" />
            ARC Sharks
          </h1>

        </Link>

        {/* Desktop */}
        {!isMobile && (
          <div className="flex gap-[40px] text-[16px]">
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/">Home</Link>
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/robots">Robots</Link>
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/team">Team</Link>
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/sponsors">Sponsors</Link>
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/news">News</Link>
            <Link className="hover:text-cyan-400 glow-hover whitespace-nowrap" to="/contact-us">Contact Us</Link>
          </div>
        )}

        {/* Mobile */}
        {isMobile && (
          <button
            className="menu-btn text-cyan-400 text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        )}

      </div>

      {/* Mobile Menu */}
      {isMobile && open && (
        <div className="boot mt-[10px] rounded-2xl border border-cyan-500 bg-black/80 flex flex-col items-center py-[20px] gap-[20px]">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/robots">Robots</Link>
          <Link onClick={() => setOpen(false)} to="/team">Team</Link>
          <Link onClick={() => setOpen(false)} to="/sponsors">Sponsors</Link>
          <Link onClick={() => setOpen(false)} to="/news">News</Link>
          <Link onClick={() => setOpen(false)} to="/contact-us">Contact Us</Link>
        </div>
      )}

    </nav>
  );
}