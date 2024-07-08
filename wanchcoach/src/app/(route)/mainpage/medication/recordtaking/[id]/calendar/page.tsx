"use client";

import PaperCalendar from "@/app/_components/Component/PaperCalendar";
import style from "./calendar.module.css";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DrugDayCalendarData,
  MedicationCalendarController,
} from "@/app/util/controller/medicationController";

export default function Calender({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [familyColor, setFamilyColor] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [calendarData, setCalendartData] = useState<DrugDayCalendarData[] | undefined>();
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
        const response = await MedicationCalendarController(data);
        setFamilyColor(response.data.familyColor);
        setCalendartData(response.data.records);
        const year = response.data.year;
        const month = response.data.month;
        const dates = response.data.records.map((item: DrugDayCalendarData) => {
          const formattedMonth = String(month).padStart(2, "0");
          const formattedDay = String(item.day).padStart(2, "0");
          return `${year}-${formattedMonth}-${formattedDay}`;
        });
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
    <div className={style.body_container}>
      <PaperCalendar
        familyColor={familyColor}
        selectedDate={selectedDate}
        handleSelectedDateChange={handleSelectedDateChange}
        highlightedDays={highlightedDays}
        handleMonthChange={handleMonthChange}
        calendarData={calendarData}
      />
    </div>
  );
}
