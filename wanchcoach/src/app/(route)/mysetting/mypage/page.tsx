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
        <div>기본정보</div>
        <div>
          <div>이름</div>
          <div>나종현</div>
        </div>
        <div>
          <div>아이디</div>
          <div>i0364842</div>
        </div>
        <div>
          <div>전화번호</div>
          <div>010-4064-3297</div>
        </div>
        <div>
          <div>생년월일</div>
          <div>1998년 01월 13일</div>
        </div>
        <FrequentButton title="정보 수정" backgroundColor="" onClick={handleInfoUpdate} />
      </div>
    </div>
  );
}
