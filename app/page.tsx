"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Flashsales from "./components/flashsales";
import SellingProducts from "./components/sellingProducts";
import NewArivals from "./components/newArivels";
import ExploreProducts from "./components/exploreProducts";
import StopWatch from "./components/stopWatch";
import Link from "next/link";
import Trust from "./components/trust";

const images = [
  "/images/mainImage1.jpg",
  "/images/mainImage2.jpg",
  "/images/mainImage3.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl flex flex-col items-center">
      <div className="h-auto w-[100%] flex items-center flex-col">
        <div className="relative w-[100%] mt-[20px] sm:h-[15rem] md:h-[17rem] lg:h-[27rem] overflow-hidden">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <Flashsales />
        <div className="border relative mt-[20px] sm:h-[15rem] md:h-[17rem] lg:h-[27rem] overflow-hidden">
          <img src="/images/mainImage3.jpg" alt="" />
          <div className="max-w-[300px] absolute z-10 top-[40px] left-[40px] flex flex-col gap-2">
            <span className="text-[#00FF66]">Categories</span>
            <h3 className="font-bold text-[32px] text-white">
              Enchance Your music experience
            </h3>
            <StopWatch />
            <Link href="/">
              <button className="px-[40px] py-[12px] bg-[#00FF66] mt-10 cursor-pointer text-white rounded-[4px]">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
        <SellingProducts />
        <NewArivals />
        <ExploreProducts />
        <Trust />
      </div>
    </div>
  );
}
