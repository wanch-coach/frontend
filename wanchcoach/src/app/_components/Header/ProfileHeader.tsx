import styles from "./Header.module.css";
import { SetStateAction, useEffect, useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { BasicModal } from "@/app/_components/component";
import Link from "next/link";
import {
  FamilySummaryListController,
  FamilySummaryListData,
} from "@/app/util/controller/familyController";

interface ProfileHeaderProps {
  selectedFamily: FamilySummaryListData | undefined;
  handleSelectedFamilyChange: (family: FamilySummaryListData) => void;
  register?: boolean;
}
export default function ProfileHeader({
  register,
  selectedFamily,
  handleSelectedFamilyChange,
}: ProfileHeaderProps) {
  const [familyProfiles, setFamilyProfiles] = useState<FamilySummaryListData[]>([]);
  // const [selectedFamily, setSelectedFamily] = useState<FamilySummaryListData | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleActionClick = (family: FamilySummaryListData) => {
    handleSelectedFamilyChange(family);
    setProfileOpen(false);
  };
  const handleOpenClose = () => {
    profileOpen === true ? setProfileOpen(false) : setProfileOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FamilySummaryListController();
        setFamilyProfiles(response.data);
        if (response.data.length > 0) {
          handleSelectedFamilyChange(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching family list:", error);
      }
    };
    fetchData(); // fetchData 함수 호출
  }, []);

  return (
    <div className={styles.header_profile_container}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          top: "65px",
          "& .MuiFab-primary": {
            backgroundColor: "white",
            width: "48px",
            height: "48px",

            "&:hover": {
              backgroundColor: "white",
            },
          },
        }}
        icon={
          <div
            className={styles.header_profile_box}
            style={{ backgroundColor: selectedFamily?.color }}
          >
            {selectedFamily?.name}
          </div>
        }
        direction="right"
        open={profileOpen}
        onClick={handleOpenClose}
      >
        {familyProfiles.map((family) => (
          <SpeedDialAction
            key={family.name}
            icon={
              <div className={styles.header_profile_box} style={{ backgroundColor: family.color }}>
                {family.name}
              </div>
            }
            tooltipTitle={family.name}
            onClick={() => handleActionClick(family)}
          />
        ))}
      </SpeedDial>
      {register && (
        <div className={styles.header_plus_box} onClick={handleModalOpen}>
          <FaPlus size={"20px"} color="#0A6847" />
          <div className={styles.header_plus_text}>진료추가</div>
        </div>
      )}
      <BasicModal open={modalOpen} handleModalClose={handleModalClose} width="65%" height="23vh">
        <>
          <div className={styles.modal_header}>
            <FaHandHoldingMedical color="#0A6847" size={"25px"} />
            <div className={styles.modal_header_text_01}>진료 등록</div>
            <FaLongArrowAltRight size={"23px"} />
            <div className={styles.modal_header_text_02}>병원 선택</div>
          </div>
          <div className={styles.modal_content}>
            <Link
              href={"/register"}
              className={styles.modal_content_box}
              style={{ backgroundColor: "#CECECE" }}
            >
              <IoLocationOutline size={"35px"} />
              <div className={styles.modal_content_text}>지도에서 선택</div>
            </Link>
            <Link
              href={"/register/upcoming"}
              className={styles.modal_content_box}
              style={{ backgroundColor: "#D0DBFF" }}
            >
              <TiPencil size={"35px"} />
              <div className={styles.modal_content_text}>직접 입력</div>
            </Link>
          </div>
        </>
      </BasicModal>
    </div>
  );
}
