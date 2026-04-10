export default function PageHeader({ title }) {
  return (
    <div className="page-title">
      <h1 className="heading-space text-cyan-300 font-bold text-[64px] text-center">
        {title}
      </h1>
    </div>
  );
}