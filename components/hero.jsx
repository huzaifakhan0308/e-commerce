"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const hasArrow = ["Woman's Fashion", "Men's Fashion"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/vouchers`)
      .then((res) => res.json())
      .then((data) => {
        const dataUrls = data
          .filter((v) => v.image && v.imageType)
          .map((v) => `data:${v.imageType};base64,${v.image}`);
        setImages(dataUrls);
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex w-full mt-[20px] gap-6 border-b border-gray-200 pb-6">
      {/* Sidebar */}
      <div className="hidden lg:block w-[220px] shrink-0">
        <ul className="flex flex-col">
          {categories.map((cat) => (
            <li
              key={cat}
              className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-black cursor-pointer"
            >
              <span>{cat}</span>
              {hasArrow.includes(cat) && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider between sidebar and banner */}
      <div className="hidden lg:block w-px bg-gray-200" />

      {/* Banner / Carousel */}
      <Link
        href="/all-products"
        className="relative w-full sm:h-[15rem] md:h-[17rem] lg:h-[27rem] overflow-hidden rounded-md bg-gray-100 block"
      >
        {loading && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Loading...
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No vouchers available
          </div>
        )}

        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            unoptimized
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}

        {/* Dot indicators */}
        {images.length > 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrent(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? "w-2 bg-red-500" : "w-2 bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
