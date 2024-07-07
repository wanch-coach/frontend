import styles from "./components.module.css";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React from "react";
import Link from "next/link";
import { TbPencilMinus } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { TreatmentItems } from "@/app/util/controller/treatmentController";

interface TreatmentBoxProps {
  treatmentItems: TreatmentItems;
  future?: boolean;
  state?: boolean;
  handleTreatmentDelete?: () => void;
}
export default function TreatmentBox({
  treatmentItems,
  future,
  state,
  handleTreatmentDelete,
}: TreatmentBoxProps) {
  const calculateDDay = (targetDate: string) => {
    const currentDate = new Date();
    const targetDateTime = new Date(targetDate);

    const currentTimestamp = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
    const targetTimestamp = new Date(targetDateTime.setHours(0, 0, 0, 0)).getTime();

    // D-day 계산
    const timeDiff = targetTimestamp - currentTimestamp;
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const dDay = Math.ceil(timeDiff / millisecondsInADay);

    if (dDay === 0) {
      return <div className={styles.treatment_box_dday}>D - day</div>;
    } else if (dDay > 0) {
      return <div className={styles.treatment_box_notdday}>{`D - ${dDay}`}</div>;
    } else {
      return <div className={styles.treatment_box_notdday}>{`D - ${dDay}`}</div>;
    }
  };
  const dDayMessage = calculateDDay(treatmentItems.date);

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
    <div className={styles.treatment_container}>
      {state && <div className={styles.treatment_stack_container}></div>}
      <Accordion
        elevation={0}
        sx={{
          borderRadius: "10px",
          "&:before": {
            display: "none", // 기본 테두리 선 제거
          },
        }}
      >
        <AccordionSummary
          sx={{
            padding: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
            "&.Mui-expanded": {
              minHeight: 0,
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
            },
          }}
        >
          <div className={styles.treatment_main_container}>
            <div className={styles.treatment_box_left}>
              <div className={styles.treatment_box_left_title}>
                <div className={styles.treatment_text_left_title}>
                  {treatmentItems.hospitalName}
                </div>
                <div className={styles.treatment_text_left_category}>
                  {treatmentItems.department}
                </div>
              </div>
              <div className={styles.treatment_box_left_content}>
                <div className={styles.treatment_text_left_date_01}>
                  {formatDate(treatmentItems.date)}
                </div>
                <div className={styles.treatment_text_left_date_02}>
                  {formatTime(treatmentItems.date)}
                </div>
              </div>
            </div>
            {future && dDayMessage}
            <div className={styles.treatment_box_right}>
              <div
                className={styles.treatment_box_right_profile}
                style={{ backgroundColor: treatmentItems.familyColor }}
              >
                {treatmentItems.familyName}
              </div>
              {treatmentItems.familyName}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 0,
            margin: 0,
          }}
        >
          <div className={styles.treatment_detail_container}>
            <div className={styles.treatment_detail_content}>{treatmentItems.symptom}</div>
            <div className={styles.treatment_detail_box}>
              <div className={styles.treatment_detail_box_left}>
                <Link
                  href="/mainpage/home"
                  className={styles.treatment_detail_button}
                  style={{ backgroundColor: "#7ABA78" }}
                >
                  <TbPencilMinus size={"18px"} />
                  <div className={styles.treatment_detail_button_text}>진료 수정</div>
                </Link>
                <Link
                  href="/mainpage/home"
                  className={`${styles.treatment_detail_button} ml-2`}
                  style={{ backgroundColor: "#FF8282" }}
                >
                  <TiDeleteOutline size={"19px"} />
                  <div
                    className={styles.treatment_detail_button_text}
                    onClick={handleTreatmentDelete}
                  >
                    진료 삭제
                  </div>
                </Link>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    // checked={checked}
                    // onChange={handleChange}
                    color="success"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="예약 알림 여부"
                labelPlacement="top"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Pretendard",
                  },
                }}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
