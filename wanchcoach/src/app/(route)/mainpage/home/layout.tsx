import { ReactNode } from "react";
import styles from "./home.module.css";
import Image from "next/image";

interface formatDateProps {
  getFullYear: () => number;
  getMonth: () => number;
  getDate: () => number;
}

export default function HomeLayout({ children }: { children: ReactNode }) {
  const currentDate = new Date();
  const formatDate = (date: formatDateProps) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.currentdate_text}>{formatDate(currentDate)}</div>
        <div className={styles.logo_image}>
          <Image src={"/logo.png"} alt="완치코치 로고" fill sizes="100ox" priority />
        </div>
      </div>
      {children}
    </div>
  );
}
