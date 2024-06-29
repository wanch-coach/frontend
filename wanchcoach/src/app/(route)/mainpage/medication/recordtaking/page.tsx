"use client";

import { useEffect } from "react";
import MedicationInfoBox from "../taking/[id]/_components/MedicationInfoBox";
import styles from "./recordtaking.module.css";

export default function RecordTaking() {
  // useEffect(() => {
  //   /* 복약 데이터 api 호출 */
  //   const fetchData = async () => {
  //     try {
  //       const data = {
  //         year: currentDate.year(),
  //         month: currentDate.month() + 1,
  //         day: currentDate.date(),
  //       };
  //       const response = await MedicationDayController(data);
  //       setTodayTaken(response.data);
  //       console.log("데이터 가져오기 성공:", response);
  //     } catch (error) {
  //       console.error("데이터 가져오기 실패:", error);
  //       // 오류 처리
  //     }
  //   };
  //   fetchData();
  // }, [currentDate]);
  return (
    <div className={styles.body_container}>
      <MedicationInfoBox title="서울성모병원" category="내과" />
    </div>
  );
}
