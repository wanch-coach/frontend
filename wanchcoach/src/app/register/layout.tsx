"use client";

import { ReactNode } from "react";
import styles from "./register.module.css";
import { Header } from "../components/component";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header title="진료 등록" />
      <div className={styles.body_container}>
        <VisitMenu />
        {children}
      </div>
    </div>
  );
}

function VisitMenu() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const router = useRouter();

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    if (tab === "visited") {
      router.replace("/register/visited");
    } else {
      router.replace("/register/upcoming");
    }
  };
  return (
    <div className={styles.tab_container}>
      <div className={styles.tab_box}>
        <div
          className={`${styles.tab_box_title} ${activeTab === "upcoming" ? styles.active : ""}`}
          onClick={() => handleTabClick("upcoming")}
        >
          방문할 진료
        </div>
        <div
          className={`${styles.tab_box_title} ${activeTab === "visited" ? styles.active : ""}`}
          onClick={() => handleTabClick("visited")}
        >
          방문한 진료
        </div>
      </div>

      <div className={styles.tab_box_line_01} />
      <div
        className={styles.tab_box_line_02}
        style={{ transform: `translateX(${activeTab === "upcoming" ? "0%" : "100%"})` }}
      />
    </div>
  );
}
