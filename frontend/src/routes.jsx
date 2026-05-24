import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Home = lazy(() => import("./pages/Home"));
const Robots = lazy(() => import("./pages/Robots"));
const Team = lazy(() => import("./pages/Team"));
const News = lazy(() => import("./pages/News"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const BecomeASponsor = lazy(() => import("./pages/BecomeSponsor"));

function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-cyan-300 font-orbitron">
      Loading...
    </div>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <Suspense fallback={<PageLoading />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/top" element={<Home />} />
            <Route path="/robots" element={<Robots />} />
            <Route path="/team" element={<Team />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/sponsors/become-a-sponsor" element={<BecomeASponsor />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
