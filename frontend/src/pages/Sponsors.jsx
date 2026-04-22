import PageHeader from "../components/PageHeader";
import placeHolder from "../assets/arcSharksLogo.png"
import xLogo from "../assets/xLogo.png"
import linkedinLogo from "../assets/linkedinLogo.png"
import facebookLogo from "../assets/facebookLogo.png"
import { motion, scale } from "framer-motion";
import { useEffect, useState } from "react";
import { getSponsorData } from "../services/sponsorService";

export default function Sponsors() {
  const [sponsorData, setSponsorData] = useState({
    sponsor: [],
    tier: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsorData();
        console.log(data);
        setSponsorData({
          sponsor: data.sponsor || [],
          tier: data.tier || []
        });
      } catch (err) {
        console.error("Failed to fetch sponsors and tiers:", err);
      } finally {
        setLoading(false);
      }

    };

    fetchSponsors();
  }, []);

  const socialLogoProvider = (type) => {
    if (type === "x") {
      return xLogo;
    } else if (type === "facebook") {
      return facebookLogo;
    } else if (type === "linkedin") {
      return linkedinLogo
    } else {
      console.error(`Unknown social media account: ${type}`)
      return placeHolder
    }

  };

  const getSponsorsByTier = (sponsors, tier) => {
    return sponsors.filter(s => s.tier === tier.key);
  };

  const megladonSponsors = getSponsorsByTier(sponsorData.sponsor, "megladon")

  return (
    <div className=" ">
      <PageHeader title="SPONSORS" />

      {/* Thx Message */}
      <div className="text-center px-[24px] mt-[40px] max-w-[768px] mx-auto">
        <p className="text-[18px] text-cyan-400">
          We are incredibly grateful to the organisations that support ARC Sharks.
          Their contributions help us build, compete, and inspire the next generation
          of engineers and innovators.
        </p>
      </div>

      {/* TIERS */}
      {sponsorData.tier.map((tier) => (

        <section key={tier.key} className="py-[64px] px-[24px] text-center">
          <h2 className="text-[64px] font-semibold mb-[40px] tracking-wide pb-7">
            {tier.name}
          </h2>

          <div className={`sponsors-grid ${tier.key}`}>
            {getSponsorsByTier(sponsorData.sponsor, tier).length === 0 ? (
              <p className="text-slate-400 col-span-full">Coming soon</p>
            ) : (
              getSponsorsByTier(sponsorData.sponsor, tier).map((sponsor, i) => (
                <a
                  key={i}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`sponsor-card ${tier.key} border-[2px] border-black`}
                >
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="logo h-[48px] w-[48px] object-contain"
                    />
                    <h3 className="font-semibold text-[40px] text-black text-center tracking-wide leading-tight">
                      {sponsor.name}
                    </h3>
                  </div>

                  {sponsor.description && (
                    <p className="text-[14px] text-slate-600 mb-[8px] pl-13">
                      {sponsor.description}
                    </p>
                  )}

                  {sponsor.socials && (
                    <div className="flex gap-[8px] mt-[8px] pl-13">
                      {Object.entries(sponsor.socials).map(([type, url]) => (
                        <a
                          key={type}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          <img
                            src={socialLogoProvider(type)}
                            alt={`${sponsor.name}'s ${type}`}
                            className="h-[20px] w-[20px] border-1 border-black bg-red-50"
                          />

                        </a>
                      ))}
                    </div>
                  )}

                </a>
              ))
            )}
          </div>
        </section>
      ))}

      {/* Sponsor Us Section */}
      <section className="py-[80px] px-[24px] text-center">
        <h2 className="text-[24px] font-semibold mb-[16px] text-[40px]">
          Interested in becoming a sponsor?
        </h2>

        <p className="mb-[24px] text-black pb-7 pt-3">
          Partner with ARC Sharks and support STEM education while gaining
          meaningful brand exposure.
        </p>

        <motion.a
          href="/sponsors/become-a-sponsor"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
          className="
            inline-block
            px-[24px]
            py-[12px]
            rounded-[8px]
            font-medium
            bg-slate-900
            text-white
            hover:opacity-90
            transition
          "
        >
          View Sponsorship Packages
        </motion.a>

      </section>

    </div>
  );
}