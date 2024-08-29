import styles from "../Treatment.module.css";
import { BasicModal } from "@/app/_components/component";
import { TreatmentItems } from "@/app/util/controller/treatmentController";
import { formatDate, formatTime } from "@/app/util/format/dateFormat";
import { IoAlertCircle } from "react-icons/io5";

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

export default function TreatmentYesOrNoModal({
  title,
  color,
  content,
  treatmentItems,
  open,
  handleModalClose,
  onClickYes,
  onClickNo,
}: TreatmentYesOrNoModalProps) {
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
