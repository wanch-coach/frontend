import styles from "./Medical.module.css";
import { ChangeEvent } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface HospitalSearchBoxProps {
  placeholder: string;
  searchValue: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit?: () => void;
  handleSearchClose?: () => void;
  readOnly?: boolean;
}

export default function HospitalSearchBox({
  placeholder,
  searchValue,
  readOnly = false,
  handleSearchChange,
  handleSearchSubmit,
  handleSearchClose,
}: HospitalSearchBoxProps) {
  return (
    <div className={styles.hospital_search_box}>
      <input
        className={styles.hospital_search_input}
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
        readOnly={readOnly}
      />
      <button
        className={styles.hospital_search_button}
        onClick={readOnly ? handleSearchClose : handleSearchSubmit}
      >
        {readOnly ? <IoClose size={"25px"} /> : <IoMdSearch size={"25px"} color="#0A6847" />}
      </button>
    </div>
  );
}
