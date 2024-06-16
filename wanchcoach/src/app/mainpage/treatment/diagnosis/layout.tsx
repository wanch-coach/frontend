import { ReactNode } from "react";
import styles from "./diagnosis.module.css";

export default function DiagnosisLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
