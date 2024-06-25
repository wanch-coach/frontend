import MedicationInfoBox from "../taking/_components/MedicationInfoBox";
import styles from "./recordtaking.module.css";

export default function RecordTaking() {
  return (
    <div className={styles.body_container}>
      <MedicationInfoBox title="서울성모병원" category="내과" />
    </div>
  );
}
