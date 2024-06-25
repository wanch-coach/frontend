"use client";

import { TextField } from "@mui/material";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const handleLoginSubmit = () => {
    router.push("/mainpage");
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.input_box}>
        <TextField
          fullWidth
          label="아이디"
          variant="outlined"
          color="success"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
      </div>
      <div className={styles.input_box}>
        <TextField
          fullWidth
          label="비밀번호"
          variant="outlined"
          type="password"
          color="success"
          value={loginPwd}
          onChange={(e) => setLoginPwd(e.target.value)}
        />
      </div>
      <div onClick={handleLoginSubmit}>
        <button className={styles.login_button}>로그인</button>
      </div>
    </div>
  );
}
