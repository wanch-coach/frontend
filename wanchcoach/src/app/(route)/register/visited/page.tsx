"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./visited.module.css";
import {
  BasicInputBox,
  DateInputBox,
  TimeInputBox,
  SelectInputbox,
  TextAreaInputbox,
  FrequentButton,
  ModalInputBox,
  NumberSelectInputbox,
  NumberInputbox,
  DayCheckBox,
} from "@/app/_components/component";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";

export default function Visited() {
  const route = useRouter();
  const handleTreatmentRegister = () => {
    route.push("/");
  };
  return (
    <div className={styles.container}>
      <ModalInputBox label="병원명" placeholder="병원 명" />
      <SelectInputbox label="방문자" />
      <DateInputBox label="날짜" />
      <TimeInputBox label="시간" />
      <TextAreaInputbox label="증상" />
      <hr className={styles.middle_line} />
      <PrescriptionContainer />
      <div style={{ padding: "2vh 0" }}>
        <FrequentButton
          title="진료 등록"
          backgroundColor="#0a6847"
          onClick={handleTreatmentRegister}
        />
      </div>
    </div>
  );
}

export function PrescriptionContainer() {
  const [drugs, setDrugs] = useState([{ id: 1 }]); // 들어 있는 약들 (api 연결 시 변수 추가 예정)
  const handleAddDrug = () => {
    setDrugs((preDrugs) => [...preDrugs, { id: preDrugs.length + 1 }]);
  };
  const handleRemoveDrug = () => {
    if (drugs.length > 1) {
      setDrugs((preDrugs) => preDrugs.filter((drug) => drug.id !== preDrugs.length));
    }
  };
  return (
    <div className={styles.prescription_container}>
      <div className={styles.prescription_title}>
        <div className={styles.prescription_title_text}>처방전</div>
        <div className={styles.prescription_register_button}>
          <IoCameraOutline size={"21px"} color={"white"} />
          <span className={styles.prescription_register_text}>카메라로 등록</span>
        </div>
      </div>
      <div className={styles.drug_container}>
        <div className="pt-1" />
        <ModalInputBox label="약국명" placeholder="약국 명" />
        <div className="mt-4">
          <div className={styles.drug_header}>
            <div className={styles.drug_header_text_01}>약 개수 ({drugs.length})</div>
            <div className={styles.drug_header_text_02} onClick={handleAddDrug}>
              <FaPlus size={"17px"} />
              <span className="ml-1">추가</span>
            </div>
          </div>
          <hr className={styles.drug_header_line} />
          {drugs.map((drug, index) => (
            <div key={drug.id}>
              <BasicInputBox label="의약품명" placeholder="의약품 명" type="text" />
              <div className={styles.drug_number_box}>
                <NumberSelectInputbox label="1회 투약량" />
                <NumberSelectInputbox label="1일 투여횟수" />
                <NumberInputbox label="총 투약일수" placeholder="일" />
              </div>
              <DayCheckBox />
              <hr className={styles.drug_footer_line} />
            </div>
          ))}
          <div className={styles.drug_footer_text} onClick={handleRemoveDrug}>
            <FaMinus size={"17px"} />
            <span className="ml-1">제거</span>
          </div>
        </div>
      </div>
    </div>
  );
}
