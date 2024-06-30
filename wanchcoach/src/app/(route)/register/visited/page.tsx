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
  ModalInputBox2,
} from "@/app/_components/component";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import { AddTreatmentController } from "@/app/util/controller/treatmentController";
import {
  MedicalKeywordResultData,
  PharmacyResultData,
} from "@/app/util/controller/medicalContoller";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import { Dayjs } from "dayjs";

export default function Visited() {
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
  const [choosePharmacy, setChoosePharmacy] = useState<PharmacyResultData>({
    pharmacyId: 0,
    name: "",
    address: "",
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
      date: date ? date.format("YYYY-MM-DD") + "T" + (time ? time.format("HH:mm") : "") : "",
      taken: false,
      alarm: selectedCheck === "ON",
      symptom: symptoms,
      prescription: "",
      pharmacyId: choosePharmacy.pharmacyId,
    };
    console.log(data);
    const formData = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("treatmentRequest", blob);
    console.log(blob);
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
  const handlePharmacyChange = (result: PharmacyResultData) => {
    setChoosePharmacy(result);
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
      <hr className={styles.middle_line} />
      <PrescriptionContainer
        choosePharmacy={choosePharmacy}
        handlePharmacyChange={handlePharmacyChange}
      />
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

interface PrescriptionContainerProps {
  choosePharmacy: PharmacyResultData;
  handlePharmacyChange: (result: PharmacyResultData) => void;
}

function PrescriptionContainer({
  choosePharmacy,
  handlePharmacyChange,
}: PrescriptionContainerProps) {
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
        <ModalInputBox2
          label="약국명"
          placeholder="약국 명"
          value={choosePharmacy}
          handlePharmacyChange={handlePharmacyChange}
        />
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
