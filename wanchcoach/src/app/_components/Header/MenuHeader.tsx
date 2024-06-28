import styles from "./Header.module.css";
import { ReactElement } from "react";
import Link from "next/link";

interface MenuProps {
  title: string;
  icon: ReactElement;
  href: string;
  press: boolean;
  handlePressChange?: () => void;
}
export default function MenuHeader({ title, icon, href, press, handlePressChange }: MenuProps) {
  return (
    <Link
      href={href}
      className={styles.header_menu_box}
      style={{
        color: press ? "#BCBCBC" : "black",
        boxShadow: press ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
      }}
      onClick={handlePressChange}
    >
      {icon}
      <div className={styles.header_menu_text}>{title}</div>
    </Link>
  );
}
