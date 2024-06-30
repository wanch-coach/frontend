"use client";

import { FrequentButton, Header, TimeInputBox } from "@/app/_components/component";
import styles from "./alarm.module.css";
import { useState } from "react";

export default function Alarm() {
  const [morning, setMorning] = useState("");
  const [noon, setNoon] = useState("");
  const [evening, setEvening] = useState("");
  const [beforeBed, setBeforeBed] = useState("");
  const handleAlarmUpdate = () => {};
  const [change, setChange] = useState(false);
  return (
    <div className={styles.container}>
      <Header title="알람 관리" />
      <div className={styles.body_container}>
        <div className={styles.alarm_change_container}>
          <div className={styles.alarm_text}>처방전 알림시간 설정</div>
          <div className={styles.alarm_change_box}>
            <TimeInputBox label="아침" />
            <div className={styles.alarm_height}></div>
            <TimeInputBox label="점심" />
            <div className={styles.alarm_height}></div>
            <TimeInputBox label="저녁" />
            <div className={styles.alarm_height}></div>
            <TimeInputBox label="자기 전" />
          </div>
          <div style={{ height: "5vh" }}></div>
          <FrequentButton
            title="변경"
            backgroundColor={change ? "#0A6847" : "#dddddd"}
            onClick={handleAlarmUpdate}
            small
          />
        </div>
      </div>
    </div>
  );
}
