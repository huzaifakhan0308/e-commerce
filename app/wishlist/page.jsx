"use client";
import { useState } from "react";
import Product from "../../components/product";

const wishlist = [
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
  {
    id: 11,
    name: "Product 11",
    price: 200,
    offer: 40,
    image: "/images/mainImage1.jpg",
  },
];

// const getItemsPerView = (width) => {
//   if (width < 620) return 1;
//   if (width < 850) return 2;
//   if (width < 1200) return 3;
//   return 4;
// };

export default function Wishlist() {
  const [itemsPerView, setItemsPerView] = useState(4);

  const handleItemsPerView = () => {
    setItemsPerView(itemsPerView + 4);
  };
  return (
    <div className="flex items-center flex-col mt-[100px] w-[100%] max-w-7xl">
      <div className="overflow-hidden w-[100%] mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
        <div className="grid grid-cols-4 gap-5">
          {wishlist.slice(0, itemsPerView).map((e) => (
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
      <button
        disabled={itemsPerView >= wishlist.length}
        onClick={() => handleItemsPerView()}
        style={{ opacity: itemsPerView >= wishlist.length ? 0.5 : 1 }}
        className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]"
      >
        View More
      </button>
    </div>
  );
}
