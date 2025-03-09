import Link from "next/link";
import styles from "./Mainpage.module.css";
import { IoMdSettings } from "react-icons/io";

function Header() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.header_box}>
          <Link href="/mysetting">
            <IoMdSettings className={styles.header_icon} size={"32px"} color="#DDDDDD" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
