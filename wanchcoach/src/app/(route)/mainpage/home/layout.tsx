"use client";

import { ReactNode } from "react";
import styles from "./home.module.css";
import Image from "next/image";

interface formatDateProps {
  getFullYear: () => number;
  getMonth: () => number;
  getDate: () => number;
}
import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { updateAlarm } from "@/app/util/controller/userController";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const currentDate = new Date();
  const formatDate = (date: formatDateProps) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
  };
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
      console.log("Message received. ", payload);
    });
  };
  useEffect(() => {
    onMessageFCM();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.currentdate_text}>{formatDate(currentDate)}</div>
        <div className={styles.logo_image}>
          <Image src={"/logo.png"} alt="완치코치 로고" fill sizes="100ox" priority />
        </div>
      </div>
      {children}
    </div>
  );
}
