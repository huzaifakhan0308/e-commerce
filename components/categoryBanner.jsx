"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import StopWatch from "./stopWatch";

export default function CategoryBanner() {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/category`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCategory(data[data.length - 1]);
        }
      })
      .catch(() => setCategory(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !category) return null;

  const imageSrc = `data:${category.imageType};base64,${category.image}`;

  return (
    <div className="w-full relative mt-[20px] sm:h-[15rem] md:h-[17rem] lg:h-[27rem] overflow-hidden">
      <img src={imageSrc} alt="" className="w-full h-full object-cover" />
      <div className="max-w-[430px] absolute z-10 top-[40px] left-[40px] flex flex-col gap-2">
        <span className="text-[#00FF66]">Categories</span>
        <h2 className="text-white text-5xl font-medium">
          Enhance Your Music Experience
        </h2>
        <StopWatch className="ml-5" expiresAt={category.expiresAt} />
        <Link href="/all-products" className="border w-[200px]">
          <button className="w-[200px] py-[12px] bg-[#00FF66] mt-10 cursor-pointer text-white rounded-[4px]">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}
