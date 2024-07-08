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
  familyId: number;
  selectedDate: Dayjs | null;
  handleSelectedDateChange: (newDate: Dayjs) => void;
  highlightedDays: string[];
  handleMonthChange: (newDate: Dayjs) => void;
  calendarData: TreatmentCalendarItems[];
}

export default function TreatmentPaperCalendar({
  familyId,
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

  const extractFirstFamilyColor = (
    calendarData: TreatmentCalendarItems[],
    familyId: number
  ): string | null => {
    if (familyId == 0) {
      return "#757575";
    }

    for (const item of calendarData) {
      for (const treatmentItem of item.treatmentItems) {
        if (treatmentItem.familyColor) {
          return treatmentItem.familyColor;
        }
      }
    }
    return null;
  };
  const familyColors = extractFirstFamilyColor(calendarData, familyId);
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
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
                color: familyColors,
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
                  <TreatmentBox treatmentItems={treatment} key={treatment.id} />
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
