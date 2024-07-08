import styles from "./components.module.css";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, { ChangeEvent } from "react";
import Link from "next/link";
import { TbPencilMinus } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  TreatmentCheckWhetherChangeController,
  TreatmentItems,
} from "@/app/util/controller/treatmentController";
import { IoAlertCircle } from "react-icons/io5";
import { BasicModal } from "@/app/_components/component";
import { useRouter } from "next/navigation";

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
  const route = useRouter();
  const [checked, setChecked] = React.useState(treatmentItems.alarm);
  const [whetherModal, setWhetherModal] = React.useState(false);
  const [registerModal, setRegisterModal] = React.useState(false);
  const handleModalClose = () => {
    setWhetherModal(false);
    setRegisterModal(false);
  };
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

  const handleAlarmChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // try {
    //   const response = await MedicationAlarmChangeController(prescription.prescriptionId);
    //   console.log("알림 체인지 성공:", response);
    // } catch (error) {
    //   console.error("알림 체인지 실패:", error);
    //   // 오류 처리
    // }
    setChecked(e.target.checked);
  };

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

  const handleCheckWhetherSubmit = async () => {
    try {
      const response = await TreatmentCheckWhetherChangeController(treatmentItems.id);
      console.log("진료 여부 변경 성공:", response);
    } catch (error) {
      console.error("진료 여부 변경 실패:", error);
      // 오류 처리
    }
    setWhetherModal(false);
  };
  const handleRegisterSubmit = async () => {
    setWhetherModal(false);
    route.push(`/prescriptionregister/${treatmentItems.id}`);
  };
  return (
    <div className={styles.treatment_container}>
      <TreatmentYesOrNoModal
        title="여부 확인"
        color="#FF8888"
        content="해당 병원을 방문했나요?"
        treatmentItems={treatmentItems}
        open={whetherModal}
        handleModalClose={handleModalClose}
        onClickYes={handleCheckWhetherSubmit}
        onClickNo={handleModalClose}
      />
      <TreatmentYesOrNoModal
        title="처방전 등록"
        color="#599468"
        content="해당 병원에 대한 처방전을 등록하시겠습니까?"
        treatmentItems={treatmentItems}
        open={registerModal}
        handleModalClose={handleModalClose}
        onClickYes={handleRegisterSubmit}
        onClickNo={handleModalClose}
      />
      {state && treatmentItems.taken === false ? (
        <div className={styles.treatment_stack_red_container} onClick={() => setWhetherModal(true)}>
          <IoAlertCircle size="30px" color="#FF8888" />
          여부 확인
        </div>
      ) : (
        state &&
        !treatmentItems.prescriptionId && (
          <div
            className={styles.treatment_stack_green_container}
            onClick={() => setRegisterModal(true)}
          >
            <IoAlertCircle size="30px" color="#599468" />
            처방전 등록
          </div>
        )
      )}

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
                    checked={checked}
                    onChange={handleAlarmChange}
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

interface TreatmentYesOrNoModalProps {
  title: string;
  color: string;
  content: string;
  treatmentItems: TreatmentItems;
  open: boolean;
  handleModalClose: () => void;
  onClickYes: () => void;
  onClickNo: () => void;
}
function TreatmentYesOrNoModal({
  title,
  color,
  content,
  treatmentItems,
  open,
  handleModalClose,
  onClickYes,
  onClickNo,
}: TreatmentYesOrNoModalProps) {
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
            <IoAlertCircle size="25px" color={color} />
            <div className={styles.modal_header_title_text} style={{ color: color }}>
              {title}
            </div>
          </div>

          <div className={styles.treatment_box_left}>
            <div className={styles.treatment_box_left_title}>
              <div className={styles.treatment_text_left_title}>{treatmentItems?.hospitalName}</div>
              <div className={styles.treatment_text_left_category}>
                {treatmentItems?.department}
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
          <div className={styles.modal_body_text}>{content}</div>
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
