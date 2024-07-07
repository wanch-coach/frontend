"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./visited.module.css";
import {
  BasicInputBox,
  DateInputBox,
  TimeInputBox,
  SelectInputbox,
  TextAreaInputbox,
  FrequentButton,
  HospitalModalInputBox,
  NumberSelectInputbox,
  NumberInputbox,
  DayCheckBox,
  PharmacyModalInputBox,
  ListInputBox,
} from "@/app/_components/component";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import {
  AddTreatmentController,
  OCRAddPrescriptionController,
  PrescriptionDrugData,
} from "@/app/util/controller/treatmentController";
import {
  MedicalKeywordResultData,
  PharmacyResultData,
} from "@/app/util/controller/medicalController";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import { Dayjs } from "dayjs";
import {
  DrugData,
  SearchDrugByKeyword,
  SimpleDrugData,
  SimpleSearchDrugByKeyword,
} from "@/app/util/controller/drugController";

export default function Visited() {
  const route = useRouter();
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
  const [selectedPharmacy, setSelectedPharmacy] = useState<PharmacyResultData>({
    pharmacyId: 0,
    name: "",
    type: "",
    address: "",
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [symptoms, setSymptoms] = useState("");
  const [prescribedDrugs, setPrescribedDrugs] = useState<PrescriptionDrugData[]>([
    { drugId: 0, quantity: 0, frequency: 0, day: 0, direction: "" },
  ]);
  const [drugs, setDrugs] = useState<SimpleDrugData[]>([]);
  const [drugValue, setDrugValue] = useState<string[]>([""]);
  const [drugSearching, setDrugSearching] = useState<boolean[]>([true]);
  const [selectedChecks, setSelectedChecks] = useState([false, false, false, false]);
  const [quantityValue, setQuantityValue] = useState<number[]>([0]);
  const [frequencyValue, setFrequencyValue] = useState<number[]>([0]);
  const [dayValue, setDayValue] = useState<number[]>([0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    const newSelectedChecks = [...selectedChecks];
    newSelectedChecks[index] = isChecked;
    setSelectedChecks(newSelectedChecks);
    console.log(newSelectedChecks);
  };

  const handleAddDrug = () => {
    setPrescribedDrugs((prevDrugs) => [
      ...prevDrugs,
      {
        drugId: 0,
        quantity: 0,
        frequency: 0,
        day: 0,
        direction: "",
      },
    ]);
    setDrugValue((prevDrugs) => [...prevDrugs, ""]);
    setDrugSearching((prevDrugs) => [...prevDrugs, true]);
    setQuantityValue((prevDrugs) => [...prevDrugs, 0]);
    setFrequencyValue((prevDrugs) => [...prevDrugs, 0]);
    setDayValue((prevDrugs) => [...prevDrugs, 0]);
  };

  const handleRemoveDrug = () => {
    if (prescribedDrugs.length > 1) {
      setPrescribedDrugs((prevDrugs) => prevDrugs.slice(0, -1));
      setDrugValue((prevDrugs) => prevDrugs.slice(0, -1));
      setDrugSearching((prevDrugs) => prevDrugs.slice(0, -1));
      setQuantityValue((prevDrugs) => prevDrugs.slice(0, -1));
      setFrequencyValue((prevDrugs) => prevDrugs.slice(0, -1));
      setDayValue((prevDrugs) => prevDrugs.slice(0, -1));
    }
  };
  const filteredData = (input: string) => {
    return drugs.filter((drug) =>
      drug.itemName.toLowerCase().includes((input || "").toLowerCase())
    );
  };
  const handleDrugValueInputChange = (index: number, value: string) => {
    const newInputValues = [...drugValue];
    newInputValues[index] = value;
    setDrugValue(newInputValues);

    const newSearchingValues = [...drugSearching];
    newSearchingValues[index] = true;
    setDrugSearching(newSearchingValues);
  };

  const handleDrugValueSubmit = (index: number, drug: SimpleDrugData) => {
    console.log("selected Drugs : " + drug.drugId + " " + drug.itemName);
    const newInputValues = [...drugValue];
    newInputValues[index] = drug.itemName;
    setDrugValue(newInputValues);

    const newSearchingValues = [...drugSearching];
    newSearchingValues[index] = false;
    setDrugSearching(newSearchingValues);

    setPrescribedDrugs((prevDrugs) => {
      const newDrugs = [...prevDrugs];
      newDrugs[index] = {
        ...newDrugs[index],
        drugId: drug.drugId, // 이 부분에서 drugId를 선택한 약의 id로 업데이트합니다.
      };
      return newDrugs;
    });
  };

  const handleQuantityValueInputChange = (index: number, value: number) => {
    const newInputValues = [...quantityValue];
    newInputValues[index] = value;
    setQuantityValue(newInputValues);
    setPrescribedDrugs((prevDrugs) => {
      const newDrugs = [...prevDrugs];
      newDrugs[index] = {
        ...newDrugs[index],
        quantity: value,
      };
      return newDrugs;
    });
  };
  const handleFrequencyValueInputChange = (index: number, value: number) => {
    setFrequencyValue((prevFrequencies) => {
      const newFrequencies = [...prevFrequencies];
      newFrequencies[index] = value;
      return newFrequencies;
    });
    setPrescribedDrugs((prevDrugs) => {
      const newDrugs = [...prevDrugs];
      newDrugs[index] = {
        ...newDrugs[index],
        frequency: value,
      };
      return newDrugs;
    });
  };
  const handleDayValueInputChange = (index: number, value: number) => {
    const newInputValues = [...dayValue];
    newInputValues[index] = value;
    setDayValue(newInputValues);
    setPrescribedDrugs((prevDrugs) => {
      const newDrugs = [...prevDrugs];
      newDrugs[index] = {
        ...newDrugs[index],
        day: value,
      };
      return newDrugs;
    });
  };

  const handleTreatmentRegister = () => {
    const data = {
      hospitalId: selectedHospital.hospitalId,
      familyId: selectedVisitor.familyId,
      department: "",
      date: selectedDate
        ? selectedDate.format("YYYY-MM-DD") +
          "T" +
          (selectedTime ? selectedTime.format("HH:mm") : "")
        : "",
      taken: true,
      alarm: true,
      symptom: symptoms,
      prescription: {
        familyId: selectedVisitor.familyId,
        pharmacyId: selectedPharmacy.pharmacyId,
        morning: selectedChecks[0],
        noon: selectedChecks[1],
        evening: selectedChecks[2],
        beforeBed: selectedChecks[3],
        prescribedDrugs: prescribedDrugs,
      },
    };
    console.log(data);
    const formData = new FormData();
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    formData.append("treatmentRequest", blob);
    console.log(blob);
    AddTreatmentController(formData)
      .then(() => {
        console.log("success add visited treatment");
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
  const handlePharmacyChange = (result: PharmacyResultData) => {
    setSelectedPharmacy(result);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      OCRAddPrescriptionController(formData)
        .then(() => {
          console.log("success add OCR treatment");
        })
        .catch((e) => {
          console.log(e);
          return;
        });
    }
  };
  const handleCameraButtonSubmit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responses = await Promise.all(
  //         drugValue.map(async (keyword) => {
  //           const response = await SimpleSearchDrugByKeyword(keyword);
  //           return response.data; // 데이터 반환
  //         })
  //       );
  //       setDrugs(responses.flat()); // flat()은 중첩 배열을 평탄화하는 메서드
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // drugValue가 변경될 때만 fetchData 함수 실행
  //   fetchData();
  // }, [drugValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          drugValue.map(async (keyword) => {
            const response = await SimpleSearchDrugByKeyword(keyword);
            return response.data; // 데이터 반환
          })
        );
        setDrugs(responses.flat()); // flat()은 중첩 배열을 평탄화하는 메서드
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 딜레이 적용을 위한 타이머 ID 저장 변수
    let timeoutId: NodeJS.Timeout;

    // 입력 중단 시간이 500ms 이후에 fetchData 실행
    const delayedFetchData = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, 500); // 500ms 딜레이
    };

    // drugValue가 변경될 때 delayedFetchData 함수 실행
    delayedFetchData();

    // clean-up 함수: 컴포넌트가 언마운트 되거나 effect가 재실행되기 전에 실행
    return () => clearTimeout(timeoutId);
  }, [drugValue]);

  return (
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
      <DateInputBox label="날짜" selectedDate={selectedDate} handleDateChange={setSelectedDate} />
      <TimeInputBox label="시간" selectedTime={selectedTime} handleTimeChange={setSelectedTime} />
      <TextAreaInputbox
        label="증상"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)} // 상태 업데이트 함수 전달
      />
      <hr className={styles.middle_line} />
      <PrescriptionContainer
        pharmacy={selectedPharmacy}
        handlePharmacyChange={handlePharmacyChange}
        prescribedDrugs={prescribedDrugs}
        handleAddDrug={handleAddDrug}
        handleRemoveDrug={handleRemoveDrug}
        drugValue={drugValue}
        handleDrugValueInputChange={handleDrugValueInputChange}
        drugsData={filteredData}
        handleDrugValueSubmit={handleDrugValueSubmit}
        drugSearching={drugSearching}
        selectedChecks={selectedChecks}
        handleCheckboxChange={handleCheckboxChange}
        quantityValue={quantityValue}
        handleQuantityValueInputChange={handleQuantityValueInputChange}
        frequencyValue={frequencyValue}
        handleFrequencyValueInputChange={handleFrequencyValueInputChange}
        dayValue={dayValue}
        handleDayValueInputChange={handleDayValueInputChange}
        handleCameraButtonSubmit={handleCameraButtonSubmit}
      />
      <input
        type="file"
        // accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        capture="environment"
        onChange={handleFileChange}
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
  pharmacy: PharmacyResultData;
  handlePharmacyChange: (result: PharmacyResultData) => void;
  prescribedDrugs: PrescriptionDrugData[];
  handleAddDrug: () => void;
  handleRemoveDrug: () => void;
  drugValue: string[];
  handleDrugValueInputChange: (index: number, value: string) => void;
  drugsData: (input: string) => SimpleDrugData[];
  drugSearching: boolean[];
  handleDrugValueSubmit: (index: number, drug: SimpleDrugData) => void;
  selectedChecks: boolean[];
  handleCheckboxChange: (index: number, isChecked: boolean) => void;
  quantityValue: number[];
  handleQuantityValueInputChange: (index: number, value: number) => void;
  frequencyValue: number[];
  handleFrequencyValueInputChange: (index: number, value: number) => void;
  dayValue: number[];
  handleDayValueInputChange: (index: number, value: number) => void;
  handleCameraButtonSubmit: () => void;
}

