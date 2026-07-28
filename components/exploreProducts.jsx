"use client";
import { useEffect, useRef, useState } from "react";
import Product from "./product";
import Link from "next/link";
import SectionHeader from "./ui/sectionHeader";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8); // sane default for first render/SSR
  const [startCol, setStartCol] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const visibleCols = visibleItems / ROWS;
  const totalCols = Math.ceil(products.length / ROWS);
  const maxCol = Math.max(totalCols - visibleCols, 0);

  useEffect(() => {
    const measure = () => {
      const nextVisible = getItemsPerView(window.innerWidth);
      setVisibleItems(nextVisible);

      const firstChild = trackRef.current?.children[0];
      if (firstChild) setItemWidth(firstChild.getBoundingClientRect().width);

      setStartCol((prev) => {
        const newVisibleCols = nextVisible / ROWS;
        const newMaxCol = Math.max(totalCols - newVisibleCols, 0);
        return Math.min(prev, newMaxCol);
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products]); // re-measure once real products render into trackRef

  const handlePrev = () =>
    setStartCol((prev) => Math.max(prev - visibleCols, 0));
  const handleNext = () =>
    setStartCol((prev) => Math.min(prev + visibleCols, maxCol));

  const translateX = startCol * (itemWidth + GAP);

  return (
    <div className="flex items-center flex-col mt-[100px] w-[100%]">
      <div className="flex justify-between items-center w-[100%]">
        <SectionHeader
          label={"Our Products"}
          heading={"Explore Our Products"}
        />
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

      {loading && <p className="mt-10 text-gray-400">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="mt-10 text-gray-400">No products found</p>
      )}

      {!loading && products.length > 0 && (
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
            {products.map((p) => {
              const offer =
                p.discountPrice != null && p.discountPrice < p.price
                  ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
                  : 0;
              const image = p.images?.[0]
                ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
                : "/images/mainImage1.jpg";

              return (
                <div key={p._id} className="w-[260px]">
                  <Product
                    id={p._id}
                    image={image}
                    name={p.name}
                    price={p.price}
                    offer={offer}
                    offerTrue={offer > 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link href="/all-products">
        <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
          View All Products
        </button>
      </Link>
    </div>
  );
}
