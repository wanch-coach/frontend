"use client";

import styles from "./Component.module.css";
import { SetStateAction, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import "dayjs/locale/ko"; // 이거 선언 해야 한글형식 적용 됨!
import BottomSheet from "./BottomSheet";
import { DrugDayCalendarData } from "@/app/util/controller/medicationController";
import DayMenu from "./Medication/DayMenu";
import MedicationInfoBox from "@/app/(route)/mainpage/medication/taking/[id]/_components/MedicationInfoBox";
import {
  TreatmentCalendar,
  TreatmentCalendarItems,
} from "@/app/util/controller/treatmentController";
import TreatmentBox from "@/app/(route)/mainpage/treatment/_components/TreatmentBox";

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? " " : undefined}
      sx={{ "& .MuiBadge-overlapCircular": { backgroundColor: "#FFAE81" } }}
      variant={isSelected ? "dot" : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

interface PaperCalendarProps {
  selectedDate: Dayjs | null;
  handleSelectedDateChange: (newDate: Dayjs) => void;
  highlightedDays: string[];
  handleMonthChange: (newDate: Dayjs) => void;
  calendarData: TreatmentCalendarItems[];
}

export default function TreatmentPaperCalendar({
  selectedDate,
  handleSelectedDateChange,
  highlightedDays,
  handleMonthChange,
  calendarData,
}: PaperCalendarProps) {
  const currentDate = dayjs();
  const [open, setOpen] = useState(false);
  const handleDateChange: DateCalendarProps<Dayjs>["onChange"] = (newDate) => {
    if (!newDate) return;

    if (selectedDate) {
      const sameYear = newDate.isSame(selectedDate, "year");
      // const sameMonth = newDate.isSame(selectedDate, "month");
      // const sameDay = newDate.isSame(selectedDate, "day");
      if (!sameYear) {
        setOpen(false);
      } else {
        handleBottomSheetChange();
      }
    } else {
      handleBottomSheetChange();
    }
    handleSelectedDateChange(newDate);
  };
  const handleBottomSheetChange = () => {
    setOpen(!open);
  };
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };
  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${period} ${formattedHours}:${formattedMinutes}`;
  };
  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DateCalendar
            views={["year", "month", "day"]}
            showDaysOutsideCurrentMonth
            sx={{
              width: "100%",
            }}
            shouldDisableDate={(day) => {
              return dayjs(day as Dayjs).isAfter(currentDate, "day");
            }}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
            value={selectedDate}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </LocalizationProvider>
      </div>

      <BottomSheet open={open} handleBottomSheetChange={handleBottomSheetChange}>
        <div className={styles.bottomsheet_content}>
          <div className={styles.bottomsheet_content_text}>
            {selectedDate && <>{selectedDate.format("YYYY년 M월 D일 (ddd)")}</>}
            <hr className={styles.bottomsheet_content_line} />
          </div>
          {calendarData.length > 0 ? (
            calendarData
              .filter(
                (item: TreatmentCalendarItems) => item.date == selectedDate?.format("YYYY-MM-DD")
              )
              .flatMap((item) =>
                item.treatmentItems.map((treatment) => (
                  <TreatmentBox
                    key={treatment.id}
                    title={treatment.hospitalName}
                    category={treatment.department}
                    date={formatDate(treatment.date)}
                    time={formatTime(treatment.date)}
                    userName={treatment.familyName}
                    userProfile="/logo.png"
                    content={treatment.symptom}
                    future
                  />
                ))
              )
          ) : (
            <div>선택된 날짜에 대한 진료 정보가 없습니다.</div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
