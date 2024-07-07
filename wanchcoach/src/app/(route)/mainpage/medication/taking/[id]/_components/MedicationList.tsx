import { MedicationEatController, TodayTakeData } from "@/app/util/controller/medicationController";
import MedicationBox from "./MedicationBox";
import styles from "./components.module.css";

interface MedicationListProps {
  todayTakedata: TodayTakeData[];
  activeTab: string;
  familyId: number;
}
export default function MedicationList({
  todayTakedata,
  activeTab,
  familyId,
}: MedicationListProps) {
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

  const handleEatSubmit = async (id: number) => {
    try {
      const data = {
        prescriptionId: id,
        familyId: familyId,
        time: activeTab,
      };
      const response = await MedicationEatController(data);

      console.log("먹기 성공:", response);
    } catch (error) {
      console.error("먹기 실패:", error);
      // 오류 처리
    }
  };

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
                  count={prescription.remains}
                  drugs={prescription.drugs}
                  handleEatSubmit={() => handleEatSubmit(prescription.prescriptionId)}
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
                  count={prescription.remains}
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
