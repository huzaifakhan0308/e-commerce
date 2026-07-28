export default function SectionHeader({ label, heading }) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-[#db4444] rounded-[4px]" />
        <span className="text-[#db4444] font-semibold">{label}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold">{heading}</h2>
    </div>
  );
}
