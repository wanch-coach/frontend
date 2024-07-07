"use client";

import { ReactNode } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHospital } from "react-icons/fa6";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsCapsulePill } from "react-icons/bs";
import { RiSearchEyeLine } from "react-icons/ri";
import styles from "./mainpage.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { RiRobot3Fill } from "react-icons/ri";
import Cookies from "js-cookie";

import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { updateAlarm } from "@/app/util/controller/userController";
import { GetServerSideProps } from "next";

export default function MainpageLayout({ children }: { children: ReactNode }) {
  const onMessageFCM = async () => {
    // 브라우저에 알림 권한을 요청합니다.
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      return;
    } else {
    }
    // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    });
    const messaging = getMessaging(firebaseApp);
    // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR })
      .then((currentToken) => {
        if (currentToken) {
          // 정상적으로 토큰이 발급되면 토큰 저장
          updateAlarm(currentToken);
          console.log(currentToken);
        } else {
          console.log("No registration token available. Request permission to generate one.");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });

    // 메세지가 수신되면 역시 콘솔에 출력합니다.
    onMessage(messaging, (payload) => {
      alert(JSON.stringify(payload));
      console.log(payload);
    });
  };

  useEffect(() => {
    onMessageFCM();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Bottombar />
    </div>
  );
}

function Header() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_box}>
          <RiRobot3Fill className={styles.header_icon} size={"32px"} color="#B6D7B5" />
          <GoBell className={styles.header_icon} size={"32px"} color="#DDDDDD" />
          <Link href="/mysetting">
            <IoMdSettings className={styles.header_icon} size={"32px"} color="#DDDDDD" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Bottombar() {
  const pathname = usePathname();
  const myFamilyId = Cookies.get("myFamilyId");
  return (
    <div className={styles.bottombar_container}>
      <Link className={styles.bottombar_box} href={"/mainpage/home"}>
        <IoHomeOutline
          size={"35px"}
          color={pathname === "/mainpage/home" ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname === "/mainpage/home" ? "#0A6847" : "#9D9D9D" }}
        >
          홈
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={`/mainpage/treatment/diagnosis/${myFamilyId}`}>
        <MdOutlineMedicalServices
          size={"35px"}
          color={pathname.startsWith("/mainpage/treatment") ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname.startsWith("/mainpage/treatment") ? "#0A6847" : "#9D9D9D" }}
        >
          진료 관리
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={`/mainpage/medication/taking/${myFamilyId}`}>
        <BsCapsulePill
          size={"35px"}
          color={pathname.startsWith("/mainpage/medication") ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname.startsWith("/mainpage/medication") ? "#0A6847" : "#9D9D9D" }}
        >
          복약 관리
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={"/mainpage/medical"}>
        <FaRegHospital
          size={"35px"}
          color={pathname.startsWith("/mainpage/medical") ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname.startsWith("/mainpage/medical") ? "#0A6847" : "#9D9D9D" }}
        >
          병의원 찾기
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={"/mainpage/drug"}>
        <RiSearchEyeLine
          size={"35px"}
          color={pathname.startsWith("/mainpage/drug") ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname.startsWith("/mainpage/drug") ? "#0A6847" : "#9D9D9D" }}
        >
          약 검색
        </div>
      </Link>
    </div>
  );
}
