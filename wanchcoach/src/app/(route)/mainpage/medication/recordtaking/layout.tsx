import styles from "./recordtaking.module.css";
import { ReactNode } from "react";

export default function RecordTakingLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
