"use client";

import styles from "./Treatment.module.css";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar, DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko"; // 이거 선언 해야 한글형식 적용 됨!
import BottomSheet from "../BottomSheet";
import { TreatmentCalendarItems } from "@/app/util/controller/treatmentController";
import TreatmentBox from "./TreatmentBox";
import ServerDay from "./children/ServerDay";
import { extractFirstFamilyColor } from "./children/Function";

interface TreatmentPaperCalendarProps {
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
}: TreatmentPaperCalendarProps) {
  const [open, setOpen] = useState(false);
  const familyColors = extractFirstFamilyColor(calendarData, familyId);
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
                  <>
                    <TreatmentBox treatmentItems={treatment} key={treatment.id} />
                    <div className="mb-2" />
                  </>
                ))
              )
          ) : (
            <div className={styles.empty_container}>선택된 날짜에 대한 진료 정보가 없습니다.</div>
          )}
        </div>
      </BottomSheet>
    </>
  );
}
