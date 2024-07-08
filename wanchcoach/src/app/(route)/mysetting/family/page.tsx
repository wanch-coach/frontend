"use client";

import Link from "next/link";
import styles from "./family.module.css";
import { Header } from "@/app/_components/component";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FamilyListController, FamilyListData } from "@/app/util/controller/familyController";
import dayjs from "dayjs";

export default function Family() {
  const [familyList, setFamilyList] = useState<FamilyListData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FamilyListController();

        setFamilyList(response.data);
      } catch (error) {
        console.error("Error fetching family list:", error);
      }
    };
    fetchData(); // fetchData 함수 호출
  }, []);
  return (
    <div className={styles.container}>
      <Header title="가족 관리" />
      <div className={styles.body_container}>
        <hr className={styles.family_menu_line} />
        {familyList.length > 0 &&
          familyList.map((family, index) => (
            <FamilyMenu key={index} href="/mysetting/my" data={family} />
          ))}
        <Link href={"/mysetting/family/familycreate"}>
          <div className={styles.family_menu_plus}>
            <FaPlus />
            <div className={styles.family_menu_plus_text}>가족추가</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

interface FamilyMenuProps {
  href: string;
  data: FamilyListData;
}
function FamilyMenu({ href, data }: FamilyMenuProps) {
  const birthDate = dayjs(data.birthDate);
  const formattedBirthDate = birthDate.format("YYYY.MM.DD");
  return (
    <Link href={href}>
      <div className={styles.family_menu_container}>
        <div className={styles.family_menu_text}>{data.name}</div>
        <div className={styles.family_menu_text}>{formattedBirthDate}</div>
        <div className={styles.family_menu_text}>{data.gender === "male" ? "남" : "여"}</div>
        <div className={styles.family_menu_color} style={{ backgroundColor: data.color }} />
      </div>
    </Link>
  );
}
