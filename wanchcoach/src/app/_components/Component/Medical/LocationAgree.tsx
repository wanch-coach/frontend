import styles from "./Medical.module.css";
import { FaInfoCircle } from "react-icons/fa";

interface LocationAgree {
  handleModalClose: () => void;
  moveToCurrentLocation: () => void;
}

export default function LocationAgree({ handleModalClose, moveToCurrentLocation }: LocationAgree) {
  return (
    <div className={styles.map_agree_modal_container}>
      <div className={styles.map_agree_modal_text_01}>위치 정보 수집 동의</div>
      <div className={styles.map_agree_modal_box}>
        <li className={styles.map_agree_modal_text_02}>
          ‘완치코치’의 위치기반서비스를 이용하기 위해 현재 위치정보 사용에 동의합니다.
        </li>
        <li className={styles.map_agree_modal_text_02}>
          위치기반서비스 이용을 위해 서비스 이용약관에 동의합니다
        </li>
        <div className={styles.map_agree_modal_text_03}>
          위치기반서비스 이용약관
          <FaInfoCircle size="13px" />
        </div>
      </div>
      <div
        className={styles.map_agree_modal_button}
        style={{ bottom: "5vh" }}
        onClick={moveToCurrentLocation}
      >
        동의
      </div>
      <div className={styles.map_agree_modal_button} onClick={handleModalClose}>
        동의하지 않음
      </div>
    </div>
  );
}
