import { ReactNode } from "react";
import styles from "./signup.module.css";
import { IoMdArrowBack } from "react-icons/io";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.header_backicon}>
          <IoMdArrowBack size={"30px"} />
        </span>
        <span className={styles.header_text}>회원가입</span>
      </div>
      {children}
    </div>
  );
}
