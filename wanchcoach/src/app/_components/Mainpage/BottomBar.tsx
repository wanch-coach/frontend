"use client";

import styles from "./Mainpage.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHospital } from "react-icons/fa6";
import { MdOutlineMedicalServices } from "react-icons/md";
import { BsCapsulePill } from "react-icons/bs";
import { RiSearchEyeLine } from "react-icons/ri";

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
      <Link className={styles.bottombar_box} href={`/mainpage/treatment/diagnosis/0`}>
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

export default Bottombar;
