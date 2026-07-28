"use client";
import { useEffect, useState } from "react";
import Product from "../../components/product";
import SectionHeader from "../../components/ui/sectionHeader";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [itemsPerView, setItemsPerView] = useState(8);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  const visible = filtered.slice(0, itemsPerView);

  return (
    <div className="flex items-center flex-col mt-[60px] w-[100%] max-w-7xl mx-auto px-4">
      <div className="w-full flex justify-between items-end flex-wrap gap-4 mb-6">
        <SectionHeader label="Our Products" heading="All Products" />

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setItemsPerView(8); // reset pagination whenever the search changes
            }}
            placeholder="Search products..."
            className="border border-gray-300 rounded-[4px] px-4 py-2 outline-none focus:border-[#db4444]"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded-[4px] px-4 py-2 outline-none cursor-pointer focus:border-[#db4444]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-gray-400 mt-10">Loading...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-400 mt-10">No products found</p>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {visible.map((p) => {
            const offer =
              p.discountPrice != null && p.discountPrice < p.price
                ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
                : 0;
            const image = p.images?.[0]
              ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
              : "/images/mainImage1.jpg";

            return (
              <Product
                key={p._id}
                id={p._id}
                image={image}
                name={p.name}
                price={p.price}
                offer={offer}
                offerTrue={offer > 0}
              />
            );
          })}
        </div>
      )}

      {!loading && itemsPerView < filtered.length && (
        <button
          onClick={() => setItemsPerView((prev) => prev + 8)}
          className="px-[40px] py-[12px] bg-[#db4444] mt-10 mb-16 cursor-pointer text-white rounded-[4px]"
        >
          View More
        </button>
      )}
    </div>
  );
}
