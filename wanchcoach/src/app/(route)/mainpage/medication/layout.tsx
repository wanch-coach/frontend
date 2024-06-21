"use client";

import styles from "./medication.module.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MenuHeader from "@/app/_components/Header/MenuHeader";
import ProfileHeader from "@/app/_components/Header/ProfileHeader";
import { MdMedicationLiquid } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { PiPillDuotone } from "react-icons/pi";

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
  return (
    <div className={styles.header_menu_container}>
      <MenuHeader
        title="복약"
        icon={<MdMedicationLiquid size={"40px"} />}
        href="/mainpage/medication/?"
        press={pathname === "/mainpage/medication/?" ? true : false}
      />
      <MenuHeader
        title="복약 이력"
        icon={<GiNotebook size={"40px"} />}
        href="/mainpage/medication/?"
        press={pathname === "/mainpage/medication/?" ? true : false}
      />
      <MenuHeader
        title="내 약 정보"
        icon={<PiPillDuotone size={"40px"} />}
        href="/mainpage/medication/?"
        press={pathname === "/mainpage/medication/?" ? true : false}
      />
    </div>
  );
}
