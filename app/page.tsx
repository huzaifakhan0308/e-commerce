"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Flashsales from "./components/flashsales";
import SellingProducts from "./components/sellingProducts";
import NewArivals from "./components/newArivels";
import ExploreProducts from "./components/exploreProducts";
import Footer from "./components/footer";

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
    <div className="">
      <div className=" h-auto flex items-center flex-col">
        <div className="relative w-[90%] mt-[20px] sm:h-[15rem] md:h-[17rem] lg:h-[22rem] overflow-hidden">
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
        <SellingProducts />
        <NewArivals />
        <ExploreProducts />
        <Footer />
      </div>
    </div>
  );
}
