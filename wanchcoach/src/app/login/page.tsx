import { TextField } from "@mui/material";
import styles from "./login.module.css";

export default function Login() {
  return (
    <>
      <form>
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
          <button className={styles.login_button} type="submit">
            로그인
          </button>
        </div>
      </form>
    </>
  );
}
