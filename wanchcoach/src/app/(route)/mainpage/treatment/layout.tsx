"use client";

import { ReactNode, useState } from "react";
import styles from "./treatment.module.css";
import ProfileHeader from "@/app/_components/Component/Header/ProfileHeader";
import { useRouter } from "next/navigation";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import TreatmentMenu from "@/app/_components/Mainpage/Treatment/TreatmentMenu";

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
