"use client";

import { ReactNode } from "react";
import styles from "./treatment.module.css";
import ProfileHeader from "@/app/_components/Header/ProfileHeader";
import MenuHeader from "@/app/_components/Header/MenuHeader";
import { TbStethoscope } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function TreatmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <ProfileHeader register />
      <TreatmentMenu />
      {children}
    </div>
  );
}

function TreatmentMenu() {
  const pathname = usePathname();
  return (
    <div className={styles.header_menu_container}>
      <MenuHeader
        title="진료"
        icon={<TbStethoscope size={"40px"} />}
        href="/mainpage/treatment/diagnosis"
        press={pathname === "/mainpage/treatment/diagnosis" ? true : false}
      />
      <MenuHeader
        title="병원"
        icon={<FaRegHospital size={"40px"} />}
        href="/mainpage/treatment/hospital"
        press={pathname === "/mainpage/treatment/hospital" ? true : false}
      />
      <MenuHeader
        title="달력"
        icon={<MdCalendarMonth size={"40px"} />}
        href="/mainpage/treatment/calendar"
        press={pathname === "/mainpage/treatment/calendar" ? true : false}
      />
    </div>
  );
}
