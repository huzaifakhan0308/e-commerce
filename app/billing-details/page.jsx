"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function BillingDetails() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex w-[1000px] justify-between gap-25 mt-10">
      <div className=" flex flex-col w-full h-[100vh] gap-10">
        <h3 className="font-bold text-3xl mb-2">Billing Details</h3>
        <form className="flex flex-col gap-5">
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Company Name" />
          <Input type="text" placeholder="Street Address" />
          <Input
            type="text"
            placeholder="Apartment, floor, e.t.c. (optional)"
          />
          <Input type="text" placeholder="Town/City" />
          <Input type="number" placeholder="Phone Number" />
          <Input type="text" placeholder="Email Address" />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="w-4 h-4 cursor-pointer accent-blue-600"
            />
            <span>Save this information for faster check-out next time</span>
          </div>
        </form>
      </div>
      <div className="flex flex-col w-full gap-5">
        <div className="py-3">
          <div className="flex items-center">
            <div className="flex items-center min-w-[150px] gap-3">
              <img className="h-[30px]" src="/images/mainimage1.jpg" alt="" />
              <h3>LCD Monitor</h3>
            </div>
            <span className="ml-auto">$650</span>
          </div>
        </div>
        <div className="flex justify-between border-b  py-3">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-3 border-b ">
          <span>Total:</span>
          <span>$650</span>
        </div>
        <div className="flex items-center gap-3 py-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-600"
          />
          <span>Bank</span>
          <div className="flex items-center ml-auto">
            <img src="/icons/Bkash.svg" alt="" />
            <img src="/icons/Mastercard.svg" alt="" />
            <img src="/icons/Nagad.svg" alt="" />
            <img src="/Visa.svg" alt="" />
          </div>
        </div>
        <div className="gap-3 py-3 flex items-center">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-600"
          />
          <span>Cash on delivery</span>
        </div>
        <Button title={"Place Order"} />
      </div>
    </div>
  );
}
