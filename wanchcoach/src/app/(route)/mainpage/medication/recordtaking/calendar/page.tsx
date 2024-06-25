import PaperCalendar from "@/app/_components/Component/PaperCalendar";
import style from "./calendar.module.css";

export default function Calender() {
  return (
    <div className={style.body_container}>
      <PaperCalendar />
    </div>
  );
}
