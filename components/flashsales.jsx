"use client";
import { useEffect, useRef, useState } from "react";
import Product from "./product";
import StopWatch from "./stopWatch";
import Link from "next/link";
import SectionHeader from "../components/ui/sectionHeader";

const GAP = 20; // must match gap-5

export default function Flashsales() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [translateX, setTranslateX] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const discounted = data.filter(
          (p) => p.discountPrice != null && p.discountPrice < p.price,
        );
        setProducts(discounted);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const clamp = (x, maxScroll) => Math.max(0, Math.min(x, maxScroll));

  const getMaxScroll = () => {
    if (!viewportRef.current || !trackRef.current) return 0;
    return Math.max(
      trackRef.current.scrollWidth - viewportRef.current.clientWidth,
      0,
    );
  };

  const handlePrev = () => {
    const step =
      trackRef.current?.children[0]?.getBoundingClientRect().width || 0;
    setTranslateX((prev) => clamp(prev - (step + GAP), getMaxScroll()));
  };

  const handleNext = () => {
    const step =
      trackRef.current?.children[0]?.getBoundingClientRect().width || 0;
    setTranslateX((prev) => clamp(prev + (step + GAP), getMaxScroll()));
  };

  useEffect(() => {
    const onResize = () => {
      setTranslateX((prev) => clamp(prev, getMaxScroll()));
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, [products]);

  const maxScroll = getMaxScroll();
  const atStart = translateX <= 0;
  const atEnd = translateX >= maxScroll;

  return (
    <div className="flex items-center flex-col mt-[100px] w-[100%]">
      <div className="flex justify-between items-center w-[100%]">
        <SectionHeader label={"Today's"} heading={"Flash Sales"} />
        <div>
          <StopWatch
            expiresAt={new Date(
              Date.now() + 3 * 24 * 60 * 60 * 1000,
            ).toISOString()}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={atStart}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img src="/icons/leftArrow.svg" alt="Previous" />
          </button>
          <button
            onClick={handleNext}
            disabled={atEnd}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img className="rotate-180" src="/icons/leftArrow.svg" alt="Next" />
          </button>
        </div>
      </div>

      {loading && <p className="mt-10 text-gray-400">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="mt-10 text-gray-400">No discounted products right now</p>
      )}

      {!loading && products.length > 0 && (
        <div ref={viewportRef} className="overflow-hidden w-[100%] mt-10">
          <div
            ref={trackRef}
            className="flex justify-start gap-5 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {products.map((p) => {
              const offer = Math.round(
                ((p.price - p.discountPrice) / p.price) * 100,
              );
              const image = p.images?.[0]
                ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
                : "/images/mainImage1.jpg";

              return (
                <div key={p._id}>
                  <Product
                    id={p._id}
                    image={image}
                    name={p.name}
                    price={p.price}
                    offer={offer}
                    offerTrue={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link href="/flash-sales">
        <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
          View All Products
        </button>
      </Link>
    </div>
  );
}
