"use client";

import styles from "./upcoming.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HospitalModalInputBox,
  SelectInputbox,
  DateInputBox,
  TimeInputBox,
  TextAreaInputbox,
  TwoCheckBox,
  FrequentButton,
} from "@/app/_components/component";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { AddTreatmentController } from "@/app/util/controller/treatmentController";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import { Dayjs } from "dayjs";
import { MedicalKeywordResultData } from "@/app/util/controller/medicalController";

export default function Upcoming() {
  const params = useSearchParams();
  const route = useRouter();
  const [selectedAlarmCheck, setSelectedAlarmCheck] = useState("ON");
  const [selectedHospital, setSelectedHospital] = useState<MedicalKeywordResultData>({
    hospitalId: 0,
    name: "",
    type: "",
    address: "",
  });
  const [selectedVisitor, setSelectedVisitor] = useState<FamilySummaryListData>({
    familyId: 0,
    name: "",
    color: "",
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [symptoms, setSymptoms] = useState("");
  // const [department, setDepartment] = useState("");
  // const [prescription, setPrescription] = useState("");

  const handleTreatmentRegister = () => {
    const data = {
      hospitalId: selectedHospital.hospitalId,
      familyId: selectedVisitor.familyId,
      date: selectedDate
        ? selectedDate.format("YYYY-MM-DD") +
          "T" +
          (selectedTime ? selectedTime.format("HH:mm") : "")
        : "",
      taken: false,
      alarm: "ON",
      symptom: symptoms,
      department: "",
      prescription: null,
    };
    console.log(data);
    const formData = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("treatmentRequest", blob);
    formData.append("file", "");
    AddTreatmentController(formData)
      .then(() => {
        console.log("success add treatment");
        route.back();
        route.replace("/mainpage/home");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const handleHospitalChange = (result: MedicalKeywordResultData) => {
    setSelectedHospital(result);
  };
  const handleVisitorChange = (selectedFamily: FamilySummaryListData) => {
    setSelectedVisitor(selectedFamily);
  };

  useEffect(() => {
    const hospitalId = params.get("hospitalId");
    const hospitalName = params.get("hospitalName");
    if (hospitalId && hospitalName) {
      console.log(hospitalId);
      console.log(hospitalName);
      setSelectedHospital({
        hospitalId: parseInt(hospitalId),
        name: hospitalName,
        type: "",
        address: "",
      });
    }
  }, []);

  return (
    <Suspense fallback={<div className={styles.loading_screen}>Loading...</div>}>
      <div className={styles.container}>
        <HospitalModalInputBox
          label="병원명"
          placeholder="병원 명"
          value={selectedHospital}
          handleHospitalChange={handleHospitalChange}
        />
        <SelectInputbox
          label="방문자"
          value={selectedVisitor}
          handleVisitorChange={handleVisitorChange}
        />
        <DateInputBox
          label="날짜"
          selectedDate={selectedDate}
          handleDateChange={setSelectedDate}
          future
        />
        <TimeInputBox label="시간" selectedTime={selectedTime} handleTimeChange={setSelectedTime} />
        <TextAreaInputbox
          label="증상"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)} // 상태 업데이트 함수 전달
        />
        {/* <TwoCheckBox
        label="알람 등록 여부"
        type1="ON"
        type1Text="ON"
        type2="OFF"
        type2Text="OFF"
        selectedCheck={selectedAlarmCheck}
        onChange={setSelectedAlarmCheck}
      /> */}
        {/* <div className={styles.alarm_text}>
        ※ 알람 등록 ON 설정 시 3일전, 1일전, 당일에 알림이 울립니다.
      </div> */}
        <div style={{ padding: "2vh 0" }}>
          <FrequentButton
            title="진료 등록"
            backgroundColor="#0a6847"
            onClick={handleTreatmentRegister}
          />
        </div>
      </div>
    </Suspense>
  );
}
