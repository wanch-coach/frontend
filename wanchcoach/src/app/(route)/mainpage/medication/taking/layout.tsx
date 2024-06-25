"use client";

import styles from "./taking.module.css";
import { ReactNode } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function TakingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.body_container}>
        <div className={styles.day_controller_container}>
          <div className={styles.day_controller_icon}>
            <FaCaretLeft size={"20px"} />
          </div>
          <span className={styles.day_controller_text}>5월 22일</span>
          <div className={styles.day_controller_icon}>
            <FaCaretRight size={"20px"} />
          </div>
          <div className={styles.day_controller_gotoday_button}>GO TO TODAY</div>
        </div>
        <DayMenu />
      </div>
      {children}
    </div>
  );
}

function DayMenu() {
  const [activeTab, setActiveTab] = useState("morning");
  const router = useRouter();

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    if (tab === "morning") {
      router.replace("/mainpage/medication/taking/morning");
    } else if (tab === "noon") {
      router.replace("/mainpage/medication/taking/noon");
    } else if (tab === "evening") {
      router.replace("/mainpage/medication/taking/evening");
    } else if (tab === "beforebed") {
      router.replace("/mainpage/medication/taking/beforebed");
    }
  };

  const getTranslateXValue = (tab: SetStateAction<string>) => {
    switch (tab) {
      case "morning":
        return "0%";
      case "noon":
        return "100%";
      case "evening":
        return "200%";
      case "beforebed":
        return "300%";
      default:
        return "0%";
    }
  };

  return (
    <div className={styles.day_tab_container}>
      <div className={styles.day_tab_box}>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "morning" ? styles.active : ""}`}
          onClick={() => handleTabClick("morning")}
        >
          아침
        </div>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "noon" ? styles.active : ""}`}
          onClick={() => handleTabClick("noon")}
        >
          점심
        </div>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "evening" ? styles.active : ""}`}
          onClick={() => handleTabClick("evening")}
        >
          저녁
        </div>
        <div
          className={`${styles.day_tab_box_title} ${
            activeTab === "beforebed" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("beforebed")}
        >
          취침 전
        </div>
      </div>
      <div className={styles.day_tab_line_container}>
        <div
          className={styles.day_tab_box_line}
          style={{ transform: `translateX(${getTranslateXValue(activeTab)})` }}
        >
          <div className={styles.day_tab_box_greenline}></div>
        </div>
      </div>
    </div>
  );
}