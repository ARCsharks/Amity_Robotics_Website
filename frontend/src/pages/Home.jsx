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
                  ARC Sharks is a robotics club based in Amity College Prestons. ARC
                  stands for Amity Robotics Club. We are a group of passionate
                  students, guided by teachers, who want to explore further
                  innovation. Currently, we are registered for the FRC (First Robotics
                  Competition) and FTC (First Tech Challenge) competitions. These
                  competitions host multiple events that our team can attend.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="rounded-[8px] border border-cyan-500/25 bg-slate-950/55 px-5 py-8 text-left shadow-[0_0_34px_rgba(0,217,255,0.12)] backdrop-blur-lg sm:px-8 sm:py-10">
                <h1 className="break-words text-center text-3xl font-bold text-[#E6FBFF] drop-shadow-[0_0_14px_#00D9FF] sm:text-5xl md:text-6xl font-orbitron">
                  Our Story
                </h1>

                <p className="mx-auto mt-6 w-full max-w-3xl break-words text-center text-base leading-relaxed text-gray-100 sm:text-lg md:text-xl font-playfair">
                  ARC Sharks started in the beggining of 2024, when one of our
                  teachers (now our mentor) wanted to start a robotics club at our
                  school. He sent sent an announcement to everyone that there would be
                  a session after school on a Monday. There was a bunch of interested
                  students that turned up, but no one had any, or lot's of, experience
                  with building robots. Our mentor tought us the basics of everything,
                  from CAD, to programming and fundraising. Then, it was time. We built
                  just a robot frame and entered the Duel Down Under FRC off-season
                  competition, where we were overwhelmed by other robots. However, we
                  learnt many different other skills, such as strategy and time
                  management. In the end, while we where last in the qualifiers, we won
                  the competition by winning the finals as we were chosen by Alliance
                  1. This gave us encouragment. After that competition, our team has
                  been growing in both numbers and skills. Now we have participated
                  many other competitions, such as the FRC Southern-Cross Qualifiers
                  and the FTC North-Sydney Qualifiers.
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
