"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Login1 from '../../../public/pexels-padrinan-2882566_2.jpg'
import Image from "next/image";
const page = () => {
  const t = useTranslations("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await fetch(
        "https://backend.profferdeals.com/api/admin/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await res.json();
      const token = data.token;
      if (res.ok) {
        Cookies.set("token", token, { path: "/", expires: 1 });
        toast.success("Login Successfully");
        router.push("/dashboard");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      toast.error("Error login");
    }
  };
  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    } else {
      setIsloading(false);
    }
  }, [router, token]);
  if (isloading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold" style={{ color: "#000" }}>
              {t("title")}
            </span>
            <span className="font-light text-gray-400 mb-8">
              {t("sub-title")}
            </span>
            <form onSubmit={handleSubmit}>
              <div className="py-4">
                <span className="mb-2 text-md" style={{ color: "#000" }}>
                  {t("labelEmail")}
                </span>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                  placeholder={t("email")}
                />
              </div>
              <div className="py-4">
                <span className="mb-3 text-md" style={{ color: "#000" }}>
                  {t("labelPassword")}
                </span>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password")}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
              >
                {t("login_button")}
              </button>
            </form>
          </div>
          <div className="relative">
            <Image
              src={Login1}
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default page;
