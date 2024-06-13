import { ReactNode } from "react";
import styles from "./signup.module.css";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}

function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.header_backicon}>
        <Link href={"/"}>
          <IoMdArrowBack size={"30px"} />
        </Link>
      </span>
      <span className={styles.header_text}>회원가입</span>
    </div>
  );
}
