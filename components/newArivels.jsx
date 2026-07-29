import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Play Station 5",
    detail: "Black and White version of the PS5 coming out on sale.",
    image: "/images/frame1.svg",
  },
  {
    id: 2,
    name: "Womens Collections",
    detail: "Featured woman collections that give you another vibe Shop Now",
    image: "/images/frame2.svg",
  },
  {
    id: 3,
    name: "Speaker",
    detail: "Amazon wireless speakers",
    image: "/images/frame3.svg",
  },
  {
    id: 4,
    name: "Perfumes",
    detail: "GUCCI INTENSE OUD EDP",
    image: "/images/frame4.svg",
  },
];

export default function NewArivels() {
  return (
    <div className="flex w-[100%] mt-[50px] h-[600px] gap-5 text-white">
      <div className="h-full w-[50%] rounded-[5px] cursor-pointer">
        <Link href={"/all-products"} className="h-full w-full">
          <img className="object-cover" src={products[0].image} alt="" />
        </Link>
      </div>
      <div className="flex flex-col h-full w-[50%] gap-5">
        <div className="cursor-pointer  h-[50%] w-full rounded-[5px]">
          <Link href={"/all-products"} className="h-full w-full">
            <img
              className="object-cover w-full"
              src={products[1].image}
              alt=""
            />
          </Link>
        </div>
        <div className="flex justify-between h-[50%] w-full">
          <div className="cursor-pointer h-full  rounded-[5px]">
            <Link href={"/all-products"} className="h-full w-full">
              <img className=" object-cover" src={products[2].image} alt="" />
            </Link>
          </div>
          <div className="cursor-pointer h-full rounded-[5px]">
            <Link href={"/all-products"} className="h-full w-full">
              <img className=" object-cover" src={products[3].image} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
