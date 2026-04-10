import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}