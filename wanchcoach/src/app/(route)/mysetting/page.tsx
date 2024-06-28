"use client";

import Link from "next/link";
import styles from "./mysetting.module.css";
import { Header } from "@/app/_components/component";
import { useRouter } from "next/navigation";

export default function MySetting() {
  const route = useRouter();
  const handleLogout = () => {
    /* 로그아웃 api 호출 */
    route.push("/");
  };
  return (
    <div className={styles.container}>
      <Header title="설정" />
      <div className={styles.body_container}>
        <hr className={styles.setting_menu_line} />
        <MySettingMenu title="회원정보 수정" href="/mysetting/my" />
        <MySettingMenu title="알림 관리" href="/mysetting/alarm" />
        <MySettingMenu title="가족 관리" href="/mysetting/family" />
        <LogoutMenu title="로그아웃" onClick={handleLogout} />
      </div>
    </div>
  );
}

interface MySettingMenuProps {
  title: string;
  href: string;
}
function MySettingMenu({ title, href }: MySettingMenuProps) {
  return (
    <Link href={href}>
      <div className={styles.setting_menu_container}>
        <div className={styles.setting_menu_text}>{title}</div>
      </div>
    </Link>
  );
}

interface LogoutMenuProps {
  title: string;
  onClick: () => void;
}
function LogoutMenu({ title, onClick }: LogoutMenuProps) {
  return (
    <div className={styles.setting_menu_container} onClick={onClick}>
      <div className={styles.setting_menu_text}>{title}</div>
    </div>
  );
}
