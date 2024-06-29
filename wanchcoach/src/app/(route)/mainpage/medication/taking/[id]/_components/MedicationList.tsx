import { TodayTakeData } from "@/app/util/controller/medicationController";
import MedicationBox from "./MedicationBox";
import styles from "./components.module.css";

interface MedicationListProps {
  todayTakedata: TodayTakeData[];
  activeTab: string;
}
export default function MedicationList({ todayTakedata, activeTab }: MedicationListProps) {
  const getTodayPartData = () => {
    switch (activeTab) {
      case "morning":
        return todayTakedata.map((data) => data.morning).flat();
      case "noon":
        return todayTakedata.map((data) => data.noon).flat();
      case "evening":
        return todayTakedata.map((data) => data.evening).flat();
      case "beforeBed":
        return todayTakedata.map((data) => data.beforeBed).flat();
      default:
        return [];
    }
  };
  const todayPartData = getTodayPartData();
  const unTakenCount = todayPartData.reduce((acc, data) => acc + data.unTaken.length, 0);
  const takenCount = todayPartData.reduce((acc, data) => acc + data.taken.length, 0);

  return (
    <div className={styles.taking_container}>
      <div className={styles.taking_text}>먹어야 해요 ({unTakenCount})</div>
      {unTakenCount > 0 && (
        <>
          {todayPartData.map((data, index) => (
            <div key={index}>
              {data.unTaken.map((prescription, idx) => (
                <MedicationBox
                  key={idx}
                  title={prescription.hospitalName}
                  category={prescription.department}
                  count={prescription.remaining}
                  drugs={prescription.drugs}
                />
              ))}
            </div>
          ))}
        </>
      )}

      <div className={styles.taking_text}>이미 먹었어요({takenCount})</div>
      {takenCount > 0 && (
        <>
          {todayPartData.map((data, index) => (
            <div key={index}>
              {data.taken.map((prescription, idx) => (
                <MedicationBox
                  key={idx}
                  title={prescription.hospitalName}
                  category={prescription.department}
                  count={prescription.remaining}
                  drugs={prescription.drugs}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
