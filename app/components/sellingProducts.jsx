import { useEffect, useState } from "react";
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
];

const getItemsPerView = (width) => {
  if (width < 620) return 1;
  if (width < 850) return 2;
  if (width < 1200) return 3;
  return 4;
};

export default function SellingProducts() {
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  return (
    <div className="flex items-center flex-col mt-[100px] w-[90%]">
      <div className="flex justify-between items-center w-[100%]">
        <h2 className="text-2xl font-bold">Best Selling Products</h2>
        <Link href="/best-selling-products">
          <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
            View All
          </button>
        </Link>
      </div>
      <div className="w-[100%] mt-10">
        <div className="flex justify-between">
          {products.slice(0, itemsPerView).map((e) => (
            <div key={e.id}>
              <Product
                image={e.image}
                name={e.name}
                price={e.price}
                offer={e.offer}
                offerTrue={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
