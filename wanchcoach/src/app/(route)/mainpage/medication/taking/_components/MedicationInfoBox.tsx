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
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsJournalMedical } from "react-icons/bs";

//변수 title, category, date, time, userName, userProfile, future
interface MedicationInfoBoxProps {
  title: string;
  category: string;
  date?: string;
  time?: string;
  userName?: string;
  userProfile?: string;
  content?: string;
  future?: boolean;
  state?: boolean;
}
export default function MedicationInfoBox({
  title,
  category,
  date,
  time,
  userName,
  userProfile,
  content,
  future,
  state,
}: MedicationInfoBoxProps) {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  return (
    <div className={styles.medication_container}>
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
          <div className={styles.medication_main_container}>
            <div className={styles.medication_box_left}>
              <BsJournalMedical size={"40px"} color="#494949" />
            </div>
            <div className={styles.medication_box_right}>
              <div className={styles.medication_box_right_01}>
                <div className={styles.medication_text_title}>{title}</div>
                <div className={styles.medication_text_category}>{category}</div>
              </div>
              <div className={styles.medication_box_right_02}>
                <div className={styles.medication_text_number_01}>남은 개수</div>
                <div className={styles.medication_text_number_02}>3</div>
              </div>
              <div className={styles.medication_box_right_03}>
                <IoIosArrowDown size={"18px"} color="#CFCFCF" />
              </div>
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
            <div className={styles.treatment_detail_content}>{content}</div>
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
                  <div className={styles.treatment_detail_button_text}>진료 삭제</div>
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
