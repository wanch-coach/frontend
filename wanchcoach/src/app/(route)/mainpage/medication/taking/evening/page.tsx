import MedicationList from "../_components/MedicationList";
import styles from "./evening.module.css";

export default function evening() {
  return (
    <div className={styles.container}>
      <MedicationList />
    </div>
  );
}
