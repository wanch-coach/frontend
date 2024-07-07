"use client";

import { useEffect, useState } from "react";
import MedicationInfoBox from "../../taking/[id]/_components/MedicationInfoBox";
import styles from "./recordtaking.module.css";
import {
  MedicationRecordController,
  PrescriptionRecordData,
} from "@/app/util/controller/medicationController";

export default function RecordTaking({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [takingRecordData, setTakingRecordData] = useState<PrescriptionRecordData[]>();
  const [endRecordData, setEndRecordData] = useState<PrescriptionRecordData[]>();
  useEffect(() => {
    /* 내 약정보 데이터 api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          familyId: familyId,
        };
        const response = await MedicationRecordController(data);
        setTakingRecordData(response.data.taking);
        setEndRecordData(response.data.end);
        console.log("복약 이력 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, [familyId]);
  return (
    <div className={styles.body_container}>
      <div className={styles.body_text}>복용중인 약</div>
      {takingRecordData && takingRecordData.length > 0 ? (
        <>
          {takingRecordData.map((prescription, index) => (
            <MedicationInfoBox key={index} prescription={prescription} />
          ))}
        </>
      ) : null}

      <div className={styles.body_text}>과거에 먹은 약</div>
      {endRecordData && endRecordData.length > 0 ? (
        <>
          {endRecordData.map((prescription, index) => (
            <MedicationInfoBox key={index} prescription={prescription} />
          ))}
        </>
      ) : null}
    </div>
  );
}
