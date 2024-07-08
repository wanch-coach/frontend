"use client";

import { FrequentButton, Header } from "@/app/_components/component";
import styles from "./mypage.module.css";
import { useEffect, useState } from "react";
import { MyPageData, MyPageInfoController } from "@/app/util/controller/userController";

export default function MyPage() {
  const [myPageInfo, setMyPageInfo] = useState<MyPageData>({
    loginId: "",
    name: "",
    email: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
  });
  const handleInfoUpdate = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MyPageInfoController();
        console.log(response);
        setMyPageInfo(response.data);
      } catch (error) {
        console.error("Error fetching mypage list:", error);
      }
    };
    fetchData(); // fetchData 함수 호출
  }, []);

  const formatDate = (birthdate: string): string => {
    const date = new Date(birthdate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <div className={styles.container}>
      <Header title="회원 정보" />
      <div className={styles.body_container}>
        <div className="pt-5" />
        <div className={styles.mymage_info_title}>기본정보</div>
        <div className={styles.mypage_info}>
          <div className={styles.mypage_info_content}>
            <div>이름</div>
            <div>{myPageInfo.name}</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>아이디</div>
            <div>{myPageInfo.email}</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>전화번호</div>
            <div>{myPageInfo.phoneNumber}</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>생년월일</div>
            <div>{formatDate(myPageInfo.birthDate)}</div>
          </div>
          <div className={styles.mypage_info_content}>
            <div>성별</div>
            <div>{myPageInfo.gender === "male" ? "남" : "여"}</div>
          </div>
        </div>
        <FrequentButton title="정보 수정" backgroundColor="#0A6847" onClick={handleInfoUpdate} />
        <div className="pt-5" />
        <div className={styles.exit_container}>
          <div className={styles.exit_box}>
            <div>회원 탈퇴</div>
            <button className={styles.exit_button}>회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
}
