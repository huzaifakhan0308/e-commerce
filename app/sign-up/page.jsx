"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName: name, email, password }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/log-in");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full h-[100vh]">
        <div className="w-[50%]">
          <img src="/images/signInPage.png" alt="" />
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="w-[50%]">
            <h3 className="font-bold text-3xl mb-2">Create an account</h3>
            <p className="mb-5">Enter your details below</p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <input
                className="py-2 outline-none border-0 border-b-2 border-gray-400"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="py-2 outline-none border-0 border-b-2 border-gray-400"
                type="email"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="py-2  outline-none border-0 border-b-2 border-gray-400"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="py-2  outline-none border-0 border-b-2 border-gray-400"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px] disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <button
                className="px-[40px] py-[12px] cursor-pointer text-black rounded-[4px] flex items-center border border-black justify-center"
                type="button"
              >
                <img className="pr-5" src="/icons/google.svg" alt="" />
                Sign up with Google
              </button>
              <p className="text-center">
                Already have account? <Link href="/log-in">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
