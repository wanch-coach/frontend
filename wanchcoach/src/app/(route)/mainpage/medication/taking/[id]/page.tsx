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

const data = {
  success: true,
  data: [
    {
      familyId: 3,
      morning: {
        unTaken: [
          {
            prescriptionId: 3,
            hospitalName: "서울성모병원",
            department: "내과",
            remaining: 3,
            drugs: [
              {
                drugId: 4,
                itemName: "타이레놀정",
                productType: "[12412]진통제",
                drugImage: "awegasdfsd",
              },
              // Add other drugs as needed
            ],
          },
        ],
        taken: [
          {
            prescriptionId: 3,
            hospitalName: "서울아산병원",
            department: "정형외과",
            remaining: 5,
            drugs: [
              {
                drugId: 7,
                itemName: "마게이트정",
                productType: "[12321]제산제",
                drugImage: "awegasdfsd",
              },
              // Add other drugs as needed
            ],
          },
        ],
      },
      noon: {},
      evening: {},
      beforeBed: {},
    },
    {
      familyId: 4,
      morning: {
        unTaken: [
          {
            prescriptionId: 3,
            hospitalName: "서울성모병원",
            department: "내과",
            remaining: 3,
            drugs: [
              {
                drugId: 4,
                itemName: "타이레놀정",
                productType: "[12412]진통제",
                drugImage: "awegasdfsd",
              },
              // Add other drugs as needed
            ],
          },
        ],
        taken: [
          {
            prescriptionId: 3,
            hospitalName: "서울아산병원",
            department: "정형외과",
            remaining: 5,
            drugs: [
              {
                drugId: 7,
                itemName: "마게이트정",
                productType: "[12321]제산제",
                drugImage: "awegasdfsd",
              },
              // Add other drugs as needed
            ],
          },
        ],
      },
      noon: {},
      evening: {},
      beforeBed: {},
    },
  ],
};

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
    fetchData();
  }, [currentDate]);
  const formattedDate = currentDate.format("M월 D일");
  const filteredData = todayTaken?.filter((data) => data.familyId === familyId) || [];
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
          <div className={styles.day_controller_gotoday_button}>GO TO TODAY</div>
        </div>
        <DayMenu activeTab={activeTab} handleTabClick={handleTabClick} />
      </div>
      <div className={styles.day_body_container}>
        <MedicationList todayTakedata={filteredData} activeTab={activeTab} />
      </div>
    </>
  );
}

interface DayMenuProps {
  activeTab: string;
  handleTabClick: (tab: SetStateAction<string>) => void;
}
function DayMenu({ activeTab, handleTabClick }: DayMenuProps) {
  const getTranslateXValue = (tab: SetStateAction<string>) => {
    switch (tab) {
      case "morning":
        return "0%";
      case "noon":
        return "100%";
      case "evening":
        return "200%";
      case "beforebed":
        return "300%";
      default:
        return "0%";
    }
  };

  return (
    <div className={styles.day_tab_container}>
      <div className={styles.day_tab_box}>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "morning" ? styles.active : ""}`}
          onClick={() => handleTabClick("morning")}
        >
          아침
        </div>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "noon" ? styles.active : ""}`}
          onClick={() => handleTabClick("noon")}
        >
          점심
        </div>
        <div
          className={`${styles.day_tab_box_title} ${activeTab === "evening" ? styles.active : ""}`}
          onClick={() => handleTabClick("evening")}
        >
          저녁
        </div>
        <div
          className={`${styles.day_tab_box_title} ${
            activeTab === "beforebed" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("beforebed")}
        >
          취침 전
        </div>
      </div>
      <div className={styles.day_tab_line_container}>
        <div
          className={styles.day_tab_box_line}
          style={{ transform: `translateX(${getTranslateXValue(activeTab)})` }}
        >
          <div className={styles.day_tab_box_greenline}></div>
        </div>
      </div>
    </div>
  );
}
