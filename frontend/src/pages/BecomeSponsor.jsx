import PageHeader from "../components/PageHeader";
import sponsorPackage from "../assets/sponsorPackages.pdf";
import { motion } from "framer-motion";
import { getSponsorData } from "../services/sponsorService";
import { useEffect, useState } from "react";

export default function BecomeASponsor() {
  const [sponsorData, setSponsorData] = useState({
    tier: [],
  });

  const [loading, setLoading] = useState(true);

  const contactForm = "/contact-us";

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        const data = await getSponsorData();
        setSponsorData({
          tier: data.tier || [],
        });
      } catch (err) {
        console.error("Failed to fetch tiers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  return (
    <div>
      <PageHeader title="BECOME A SPONSOR" />

      
      <iframe
        src={sponsorPackage}
        title="Sponsor Packages"
        className="w-full h-screen rounded-xl px-20"
      />

      
      <div className="mt-16 text-center">

        <h3 className="text-[40px] font-bold text-slate-900 leading-tight">
          Are you ready to dive deeper with ARC Sharks?
        </h3>

        <p className=" text-[20px] text-slate-600 mt-3 pt-5">
          Partner with us and support future innovators.
        </p>

        <motion.a
          href={contactForm}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="
            inline-block
            mt-6
            px-8
            py-4
            rounded-xl
            font-semibold
            bg-slate-900
            text-white
            shadow-lg
            hover:shadow-xl
          "
        >
          Contact Form
        </motion.a>
      </div>
    </div>
  );
}