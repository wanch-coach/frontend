"use client";

import styles from "./upcoming.module.css";
import { useRouter } from "next/navigation";
import {
  ModalInputBox,
  SelectInputbox,
  DateInputBox,
  TimeInputBox,
  TextAreaInputbox,
  TwoCheckBox,
  FrequentButton,
} from "@/app/components/component";
export default function Upcoming() {
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
      <TwoCheckBox label="알람 등록 여부" type1="ON" type1Text="ON" type2="OFF" type2Text="OFF" />
      <div className={styles.alarm_text}>
        ※ 알람 등록 ON 설정 시 3일전, 1일전, 당일에 알림이 울립니다.
      </div>
      <div className="pt-3" />
      <FrequentButton
        title="진료 등록"
        backgroundColor="#0a6847"
        onClick={handleTreatmentRegister}
      />
    </div>
  );
}
