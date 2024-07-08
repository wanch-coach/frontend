"use client";

import styles from "./signup.module.css";
import "./signup.module.css";
import { BasicInputBox, DateInputBox, TwoCheckBox } from "../../_components/component";
import { ChangeEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import SignupStepText from "@/app/_components/Component/Signup/SignupStepText";
import SignupAgree from "@/app/_components/Component/Signup/SignupAgree";
import { useRouter } from "next/navigation";
import {
  IdCheckController,
  SendSMSController,
  SignupController,
} from "@/app/util/controller/userController";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verification, setVerification] = useState("");
  const [phoneButtonDisabled, setPhoneButtonDisabled] = useState(true);
  const [verificationButtonDisabled, setVerificationButtonDisabled] = useState(true);
  const [inputDisabledPhoneNumber, setInputDisabledPhoneNumber] = useState(false);
  const [inputDisabledVerification, setInputDisabledVerification] = useState(false);
  const [inputDisabledLoginId, setInputDisabledLoginId] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState("null");
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  const handleSignupSubmit = () => {
    /* 확인해야할것 
        1. 이름 입력했는지 (loginId !== "")
        2. 인증번호완료했는지(inputDisabledVerification === true)
        3. 아이디 일치 여부(inputDisabledLoginId === true)
        4. 비밀번호 일치하는지(isSamePassword === "true") 
        5. 생년월일 입력했는지(birthDate !== "")
        6. 이메일 입력했는지(email !== "")
        7. 약관 동의 했는지(agreeAll === true) 
         */
    if (
      loginId === "" ||
      !inputDisabledVerification ||
      !inputDisabledLoginId ||
      isSamePassword !== "true" ||
      birthDate == null ||
      email === "" ||
      !agreeAll
    ) {
      return alert("모든 필수 항목을 올바르게 입력하고 확인해주세요.");
    }
    const data = {
      loginId: loginId,
      pwd: loginPwd,
      name: name,
      email: email,
      birthDate: dayjs(birthDate).add(1, "day"),
      gender: gender,
      phoneNumber: phoneNumber,
    };
    console.log(data);
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

  const handleSendSMSSubmit = () => {
    const data = {
      phoneNumber: phoneNumber,
    };
    SendSMSController(data)
      .then((response) => {
        setVerification(response.data);
        setPhoneButtonDisabled(true);
        setInputDisabledPhoneNumber(true);
        return alert("문자전송을 완료하였습니다.");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const handleIdCheckSubmit = () => {
    if (loginId === "") {
      return alert("아이디를 입력해주세요.");
    }
    const data = {
      loginId: loginId,
    };
    IdCheckController(data)
      .then(() => {
        setInputDisabledLoginId(true);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };
  const handleVerificationCodeSubmit = () => {
    /* 인증번호 일치 여부 확인!! */
    if (verification !== verificationCode) {
      return alert("인증번호가 일치하지 않습니다.");
    }
    setPhoneButtonDisabled(true); // 인증 버튼 재 비활성화
    setInputDisabledVerification(true); // 인증번호 입력 금지
    alert("인증번호가 확인되었습니다");
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{11}$/.test(value)) {
      setPhoneButtonDisabled(false);
    } else {
      setPhoneButtonDisabled(true);
    }
    setPhoneNumber(value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{6}$/.test(value)) {
      setVerificationButtonDisabled(false);
    } else {
      setVerificationButtonDisabled(true);
    }
    setVerificationCode(value);
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
          placeholder="전화번호 ( - 빼고 입력 )"
          showButton
          buttonLabel="인증번호 전송"
          disabledButton={phoneButtonDisabled}
          disabledInput={inputDisabledPhoneNumber}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onClick={handleSendSMSSubmit}
        />
        {inputDisabledPhoneNumber ? (
          <BasicInputBox
            type="number"
            placeholder="인증번호 입력"
            showButton
            buttonLabel="인증"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            disabledButton={verificationButtonDisabled}
            disabledInput={inputDisabledVerification}
            onClick={handleVerificationCodeSubmit}
          />
        ) : null}
      </div>
      <SignupStepText stepText={2} title="정보 입력" />
      <div className={styles.step_container}>
        <BasicInputBox
          type="text"
          label="아이디"
          placeholder="아이디"
          showButton
          buttonLabel="중복확인"
          value={loginId}
          disabledInput={inputDisabledLoginId}
          onChange={(e) => setLoginId(e.target.value)}
          onClick={handleIdCheckSubmit}
        />
        <BasicInputBox
          type="password"
          label="비밀번호"
          placeholder="비밀번호"
          value={loginPwd}
          onChange={(e) => {
            setLoginPwd(e.target.value);
          }}
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
        <BasicInputBox
          type="text"
          label="이메일"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
