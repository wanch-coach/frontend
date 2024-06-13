import { GoChevronRight } from "react-icons/go";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.home_text}>
        <div className={styles.home_today_text}>Today 진료</div>
        <div className={styles.home_more_box}>
          <span className={styles.home_more_text}>더보기</span>
          <GoChevronRight />
        </div>
      </div>
    </div>
  );
}
