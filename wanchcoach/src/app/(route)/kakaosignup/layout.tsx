import { ReactNode } from "react";
import styles from "./kakaosignup.module.css";
import { Header } from "@/app/_components/component";

export default function KakaoSignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header title="카카오 로그인 회원가입" />
      {children}
    </div>
  );
}
