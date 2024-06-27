"use client";

import styles from "./Drug.module.css";
import DrugBox from "./DrugBox";
import { useState, SyntheticEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export default function DrugBoxDetail() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandedChange = (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };
  return (
    <Accordion
      elevation={0}
      sx={{
        "&.MuiAccordion-root": {
          margin: 0,
        },
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
          margin: 0,
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .Mui-expanded": {
            minHeight: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
            },
          },
        }}
      >
        <div className={styles.drug_summary_container}>
          <DrugBox title="타이레놀정160mg" category="진통제" />
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
          margin: 0,
        }}
      >
        <div className={styles.drug_detail_container}>
          <div className={styles.drug_detail_header}>
            <div className={styles.drug_detail_text}>복용기록</div>
            <div className={styles.drug_detail_text}>총 4회</div>
          </div>
          <div className={styles.drug_detail_record_text}>2024-03-20 14:02:00</div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
