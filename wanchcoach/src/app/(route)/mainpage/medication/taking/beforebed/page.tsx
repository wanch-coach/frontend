import MedicationList from "../_components/MedicationList";
import styles from "./beforebed.module.css";

export default function beforeBed() {
  return (
    <div className={styles.container}>
      <MedicationList />
    </div>
  );
}
