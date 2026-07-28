"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { isInWishlist, toggleWishlist } from "../components/lib/whishlist";

const stars = [1, 2, 3, 4, 5];

export default function Product({ id, image, name, price, offer, offerTrue }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isInWishlist(id));
  }, [id]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowWishlisted = toggleWishlist(id);
    setWishlisted(nowWishlisted);
  };

  return (
    <Link
      href={`/product-details/${id}`}
      className="flex flex-col w-[250px] h-[100%]"
    >
      <div className="relative w-[100%] h-[200px] bg-[#F5F5F5] flex items-center justify-center">
        <img className="w-[50%] relative z-10" src={image} alt="" />
        {offerTrue && (
          <span className="absolute top-0 left-0 z-20 bg-[#db4444] text-white px-[10px] rounded-[4px] py-[2px] my-[4px] mx-[4px]">
            - {offer}%
          </span>
        )}
        <button
          onClick={handleWishlistClick}
          className="flex items-center bg-[#ffffff99] h-[32px] w-[32px] justify-center rounded-full absolute top-0 right-0 z-20 cursor-pointer my-[4px] mx-[4px] p-1"
        >
          {wishlisted ? (
            <img src="/icons/Redheart.png" alt="" className="w-full" />
          ) : (
            <img src="/icons/heart.svg" alt="" className="w-5 h-5" />
          )}
        </button>
      </div>
      <h3 className="py-1">{name}</h3>
      <p className="flex gap-1 ">
        <span className="text-[#db4444]">${price}</span>
        <span className="line-through text-[#00000099]">$160</span>
      </p>
      <div className="flex gap-1 items-center">
        {stars.map((s) => (
          <img key={s} src="/icons/star.svg" alt="" />
        ))}
        <p>(99)</p>
      </div>
    </Link>
  );
}
