import styles from "./Treatment.module.css";
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
import { useRouter } from "next/navigation";
import { calculateDDay, formatDate, formatTime } from "@/app/util/format/dateFormat";
import TreatmentYesOrNoModal from "./children/TreatmentYesOrNoModal";

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

  const dDayMessage = calculateDDay(treatmentItems.date); // D-day 계산

  const handleAlarmChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // 진료 알람 체인지 컨트롤러 !!!!
    // TreatmentAlarmChangeController(treatmentItems.id)
    //   .then(() => {
    //     return;
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //     return;
    //   });
    setChecked(e.target.checked);
  };

  const handleCheckWhetherSubmit = async () => {
    // 진료 여부 변경
    TreatmentCheckWhetherChangeController(treatmentItems.id)
      .then(() => {
        return;
      })
      .catch((e) => {
        console.log(e.message);
        return;
      });
    setWhetherModal(false);
  };
  const handleRegisterSubmit = async () => {
    setRegisterModal(false);
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
