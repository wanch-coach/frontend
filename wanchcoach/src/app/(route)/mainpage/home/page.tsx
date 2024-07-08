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
import { SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Cookies from "js-cookie";
import DayMenu from "@/app/_components/Component/Medication/DayMenu";
import {
  TodayMedicationController,
  TodayMedicationData,
  TodayPrescriptionData,
} from "@/app/util/controller/medicationController";

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
const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 5000, min: 900 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 900, min: 650 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 650, min: 350 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 350, min: 0 },
    items: 1,
  },
};

export default function Home() {
  const myFamilyId = Cookies.get("myFamilyId");
  const [todayTreatmentData, setTodayTreatmentData] = useState<TreatmentItems[]>([]);
  const [todayMedicationData, setTodayMedicationData] = useState<TodayMedicationData>();
  const [todayDate, setTodayDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState("morning");
  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TodayMedicationController();
        setTodayMedicationData(response.data);
        console.log(response);
        console.log("복약 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, []);
  const getMedicationData = (): TodayPrescriptionData[] => {
    if (!todayMedicationData) return [];
    switch (activeTab) {
      case "morning":
        return todayMedicationData.morning;
      case "noon":
        return todayMedicationData.noon;
      case "evening":
        return todayMedicationData.evening;
      case "beforeBed":
        return todayMedicationData.beforeBed;
      default:
        return [];
    }
  };
  const medicationData = getMedicationData();
  return (
    <div>
      <TodayTitle title="진료" link={`/treatment/diagnosis/0`} />
      <div className={styles.home_today_treatment_container}>
        <Carousel responsive={responsive}>
          {todayTreatmentData.length !== 0 ? (
            todayTreatmentData.map((item, index) => (
              <div className={styles.home_today_treatment} key={index}>
                <TreatmentBox treatmentItems={item} />
              </div>
            ))
          ) : (
            <div className={styles.home_today_treatment}>
              <div className={styles.no_treatment_message}>오늘 예약된 치료가 없습니다.</div>
            </div>
          )}
        </Carousel>
      </div>
      <div className="mt-5" />
      <TodayTitle title="복약" link={`/medication/taking/${myFamilyId}`} />
      <div className={styles.home_today_medication_container}>
        <DayMenu activeTab={activeTab} handleTabClick={handleTabClick} />
        <Carousel responsive={responsive2}>
          {medicationData.length !== 0 ? (
            medicationData.map((item, index) => (
              <div className={styles.home_today_medication}>
                <TodayMedicationBox key={index} medicationData={item} />
              </div>
            ))
          ) : (
            <div className={styles.home_today_treatment}>
              <div className={styles.no_treatment_message}>먹을 약이 없습니다.</div>
            </div>
          )}
        </Carousel>
      </div>
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

interface TodayMedicationBoxProps {
  medicationData: TodayPrescriptionData;
}
function TodayMedicationBox({ medicationData }: TodayMedicationBoxProps) {
  return (
    <div className={styles.home_medication_box}>
      <div
        className={styles.home_medication_box_left}
        style={{ backgroundColor: medicationData.familyColor as string }}
      >
        <div
          className={styles.home_medication_box_left_profile}
          style={{ backgroundColor: medicationData.familyColor as string }}
        >
          {medicationData.familyName}
        </div>
        {medicationData.familyName}
      </div>
      <div className={styles.home_medication_box_right}>
        <div>{medicationData.hospitalName}</div>
      </div>
    </div>
  );
}
