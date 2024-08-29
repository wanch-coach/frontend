"use client";

import styles from "./calendar.module.css";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  TreatmentCalendarController,
  TreatmentCalendarForAllController,
  TreatmentCalendarItems,
  TreatmentItems,
} from "@/app/util/controller/treatmentController";
import TreatmentPaperCalendar from "@/app/_components/Mainpage/Treatment/TreatmentPaperCalendar";

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
    const fetchData = async () => {
      if (familyId == 0) {
        TreatmentCalendarForAllController({
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
        })
          .then((response) => {
            setCalendartData(response.data.treatmentDateItems);
            const dates = response.data.treatmentDateItems.map((item: TreatmentItems) => item.date);
            setHighlightedDays(dates);
          })
          .catch((e) => {
            console.log(e.message);
            return;
          });
      } else {
        TreatmentCalendarController({
          familyId: familyId,
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
        })
          .then((response) => {
            setCalendartData(response.data.treatmentDateItems);
            const dates = response.data.treatmentDateItems.map((item: TreatmentItems) => item.date);
            setHighlightedDays(dates);
          })
          .catch((e) => {
            console.log(e.message);
            return;
          });
      }
    };
    fetchData();

    fetchData();
  }, [selectedDate.year(), selectedDate.month()]);

  return (
    <>
      <div className={styles.body_container}>
        <TreatmentPaperCalendar
          familyId={familyId}
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
