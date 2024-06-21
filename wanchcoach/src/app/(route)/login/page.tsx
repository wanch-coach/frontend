import { TextField } from "@mui/material";
import styles from "./login.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.input_box}>
          <TextField fullWidth label="아이디" variant="outlined" color="success" />
        </div>
        <div className={styles.input_box}>
          <TextField
            fullWidth
            label="비밀번호"
            variant="outlined"
            type="password"
            color="success"
          />
        </div>
        <Link href="/mainpage/home">
          <button className={styles.login_button}>로그인</button>
        </Link>
      </div>
    </>
  );
}
