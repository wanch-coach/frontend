"use client";

import { FrequentButton, Header } from "@/app/_components/component";
import styles from "./mypage.module.css";
import { useEffect, useState } from "react";
import { MyPageInfoController } from "@/app/util/controller/userController";

export default function MyPage() {
  const [myPageInfo, setMyPageInfo] = useState({});
  const handleInfoUpdate = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyPageInfoController();
        setMyPageInfo(response.data);
      } catch (error) {
        console.error("Error fetching mypage list:", error);
      }
    };
    // fetchData(); // fetchData 함수 호출
  }, []);
  return (
    <div className={styles.container}>
      <Header title="회원 정보" />
      <div className={styles.body_container}>
        <div className={styles.mymage_info_title}>기본정보</div>
        <div className={styles.mypage_info}>
          <div className={styles.mypage_info_content}>
            <div>이름</div>
            <div>나종현</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>아이디</div>
            <div>i0364842</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>전화번호</div>
            <div>010-4064-3297</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>생년월일</div>
            <div>1998년 01월 13일</div>
          </div>
        </div>
        <FrequentButton title="정보 수정" backgroundColor="#0A6847" onClick={handleInfoUpdate} />
      </div>
    </div>
  );
}
