"use client";

import DrugBoxDetail from "@/app/_components/Component/Drug/DrugBoxDetail";
import styles from "./mydruginformation.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MedicationMyDrugController,
  MyDrugInfoData,
} from "@/app/util/controller/medicationController";
import { DateInputBox } from "@/app/_components/component";
import dayjs, { Dayjs } from "dayjs";

export default function MyDrugInformation({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [myDrugData, setMyDrugData] = useState<MyDrugInfoData[]>([]);
  const [searing, setSearing] = useState(false);

  const handleMyDrugSubmit = () => {
    /* api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          familyId: familyId,
          startDate: startDate?.format("YYYY-MM-DD"),
          endDate: endDate?.format("YYYY-MM-DD"),
        };
        const response = await MedicationMyDrugController(data);
        setMyDrugData(response.data);
        setSearing(true);
        console.log("내 약 정보 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  };

  return (
    <div className={styles.body_container}>
      <DaySelectBox
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={setStartDate}
        handleEndDateChange={setEndDate}
        handleMyDrugSubmit={handleMyDrugSubmit}
      />
      {searing ? (
        myDrugData.length > 0 ? (
          <>
            <div>최근 복용한 약</div>
            {myDrugData.map((drugInfoData, index) => (
              <div className={styles.mydrug_list_container} key={index}>
                <DrugBoxDetail key={index} drugInfodata={drugInfoData} />
              </div>
            ))}
          </>
        ) : (
          <div className={styles.empty_container}>현재 범위에 조회된 약이 없습니다</div>
        )
      ) : (
        <div className={styles.empty_container}>조회를 눌러 데이터를 조회하세요</div>
      )}
    </div>
  );
}

interface DaySelectBoxProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  handleStartDateChange: Dispatch<SetStateAction<Dayjs | null>>;
  handleEndDateChange: Dispatch<SetStateAction<Dayjs | null>>;
  handleMyDrugSubmit: () => void;
}
function DaySelectBox({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  handleMyDrugSubmit,
}: DaySelectBoxProps) {
  return (
    <div className={styles.day_select_container}>
      <div className={styles.day_select_header}>기간선택</div>
      <div className={styles.day_select_box}>
        <DaySelectBoxPart
          title="시작일"
          date={startDate}
          handleDateChange={handleStartDateChange}
        />
        ~
        <DaySelectBoxPart title="종료일" date={endDate} handleDateChange={handleEndDateChange} />
      </div>
      <div className={styles.day_select_footer}>
        <div className={styles.day_select_button} onClick={handleMyDrugSubmit}>
          조회
        </div>
      </div>
    </div>
  );
}

interface DaySelectBoxPartProps {
  title: string;
  date: Dayjs | null;
  handleDateChange: Dispatch<SetStateAction<Dayjs | null>>;
}
function DaySelectBoxPart({ title, date, handleDateChange }: DaySelectBoxPartProps) {
  return (
    <div className={styles.day_select_box_part}>
      <div className={styles.day_select_box_title}>{title}</div>
      <DateInputBox selectedDate={date} handleDateChange={handleDateChange} small />
    </div>
  );
}
