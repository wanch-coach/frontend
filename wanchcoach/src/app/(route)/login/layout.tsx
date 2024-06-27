import { ReactNode } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import Link from "next/link";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.logo_image}>
        <Image src={"/logo.png"} alt="완치코치 로고" fill sizes="100ox" priority />
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
          아직 회원이 아니신가요?
          <Link className={`${styles.text_signup} ml-1`} href="/signup">
            회원가입
          </Link>
        </div>
        <div className="pt-3" />
        <Link
          href={
            "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=quIIXrYYRk1GoMBFxXNn&state=STATE_STRING&redirect_uri=http://localhost:8081/login/oauth2/code/naver"
          }
        >
          <div className={styles.naver_login_button}>
            <SiNaver size="25px" />
            <div className={styles.naver_login_button_text}>네이버 아이디로 회원가입</div>
          </div>
        </Link>
        <div className="pt-3" />
        <Link
          href={
            "https://kauth.kakao.com/oauth/authorize?client_id=370123a2ecc923df6371e651937c9038&redirect_uri=http://localhost:8081/login/oauth2/code/kakao&response_type=code&scope=account_email"
          }
        >
          <div className={styles.kakao_login_button}>
            <RiKakaoTalkFill size="25px" />
            <div className={styles.kakao_login_button_text}>카카오 아이디로 회원가입</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
