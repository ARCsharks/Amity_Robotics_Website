import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import media from "../assets/media.JPG";
import Slideshow from "../components/Slideshow";
import ScrollReveal from "../components/ScrollReveal";

const imageModules = import.meta.glob("../assets/ClubSlideshow/*.{JPG,png}", {
  import: "default",
});

export default function Home() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    let isMounted = true;

    Promise.all(Object.values(imageModules).map((loadImage) => loadImage())).then((images) => {
      if (isMounted) setImageList(images);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <PageHeader title="ARC Sharks" image_path={media} />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center overflow-x-hidden px-4 pb-24 text-center">
        <div className="absolute h-72 w-72 rounded-full bg-cyan-500 opacity-20 blur-3xl" />

        <div className="z-10 flex w-full flex-col items-center">
          <Slideshow photo_list={imageList} className="pb-4" />

          <div className="mx-auto flex w-full max-w-[980px] flex-col gap-14 px-0 pt-16 sm:px-4">
            <ScrollReveal>
              <section className="rounded-[8px] border border-cyan-500/25 bg-black/35 px-5 py-8 text-left shadow-[0_0_34px_rgba(0,217,255,0.12)] backdrop-blur-lg sm:px-8 sm:py-10">
                <h1 className="break-words text-center text-3xl font-bold text-[#E6FBFF] drop-shadow-[0_0_14px_#00D9FF] sm:text-5xl md:text-6xl font-orbitron">
                  Who are we?
                </h1>

                <p className="mx-auto mt-6 w-full max-w-3xl break-words text-center text-base leading-relaxed text-gray-100 sm:text-lg md:text-xl font-playfair">
                  ARC Sharks Robotics is the official FIRST Robotics team of Amity College in Sydney,
                   bringing together passionate students with a shared interest in
                   science, technology, engineering, and mathematics (STEM). 
                   Competing in the FIRST Tech Challenge (FTC) and FIRST Robotics Competition (FRC), our team 
                   designs, builds, programs, and operates high-performance robots 
                   while developing real-world skills that extend far beyond the classroom.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="rounded-[8px] border border-cyan-500/25 bg-slate-950/55 px-5 py-8 text-left shadow-[0_0_34px_rgba(0,217,255,0.12)] backdrop-blur-lg sm:px-8 sm:py-10">
                <h1 className="break-words text-center text-3xl font-bold text-[#E6FBFF] drop-shadow-[0_0_14px_#00D9FF] sm:text-5xl md:text-6xl font-orbitron">
                  Our Story
                </h1>

                <p className="mx-auto mt-6 w-full max-w-3xl break-words text-center text-base leading-relaxed text-gray-100 sm:text-lg md:text-xl font-playfair">
                  ARC Sharks Robotics was founded in early 2024 when one of our teachers, now our mentor
                  started a robotics club at amity college. A group of enthusiastic students came together,
                  many with little to no prior experience in robotics yet eager to learn and take on the
                  challenge.

                  After learning the basics of engineering, CAD, Programming, and teamwork, we entered our
                  First competition, the Duel Down Under FRC Off seasin event with nothing more then a 
                  simple robot frame. We were surrounded by experienced teams and impressive robots, we
                  learned valuable lessoons about strategy, collaboration, and perseverance. Eventually
                  we went on to win the event as we were selected by the top ranked alliance. That 
                  unforgettable experience ignited our passion to strive for excellence and become the best.

                  Today, ARC Sharks robotics had grown not only in size but in skill and we are now looking 
                  forward to try and compete in more competitions not only in sydney but also across australia.
                  As we continue to grow, we remain commited to our mission; to challenge ourselves,
                  inspire others, and make a positive impact through robotics.
                  
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal className="pt-10">
              <section className="relative overflow-hidden rounded-[8px] border border-cyan-400/35 bg-black/45 px-5 py-10 shadow-[0_0_42px_rgba(0,217,255,0.18)] backdrop-blur-lg sm:px-10 sm:py-12">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <p className="mx-auto w-full max-w-3xl break-words text-xl font-semibold leading-relaxed text-[#E6FBFF] sm:text-2xl md:text-3xl font-playfair">
                  "At ARC Sharks, we believe everyone should have a chance at
                  robotics, no matter who they are or where they come from. We strive
                  to create a welcoming environment where all students can explore,
                  learn, and grow through STEM and robotics."
                </p>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </main>
    </div>
  );
}
