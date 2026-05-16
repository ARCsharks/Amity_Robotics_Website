import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import media from "../assets/media.jpg";
import Slideshow from "../components/Slideshow";

const images = import.meta.glob("../assets/ClubSlideshow/*.{JPG,png}", {
  eager: true,
});

const imageList = Object.values(images).map((mod) => mod.default);

export default function Home() {
  return (
    <div>
      <PageHeader title="ARC Sharks" image_path={media} />
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center overflow-x-hidden px-4 pb-24 text-center">
        <div className="absolute h-72 w-72 rounded-full bg-cyan-500 opacity-20 blur-3xl" />

        <div className="z-10 flex w-full flex-col items-center">
          <Slideshow photo_list={imageList} />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 break-words text-3xl font-bold text-white drop-shadow-[0_0_10px_#00f0ff] sm:text-5xl md:text-6xl"
          >
            Who are we?
          </motion.h1>

          <p className="mt-6 w-full max-w-3xl break-words text-base leading-relaxed text-white sm:text-lg md:text-xl">
            ARC Sharks is a robotics club based in Amity College Prestons. ARC
            stands for Amity Robotics Club. We are a group of passionate
            students, guided by teachers, who want to explore further
            innovation. Currently, we are registered for the FRC (First Robotics
            Competition) and FTC (First Tech Challenge) competitions. These
            competitions host multiple events that our team can attend.
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-20 break-words text-3xl font-bold text-white drop-shadow-[0_0_10px_#00f0ff] sm:text-5xl md:text-6xl"
          >
            Our Story
          </motion.h1>

          <p className="mt-6 w-full max-w-3xl break-words text-base leading-relaxed text-white sm:text-lg md:text-xl">
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

          <p className="mt-6 w-full max-w-3xl break-words pt-40 text-xl font-semibold leading-relaxed text-white sm:text-2xl md:text-3xl">
            "At ARC Sharks, we believe everyone should have a chance at
            robotics, no matter who they are or where they come from. We strive
            to create a welcoming environment where all students can explore,
            learn, and grow through STEM and robotics."
          </p>
        </div>
      </main>
    </div>
  );
}
