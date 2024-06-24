import DrugBoxDetail from "@/app/_components/Component/Drug/DrugBoxDetail";
import styles from "./mydruginformation.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function MyDrugInformation() {
  return (
    <div className={styles.body_container}>
      <DaySelectBox />
      <div>최근 복용한 약</div>
      <DrugBoxDetail />
    </div>
  );
}

function DaySelectBox() {
  return (
    <div className={styles.day_select_container}>
      <div className={styles.day_select_header}>기간선택</div>
      <div className={styles.day_select_box}>
        <DaySelectBoxPart title="시작일" />
        ~
        <DaySelectBoxPart title="종료일" />
      </div>
      <div className={styles.day_select_footer}>
        <div className={styles.day_select_button}>조회</div>
      </div>
    </div>
  );
}

interface DaySelectBoxPartProps {
  title: string;
}
function DaySelectBoxPart({ title }: DaySelectBoxPartProps) {
  return (
    <div className={styles.day_select_box_part}>
      <div className={styles.day_select_box_title}>{title}</div>
      <div className={styles.day_select_box_input}>2024-03-20</div>
      <FaRegCalendarAlt size={"18px"} />
    </div>
  );
}
