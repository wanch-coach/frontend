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

interface ServerDayProps extends PickersDayProps<Dayjs> {
  highlightedDays?: string[];
  color?: string;
}

function ServerDay(props: ServerDayProps) {
  const { highlightedDays = [], day, outsideCurrentMonth, color, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));
  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? " " : undefined}
      sx={{ "& .MuiBadge-overlapCircular": { backgroundColor: color } }}
      variant={isSelected ? "dot" : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

interface PaperCalendarProps {
  familyColor: string;
  selectedDate: Dayjs | null;
  handleSelectedDateChange: (newDate: Dayjs) => void;
  highlightedDays: string[];
  handleMonthChange: (newDate: Dayjs) => void;
  calendarData: DrugDayCalendarData[] | undefined;
}

export default function PaperCalendar({
  familyColor,
  selectedDate,
  handleSelectedDateChange,
  highlightedDays,
  handleMonthChange,
  calendarData,
}: PaperCalendarProps) {
  const currentDate = dayjs();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("morning");
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
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
  const getTodayPartData = () => {
    if (!selectedDate || !calendarData) return [];
    const selectedDayData = calendarData.find((data) => data.day === selectedDate.date());

    if (!selectedDayData) return [];

    switch (activeTab) {
      case "morning":
        return selectedDayData.morning;
      case "noon":
        return selectedDayData.noon;
      case "evening":
        return selectedDayData.evening;
      case "beforeBed":
        return selectedDayData.befordBed;
      default:
        return [];
    }
  };
  const todayPartData = getTodayPartData();
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
                color: familyColor,
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
          <DayMenu activeTab={activeTab} handleTabClick={handleTabClick} />
          {todayPartData && todayPartData.length !== 0 ? (
            todayPartData.map((prescription, index) => (
              <MedicationInfoBox key={index} prescription={prescription} color={familyColor} />
            ))
          ) : (
            <div className={styles.empty_container}>이력 없음</div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
