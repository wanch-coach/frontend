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

export default function MainpageLayout({ children }: { children: ReactNode }) {
  return (
    <div>
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
          <IoMdSettings className={styles.header_icon} size={"32px"} color="#DDDDDD" />
        </div>
      </div>
    </div>
  );
}

function Bottombar() {
  const pathname = usePathname();
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
      <Link className={styles.bottombar_box} href={"/mainpage/treatment"}>
        <MdOutlineMedicalServices
          size={"35px"}
          color={pathname === "/mainpage/treatment" ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname === "/mainpage/treatment" ? "#0A6847" : "#9D9D9D" }}
        >
          진료 관리
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={"/mainpage/medication"}>
        <BsCapsulePill
          size={"35px"}
          color={pathname === "/mainpage/medication" ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname === "/mainpage/medication" ? "#0A6847" : "#9D9D9D" }}
        >
          복약 관리
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={"/mainpage/medical"}>
        <FaRegHospital
          size={"35px"}
          color={pathname === "/mainpage/medical" ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname === "/mainpage/medical" ? "#0A6847" : "#9D9D9D" }}
        >
          병의원 찾기
        </div>
      </Link>
      <Link className={styles.bottombar_box} href={"/mainpage/drug"}>
        <RiSearchEyeLine
          size={"35px"}
          color={pathname === "/mainpage/drug" ? "#0A6847" : "#9D9D9D"}
        />
        <div
          className={styles.bottombar_text}
          style={{ color: pathname === "/mainpage/drug" ? "#0A6847" : "#9D9D9D" }}
        >
          약 검색
        </div>
      </Link>
    </div>
  );
}
