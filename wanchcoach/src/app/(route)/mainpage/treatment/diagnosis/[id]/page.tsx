"use client";
import styles from "./diagnosis.module.css";
import { useEffect, useState } from "react";
import TreatmentBox from "@/app/_components/Mainpage/Treatment/TreatmentBox";
import {
  TreatmentItems,
  TreatmentTotalController,
} from "@/app/util/controller/treatmentController";

export default function Diagnosis({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [treatmentPastData, setTreatmentPastData] = useState<TreatmentItems[]>([]);
  const [treatmentUpcomingData, setTreatUpcomingData] = useState<TreatmentItems[]>([]);
  // // 진료 삭제 컨트롤러 !!!
  // const handleTreatmentDelete = () => {
  // };
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

  useEffect(() => {
    const fetchData = async () => {
      TreatmentTotalController()
        .then((response) => {
          setTreatmentPastData(response.data.past);
          setTreatUpcomingData(response.data.upcoming);
        })
        .catch((e) => {
          console.log(e.message);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.body_text}>예약 중인 진료</div>
        {filteredUpcomingData ? (
          filteredUpcomingData.map((item: TreatmentItems) => (
            <TreatmentBox key={item.id} treatmentItems={item} future />
          ))
        ) : (
          <div className={styles.empty_container}>예약 중인 진료가 없습니다</div>
        )}
      </div>
      <div className={`${styles.body_container} pt-5`}>
        <div className={styles.body_text}>지난 예약</div>
        {filteredPastData ? (
          filteredPastData.map((item: TreatmentItems) => (
            <TreatmentBox key={item.id} treatmentItems={item} state />
          ))
        ) : (
          <div className={styles.empty_container}>지난 진료가 없습니다</div>
        )}
      </div>
    </>
  );
}
