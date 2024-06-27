import { ReactNode } from "react";
import styles from "./hospital.module.css";

export default function HospitalLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
