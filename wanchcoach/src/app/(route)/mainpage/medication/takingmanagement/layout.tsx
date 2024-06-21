import styles from "./takingmanagement.module.css";
import { ReactNode } from "react";

export default function TakingManagementLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
