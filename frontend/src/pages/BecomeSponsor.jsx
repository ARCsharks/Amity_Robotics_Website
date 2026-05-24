import PageHeader from "../components/PageHeader";
import sponsorPackage from "../assets/sponsorPackages.pdf";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import LazyIframe from "../components/LazyIframe";

export default function BecomeASponsor() {
  const contactForm = "/contact-us";

  return (
    <div>
      <PageHeader title="BECOME A SPONSOR" />

      
      <ScrollReveal>
        <LazyIframe
          src={sponsorPackage}
          title="Sponsor Packages"
          className="h-screen w-full rounded-xl px-20"
        />
      </ScrollReveal>

      
      <ScrollReveal className="mx-auto mt-16 mb-16 w-full max-w-[1000px] px-4 text-center">
        <div className="become-sponsor-cta">

          <h3 className="text-[32px] font-bold leading-tight text-[#E6FBFF] drop-shadow-[0_0_14px_rgba(0,217,255,0.45)] sm:text-[40px] font-orbitron">
            Are you ready to dive deeper with ARC Sharks?
          </h3>

          <p className="mx-auto mt-4 max-w-[620px] pt-2 text-[18px] leading-relaxed text-gray-300 sm:text-[20px] font-playfair">
            Partner with us and support future innovators.
          </p>

          <motion.a
            href={contactForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              inline-block
              mt-8
              rounded-[8px]
              border
              border-cyan-400
              bg-cyan-500/30
              px-8
              py-4
              font-semibold
              text-white
              shadow-[0_0_22px_rgba(0,217,255,0.24)]
              transition
              hover:bg-cyan-400
              hover:text-slate-950
              hover:shadow-[0_0_30px_rgba(0,217,255,0.45)]
            "
          >
            Contact Form
          </motion.a>
        </div>
      </ScrollReveal>
    </div>
  );
}
