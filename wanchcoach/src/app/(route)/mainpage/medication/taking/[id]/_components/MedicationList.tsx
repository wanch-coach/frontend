"use client";

import { MedicationEatController, TodayTakeData } from "@/app/util/controller/medicationController";
import MedicationBox from "./MedicationBox";
import styles from "./components.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MedicationListProps {
  todayTakedata: TodayTakeData[];
  activeTab: string;
  currentDate: Date;
  familyId: number;
}
export default function MedicationList({
  todayTakedata,
  activeTab,
  currentDate,
  familyId,
}: MedicationListProps) {
  const route = useRouter();
  const getTodayPartData = () => {
    switch (activeTab) {
      case "morning":
        return todayTakedata.map((data) => data.morning).flat();
      case "noon":
        return todayTakedata.map((data) => data.noon).flat();
      case "evening":
        return todayTakedata.map((data) => data.evening).flat();
      case "beforeBed":
        return todayTakedata.map((data) => data.beforeBed).flat();
      default:
        return [];
    }
  };
  const todayPartData = getTodayPartData();
  const unTakenCount = todayPartData.reduce((acc, data) => acc + data.unTaken.length, 0);
  const takenCount = todayPartData.reduce((acc, data) => acc + data.taken.length, 0);
  const familyColor = todayTakedata.length > 0 ? todayTakedata[0].familyColor : "";
  const handleEatSubmit = async (id: number) => {
    try {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1 필요
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const data = {
        prescriptionId: id,
        familyId: familyId,
        time: activeTab,
        takenDate: formattedDate,
      };
      const response = await MedicationEatController(data);

      console.log("먹기 성공:", response);
      window.location.replace(`/mainpage/medication/taking/${familyId}`);
    } catch (error) {
      console.error("먹기 실패:", error);
      // 오류 처리
    }
  };

  return (
    <div className={styles.taking_container}>
      <div className={styles.taking_text}>먹어야 해요 ({unTakenCount})</div>
      {unTakenCount > 0 ? (
        <>
          {todayPartData.map((data, index) => (
            <div key={index}>
              {data.unTaken.map((prescription, idx) => (
                <MedicationBox
                  key={idx}
                  prescription={prescription}
                  color={familyColor}
                  handleEatSubmit={() => handleEatSubmit(prescription.prescriptionId)}
                />
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.empty_container}>약이 없어요</div>
      )}
      <div className="mt-5" />
      <div className={styles.taking_text}>이미 먹었어요({takenCount})</div>
      {takenCount > 0 ? (
        <>
          {todayPartData.map((data, index) => (
            <div key={index}>
              {data.taken.map((prescription, idx) => (
                <MedicationBox key={idx} prescription={prescription} color={familyColor} state />
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={styles.empty_container}>약이 없어요</div>
      )}
    </div>
  );
}
