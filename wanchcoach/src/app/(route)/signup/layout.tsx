import { ReactNode } from "react";
import styles from "./signup.module.css";
import { Header } from "@/app/_components/component";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header title="회원가입" />
      {children}
    </div>
  );
}
