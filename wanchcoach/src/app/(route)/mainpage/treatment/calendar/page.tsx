import PaperCalendar from "@/app/_components/Component/PaperCalendar";
import styles from "./calendar.module.css";

export default function Calendar() {
  return (
    <>
      <div className={styles.body_container}>
        <PaperCalendar />
      </div>
    </>
  );
}
