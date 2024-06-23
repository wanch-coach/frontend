import MedicationBox from "./MedicationBox";
import styles from "./components.module.css";

export default function MedicationList() {
  return (
    <div className={styles.taking_container}>
      <div className={styles.taking_text}>먹어야 해요 (1)</div>
      <MedicationBox title="서울성모병원" category="내과" count={1} />
      <div className={styles.taking_text}>이미 먹었어요</div>
    </div>
  );
}
