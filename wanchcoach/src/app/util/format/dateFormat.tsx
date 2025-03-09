import styles from "./format.module.css";

interface formatDateByKoreanProps {
  getFullYear: () => number;
  getMonth: () => number;
  getDate: () => number;
}

export const formatDateByKorean = (date: formatDateByKoreanProps) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
  return formattedDate;
};

export const formatTime = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, "0");
  return `${period} ${formattedHours}:${formattedMinutes}`;
};

export const calculateDDay = (targetDate: string) => {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  const currentTimestamp = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
  const targetTimestamp = new Date(targetDateTime.setHours(0, 0, 0, 0)).getTime();

  // D-day 계산
  const timeDiff = targetTimestamp - currentTimestamp;
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const dDay = Math.ceil(timeDiff / millisecondsInADay);

  if (dDay === 0) {
    return <div className={styles.treatment_box_dday}>D - day</div>;
  } else if (dDay > 0) {
    return <div className={styles.treatment_box_notdday}>{`D - ${dDay}`}</div>;
  } else {
    return <div className={styles.treatment_box_notdday}>{`D - ${dDay}`}</div>;
  }
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0"); // month is zero-indexed
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
