import styles from "./mydruginformation.module.css";
import { ReactNode } from "react";

export default function MyDrugInfomationLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
