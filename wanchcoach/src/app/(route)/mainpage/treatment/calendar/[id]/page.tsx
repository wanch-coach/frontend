"use client";

import styles from "./calendar.module.css";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  TreatmentCalendarController,
  TreatmentCalendarItems,
  TreatmentItems,
} from "@/app/util/controller/treatmentController";
import TreatmentPaperCalendar from "@/app/_components/Component/TreatmentPaperCalendar";

export default function Calendar({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [calendarData, setCalendartData] = useState<TreatmentCalendarItems[]>([]);
  const [highlightedDays, setHighlightedDays] = useState<string[]>([]);

  const handleSelectedDateChange = (newDate: Dayjs) => {
    setSelectedDate(newDate);
  };
  const handleMonthChange = (newDate: Dayjs) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    /* 달 별 복약 데이터 api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          familyId: familyId,
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
        };
        const response = await TreatmentCalendarController(data);
        setCalendartData(response.data.treatmentDateItems);
        const dates = response.data.treatmentDateItems.map((item: TreatmentItems) => item.date);
        setHighlightedDays(dates);
        console.log("달력 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, [selectedDate.year(), selectedDate.month()]);
  return (
    <>
      <div className={styles.body_container}>
        <TreatmentPaperCalendar
          selectedDate={selectedDate}
          handleSelectedDateChange={handleSelectedDateChange}
          highlightedDays={highlightedDays}
          handleMonthChange={handleMonthChange}
          calendarData={calendarData}
        />
      </div>
    </>
  );
}
