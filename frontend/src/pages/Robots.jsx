import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { getRobots } from "../services/robotService";
import placeHolder from "../assets/arcSharksLogo.png"

export default function Robots() {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const data = await getRobots();
        console.log(data)
        setRobots(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch robots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRobots();
  }, []);

  // Group robots by year
  const robotsByYear = robots.reduce((acc, robot) => {
    if (!acc[robot.year]) acc[robot.year] = [];
    acc[robot.year].push(robot);
    return acc;
  }, {});

  // Sort years (latest first)
  const years = Object.keys(robotsByYear).sort((a, b) => b - a);

  return (
    <div className=" ">
      <PageHeader title="OUR ROBOTS" />

      {loading ? (
        <p className="text-center text-cyan-300 mt-10">
          Loading robots...
        </p>
      ) : robots.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No robots found.
        </p>
      ) : (
        years.map((year) => (
          <div key={year} className="mt-[64px]">

            {/* Year Title */}
            <h2 className="text-[28px] text-cyan-300 font-bold text-center mb-[32px]">
              {year}
            </h2>

            {/* Grid */}
            <div className="
              flex flex-wrap 
              justify-center 
              gap-[40px] 
              mt-[20px] 
              max-w-[1000px] 
              mx-auto
            ">

              {robotsByYear[year].map((robot) => (
                <motion.div
                  key={robot.id}
                  whileHover={{ scale: 1.05 }}
                  className="
                    robots-grid
                    w-[calc(50%-20px)] 
                    lg:w-[calc(33.333%-27px)]
                    max-w-[300px]
                    aspect-square
                    flex flex-col
                    bg-white/5 backdrop-blur-lg
                    rounded-[16px]
                    border border-cyan-500
                    glow-hover
                    text-center
                    p-[16px]
                  "
                >

                  {/* IMAGE */}
                  <div className="w-full h-[70%] mb-[12px] overflow-hidden rounded-[12px]">
                    <img
                      src={robot.image_data || placeHolder}
                      alt={robot.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[20px] text-cyan-300 font-semibold">
                    {robot.name}
                  </h3>

                  {/* Details */}
                  <p className="text-[13px] text-cyan-300 font-robotica">
                    {robot.description}
                  </p>

                </motion.div>
              ))}

            </div>
          </div>
        ))
      )}
    </div>
  );
}

