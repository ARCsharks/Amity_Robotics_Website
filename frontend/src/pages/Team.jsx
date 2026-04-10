import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTeams } from "../services/teamService";
import placeHolder from "../assets/arcSharksLogo.png"

export default function Team() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchTeams = async () => {
        try {
          const data = await getTeams();
          console.log(data)
          setTeams(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("Failed to fetch teams:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchTeams();
    }, []);

    // Group teams by comp
    const teamsByComp = teams.reduce((acc, team) => {
      if (!acc[team.comp]) acc[team.comp] = [];
      acc[team.comp].push(team);
      return acc;
    }, {});

  // Sort comps (latest first)
  const comps = Object.keys(teamsByComp);

  return (
    <div className="">
      <PageHeader title="OUR TEAMS" />

      {loading ? (
        <p className="text-center text-cyan-300 mt-10">
          Loading teams...
        </p>
      ) : teams.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No teams found.
        </p>
      ) : (
        comps.map((comp) => (
          <div key={comp} className="mt-[64px]">

            {/* COMP Title */}
            <h2 className="text-[28px] text-cyan-300 font-bold text-center mb-[32px]">
              {comp}
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

              {teamsByComp[comp].map((team) => (
                <motion.div
                  key={team.id}
                  whileHover={{ scale: 1.05 }}
                  className="
                    teams-grid
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
                      src={team.image_data || placeHolder}
                      alt={team.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <h3 className="text-[20px] text-cyan-300 font-semibold">
                    {team.name}
                  </h3>

                  {/* Details */}
                  <p className="text-[13px] text-cyan-300 font-robotica">
                    {team.description}
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