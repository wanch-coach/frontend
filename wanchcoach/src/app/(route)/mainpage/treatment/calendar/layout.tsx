import { ReactNode } from "react";
import styles from "./calendar.module.css";

export default function CalendarLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
