"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    console.log("role", role);

    if (!token || role !== "admin") {
      router.push("/log-in");
      return;
    }
    setChecking(false);
  }, [router]);

  if (checking) {
    return <div className="p-10">Checking access...</div>;
  }

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}