function PrescriptionContainer({
  pharmacy,
  handlePharmacyChange,
  prescribedDrugs,
  handleAddDrug,
  handleRemoveDrug,
  drugValue,
  handleDrugValueInputChange,
  drugsData,
  drugSearching,
  handleDrugValueSubmit,
  selectedChecks,
  handleCheckboxChange,
  quantityValue,
  handleQuantityValueInputChange,
  frequencyValue,
  handleFrequencyValueInputChange,
  dayValue,
  handleDayValueInputChange,
  handleCameraButtonSubmit,
}: PrescriptionContainerProps) {
  return (
    <div className={styles.prescription_container}>
      <div className={styles.prescription_title}>처방전</div>
      <div className={styles.drug_container}>
        <div className="pt-1" />
        <PharmacyModalInputBox
          label="약국명"
          placeholder="약국 명"
          value={pharmacy}
          handlePharmacyChange={handlePharmacyChange}
        />
        <DayCheckBox selectedChecks={selectedChecks} handleCheckboxChange={handleCheckboxChange} />
        <div className={styles.prescription_register_container}>
          <div className={styles.prescription_register_button} onClick={handleCameraButtonSubmit}>
            <IoCameraOutline size={"21px"} color={"white"} />
            <span className={styles.prescription_register_text}>카메라로 등록</span>
          </div>
        </div>
        <div className="mt-4">
          <div className={styles.drug_header}>
            <div className={styles.drug_header_text_01}>약 개수 ({prescribedDrugs.length})</div>
            <div className={styles.drug_header_text_02} onClick={handleAddDrug}>
              <FaPlus size={"17px"} />
              <span className="ml-1">추가</span>
            </div>
          </div>
          <hr className={styles.drug_header_line} />
          {prescribedDrugs.map((drug, index) => (
            <div key={index}>
              <ListInputBox
                label="의약품명"
                placeholder="의약품 명"
                type="text"
                value={drugValue[index]}
                onChange={(e) => handleDrugValueInputChange(index, e.target.value)}
                drugsData={drugsData}
                drugSearching={drugSearching[index]}
                prescriptionIndex={index}
                handleDrugValueSubmit={handleDrugValueSubmit}
              />
              <div className={styles.drug_number_box}>
                <NumberInputbox
                  label="1회 투약량"
                  placeholder="0"
                  value={quantityValue[index]}
                  onChange={(e) => handleQuantityValueInputChange(index, parseInt(e.target.value))}
                />
                <NumberSelectInputbox
                  label="1일 투여횟수"
                  value={frequencyValue[index]}
                  onChange={(e) => handleFrequencyValueInputChange(index, parseInt(e.target.value))}
                />
                <NumberInputbox
                  label="총 투약일수"
                  placeholder="0"
                  rightLabel="일"
                  value={dayValue[index]}
                  onChange={(e) => handleDayValueInputChange(index, parseInt(e.target.value))}
                />
              </div>
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
