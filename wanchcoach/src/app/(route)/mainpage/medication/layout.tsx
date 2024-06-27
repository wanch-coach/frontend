"use client";

import styles from "./medication.module.css";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import MenuHeader from "@/app/_components/Header/MenuHeader";
import ProfileHeader from "@/app/_components/Header/ProfileHeader";
import { MdMedicationLiquid } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { PiPillDuotone } from "react-icons/pi";
import { MdCalendarMonth } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import Link from "next/link";

export default function MedicationLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <ProfileHeader />
      <MedicationMenu />
      {children}
    </div>
  );
}

function MedicationMenu() {
  const pathname = usePathname();
  const [calendar, setCalendar] = useState("NOT");
  return (
    <div className={styles.header_menu_container}>
      <div className={styles.header_menu_left}>
        <MenuHeader
          title="복약"
          icon={<MdMedicationLiquid size={"40px"} />}
          href="/mainpage/medication/taking/morning"
          press={pathname.startsWith("/mainpage/medication/taking") ? true : false}
          handlePressChange={() => {
            setCalendar("NOT");
          }}
        />
        <MenuHeader
          title="복약 이력"
          icon={<GiNotebook size={"40px"} />}
          href="/mainpage/medication/recordtaking"
          press={pathname.startsWith("/mainpage/medication/recordtaking") ? true : false}
          handlePressChange={() => {
            setCalendar("NO");
          }}
        />
        <MenuHeader
          title="내 약 정보"
          icon={<PiPillDuotone size={"40px"} />}
          href="/mainpage/medication/mydruginformation"
          press={pathname.startsWith("/mainpage/medication/mydruginformation") ? true : false}
          handlePressChange={() => {
            setCalendar("NOT");
          }}
        />
      </div>
      <div className={styles.header_calendar_right}>
        {calendar === "NOT" ? null : calendar === "YES" ? (
          <Link
            href={"/mainpage/medication/recordtaking"}
            className={styles.header_calendar_button}
            onClick={() => {
              setCalendar("NO");
            }}
          >
            <FaList size={"16px"} />
            <div className={styles.header_calendar_button_text}>목록</div>
          </Link>
        ) : (
          <Link
            href={"/mainpage/medication/recordtaking/calendar"}
            className={styles.header_calendar_button}
            onClick={() => {
              setCalendar("YES");
            }}
          >
            <MdCalendarMonth size={"18px"} />
            <div className={styles.header_calendar_button_text}>달력</div>
          </Link>
        )}
      </div>
    </div>
  );
}
