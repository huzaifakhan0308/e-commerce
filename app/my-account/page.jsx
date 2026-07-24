"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function MyAccount() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/log-in");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) {
          localStorage.removeItem("access_token");
          router.push("/log-in");
          return;
        }

        const data = await res.json();
        setUser(data);
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setEmail(data.email || "");
        setAddress(data.address || "");
      } catch (err) {
        router.push("/log-in");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 my-15 h-[60vh] min-w-[1000px]">
      <h3 className="self-end">
        Welcome {firstName} {lastName}!
      </h3>
      <div className="p-8 rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h2 className="mb-5">Edit your Profile</h2>
        <form action="" className="w-[100%] h-[100%]">
          <div className="flex gap-5 grid grid-rows-2 grid-cols-2 w-[100%]">
            <Input
              type={"text"}
              placeholder={"First Name"}
              className={"w-[100%]"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder={"Last Name"}
              className={"w-[100%]"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type={"email"}
              placeholder={"Your Email"}
              className={"w-[100%]"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={"text"}
              placeholder={"Address"}
              className={"w-[100%]"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-5 gap-5">
            <Input
              type={"password"}
              placeholder={"Current Password"}
              className={"w-[100%]"}
            />
            <Input
              type={"password"}
              placeholder={"New Password"}
              className={"w-[100%]"}
            />
            <Input
              type={"password"}
              placeholder={"Confirm New Password"}
              className={"w-[100%]"}
            />
            <div className="flex gap-2 self-end mt-10">
              <button
                type="button"
                className="px-[40px] py-[12px] bg-[#0000] cursor-pointer text-black"
              >
                Cancel
              </button>
              <Button title="Save changes" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
