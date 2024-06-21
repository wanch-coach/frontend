import styles from "./Header.module.css";
import { useState } from "react";
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

interface ProfileHeaderProps {
  register?: boolean;
}
export default function ProfileHeader({ register }: ProfileHeaderProps) {
  const [selectedProfile, setSelectedProfile] = useState("/logo.png");
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleActionClick = (profile: string) => {
    setSelectedProfile(profile);
    setProfileOpen(false);
  };
  const handleOpenClose = () => {
    profileOpen === true ? setProfileOpen(false) : setProfileOpen(true);
  };

  return (
    <div className={styles.header_profile_container}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          top: "65px",
          "& .MuiFab-primary": {
            backgroundColor: "white",
            width: "45px",
            height: "45px",

            "&:hover": {
              backgroundColor: "white",
            },
          },
        }}
        icon={<Image src={selectedProfile} alt="프로필" fill sizes="30px" />}
        direction="right"
        open={profileOpen}
        onClick={handleOpenClose}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={<Image src={action.profile} alt="프로필" fill sizes="30px" />}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.profile)}
          />
        ))}
      </SpeedDial>
      {register && (
        <div className={styles.header_plus_box} onClick={handleModalOpen}>
          <FaPlus size={"20px"} color="#0A6847" />
          <div className={styles.header_plus_text}>진료추가</div>
        </div>
      )}
      <BasicModal open={modalOpen} handleModalClose={handleModalClose} width="45%" height="23vh">
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

const actions = [
  {
    profile: "/logo.png",
    name: "profile1",
  },
  {
    profile: "/next.svg",
    name: "profile2",
  },
  {
    profile: "/vercel.svg",
    name: "profile3",
  },
  {
    profile: "/vercel.svg",
    name: "profile4",
  },
  {
    profile: "/vercel.svg",
    name: "profile5",
  },
];
