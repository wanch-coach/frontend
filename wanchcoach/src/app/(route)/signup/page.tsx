"use client";

import styles from "./signup.module.css";
import "./signup.module.css";
import { BasicInputBox, DateInputBox, TwoCheckBox } from "../../_components/component";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import SignupStepText from "@/app/_components/Component/Signup/SignupStepText";
import SignupAgree from "@/app/_components/Component/Signup/SignupAgree";
import { useRouter } from "next/navigation";
import { SignupController } from "@/app/util/controller/userController";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState("null");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("male");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  const handleSignupSubmit = () => {
    const data = {
      loginId: loginId,
      encryptedPwd: loginPwd,
      name: name,
      email: "i0364842@naver.com",
      birthDate: birthDate,
      gender: gender,
      phoneNumber: phoneNumber,
    };
    SignupController(data)
      .then(() => {
        router.push("/login");
        return;
      })
      .catch((e) => {
        console.log(e);
        return alert("유효하지 않습니다.");
      });
  };

  const handleAgreeChange = (type: string, checked: boolean) => {
    if (type === "agree1") {
      setAgree1(checked);
      setAgreeAll(checked && agree2);
    } else if (type === "agree2") {
      setAgree2(checked);
      setAgreeAll(checked && agree1);
    } else if (type === "all") {
      setAgree1(checked);
      setAgree2(checked);
      setAgreeAll(checked);
    }
  };

  const handleIsSamePassword = () => {
    if (loginPwd !== "" && confirmPassword !== "") {
      if (loginPwd === confirmPassword) {
        setIsSamePassword("true");
      } else {
        setIsSamePassword("false");
      }
    } else {
      setIsSamePassword("null");
    }
  };

  useEffect(() => {
    handleIsSamePassword();
  }, [loginPwd, confirmPassword]);

  return (
    <div className={styles.body_container}>
      <SignupStepText stepText={1} title="본인 인증" />
      <div className={styles.step_container}>
        <BasicInputBox
          type="text"
          label="이름"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <BasicInputBox
          type="number"
          label="전화번호"
          placeholder="전화번호"
          showButton
          buttonLabel="인증번호 전송"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <BasicInputBox type="number" placeholder="인증번호 입력" showButton buttonLabel="인증" />
      </div>
      <SignupStepText stepText={2} title="정보 입력" />
      <div className={styles.step_container}>
        <BasicInputBox
          type="text"
          label="아이디"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <BasicInputBox
          type="password"
          label="비밀번호"
          placeholder="비밀번호"
          value={loginPwd}
          onChange={(e) => setLoginPwd(e.target.value)}
        />
        <BasicInputBox
          type="password"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          className={styles.samepassword_text}
          style={{ color: isSamePassword === "true" ? "#7ABA78" : "#FF5A5A" }}
        >
          {isSamePassword !== "null"
            ? isSamePassword === "true"
              ? "비밀번호가 일치합니다"
              : "비밀번호가 일치하지 않습니다"
            : ""}
        </div>
        <DateInputBox label="생년월일" selectedDate={birthDate} handleDateChange={setBirthDate} />
        <TwoCheckBox
          label="성별"
          type1="male"
          type1Text="남"
          type2="female"
          type2Text="여"
          selectedCheck={gender}
          onChange={setGender}
        />
      </div>
      <SignupStepText stepText={3} title="약관 동의" />
      <div className={`${styles.step_container} mt-2`}>
        <SignupAgree
          agree1={agree1}
          agree2={agree2}
          agreeAll={agreeAll}
          handleAgreeChange={handleAgreeChange}
        />
      </div>
      <div className={styles.signup_button_container} onClick={handleSignupSubmit}>
        <button className={styles.signup_button}>회원가입</button>
      </div>
    </div>
  );
}
