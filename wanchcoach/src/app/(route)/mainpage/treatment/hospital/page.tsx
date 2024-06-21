"use client";

import React, { useState, useEffect } from "react";
import styles from "./hospital.module.css";
import { IoMdSearch } from "react-icons/io";

export default function Hospital() {
  const hospitals = ["서울성모병원", "서울아산병원", "부산성모병원", "부산아산병원"];
  const [searchValue, setSearchValue] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const filtered = hospitals.filter((hospital) =>
      hospital.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredHospitals(filtered);
  }, [searchValue]);

  return (
    <div className={styles.body_container}>
      <div className={styles.hospital_search_box}>
        <input
          className={styles.hospital_search_input}
          type="text"
          placeholder="병원 명으로 검색"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button className={styles.hospital_search_button}>
          <IoMdSearch size={"25px"} color="#0A6847" />
        </button>
      </div>
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
