"use client";
import styles from "./diagnosis.module.css";
import TreatmentBox from "../../_components/TreatmentBox";
import { useEffect, useState } from "react";
import {
  TreatmentItems,
  TreatmentTotalController,
  TreatmentTotalItems,
} from "@/app/util/controller/treatmentController";

export default function Diagnosis({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [treatmentPastData, setTreatmentPastData] = useState<TreatmentItems[]>([]);
  const [treatmentUpcomingData, setTreatUpcomingData] = useState<TreatmentItems[]>([]);
  const handleTreatmentDelete = () => {
    /* 진료 삭제 */
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TreatmentTotalController();
        setTreatmentPastData(response.data.past);
        setTreatUpcomingData(response.data.upcoming);

        console.log("진료 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, []);

  const filteredPastData =
    treatmentPastData.length > 0 &&
    (familyId == 0
      ? treatmentPastData
      : treatmentPastData.filter((item) => item.familyId == familyId));
  const filteredUpcomingData =
    treatmentUpcomingData.length > 0 &&
    (familyId == 0
      ? treatmentUpcomingData
      : treatmentUpcomingData.filter((item) => item.familyId == familyId));
  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.body_text}>예약 중인 진료</div>
        {filteredUpcomingData &&
          filteredUpcomingData.map((item: TreatmentItems) => (
            <TreatmentBox key={item.id} treatmentItems={item} future />
          ))}
      </div>
      <div className={`${styles.body_container} pt-5`}>
        <div className={styles.body_text}>지난 예약</div>
        {filteredPastData &&
          filteredPastData.map((item: TreatmentItems) => (
            <TreatmentBox key={item.id} treatmentItems={item} state />
          ))}
      </div>
    </>
  );
}
