"use client";

import styles from "./Component.module.css";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import "dayjs/locale/ko"; // 이거 선언 해야 한글형식 적용 됨!
import BottomSheet from "./BottomSheet";

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

export default function PaperCalendar() {
  const currentDate = dayjs();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

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
    setSelectedDate(newDate);
  };
  const handleBottomSheetChange = () => {
    setOpen(!open);
  };
  const [highlightedDays, setHighlightedDays] = useState([
    "2024-06-18",
    "2024-06-01",
    "2024-06-17",
  ]);
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
          />
        </LocalizationProvider>
      </div>

      <BottomSheet open={open} handleBottomSheetChange={handleBottomSheetChange}>
        <div className={styles.bottomsheet_content}>
          <div className={styles.bottomsheet_content_text}>
            {selectedDate && <>{selectedDate.format("YYYY년 M월 D일 (ddd)")}</>}
            <hr className={styles.bottomsheet_content_line} />
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
