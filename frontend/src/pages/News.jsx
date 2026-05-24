import PageHeader from "../components/PageHeader";
import ScrollReveal from "../components/ScrollReveal";

export default function News() {
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

    </div>
  );
}
