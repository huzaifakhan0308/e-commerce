"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/vouchers", label: "Vouchers" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/orders", label: "Orders" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/log-in");
  };

  return (
    <aside className="w-[220px] shrink-0 h-screen sticky top-0 bg-black text-white flex flex-col p-5">
      <h2 className="font-bold text-2xl mb-10">Exclusive Admin</h2>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-3 rounded-[4px] transition-colors ${
              pathname === link.href
                ? "bg-[#db4444] text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="px-4 py-3 rounded-[4px] text-left text-gray-300 hover:bg-white/10 cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
}
