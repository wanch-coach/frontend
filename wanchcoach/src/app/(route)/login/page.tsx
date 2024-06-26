"use client";

import { TextField } from "@mui/material";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginController } from "@/app/util/controller/userController";
import { FindMyFamilyIdController } from "@/app/util/controller/familyController";

export default function Login() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  const handleLoginSubmit = () => {
    LoginController({ id: loginId, pwd: loginPwd })
      .then(() => {
        // 여기에 api 호출해서 내 가족 아이디 쿠키에 저장해놓을꺼임!!
        FindMyFamilyIdController()
          .then(() => {
            router.push("/mainpage/home");
          })
          .catch((e) => {
            return alert("error");
          });
        return;
      })
      .catch((e) => {
        console.log(e);
        return alert("비밀번호가 일치하지 않습니다.");
      });
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
