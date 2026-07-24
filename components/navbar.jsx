"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [userShowBoolean, setUserShowBoolean] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setUserShowBoolean(true);
    } else {
      setUserShowBoolean(false);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserShowBoolean(false);
    setDropdownOpen(false);
    router.push("/log-in");
  };

  return (
    <nav className="w-[100%] sticky top-0 z-50 flex justify-between items-center border-b-1 border-gray-200 bg-white p-2 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <Link href="/">
        <h2 className="font-bold text-2xl">Exclusive</h2>
      </Link>
      <div className="">
        <Link href="/">
          <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
            Home
          </button>
        </Link>
        <Link href="/contact">
          <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
            Contact
          </button>
        </Link>
        <Link href="/about">
          <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
            About
          </button>
        </Link>
        {!userShowBoolean ? (
          <Link href="/sign-up">
            <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
              Sign Up
            </button>
          </Link>
        ) : (
          <Link href="/my-account">
            <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
              My Account
            </button>
          </Link>
        )}
      </div>
      <div className="flex justify-center items-center gap-3 ">
        <div className="flex justify-center bg-black/8 rounded-[3px]">
          <input
            className="border-none outline-none p-1 pl-4"
            type="text"
            placeholder="What are you looking for?"
          />
          <button className="pr-2 cursor-pointer">
            <img src="/icons/search.svg" alt="" />
          </button>
        </div>
        <div className="flex justify-center items-center gap-3">
          <Link href="/wishlist" className="flex justify-center items-center">
            <button className="cursor-pointer">
              <img className="size-6" src="/icons/heart.svg" alt="" />
            </button>
          </Link>
          {userShowBoolean && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="cursor-pointer flex justify-center items-center"
              >
                <img className="size-6" src="/icons/user.svg" alt="" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white/30 backdrop-blur-md border border-gray-200 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] py-2 z-50">
                  <Link
                    href="/my-account"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/my-orders"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#db4444]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
