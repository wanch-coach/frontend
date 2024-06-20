import styles from "./signup.module.css";
import "./signup.module.css";
import { Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { BasicInputBox, DateInputBox, TwoCheckBox } from "../components/component";

export default function Signup() {
  return (
    <div className={styles.body_container}>
      <SignupStepText stepText={1} title="본인 인증" />
      <div className={styles.step_container}>
        <BasicInputBox label="이름" placeholder="이름" />
        <BasicInputBox
          label="전화번호"
          placeholder="전화번호"
          showButton
          buttonLabel="인증번호 전송"
        />
        <BasicInputBox placeholder="전화번호" showButton buttonLabel="인증" />
      </div>
      <SignupStepText stepText={2} title="정보 입력" />
      <div className={styles.step_container}>
        <BasicInputBox label="아이디" placeholder="아이디" />
        <BasicInputBox label="비밀번호" placeholder="비밀번호" />
        <BasicInputBox label="비밀번호 확인" placeholder="비밀번호 확인" />
        <DateInputBox label="생년월일" />
        <TwoCheckBox label="성별" type1="male" type1Text="남" type2="female" type2Text="여" />
      </div>
      <SignupStepText stepText={3} title="약관 동의" />
      <div className={`${styles.step_container} mt-2`}>
        <SignupAgree />
      </div>
      <div className={styles.signup_button_container}>
        <button className={styles.signup_button}>회원가입</button>
      </div>
    </div>
  );
}

interface SignupStepTextProps {
  stepText: number;
  title: string;
}

function SignupStepText({ stepText, title }: SignupStepTextProps) {
  return (
    <div className={styles.step_text_container}>
      <span className={styles.step_text_01}>Step{stepText}.</span>
      <span className={styles.step_text_02}>{title}</span>
    </div>
  );
}

function SignupAgree() {
  return (
    <>
      <div>
        <Checkbox
          icon={<CheckIcon sx={{ fontSize: 20 }} />}
          checkedIcon={<CheckIcon sx={{ fontSize: 20, color: "green" }} />}
        />
        <span>[필수] 완치코치 서비스 이용 약관</span>
      </div>
      <div>
        <Checkbox
          icon={<CheckIcon sx={{ fontSize: 20 }} />}
          checkedIcon={<CheckIcon sx={{ fontSize: 20, color: "green" }} />}
        />
        <span>[필수] 개인정보 수집 및 이용에 대한 동의</span>
      </div>
      <hr />
      <div className={styles.agree_box}>
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleOutlineIcon sx={{ color: "green" }} />}
        />
        <span>전체 동의</span>
      </div>
    </>
  );
}
