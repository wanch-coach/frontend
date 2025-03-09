"use client";

import { useEffect, useState, SetStateAction, MouseEventHandler } from "react";
import MedicationBox from "./_components/MedicationBox";
import MedicationInfoBox from "./_components/MedicationInfoBox";
import styles from "./taking.module.css";
import MedicationList from "./_components/MedicationList";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { MedicationDayController, TodayTakeData } from "@/app/util/controller/medicationController";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import DayMenu from "@/app/_components/Mainpage/Medication/DayMenu";

export default function Taking({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [activeTab, setActiveTab] = useState("morning");
  const [todayTaken, setTodayTaken] = useState<TodayTakeData[]>([]);

  const handleTabClick = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
  };
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setHours(0, 0, 0, 0);

    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);

    if (todayMidnight.getTime() > newDate.getTime()) {
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };
  const handleGoToToday = () => {
    setCurrentDate(today);
  };
  useEffect(() => {
    /* 복약 데이터 api 호출 */
    const fetchData = async () => {
      try {
        const data = {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
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
  const formattedDate = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;
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
              color={currentDate.getDate() >= today.getDate() ? "#dddddd" : "black"}
            />
          </div>
          <div className={styles.day_controller_gotoday_button} onClick={handleGoToToday}>
            TODAY
          </div>
        </div>
        <DayMenu activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className={styles.day_body_container}>
        <MedicationList
          todayTakedata={filteredData}
          activeTab={activeTab}
          currentDate={currentDate}
          familyId={familyId}
        />
      </div>
    </>
  );
}
