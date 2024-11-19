"use client";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Dashboard1 from "../dashboard/layout";

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push(`/${locale}/login`);
    } else {
      router.push(`/dashboard`);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Dashboard1 />
    </>
  );
};

export default page;
