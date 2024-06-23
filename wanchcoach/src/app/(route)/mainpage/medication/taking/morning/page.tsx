import MedicationList from "../_components/MedicationList";
import styles from "./morning.module.css";

export default function morning() {
  return (
    <div className={styles.container}>
      <MedicationList />
    </div>
  );
}
