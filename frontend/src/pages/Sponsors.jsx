import PageHeader from "../components/PageHeader";
import placeHolder from "../assets/arcSharksLogo.png"
import xLogo from "../assets/xLogo.png"
import linkedinLogo from "../assets/linkedinLogo.png"
import facebookLogo from "../assets/facebookLogo.png"

export default function Sponsors() {
  const sponsorTiers = [
    {
      key: "megalodon",
      title: "MEGALODON SPONSORS",
      fields: ["logo", "name", "description", "website", "socials"],
      sponsors: [
        {
          name: "Company A",
          logo: placeHolder,
          description: "Top tier sponsor supporting innovation.",
          website: "https://example.com",
          socials: {
            x: "https://x.com/companyA",
            linkedin: "https://linkedin.com/companyA",
          },
        },
      ],
    },
    {
      key: "greatwhite",
      title: "GREAT WHITE SPONSORS",
      fields: ["logo", "name", "website"],
      sponsors: [
        {
          name: "Company B",
          logo: placeHolder,
          website: "https://example.com",
        },
      ],
    },
    {
      key: "tiger",
      title: "TIGER SHARK SPONSORS",
      fields: ["logo", "name", "website"],
      sponsors: [],
    },
    {
      key: "hammerhead",
      title: "HAMMERHEAD SPONSORS",
      fields: ["logo", "name", "website"],
      sponsors: [],
    },
  ];

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

  return (
    <div className=" ">
      <PageHeader title="SPONSORS" />

      {/* Thx Message */}
      <div className="text-center px-[24px] mt-[40px] max-w-[768px] mx-auto">
        <p className="text-[18px] text-slate-600">
          We are incredibly grateful to the organisations that support ARC Sharks.
          Their contributions help us build, compete, and inspire the next generation
          of engineers and innovators.
        </p>
      </div>

      {/* TIERS */}
      {sponsorTiers.map((tier) => (
        <section key={tier.key} className="py-[64px] px-[24px] text-center">
          <h2 className="text-[64px] font-semibold mb-[40px] tracking-wide pb-7">
            {tier.title}
          </h2>

          <div className={`sponsors-grid ${tier.key}`}>
            {tier.sponsors.length === 0 ? (
              <p className="text-slate-400 col-span-full">Coming soon</p>
            ) : (
              tier.sponsors.map((sponsor, i) => (
                <a
                  key={i}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card"
                >
                  <div className="flex items-center gap-[12px] mb-[12px]">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-[48px] w-[48px] object-contain"
                    />
                    <h3 className="font-semibold text-[40px] text-black">
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
        <h2 className="text-[24px] font-semibold mb-[16px]">
          Interested in becoming a sponsor?
        </h2>
        <p className="text-slate-600 mb-[24px]">
          Partner with ARC Sharks and support STEM education while gaining
          meaningful brand exposure.
        </p>

        <a
          href="/sponsors/become-a-sponsor"
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
        </a>
      </section>
    </div>
  );
}