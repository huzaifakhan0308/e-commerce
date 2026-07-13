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
    name: "Product 4",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 6,
    name: "Product 4",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 7,
    name: "Product 4",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
];

const getItemsPerView = (width) => {
  if (width < 620) return 1;
  if (width < 850) return 2;
  if (width < 1200) return 3;
  return 4;
};

export default function Flashsales() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const containerRef = useRef(null);

  const VISIBLE_COUNT = 4; // how many products you want visible at once
  const GAP = 20; // must match gap-5 (5 * 4px = 20px)
  const maxIndex = Math.max(products.length - VISIBLE_COUNT, 0);

  // Measure the width of a single product card so we can calculate the offset
  useEffect(() => {
    if (containerRef.current) {
      const firstChild = containerRef.current.children[0];
      if (firstChild) {
        setItemWidth(firstChild.getBoundingClientRect().width);
      }
    }
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const translateX = startIndex * (itemWidth + GAP);

  return (
    <div className="flex items-center flex-col mt-[100px] w-[90%]">
      <div className="flex justify-between items-center w-[100%]">
        <h2 className="text-2xl font-bold">Flash Sales</h2>
        <div className="">
          <StopWatch />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img src="/icons/leftArrow.svg" alt="Previous" />
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img className="rotate-180" src="/icons/leftArrow.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className=" overflow-hidden w-[100%] mt-10">
        <div
          ref={containerRef}
          className="flex justify-start gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map((e) => (
            <div className="" key={e.id}>
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
