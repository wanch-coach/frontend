"use client";

import DrugBox from "@/app/_components/Component/Drug/DrugBox";
import styles from "./drug.module.css";
import { useState, ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";

export default function Drug() {
  const route = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchSubmit = () => {
    /* 약 검색하는 API 호출 해야함! */
  };
  const handleDrugDetail = () => {
    route.push(`/druginfo/${3}`);
  };
  return (
    <div className={styles.body_container}>
      <div className={styles.drug_list_header}>
        <DrugSearchBox
          placeholder="검색어 입력"
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          onClick={handleSearchSubmit}
        />
      </div>
      <div className={styles.drug_list_container}>
        {searching ? (
          <>
            <div className={styles.drug_list_box}>
              <DrugBox title="타이레놀" category="진통제" onClick={handleDrugDetail} />
            </div>
          </>
        ) : (
          <div className={styles.drug_list_like_container}>
            <div className={styles.drug_list_like_header}>
              <FaStar size="23px" color="#FFE500" />
              <div className={styles.drug_list_like_text}> 약상자 (1) </div>
            </div>
            <>
              <div className={styles.drug_list_box}>
                <DrugBox title="타이레놀" category="진통제" onClick={handleDrugDetail} />
              </div>
            </>
          </div>
        )}
      </div>
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
