import PageHeader from "../components/PageHeader";
import placeHolder from "../assets/arcSharksLogo.png"
import xLogo from "../assets/xLogo.png"
import linkedinLogo from "../assets/linkedinLogo.png"
import facebookLogo from "../assets/facebookLogo.png"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSponsorData } from "../services/sponsorService";
import ScrollReveal from "../components/ScrollReveal";

const MotionAnchor = motion.a;

export default function Sponsors() {
  const [sponsorData, setSponsorData] = useState({
    sponsor: [],
    tier: []
  });

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsorData();
        setSponsorData({
          sponsor: data.sponsor || [],
          tier: data.tier || []
        });
        console.log("Fetched sponsor data:", data);
      } catch (err) {
        console.error("Failed to fetch sponsors and tiers:", err);
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

  const socialLabelProvider = (type) => {
    if (type === "x") return "X";
    if (type === "facebook") return "Facebook";
    if (type === "linkedin") return "LinkedIn";
    return type;
  };

  const getSponsorSocials = (socials) => {
    if (!socials) return [];

    return Object.values(socials).filter((social) => (
      social?.socialType && social?.socialLink
    ));
  };

  const getSponsorsByTier = (sponsors, tier) => {
    return sponsors.filter(s => s.tier === tier.key);
  };

  return (
    <div className=" ">
      <PageHeader title="SPONSORS" />

      {/* Thx Message */}
      <ScrollReveal className="mx-auto mt-[40px] max-w-[820px] px-[24px] text-center">
        <p className="rounded-[8px] border border-cyan-500/30 bg-black/35 px-6 py-5 text-[18px] leading-relaxed text-[#E6FBFF] shadow-[0_0_24px_rgba(0,217,255,0.12)] backdrop-blur-lg font-playfair">
          We are incredibly grateful to the organisations that support ARC Sharks.
          Their contributions help us build, compete, and inspire the next generation
          of engineers and innovators.
        </p>
      </ScrollReveal>

      {/* TIERS */}
      {sponsorData.tier.map((tier) => (

        <ScrollReveal key={tier.key} className="py-[64px] px-[24px] text-center">
          <h2 className="mb-[40px] pb-7 text-[44px] font-semibold tracking-wide text-[#E6FBFF] drop-shadow-[0_0_18px_rgba(0,217,255,0.35)] sm:text-[64px] font-orbitron">
            {tier.name}
          </h2>

          <div className={`sponsors-grid ${tier.key}`}>
            {getSponsorsByTier(sponsorData.sponsor, tier).length === 0 ? (
              <p className="text-slate-400 col-span-full">Coming soon</p>
            ) : (
              getSponsorsByTier(sponsorData.sponsor, tier).map((sponsor, i) => (
                <article
                  key={i}
                  className={`sponsor-card ${tier.key} border-[2px] border-black`}
                >
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${sponsor.name} website`}
                      className="absolute inset-0 z-0 rounded-[12px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                    />
                  )}

                  <div className="sponsor-card-main pointer-events-none">
                    <img
                      src={sponsor.logo_data || sponsor.logo || placeHolder}
                      alt={sponsor.name}
                      onError={(event) => {
                        event.currentTarget.src = placeHolder;
                      }}
                      className="sponsor-logo logo"
                    />
                    <h3 className="sponsor-name">
                      {sponsor.name}
                    </h3>
                  </div>

                  {sponsor.description && (
                    <p className="sponsor-description pointer-events-none">
                      {sponsor.description}
                    </p>
                  )}

                  <div className="sponsor-actions">
                    {getSponsorSocials(sponsor.socials).length > 0 && (
                      <div className="flex flex-wrap items-center gap-[8px]" aria-label={`${sponsor.name} social links`}>
                        {getSponsorSocials(sponsor.socials).map((social) => (
                          <a
                            key={`${social.socialType}-${social.socialLink}`}
                            href={social.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${sponsor.name} on ${socialLabelProvider(social.socialType)}`}
                            title={socialLabelProvider(social.socialType)}
                            className="group inline-flex h-[40px] w-[40px] items-center justify-center rounded-[8px] border border-slate-900/15 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:-translate-y-[1px] hover:border-cyan-500 hover:bg-cyan-50 hover:shadow-[0_12px_24px_rgba(8,145,178,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                          >
                            <img
                              src={socialLogoProvider(social.socialType)}
                              alt=""
                              className="h-[19px] w-[19px] object-contain transition group-hover:scale-110"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                </article>
              ))
            )}
          </div>
        </ScrollReveal>
      ))}

      {/* Sponsor Us Section */}
      <ScrollReveal className="mx-auto max-w-[1000px] px-[24px] py-[80px] text-center">
        <div className="become-sponsor-cta">
          <h2 className="mb-[16px] text-[32px] font-semibold leading-tight text-[#E6FBFF] drop-shadow-[0_0_14px_rgba(0,217,255,0.45)] sm:text-[40px] font-orbitron">
            Interested in becoming a sponsor?
          </h2>

          <p className="mx-auto mb-[24px] max-w-[620px] pb-7 pt-3 text-[18px] leading-relaxed text-gray-300 font-playfair">
            Partner with ARC Sharks and support STEM education while gaining
            meaningful brand exposure.
          </p>

          <MotionAnchor
            href="/sponsors/become-a-sponsor"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="
              inline-block
              rounded-[8px]
              border
              border-cyan-400
              bg-cyan-500/30
              px-[24px]
              py-[12px]
              font-medium
              text-white
              shadow-[0_0_22px_rgba(0,217,255,0.24)]
              transition
              hover:bg-cyan-400
              hover:text-slate-950
              hover:shadow-[0_0_30px_rgba(0,217,255,0.45)]
            "
          >
            View Sponsorship Packages
          </MotionAnchor>
        </div>

      </ScrollReveal>

    </div>
  );
}
