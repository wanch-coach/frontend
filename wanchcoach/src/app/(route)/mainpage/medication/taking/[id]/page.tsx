"use client";

import { useEffect, useState, SetStateAction, MouseEventHandler } from "react";
import MedicationBox from "./_components/MedicationBox";
import MedicationInfoBox from "./_components/MedicationInfoBox";
import styles from "./taking.module.css";
import MedicationList from "./_components/MedicationList";
import dayjs from "dayjs";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { MedicationDayController, TodayTakeData } from "@/app/util/controller/medicationController";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import DayMenu from "@/app/_components/Component/Medication/DayMenu";

export default function Taking({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(today);
  const [activeTab, setActiveTab] = useState("morning");
  const [todayTaken, setTodayTaken] = useState<TodayTakeData[]>([]);

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const handlePrevDay = () => {
    setCurrentDate(currentDate.subtract(1, "day"));
  };
  const handleNextDay = () => {
    if (today.isAfter(currentDate, "day")) {
      setCurrentDate(currentDate.add(1, "day"));
    }
  };
  const handleGoToToday = () => {
    setCurrentDate(dayjs());
  };
  useEffect(() => {
    /* 복약 데이터 api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          year: currentDate.year(),
          month: currentDate.month() + 1,
          day: currentDate.date(),
        };
        const response = await MedicationDayController(data);
        setTodayTaken(response.data);
        console.log("데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    setTodayTaken([]); // 원래 것 싹 비움
    fetchData();
  }, [currentDate]);
  const formattedDate = currentDate.format("M월 D일");
  const filteredData = todayTaken?.filter((data) => data.familyId == familyId) || [];
  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.day_controller_container}>
          <div className={styles.day_controller_icon} onClick={handlePrevDay}>
            <FaCaretLeft size={"20px"} />
          </div>
          <span className={styles.day_controller_text}>{formattedDate}</span>
          <div className={styles.day_controller_icon} onClick={handleNextDay}>
            <FaCaretRight
              size={"20px"}
              color={today.isAfter(currentDate, "day") ? "black" : "#dddddd"}
            />
          </div>
          <div className={styles.day_controller_gotoday_button} onClick={handleGoToToday}>
            TODAY
          </div>
        </div>
        <DayMenu activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className={styles.day_body_container}>
        <MedicationList todayTakedata={filteredData} activeTab={activeTab} familyId={familyId} />
      </div>
    </>
  );
}
