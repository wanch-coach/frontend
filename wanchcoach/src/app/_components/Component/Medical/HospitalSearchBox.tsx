import styles from "./Medical.module.css";
import { ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";

interface HospitalSearchBoxProps {
  placeholder: string;
  searchValue: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function HospitalSearchBox({
  placeholder,
  searchValue,
  handleSearchChange,
}: HospitalSearchBoxProps) {
  return (
    <div className={styles.hospital_search_box}>
      <input
        className={styles.hospital_search_input}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button className={styles.hospital_search_button}>
        <IoMdSearch size={"25px"} color="#0A6847" />
      </button>
    </div>
  );
}
