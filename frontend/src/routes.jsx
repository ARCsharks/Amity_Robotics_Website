import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Robots from "./pages/Robots";
import Team from "./pages/Team";
import News from "./pages/News";
import ContactUs from "./pages/ContactUs";
import Sponsors from "./pages/Sponsors";
import BecomeASponsor from "./pages/BecomeSponsor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/top" element={<Home />} />
      <Route path="/robots" element={<Robots />} />
      <Route path="/team" element={<Team />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/sponsors/become-a-sponsor" element={<BecomeASponsor />} />
    </Routes>
  );
}