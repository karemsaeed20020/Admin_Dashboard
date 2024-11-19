"use client";
import { useEffect } from "react";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Transactions from "../ui/dashboard/transactions/transactions";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const locale = navigator.language.split("-")[0] || "en";

    if (!token) {
      router.push(`/${locale}/login`);
    }
  }, [router]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
