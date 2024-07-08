"use client";

import { FrequentButton, Header, TimeInputBox } from "@/app/_components/component";
import styles from "./alarm.module.css";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  AlarmTimeListController,
  AlarmTimeUpdateController,
} from "@/app/util/controller/userController";
import { useRouter } from "next/navigation";

export default function Alarm() {
  const route = useRouter();
  const [morning, setMorning] = useState<Dayjs | null>(null);
  const [noon, setNoon] = useState<Dayjs | null>(null);
  const [evening, setEvening] = useState<Dayjs | null>(null);
  const [beforeBed, setBeforeBed] = useState<Dayjs | null>(null);
  const [initialData, setInitialData] = useState<(Dayjs | null)[]>([null, null, null, null]);
  const [change, setChange] = useState(false);
  const handleAlarmUpdate = async () => {
    const data = {
      morning: morning?.format("HH:mm:ss"),
      noon: noon?.format("HH:mm:ss"),
      evening: evening?.format("HH:mm:ss"),
      beforeBed: beforeBed?.format("HH:mm:ss"),
    };
    try {
      const response = await AlarmTimeUpdateController(data);
      alert("알림 수정이 완료 되었습니다.");
      route.back();
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AlarmTimeListController();
        const fetchedMorning = dayjs(response.data.morning, "HH:mm:ss");
        const fetchedNoon = dayjs(response.data.noon, "HH:mm:ss");
        const fetchedEvening = dayjs(response.data.evening, "HH:mm:ss");
        const fetchedBeforeBed = dayjs(response.data.beforeBed, "HH:mm:ss");

        setMorning(fetchedMorning);
        setNoon(fetchedNoon);
        setEvening(fetchedEvening);
        setBeforeBed(fetchedBeforeBed);

        setInitialData([fetchedMorning, fetchedNoon, fetchedEvening, fetchedBeforeBed]);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (
      initialData.every(
        (time, index) => time && time.isSame([morning, noon, evening, beforeBed][index])
      )
    ) {
      setChange(false);
    } else {
      setChange(true);
    }
  }, [morning, noon, evening, beforeBed, initialData]);

  return (
    <div className={styles.container}>
      <Header title="알람 관리" />
      <div className={styles.body_container}>
        <div className={styles.alarm_change_container}>
          <div className={styles.alarm_text}>처방전 알림시간 설정</div>
          <div className={styles.alarm_change_box}>
            <TimeInputBox label="아침" selectedTime={morning} handleTimeChange={setMorning} />
            <div className={styles.alarm_height}></div>
            <TimeInputBox label="점심" selectedTime={noon} handleTimeChange={setNoon} />
            <div className={styles.alarm_height}></div>
            <TimeInputBox label="저녁" selectedTime={evening} handleTimeChange={setEvening} />
            <div className={styles.alarm_height}></div>
            <TimeInputBox
              label="자기 전"
              selectedTime={beforeBed}
              handleTimeChange={setBeforeBed}
            />
          </div>
          <div style={{ height: "5vh" }}></div>
          <FrequentButton
            title="변경"
            backgroundColor={change ? "#0A6847" : "#dddddd"}
            onClick={handleAlarmUpdate}
            small
          />
        </div>
      </div>
    </div>
  );
}
