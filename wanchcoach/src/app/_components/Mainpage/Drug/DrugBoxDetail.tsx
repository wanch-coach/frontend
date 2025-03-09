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
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
            "& .Mui-expanded": {
              margin: 0,
              minHeight: 0,
            },
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
            drugId={drugInfodata.drugInfo.drugId}
            itemName={drugInfodata.drugInfo.itemName}
            prductType={drugInfodata.drugInfo.prductType}
            drugImage={drugInfodata.drugInfo.drugImage}
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
              {formatTimestamp(record.takenTime)}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
