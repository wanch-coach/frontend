"use client";

import { ReactNode, useState, ReactElement } from "react";
import styles from "./treatment.module.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Image from "next/image";
import { TbStethoscope } from "react-icons/tb";
import { FaRegHospital } from "react-icons/fa6";
import { MdCalendarMonth } from "react-icons/md";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { FaHandHoldingMedical } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";
import { BasicModal } from "@/app/components/component";

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
  {
    profile: "/vercel.svg",
    name: "profile6",
  },
  {
    profile: "/vercel.svg",
    name: "profile7",
  },
  {
    profile: "/vercel.svg",
    name: "profile8",
  },
];

export default function TreatmentLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Profile />
      <TreatmentMenu />
      {children}
    </div>
  );
}

function Profile() {
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
      <div className={styles.header_plus_box} onClick={handleModalOpen}>
        <FaPlus size={"20px"} color="#0A6847" />
        <div className={styles.header_plus_text}>진료추가</div>
      </div>
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

function TreatmentMenu() {
  const pathname = usePathname();
  return (
    <div className={styles.header_menu_container}>
      <Menu
        title="진료"
        icon={<TbStethoscope size={"40px"} />}
        href="/mainpage/treatment/diagnosis"
        press={pathname === "/mainpage/treatment/diagnosis" ? true : false}
      />
      <Menu
        title="병원"
        icon={<FaRegHospital size={"40px"} />}
        href="/mainpage/treatment/hospital"
        press={pathname === "/mainpage/treatment/hospital" ? true : false}
      />
      <Menu
        title="달력"
        icon={<MdCalendarMonth size={"40px"} />}
        href="/mainpage/treatment/calendar"
        press={pathname === "/mainpage/treatment/calendar" ? true : false}
      />
    </div>
  );
}

interface MenuProps {
  title: string;
  icon: ReactElement;
  href: string;
  press: boolean;
}
function Menu({ title, icon, href, press }: MenuProps) {
  return (
    <Link
      href={href}
      className={styles.header_menu_box}
      style={{
        color: press ? "#BCBCBC" : "black",
        boxShadow: press ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
      }}
    >
      {icon}
      <div className={styles.header_menu_text}>{title}</div>
    </Link>
  );
}
