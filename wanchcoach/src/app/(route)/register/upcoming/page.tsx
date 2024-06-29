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
import { useState } from "react";
import { AddTreatmentController } from "@/app/util/controller/treatementController";
import { MedicalKeywordResultData } from "@/app/util/controller/medicalContoller";


export default function Upcoming() {
  const route = useRouter();
  const [selectedCheck, setSelectedCheck] = useState("ON");
  const [chooseHospital, setChooseHospital] = useState<MedicalKeywordResultData>({hospitalId:0, name:'', type:'', address:''});
  const [chooseVisitor, setVisitor] = useState<MedicalKeywordResultData>({hospitalId:0, name:'', type:'', address:''});
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [symptoms, setSymptoms] = useState();
  const [prescription, setPrescription] = useState('');

  const handleTreatmentRegister = () => {
    const data = {
      hospitalId: 7,
      familyId: 13,
      department: "",
      date: date + time,
      taken: false,
      alarm: selectedCheck === 'ON',
      symptom: "힘들어요",
      prescription: ""
    };
    alert("눌렀어요");
    AddTreatmentController(data)
    .then(() => {
      console.log("success add treatment");
      route.push("/");
    })
    .catch((e) => {
      console.log(e);
      return;
    })
  };
  const handleHospitalChange = (result:MedicalKeywordResultData) => {
    setChooseHospital(result);
  }
  return (
    <div className={styles.container}>
      <ModalInputBox label="병원명" placeholder="병원 명" value={chooseHospital} handleHospitalChange={handleHospitalChange}/>
      <SelectInputbox label="방문자" />
      <DateInputBox label="날짜" />
      <TimeInputBox label="시간" />
      <TextAreaInputbox label="증상" />
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
