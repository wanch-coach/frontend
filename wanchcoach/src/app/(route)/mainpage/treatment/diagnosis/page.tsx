import styles from "./diagnosis.module.css";
import TreatmentBox from "../_components/TreatmentBox";

export default function Diagnosis() {
  return (
    <>
      <div className={styles.body_container}>
        <div className={styles.body_text}>예약 중인 진료</div>
        <TreatmentBox
          title="서울성모병원"
          category="내과"
          date="5.22 수"
          time="오후 1:30"
          userName="나종현"
          userProfile="/logo.png"
          content="배가 아픔"
          future
        />
      </div>
      <div className={`${styles.body_container} pt-5`}>
        <div className={styles.body_text}>지난 예약</div>
        <TreatmentBox
          title="서울성모병원"
          category="내과"
          date="5.22 수"
          time="오후 1:30"
          userName="나종현"
          userProfile="/logo.png"
          content="배가 아픔"
          state
        />
        <TreatmentBox
          title="서울성모병원"
          category="내과"
          date="5.22 수"
          time="오후 1:30"
          userName="나종현"
          userProfile="/logo.png"
          content="배가 아픔"
          state
        />
      </div>
    </>
  );
}
