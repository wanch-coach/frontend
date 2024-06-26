"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "./hospital.module.css";
import HospitalSearchBox from "@/app/_components/Component/Medical/HospitalSearchBox";

export default function Hospital() {
  const hospitals = ["서울성모병원", "서울아산병원", "부산성모병원", "부산아산병원"];
  const [searchValue, setSearchValue] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const filtered = hospitals.filter((hospital) =>
      hospital.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchValue]);

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
        {filteredHospitals.map((hospital, index) => (
          <div key={index} className={styles.hospital_list_text}>
            {hospital}
          </div>
        ))}
      </div>
    </div>
  );
}
