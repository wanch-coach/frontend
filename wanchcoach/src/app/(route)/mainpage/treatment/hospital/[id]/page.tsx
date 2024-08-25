"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./hospital.module.css";
import HospitalSearchBox from "@/app/_components/Mainpage/Medical/HospitalSearchBox";
import {
  TreatmentHospital,
  TreatmentHospitalController,
  TreatmentHospitalItems,
} from "@/app/util/controller/treatmentController";
import TreatmentBox from "../../_components/TreatmentBox";
import { FamilyDetailController } from "@/app/util/controller/familyController";

export default function Hospital({ params }: { params: { id: number } }) {
  const familyId = params.id;
  const [hospitals, setHospitals] = useState<TreatmentHospitalItems[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0"); // month is zero-indexed
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    return formattedDate;
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // 검색어에 따라 병원 이름 필터링
    const filtered = hospitals.filter((hospital: TreatmentHospitalItems) =>
      familyId == 0
        ? hospital.hospitalName.includes(value)
        : hospital.hospitalName.includes(value) &&
          hospital.treatmentItems.some((item) => item.familyId == familyId)
    );
    setFilteredHospitals(filtered);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TreatmentHospitalController();
        setHospitals(response.data.treatmentHospitalItems);
        const filtered = response.data.treatmentHospitalItems.filter(
          (hospital: TreatmentHospitalItems) =>
            familyId == 0 ? true : hospital.treatmentItems.some((item) => item.familyId == familyId)
        );
        setFilteredHospitals(filtered);

        console.log("병원 데이터 가져오기 성공:", response);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        // 오류 처리
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.body_container}>
      <HospitalSearchBox
        placeholder="병원 명으로 검색"
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <div className={styles.hospital_list_container}>
        <div className={styles.hospital_list_menu_text}>
          최다 방문 순
          <hr className={styles.hospital_list_menu_line} />
        </div>
        {filteredHospitals.map((hospital, index) => {
          const filteredItems =
            familyId == 0
              ? hospital.treatmentItems
              : hospital.treatmentItems.filter((item) => item.familyId == familyId);
          if (filteredItems.length === 0)
            return <div className={styles.empty_container}>등록한 진료가 없습니다</div>;

          return (
            <div key={index} className={styles.hospital_list}>
              <div className={styles.hospital_list_text}>
                {hospital.hospitalName} ({filteredItems.length})
              </div>
              <div>
                {filteredItems.map((item) => (
                  <TreatmentBox
                    key={item.id}
                    treatmentItems={item}
                    future={formatDate(item.date) >= getCurrentDate()}
                    state={formatDate(item.date) < getCurrentDate()}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
