import styles from "./medical.module.css";
import { ReactNode } from "react";

export default function MedicalLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
