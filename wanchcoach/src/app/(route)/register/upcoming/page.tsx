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
} from "@/app/_components/component";
import { ChangeEvent, useState } from "react";
import { AddTreatmentController } from "@/app/util/controller/treatmentController";
import { MedicalKeywordResultData } from "@/app/util/controller/medicalController";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import { Dayjs } from "dayjs";

export default function Upcoming() {
  const route = useRouter();
  const [selectedCheck, setSelectedCheck] = useState("ON");
  const [chooseHospital, setChooseHospital] = useState<MedicalKeywordResultData>({
    hospitalId: 0,
    name: "",
    type: "",
    address: "",
  });
  const [chooseVisitor, setChooseVisitor] = useState<FamilySummaryListData>({
    familyId: 0,
    name: "",
    color: "",
  });
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleTreatmentRegister = () => {
    const data = {
      hospitalId: chooseHospital.hospitalId,
      familyId: chooseVisitor.familyId,
      department: "",
      date: date ? date.format("YYYY-MM-DD") + " " + (time ? time.format("HH:mm") : "") : "",
      taken: false,
      alarm: selectedCheck === "ON",
      symptom: symptoms,
      prescription: "",
    };
    const formData = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("treatmentRequest", blob);
    formData.append("file", "");
    console.log(data);
    alert("눌렀어요");
    AddTreatmentController(formData)
      .then(() => {
        console.log("success add treatment");
        route.push("/");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const handleHospitalChange = (result: MedicalKeywordResultData) => {
    setChooseHospital(result);
  };
  const handleVisitorChange = (selectedFamily: FamilySummaryListData) => {
    setChooseVisitor(selectedFamily);
  };
  // const handleDateChange = (date: Dayjs | null) => {
  //   setDate(date);
  // };
  // const handleTimeChange = (time: Dayjs | null) => {
  //   setTime(time);
  // };

  return (
    <div className={styles.container}>
      <ModalInputBox
        label="병원명"
        placeholder="병원 명"
        value={chooseHospital}
        handleHospitalChange={handleHospitalChange}
      />
      <SelectInputbox
        label="방문자"
        value={chooseVisitor}
        handleVisitorChange={handleVisitorChange}
      />
      <DateInputBox label="날짜" selectedDate={date} handleDateChange={setDate} />
      <TimeInputBox label="시간" selectedTime={time} handleTimeChange={setTime} />
      <TextAreaInputbox
        label="증상"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)} // 상태 업데이트 함수 전달
      />
      <TwoCheckBox
        label="알람 등록 여부"
        type1="ON"
        type1Text="ON"
        type2="OFF"
        type2Text="OFF"
        selectedCheck={selectedCheck}
        onChange={setSelectedCheck}
      />
      <div className={styles.alarm_text}>
        ※ 알람 등록 ON 설정 시 3일전, 1일전, 당일에 알림이 울립니다.
      </div>
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
