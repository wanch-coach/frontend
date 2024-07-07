import { ReactNode } from "react";
import styles from "./naversignup.module.css";
import { Header } from "@/app/_components/component";

export default function NaverSignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header title="네이버 로그인 회원가입" />
      {children}
    </div>
  );
}
