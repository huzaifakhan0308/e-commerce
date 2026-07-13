import { useEffect, useRef, useState } from "react";
import Product from "./product";
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
  {
    id: 8,
    name: "Product 8",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 9,
    name: "Product 9",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
  {
    id: 10,
    name: "Product 10",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
];

// keep values even so ROWS=2 divides cleanly into whole columns
const getItemsPerView = (width) => {
  if (width < 620) return 2;
  if (width < 900) return 4;
  if (width < 1200) return 6;
  return 8;
};

const ROWS = 2;
const GAP = 20; // px, matches gap-5

export default function Flashsales() {
  const [visibleItems, setVisibleItems] = useState(8); // sane default for first render/SSR
  const [startCol, setStartCol] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const trackRef = useRef(null);

  const visibleCols = visibleItems / ROWS;
  const totalCols = Math.ceil(products.length / ROWS);
  const maxCol = Math.max(totalCols - visibleCols, 0);

  useEffect(() => {
    const measure = () => {
      const nextVisible = getItemsPerView(window.innerWidth);
      console.log("nextVisible", nextVisible);

      setVisibleItems(nextVisible);

      const firstChild = trackRef.current?.children[0];
      if (firstChild) setItemWidth(firstChild.getBoundingClientRect().width);

      // clamp startCol so we don't end up scrolled past the new max on resize
      setStartCol((prev) => {
        const newVisibleCols = nextVisible / ROWS;
        const newMaxCol = Math.max(totalCols - newVisibleCols, 0);
        return Math.min(prev, newMaxCol);
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () =>
    setStartCol((prev) => Math.max(prev - visibleCols, 0));
  const handleNext = () =>
    setStartCol((prev) => Math.min(prev + visibleCols, maxCol));

  const translateX = startCol * (itemWidth + GAP);

  return (
    <div className="flex items-center flex-col mt-[100px] w-[90%]">
      <div className="flex justify-between items-center w-[100%]">
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={startCol === 0}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img src="/icons/leftArrow.svg" alt="Previous" />
          </button>
          <button
            onClick={handleNext}
            disabled={startCol >= maxCol}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <img className="rotate-180" src="/icons/leftArrow.svg" alt="Next" />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden mt-10"
        style={{
          width: itemWidth
            ? itemWidth * visibleCols + GAP * (visibleCols - 1)
            : "100%",
        }}
      >
        <div
          ref={trackRef}
          className="grid grid-rows-2 grid-flow-col gap-5 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${translateX}px)` }}
        >
          {products.map((e) => (
            <div key={e.id} className="w-[260px]">
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
