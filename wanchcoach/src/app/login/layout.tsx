import { ReactNode } from "react";
import Image from "next/image";

import styles from "./login.module.css";
import Link from "next/link";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.logo_image}>
        <Image src={"/logo.png"} alt="완치코치 로고" fill sizes="100px" priority />
      </div>
      {children}
      <div className={styles.footer}>
        <div className={styles.link_container_01}>
          <Link className="mr-2" href="/">
            아이디 찾기
          </Link>
          <Link href="/">비밀번호 찾기</Link>
        </div>
        <div className={styles.link_container_02}>
          아직 회원이 아니신가요?{" "}
          <Link className={`${styles.text_signup} ml-1`} href="/signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
