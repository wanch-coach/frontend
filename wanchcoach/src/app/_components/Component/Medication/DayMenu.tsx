import styles from "./Medication.module.css";
import { SetStateAction } from "react";

interface DayMenuProps {
  activeTab: string;
  handleTabClick: (tab: SetStateAction<string>) => void;
}
export default function DayMenu({ activeTab, handleTabClick }: DayMenuProps) {
  const getTranslateXValue = (tab: SetStateAction<string>) => {
    switch (tab) {
      case "morning":
        return "0%";
      case "noon":
        return "100%";
      case "evening":
        return "200%";
      case "beforeBed":
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
            activeTab === "beforeBed" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("beforeBed")}
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
