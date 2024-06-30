"use client";
import { GoChevronRight } from "react-icons/go";
import styles from "./home.module.css";
import Image from "next/image";

export default function Home() {

  return (
    <div>
      <TodayTitle title="진료" />
      <div className="mt-3"></div>
      <div className={styles.treatment_container}>
        <div className={styles.treatment_box_left}>
          <div className={styles.treatment_box_left_title}>
            <div className={styles.treatment_text_left_title}>서울성모병원</div>
            <div className={styles.treatment_text_left_category}>내과</div>
          </div>
          <div className={styles.treatment_box_left_content}>
            <div className={styles.treatment_text_left_date_01}>5.22 수</div>
            <div className={styles.treatment_text_left_date_02}>오후 1:30</div>
          </div>
        </div>
        <div className={styles.treatment_box_right}>
          <div className={styles.treatment_box_right_profile}>
            <Image src={"/logo.png"} alt="프로필" fill sizes="30px" />
          </div>
          나종현
        </div>
      </div>
      <TodayTitle title="복약" />
    </div>
  );
}

interface TodayTitleProps {
  title: string;
}

function TodayTitle({ title }: TodayTitleProps) {
  return (
    <div className={styles.home_text}>
      <div className={styles.home_today_text}>Today {title}</div>
      <div className={styles.home_more_box}>
        <span className={styles.home_more_text}>더보기</span>
        <GoChevronRight />
      </div>
    </div>
  );
}
