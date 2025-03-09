"use client";

import { ReactNode } from "react";
import styles from "./home.module.css";
import Image from "next/image";
import React from "react";
import { formatDateByKorean } from "@/app/util/format/dateFormat";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const currentDate = new Date();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.currentdate_text}>{formatDateByKorean(currentDate)}</div>
        <div className={styles.logo_image}>
          <Image src={"/logo.png"} alt="완치코치 로고" fill sizes="100ox" priority />
        </div>
      </div>
      {children}
    </div>
  );
}
