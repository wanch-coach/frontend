"use client";

import styles from "./components.module.css";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsJournalMedical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import DrugBox from "@/app/_components/Component/Drug/DrugBox";
import {
  DrugData,
  MedicationAlarmChangeController,
  PrescriptionData,
} from "@/app/util/controller/medicationController";
import { BasicModal } from "@/app/_components/component";
import { GiPill } from "react-icons/gi";

//변수 title, category, count, state
interface MedicationBoxProps {
  prescription: PrescriptionData;
  state?: boolean;
  color?: string;
  handleEatSubmit?: () => void;
}
export default function MedicationBox({
  prescription,
  state,
  color,
  handleEatSubmit,
}: MedicationBoxProps) {
  const [checked, setChecked] = React.useState(prescription.alarm);
  const [expanded, setExpanded] = useState(false);
  const [eatModal, setEatModal] = useState(false);

  const handleExpandedChange = (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleAlarmChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await MedicationAlarmChangeController(prescription.prescriptionId);
      console.log("알림 체인지 성공:", response);
    } catch (error) {
      console.error("알림 체인지 실패:", error);
      // 오류 처리
    }
    setChecked(e.target.checked);
  };

  const handleEatModalClose = () => {
    setEatModal(false);
  };

  const handleEatChange = () => {
    setEatModal(false);
    if (handleEatSubmit) {
      handleEatSubmit(); // 함수 호출
    }
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
            <div className={styles.medication_box_left} style={{ backgroundColor: color }}>
              <BsJournalMedical size={"40px"} color="#494949" />
            </div>
            <div className={styles.medication_box_right}>
              <div className={styles.medication_box_right_01}>
                <div className={styles.medication_text_title}>{prescription.hospitalName}</div>
                <div className={styles.medication_text_category}>{prescription.department}</div>
              </div>
              <div className={styles.medication_box_right_02}>
                <div className={styles.medication_text_number_01}>남은 개수</div>
                <div className={styles.medication_text_number_02}>{prescription.remains}</div>
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
              <div className={styles.medication_detail_header}>
                <div className={styles.medication_detail_header_text}></div>
                <div className={styles.medication_detail_header_text} style={{ flex: 6 }}>
                  약 명
                </div>
                <div className={styles.medication_detail_header_text}>종류</div>
              </div>
              <div>
                {prescription.drugs.map((drug) => (
                  <React.Fragment key={drug.drugId}>
                    <DrugBox
                      drugId={drug.drugId}
                      itemName={drug.itemName}
                      drugImage={drug.drugImage}
                      prductType={drug.productType}
                    />
                    <div style={{ marginTop: "4px" }} />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles.medication_detail_total}>총 {prescription.drugs.length}개</div>
              <div className={styles.medication_detail_button_container}>
                <div className={styles.medication_detail_button} onClick={() => setEatModal(true)}>
                  <GoDotFill size={"20px"} color={"white"} />
                  <div className={styles.medication_detail_button_text}>먹기</div>
                </div>
              </div>
            </div>
            <div className={styles.medication_detail_alarm}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={handleAlarmChange}
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
      <PrecriptionYesOrNoModal
        title="약 먹기"
        content="약을 드시겠어요?"
        count={prescription.remains}
        open={eatModal}
        handleModalClose={handleEatModalClose}
        onClickYes={handleEatChange}
        onClickNo={handleEatModalClose}
      />
    </div>
  );
}

interface PrecriptionYesOrNoModalProps {
  title: string;
  content: string;
  count: number;
  open: boolean;
  handleModalClose: () => void;
  onClickYes?: () => void;
  onClickNo: () => void;
}
function PrecriptionYesOrNoModal({
  title,
  content,
  count,
  open,
  handleModalClose,
  onClickYes,
  onClickNo,
}: PrecriptionYesOrNoModalProps) {
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
    <BasicModal open={open} handleModalClose={handleModalClose} width="50%" height="23vh">
      <>
        <div className={styles.modal_header}>
          <div className={styles.modal_header_title}>
            <GiPill size="25px" />
            <div className={styles.modal_header_title_text}>{title}</div>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.modal_body_time_text}>현재시간 </div>
            <div className={styles.modal_body_text}>{content}</div>
          </div>
          <div className={styles.modal_body_count_text}>남은개수 : {count}</div>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.modal_content_box_01} onClick={onClickNo}>
            아니요
          </div>
          <div className={styles.modal_content_box_02} onClick={onClickYes}>
            예
          </div>
        </div>
      </>
    </BasicModal>
  );
}
