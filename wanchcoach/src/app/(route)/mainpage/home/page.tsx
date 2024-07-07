"use client";
import { GoChevronRight } from "react-icons/go";
import styles from "./home.module.css";
import Image from "next/image";
import TreatmentBox from "../treatment/_components/TreatmentBox";
import {
  TreatmentCalendarItems,
  TreatmentItems,
  TreatmentTotalDayController,
} from "@/app/util/controller/treatmentController";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Cookies from "js-cookie";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 5000, min: 3500 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3500, min: 2000 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 2000, min: 512 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const myFamilyId = Cookies.get("myFamilyId");
  const [todayTreatmentData, setTodayTreatmentData] = useState<TreatmentItems[]>([]);
  const [todayDate, setTodayDate] = useState(dayjs());

  useEffect(() => {
    const data = {
      year: todayDate.year(),
      month: todayDate.month() + 1,
      day: todayDate.date(),
    };
    const fetchData = async () => {
      try {
        const response = await TreatmentTotalDayController(data);
        setTodayTreatmentData(response.data.treatmentItems);
        console.log(response);
        console.log("진료 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <TodayTitle title="진료" link={`/treatment/diagnosis/${myFamilyId}`} />
      <div className={styles.home_today_treatment_container}>
        <Carousel responsive={responsive}>
          {todayTreatmentData.map((item, index) => (
            <div className={styles.home_today_treatment} key={index}>
              <TreatmentBox treatmentItems={item} />
            </div>
          ))}
        </Carousel>
      </div>

      <TodayTitle title="복약" link={`/medication/taking/${myFamilyId}`} />
    </div>
  );
}

interface TodayTitleProps {
  title: string;
  link: string;
}

function TodayTitle({ title, link }: TodayTitleProps) {
  return (
    <div className={styles.home_text}>
      <div className={styles.home_today_text}>Today {title}</div>
      <Link className={styles.home_more_box} href={`/mainpage${link}`}>
        <span className={styles.home_more_text}>더보기</span>
        <GoChevronRight />
      </Link>
    </div>
  );
}

function TodayTreatmentBox() {
  return (
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
  );
}
