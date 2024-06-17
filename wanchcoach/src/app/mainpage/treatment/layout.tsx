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
  const [open, setOpen] = useState(false);
  const handleActionClick = (profile: string) => {
    setSelectedProfile(profile);
    setOpen(false);
  };
  const handleOpenClose = () => {
    open === true ? setOpen(false) : setOpen(true);
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
        open={open}
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
      <div className={styles.header_plus_box}>
        <FaPlus size={"20px"} color="#0A6847" />
        <div className={styles.header_plus_text}>진료추가</div>
      </div>
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
    <div
      className={styles.header_menu_box}
      style={{
        color: press ? "#BCBCBC" : "black",
        boxShadow: press ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
      }}
    >
      <Link href={href}>
        {icon}
        <div className={styles.header_menu_text}>{title}</div>
      </Link>
    </div>
  );
}
