"use client";

import { ReactNode, useState } from "react";
import styles from "./treatment.module.css";
import ProfileHeader from "@/app/_components/Component/Header/ProfileHeader";
import MenuHeader from "@/app/_components/Component/Header/MenuHeader";
import { TbStethoscope } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { FamilySummaryListData } from "@/app/util/controller/familyController";

export default function TreatmentLayout({ children }: { children: ReactNode }) {
  const route = useRouter();
  const [selectedFamily, setSelectedFamily] = useState<FamilySummaryListData>({
    familyId: 0,
    color: "#757575",
    name: "전체",
  });
  const handleSelectedFamilyChange = (family: FamilySummaryListData) => {
    setSelectedFamily(family);
    route.replace(`/mainpage/treatment/diagnosis/${family.familyId}`);
  };
  return (
    <div className={styles.container}>
      <ProfileHeader
        register
        selectedFamily={selectedFamily}
        handleSelectedFamilyChange={handleSelectedFamilyChange}
        entire
      />
      <TreatmentMenu selectedFamily={selectedFamily} />
      {children}
    </div>
  );
}

interface TreatmentMenuProps {
  selectedFamily: FamilySummaryListData;
}
function TreatmentMenu({ selectedFamily }: TreatmentMenuProps) {
  const pathname = usePathname();
  return (
    <div className={styles.header_menu_container}>
      <MenuHeader
        title="진료"
        icon={<TbStethoscope size={"40px"} />}
        href={`/mainpage/treatment/diagnosis/${selectedFamily.familyId}`}
        press={pathname.startsWith("/mainpage/treatment/diagnosis") ? true : false}
      />
      <MenuHeader
        title="병원"
        icon={<FaRegHospital size={"40px"} />}
        href={`/mainpage/treatment/hospital/${selectedFamily.familyId}`}
        press={pathname.startsWith("/mainpage/treatment/hospital") ? true : false}
      />
      <MenuHeader
        title="달력"
        icon={<MdCalendarMonth size={"40px"} />}
        href={`/mainpage/treatment/calendar/${selectedFamily.familyId}`}
        press={pathname.startsWith("/mainpage/treatment/calendar") ? true : false}
      />
    </div>
  );
}
