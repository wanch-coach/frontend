"use client";

import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import Badge from "@mui/material/Badge";
import "dayjs/locale/ko"; // 이거 선언 해야 한글형식 적용 됨!
import styles from "./calendar.module.css";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import { useSpring, animated } from "react-spring";

export default function Calendar() {
  return (
    <>
      <div className={styles.body_container}>
        <PaperCalendar />
      </div>
    </>
  );
}

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

function PaperCalendar() {
  const currentDate = dayjs();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const animation = useSpring({
    transform: open ? "translateY(0)" : "translateY(100%)",
  });
  const handleDateChange: DateCalendarProps<Dayjs>["onChange"] = (newDate) => {
    if (!newDate) return;

    if (selectedDate) {
      const sameYear = newDate.isSame(selectedDate, "year");
      const sameMonth = newDate.isSame(selectedDate, "month");
      const sameDay = newDate.isSame(selectedDate, "day");
      if (!sameYear) {
        setOpen(false);
      } else {
        handleBottomSheetChange();
      }
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
      {open && <div className={styles.overlay} onClick={handleBottomSheetChange} />}
      <animated.div className={styles.bottomsheet_container} style={animation}>
        <div className={styles.bottomsheet_header}>
          <hr className={styles.bottomsheet_header_line} />
        </div>
        <div className={styles.bottomsheet_content}>
          <div className={styles.bottomsheet_content_text}>
            {selectedDate && <>{selectedDate.format("YYYY년 M월 D일 (ddd)")}</>}
            <hr className={styles.bottomsheet_content_line} />
          </div>
        </div>
      </animated.div>
    </>
  );
}
