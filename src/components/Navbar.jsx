"use client";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authcontext";

const Navbar = () => {
  const t = useTranslations("navLinks");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useParams().locale;
  const { token, logout } = useAuth();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/login`);
  };

  return (
    <nav className="w-full bg-white shadow-md py-4 fixed top-0 left-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-xl font-bold text-gray-800">
          <Link href={`/${locale}/`}>{t("title")}</Link>
        </div>
        <div className="flex items-center space-x-4">
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
            >
              {t("logout")}
            </button>
          )}

          <select
            value={locale}
            onChange={handleChange}
            className="bg-[#eee] text-gray-800 text-sm px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
