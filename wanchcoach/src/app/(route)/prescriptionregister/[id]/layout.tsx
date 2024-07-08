import { Header } from "@/app/_components/component";
import { ReactNode } from "react";
import styles from "./prescriptionregister.module.css";

export default function PrescriptionRegisterLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header title="처방전 등록" />
      <div className={styles.body_container}>{children}</div>
    </div>
  );
}
