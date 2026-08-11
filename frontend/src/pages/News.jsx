import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";
import { getYoutubeVideos } from "../services/postService";
import SocialBar from "../components/SocialBar";
import { useEffect, useState } from "react";

export default function News() {

  {/*const [youtubeVidData, setYoutubeVidData] = useState(null);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        const data = await getYoutubeVideos();
        setYoutubeVidData(data);
        console.log("Fetched youtube video data:", data);
      } catch (err) {
        console.error("Failed to fetch youtube videos:", err);
      }
    };

    fetchYoutubeVideos();
  }, []); */}

  return (
    <div className="">
      <PageHeader title="NEWS" />

      <ScrollReveal>
        <h2 className="text-center text-[64px] text-slate-700">
          UNDER CONSTRUCTION...
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <img 
          src="https://th.bing.com/th/id/OIP.tSaQegA3eeCLdd_ggQIesQHaE5?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" 
          alt="Mining..."
          className="items-center pt-20 mx-auto" 
        />
      </ScrollReveal>

      {/*<SocialBar name="Youtube" videos={youtubeVidData} />*/}

    </div>
  );
}
