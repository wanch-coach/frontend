"use client";

import Cookies from "js-cookie";
import styles from "./naversignup.module.css";
import { BasicInputBox, DateInputBox, TwoCheckBox } from "../../_components/component";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import SignupStepText from "@/app/_components/Component/Signup/SignupStepText";
import SignupAgree from "@/app/_components/Component/Signup/SignupAgree";
import { useRouter } from "next/navigation";
import { NaverLoginController, SignupController } from "@/app/util/controller/userController";
import { FindMyFamilyIdController } from "@/app/util/controller/familyController";

export default function NaverSignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [inputDisabledPhoneNumber, setInputDisabledPhoneNumber] = useState(false);
  // const [inputDisabledVerification, setInputDisabledVerification] = useState(false);
  // const [inputDisabledLoginId, setInputDisabledLoginId] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  const handleSignupSubmit = () => {
    if (!agreeAll) {
      return alert("약관에 동의해주세요.");
    }
    if (!birthDate) {
      return;
    }
    const data = {
      loginId: loginId,
      pwd: loginPwd,
      name: name,
      email: email,
      birthDate: birthDate.format("YYYY-MM-DD"),
      gender: gender,
      phoneNumber: phoneNumber,
    };
    SignupController(data)
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        router.push("/login");
        return;
      })
      .catch((e) => {
        console.log(e);
        return alert("유효하지 않습니다.");
      });
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
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

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      NaverLoginController({ code: code })
        .then((response) => {
          if (response.data.signUp) {
            Cookies.set("refreshToken", response.data.refreshToken);
            Cookies.set("accessToken", response.data.accessToken);
            FindMyFamilyIdController()
              .then(() => {
                router.replace("/mainpage/home");
              })
              .catch((e) => {
                return alert(e.message);
              });
          } else {
            const formattedDate = dayjs(response.data.birthDate);
            const formattedPhoneNumber = response.data.phoneNumber.replace(/-/g, "");
            const formattedGender = response.data.gender === "M" ? "male" : "female";
            setLoginId(response.data.loginId);
            setName(response.data.name);
            setEmail(response.data.email);
            setBirthDate(formattedDate);
            setGender(formattedGender);
            setPhoneNumber(formattedPhoneNumber);
          }
        })
        .catch((e) => {
          console.log(e);
          return alert(e.message);
        });
    }
  }, []);

  return (
    <div className={styles.body_container}>
      <SignupStepText stepText={1} title="정보 확인" />
      <div className={styles.step_container}>
        <BasicInputBox
          type="text"
          label="이름"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabledInput={true}
        />
        <BasicInputBox
          type="number"
          label="전화번호"
          placeholder="전화번호 ( - 빼고 입력 )"
          disabledInput={true}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <BasicInputBox
          type="text"
          label="아이디"
          placeholder="아이디"
          value={loginId}
          disabledInput={true}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <DateInputBox label="생년월일" selectedDate={birthDate} handleDateChange={setBirthDate} />
        <BasicInputBox
          type="text"
          label="이메일"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabledInput={true}
        />
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
      <div className="mt-5" />
      <SignupStepText stepText={2} title="약관 동의" />
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
