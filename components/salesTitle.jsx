import Link from "next/link";

export default function SalesTitle() {
  return (
    <nav className="flex w-[100%] justify-center items-center bg-black text-white p-3">
      <h2 className="">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        <Link className="ml-2 border-b border-white-500" href="/all-products">
          ShopNow
        </Link>
      </h2>
    </nav>
  );
}
