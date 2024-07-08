"use client";

import styles from "./components.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useState, SyntheticEvent } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsJournalMedical } from "react-icons/bs";
import Link from "next/link";
import { TbPencilMinus } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import DrugBox from "@/app/_components/Component/Drug/DrugBox";
import { PrescriptionRecordData } from "@/app/util/controller/medicationController";
import { useRouter } from "next/navigation";

//변수 title, category, count, state
interface MedicationInfoBoxProps {
  prescription: PrescriptionRecordData;
  state?: boolean;
  color?: string;
}
export default function MedicationInfoBox({ prescription, state, color }: MedicationInfoBoxProps) {
  const route = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleExpandedChange = (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };
  function formatDate(inputDateStr: string) {
    const dateObj = new Date(inputDateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }
  return (
    <div className={styles.medication_container}>
      {state && (
        <div className={styles.medication_stack_container} style={{ height: "90px" }}></div>
      )}
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
              "& .Mui-expanded": {
                minHeight: 0,
                margin: 0,
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
          <div className={styles.medication_main_container} style={{ height: "90px" }}>
            <div className={styles.medication_box_left} style={{ backgroundColor: color }}>
              <BsJournalMedical size={"40px"} color="#494949" />
            </div>
            <div className={styles.medication_box_right}>
              <div className={styles.medication_box_right_01}>
                <div className={styles.medication_text_title}>{prescription.hospitalName}</div>
                <div className={styles.medication_text_category}>{prescription.department}</div>
              </div>
              {prescription.start && (
                <div className={styles.medication_box_right_02}>
                  <div className={styles.medication_text_number_01}>복용 기간</div>
                  <div className={styles.medication_text_number_02}>
                    {formatDate(prescription.start)}
                  </div>
                  <div className={styles.medication_text_number_02}>~ </div>
                </div>
              )}
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
              <div className={styles.medication_detail_header}>
                <div className={styles.medication_detail_header_text} style={{ flex: "3" }}></div>
                <div className={styles.medication_detail_header_text} style={{ flex: "6" }}>
                  약 명
                </div>
                <div className={styles.medication_detail_header_text} style={{ flex: "3" }}>
                  종류
                </div>
              </div>
              <div>
                {prescription.drugs.map((drug, index) => (
                  <div key={index}>
                    <DrugBox
                      itemName={drug.itemName}
                      prductType={drug.prductType}
                      drugImage={drug.drugImage}
                      onClick={() => route.push(`/druginfo/${drug.drugId}`)}
                    />
                    <div style={{ marginTop: "4px" }} />
                  </div>
                ))}
              </div>
              <div className={styles.medication_detail_total}>총 {prescription.drugs.length}개</div>
            </div>
            <div className={styles.medication_detail_footer}>
              <div className={styles.medication_detail_footer_left}>
                <Link
                  href="/mainpage/home"
                  className={styles.medication_detail_footer_button}
                  style={{ backgroundColor: "#7ABA78" }}
                >
                  <TbPencilMinus size={"18px"} />
                  <div className={styles.medication_detail_footer_button_text}>진료 수정</div>
                </Link>
                <Link
                  href="/mainpage/home"
                  className={`${styles.medication_detail_footer_button} ml-2`}
                  style={{ backgroundColor: "#FF8282" }}
                >
                  <TiDeleteOutline size={"19px"} />
                  <div className={styles.medication_detail_footer_button_text}>진료 삭제</div>
                </Link>
              </div>

              <div className={styles.medication_detail_footer_right}>
                <FaRegTrashAlt />
                <div className={styles.medication_detail_footer_right_text}>복약 종료</div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
