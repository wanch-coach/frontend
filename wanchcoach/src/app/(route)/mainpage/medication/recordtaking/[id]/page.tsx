"use client";

import { useEffect, useState } from "react";
import MedicationInfoBox from "../../taking/[id]/_components/MedicationInfoBox";
import styles from "./recordtaking.module.css";
import {
  DrugRecordData,
  MedicationRecordController,
} from "@/app/util/controller/medicationController";

export default function RecordTaking({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [recordData, setRecordData] = useState<DrugRecordData>();
  useEffect(() => {
    /* 내 약정보 데이터 api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          familyId: familyId,
        };
        const response = await MedicationRecordController(data);
        setRecordData(response.data);
        console.log("내 약 정보 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, [familyId]);
  return (
    <div className={styles.body_container}>
      <MedicationInfoBox title="서울성모병원" category="내과" />
    </div>
  );
}
