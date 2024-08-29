import styles from "./Treatment.module.css";
import { FamilySummaryListData } from "@/app/util/controller/familyController";
import MenuHeader from "@/app/_components/Component/Header/MenuHeader";
import { TbStethoscope } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import { usePathname } from "next/navigation";

interface TreatmentMenuProps {
  selectedFamily: FamilySummaryListData;
}
export default function TreatmentMenu({ selectedFamily }: TreatmentMenuProps) {
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
