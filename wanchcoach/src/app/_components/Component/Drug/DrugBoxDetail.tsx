"use client";

import styles from "./Drug.module.css";
import DrugBox from "./DrugBox";
import { useState, SyntheticEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MyDrugInfoData } from "@/app/util/controller/medicationController";

interface DrugBoxDetailProps {
  drugInfodata: MyDrugInfoData;
}
export default function DrugBoxDetail({ drugInfodata }: DrugBoxDetailProps) {
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
          <DrugBox
            title={drugInfodata.drugInfo.itemName}
            category={drugInfodata.drugInfo.prdtType}
          />
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
            <div className={styles.drug_detail_text}>총 {drugInfodata.records.length}회</div>
          </div>
          {drugInfodata.records.map((record) => (
            <div className={styles.drug_detail_record_text}>
              {record.takenTime.format("YYYY-MM-DD HH:mm:ss")}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
