"use client";

import styles from "./components.module.css";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useState, SyntheticEvent } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsJournalMedical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

//변수 title, category, count, state
interface MedicationBoxProps {
  title: string;
  category: string;
  count: number;
  state?: boolean;
}
export default function MedicationBox({ title, category, count, state }: MedicationBoxProps) {
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  const [expanded, setExpanded] = useState(false);

  const handleExpandedChange = (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };
  return (
    <div className={styles.medication_container}>
      {state && <div className={styles.medication_stack_container}></div>}
      <Accordion
        elevation={0}
        sx={{
          borderRadius: "10px",
          "&:before": {
            display: "none", // 기본 테두리 선 제거
          },
        }}
        expanded={expanded}
        onChange={handleExpandedChange}
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
                <div className={styles.medication_text_number_02}>{count}</div>
              </div>
              <div className={styles.medication_box_right_03}>
                {expanded ? (
                  <IoIosArrowUp size={"18px"} color="#CFCFCF" />
                ) : (
                  <IoIosArrowDown size={"18px"} color="#CFCFCF" />
                )}
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
          <div className={styles.medication_detail_container}>
            <div className={styles.medication_detail_content}>
              <div className={styles.treatment_detail_header}>
                <div className={styles.treatment_detail_header_text}></div>
                <div className={styles.treatment_detail_header_text}>약 명</div>
                <div className={styles.treatment_detail_header_text}>종류</div>
              </div>
              <div>
                <DrugBox title="타이레놀정160mg" category="진통제" />
                <DrugBox title="사디반정 160mg" category="고혈압 치료제" />
                <DrugBox title="마게이트정" category="제산제" />
              </div>
              <div className={styles.treatment_detail_footer}>총 3개</div>
              <div className={styles.treatment_detail_button_container}>
                <div className={styles.treatment_detail_button}>
                  <GoDotFill size={"20px"} color={"white"} />
                  <div className={styles.treatment_detail_button_text}>먹기</div>
                </div>
              </div>
            </div>
            <div className={styles.treatment_detail_alarm}>
              <FormControlLabel
                control={
                  <Switch
                    // checked={checked}
                    // onChange={handleChange}
                    color="success"
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="복약 알림 여부"
                labelPlacement="start"
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

interface DrugBoxProps {
  title: string;
  category: string;
}
function DrugBox({ title, category }: DrugBoxProps) {
  return (
    <div className={styles.drug_box}>
      <div className={styles.drug_box_image}>
        <Image src={"/logo.png"} alt="완치코치 로고" fill style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.drug_box_title}>{title}</div>
      <div className={styles.drug_box_category}>{category}</div>
    </div>
  );
}
