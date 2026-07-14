import { useEffect, useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Play Station 5",
    detail: "Black and White version of the PS5 coming out on sale.",
    image: "/images/mainImage1.jpg",
  },
  {
    id: 2,
    name: "Womens Collections",
    detail: "Featured woman collections that give you another vibe Shop Now",
    image: "/images/mainImage2.jpg",
  },
  {
    id: 3,
    name: "Speaker",
    detail: "Amazon wireless speakers",
    image: "/images/mainImage3.jpg",
  },
  {
    id: 4,
    name: "Perfumes",
    detail: "GUCCI INTENSE OUD EDP",
    image: "/images/mainImage1.jpg",
  },
];

export default function NewArivels() {
  return (
    <div className="flex w-[100%] mt-[50px] h-[600px] gap-5 text-white">
      <div className="relative h-full w-[50%] rounded-[5px] overflow-hidden">
        <img
          className="absolute z-1 w-full h-full object-cover"
          src={products[0].image}
          alt=""
        />
        <div className="absolute bottom-5 left-5 z-10">
          <h3 className="font-bold ">{products[0].name}</h3>
          <p className="max-w-[300px]">{products[0].detail}</p>
          <button className="">Shop now</button>
        </div>
      </div>
      <div className="flex flex-col h-full w-[50%] gap-5">
        <div className="relative  h-[50%] w-full rounded-[5px] overflow-hidden">
          <img
            className="absolute w-full h-full object-cover"
            src={products[1].image}
            alt=""
          />
          <div className="absolute bottom-5 left-5 z-10">
            <h3 className="font-bold">{products[1].name}</h3>
            <p className="max-w-[300px]">{products[1].detail}</p>
            <button className="">Shop now</button>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 h-[50%] w-full gap-5">
          <div className="relative h-full w-full rounded-[5px] overflow-hidden">
            <img
              className="absolute w-full h-full object-cover"
              src={products[2].image}
              alt=""
            />
            <div className="absolute bottom-5 left-5 z-10">
              <h3 className="">{products[2].name}</h3>
              <p className="max-w-[300px]">{products[2].detail}</p>
              <button className="">Shop now</button>
            </div>
          </div>
          <div className="relative h-full w-full rounded-[5px] overflow-hidden">
            <img
              className="absolute w-full h-full  object-cover"
              src={products[3].image}
              alt=""
            />
            <div className="absolute bottom-5 left-5 z-10">
              <h3 className="">{products[3].name}</h3>
              <p className="max-w-[300px]">{products[3].detail}</p>
              <button className="">Shop now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
