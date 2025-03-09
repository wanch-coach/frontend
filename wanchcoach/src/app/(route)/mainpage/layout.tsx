import { ReactNode } from "react";
import styles from "./mainpage.module.css";
import React, { useEffect } from "react";
import onMessageFCM from "@/app/util/messageFCM";
import Header from "@/app/_components/Mainpage/Header";
import Bottombar from "@/app/_components/Mainpage/BottomBar";

export default function MainpageLayout({ children }: { children: ReactNode }) {
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
