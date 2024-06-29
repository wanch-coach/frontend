import styles from "./drug.module.css";
import { ReactNode } from "react";

export default function DrugLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
