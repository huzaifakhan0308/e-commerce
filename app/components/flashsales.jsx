import { useEffect, useRef, useState } from "react";
import Product from "./product";
import StopWatch from "./stopWatch";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 120,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 140,
    offer: 30,
    image: "/images/mainImage2.jpg",
  },
  {
    id: 3,
    name: "Product 3",
    price: 150,
    offer: 20,
    image: "/images/mainImage3.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 6,
    name: "Product 6",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 7,
    name: "Product 7",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
];

const GAP = 20; // must match gap-5

export default function Flashsales() {
  const [translateX, setTranslateX] = useState(0);
  const viewportRef = useRef(null); // the overflow-hidden wrapper
  const trackRef = useRef(null); // the flex track

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

  // re-clamp on resize so a shrinking window never leaves translateX overshooting
  useEffect(() => {
    const onResize = () => {
      setTranslateX((prev) => clamp(prev, getMaxScroll()));
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxScroll = getMaxScroll();
  const atStart = translateX <= 0;
  const atEnd = translateX >= maxScroll;

  return (
    <div className="flex items-center flex-col mt-[100px] w-[90%]">
      <div className="flex justify-between items-center w-[100%]">
        <h2 className="text-2xl font-bold">Flash Sales</h2>
        <div>
          <StopWatch />
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
      <div ref={viewportRef} className="overflow-hidden w-[100%] mt-10">
        <div
          ref={trackRef}
          className="flex justify-start gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map((e) => (
            <div key={e.id}>
              <Product
                image={e.image}
                name={e.name}
                price={e.price}
                offer={e.offer}
                offerTrue={true}
              />
            </div>
          ))}
        </div>
      </div>

      <Link href="/all-products">
        <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
          View All Products
        </button>
      </Link>
    </div>
  );
}
