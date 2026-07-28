"use client";
import { useEffect, useState } from "react";
import Product from "./product";
import Link from "next/link";
import SectionHeader from "./ui/sectionHeader";

const getItemsPerView = (width) => {
  if (width < 620) return 1;
  if (width < 850) return 2;
  if (width < 1200) return 3;
  return 4;
};

export default function SellingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  return (
    <div className="flex items-center flex-col mt-[100px] w-[100%]">
      <div className="flex justify-between items-center w-[100%]">
        <SectionHeader label={"This Month"} heading={"Best Selling Produtcs"} />
        <Link href="/all-products">
          <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
            View All
          </button>
        </Link>
      </div>

      {loading && <p className="mt-10 text-gray-400">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="mt-10 text-gray-400">No products found</p>
      )}

      {!loading && products.length > 0 && (
        <div className="w-[100%] mt-10">
          <div className="flex justify-between">
            {products.slice(0, itemsPerView).map((p) => {
              const image = p.images?.[0]
                ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
                : "/images/mainImage1.jpg";

              const offer =
                p.discountPrice != null && p.discountPrice < p.price
                  ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
                  : 0;

              return (
                <div key={p._id}>
                  <Product
                    id={p._id}
                    image={image}
                    name={p.name}
                    price={p.price}
                    offer={offer}
                    offerTrue={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
