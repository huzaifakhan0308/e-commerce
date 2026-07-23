"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";

const stars = [1, 2, 3, 4, 5];

const colors = [
  { colors: "red" },
  { colors: "green" },
  { colors: "blue" },
  { colors: "black" },
];
const sizes = [
  { sizes: "XS" },
  { sizes: "S" },
  { sizes: "M" },
  { sizes: "L" },
  { sizes: "XL" },
];

export default function BillingDetails() {
  const [colorsClickedId, setColorsClickedId] = useState(colors[0].colors);
  return (
    <div className="flex w-[1200px] justify-between gap-25 mt-10">
      <div className="flex w-[60%] h-[80vh] gap-10">
        <div className="grid grid-rows-4 grid-cols-1 w-[150px] gap-5">
          <img
            className="w-full h-full object-cover"
            src="/images/Side Image.png"
            alt=""
          />
          <img
            className="w-full h-full object-cover"
            src="/images/Side Image.png"
            alt=""
          />
          <img
            className="w-full h-full object-cover"
            src="/images/Side Image.png"
            alt=""
          />
          <img
            className="w-full h-full object-cover"
            src="/images/Side Image.png"
            alt=""
          />
        </div>
        <div className="w-full h-full">
          <img
            src="/images/Side Image.png"
            className="object-cover w-full h-full"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col w-[40%] gap-4">
        <h3 className="text-2xl font-bold">Havic Gamepad</h3>
        <div className="flex items-center gap-3">
          {stars.map((s) => (
            <img className="h-[15px]" key={s} src="/icons/star.svg" alt="" />
          ))}
          <span>(150 Reviews)</span>
        </div>
        <span className="text-2xl">$192.00</span>
        <p className="text-sm">
          PlayStation 5 Controller Skin High quality vinyl with air channel
          adhesive for easy bubble free install & mess free removal Pressure
          sensitive.
        </p>
        <div className="flex items-center gap-3">
          <span>Colours:</span>
          <div className="flex gap-3">
            {colors.map((e) => (
              <div
                key={e.colors}
                onClick={() => setColorsClickedId(e.colors)}
                style={{ backgroundColor: e.colors }}
                className={`cursor-pointer w-7 h-7 rounded-full overflow-hidden ${
                  colorsClickedId === e.colors ? "ring-2" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span>Size:</span>
          {sizes.map((e) => (
            <span
              key={e.sizes}
              className="border border-gray-400 flex justify-center items-center w-10 h-10 rounded-[5px]"
            >
              {e.sizes}
            </span>
          ))}
        </div>
        <div className="borde flex  -[50px] items-center gap-3">
          <div className=" w-[180px] h-full flex border border-gray-400 rounded-[4px] overflow-hidden">
            <button className=" w-[20%] bg-[#db4444] cursor-pointer text-white">
              -
            </button>
            <div className="w-[62%] flex justify-center items-center">2</div>
            <button className="w-[20%] bg-[#db4444] cursor-pointer text-white">
              +
            </button>
          </div>
          <Button title={"Buy Now"} className={"h-full"} />
          <div className="flex border border-gray-400 h-full rounded-[4px] flex items-center justify-center w-[45px]">
            <img src="/icons/heart.svg" alt="" />
          </div>
        </div>
        <div className="border flex items-center gap-5 py-5 px-2">
          <img className="h-[50px]" src="/icons/car.svg" alt="" />
          <div className="">
            <h3>Free Delivery</h3>
          </div>
        </div>
        <div className="border flex items-center gap-5 py-5 px-2">
          <img src="/icons/icon-return.svg" alt="" />
          <div className="">
            <h3>Return Delivery</h3>
            <span>Free 30 Days Delivery Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
