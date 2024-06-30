"use client";

import DrugBox from "@/app/_components/Component/Drug/DrugBox";
import styles from "./drug.module.css";
import { useState, ChangeEvent, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { SearchDrugByKeyword, SearchFavorites } from "@/app/util/controller/drugController";

export default function Drug() {
  const route = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };


  const handleSearchSubmit = () => {
    const data = {
      type:"itemName",
      keyword: searchValue
    }
    /* 약 검색하는 API 호출 해야함! */
    SearchDrugByKeyword(data)
      .then((response) => {
        setSearchData(response.data);
        setSearching(true);
        console.log(response.data);
      })
      .catch((e)=> {
        console.log(e)
    })
  };
  const handleDrugDetail = (drugId:number) => {
    route.push(`/druginfo/${drugId}`);
  };

  useEffect(() => {
    
    SearchFavorites()
      .then((response) => {
        setFavorite(response.data);
        setSearching(false);
        console.log(response.data);
    })


  }, []);



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
          searchData.map((data, index) => (
            <>
            <div key={index} className={styles.drug_list_box}>
                <DrugBox favorite={ data["favorite"]} drugImage={data["drugImage"]} itemName={data["itemName"]} prductType={data["prductType"]} drugId={data["drugImage"]} onClick={()=>handleDrugDetail(data["drugId"])} />
            </div>
          </>
          ))

        ) : (
          <div className={styles.drug_list_like_container}>
            <div className={styles.drug_list_like_header}>
              <FaStar size="23px" color="#FFE500" />
                <div className={styles.drug_list_like_text}> 약상자 { favorite.length} </div>
            </div>
              { 
                favorite.map((data, index) => (
                  <>
                  <div key={index} className={styles.drug_list_box}>
                      <DrugBox favorite={ data["favorite"]} drugImage={data["drugImage"]} itemName={data["itemName"]} prductType={data["prductType"]} drugId={data["drugImage"]} onClick={()=>handleDrugDetail(data["drugId"])} />
                  </div>
                </>
                ))
              }
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
