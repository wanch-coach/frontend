"use client";

import styles from "./drug.module.css";
import { useState, ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";

export default function Drug() {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchSubmit = () => {
    /* 약 검색하는 API 호출 해야함! */
  };
  return (
    <div className={styles.body_container}>
      <DrugSearchBox
        placeholder="검색어 입력"
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        onClick={handleSearchSubmit}
      />
      <div className={styles.drug_list_container}></div>
    </div>
  );
}

interface DrugSearchBoxProps {
  placeholder: string;
  searchValue: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}
function DrugSearchBox({
  placeholder,
  searchValue,
  handleSearchChange,
  onClick,
}: DrugSearchBoxProps) {
  return (
    <div className={styles.drug_search_box}>
      <input
        className={styles.drug_search_input}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button className={styles.drug_search_button} onClick={onClick}>
        <IoMdSearch size={"25px"} color="#757575" />
      </button>
    </div>
  );
}
