export default function SalesTitle() {
  return (
    <nav className="flex justify-center items-center bg-black p-3">
      <style>{`
        @keyframes colorFlip {
          0%, 49% { color: white; }
          50%, 100% { color: red; }
        }
        .animate-color-flip {
          animation: colorFlip 1s steps(1, end) infinite;
        }
      `}</style>
      <h2 className="animate-color-flip">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        ShopNow
      </h2>
    </nav>
  );
}
