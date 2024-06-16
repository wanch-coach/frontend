import styles from "../treatment.module.css";
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

//변수 title, category, date, time, userName, userProfile, future
interface TreatmentBoxProps {
  title: string;
  category: string;
  date: string;
  time: string;
  userName: string;
  userProfile: string;
  content: string;
  future?: boolean;
  state?: boolean;
}
export function TreatmentBox({
  title,
  category,
  date,
  time,
  userName,
  userProfile,
  content,
  future,
  state,
}: TreatmentBoxProps) {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
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
                <div className={styles.treatment_text_left_title}>{title}</div>
                <div className={styles.treatment_text_left_category}>{category}</div>
              </div>
              <div className={styles.treatment_box_left_content}>
                <div className={styles.treatment_text_left_date_01}>{date}</div>
                <div className={styles.treatment_text_left_date_02}>{time}</div>
              </div>
            </div>
            {future && <div>D - day</div>}
            <div className={styles.treatment_box_right}>
              <div className={styles.treatment_box_right_profile}>
                <Image src={userProfile} alt="프로필" fill sizes="30px" />
              </div>
              {userName}
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
                <Link href="/mainpage/home">
                  <button
                    className={styles.treatment_detail_button}
                    style={{ backgroundColor: "#7ABA78" }}
                  >
                    <TbPencilMinus size={"20px"} />
                    <div className="pl-2">진료 수정</div>
                  </button>
                </Link>
                <Link href="/mainpage/home" className="ml-2">
                  <button
                    className={styles.treatment_detail_button}
                    style={{ backgroundColor: "#FF8282" }}
                  >
                    <TiDeleteOutline size={"20px"} />
                    <div className="pl-2">진료 삭제</div>
                  </button>
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
                labelPlacement="start"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "15px",
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
