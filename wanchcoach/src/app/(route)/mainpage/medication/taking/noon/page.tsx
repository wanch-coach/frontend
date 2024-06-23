import MedicationList from "../_components/MedicationList";
import styles from "./noon.module.css";

export default function noon() {
  return (
    <div className={styles.container}>
      <MedicationList />
    </div>
  );
}
