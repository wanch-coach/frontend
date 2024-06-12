"use client";
import styles from "./signup.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import "./signup.module.css";
import { Checkbox, styled } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";

export default function Signup() {
  const currentDate = dayjs();
  const StyledDatePicker = styled(DatePicker)({
    "& .MuiInputBase-root": {
      backgroundColor: "white",
      borderRadius: "10px",
      height: "50px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#C5C6CC", // 테두리 색상
        borderRadius: "10px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "15px",
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

  const [gender, setGender] = useState("male");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleCheckboxChange = () => {
    setGender((prevGender) => (prevGender === "male" ? "female" : "male"));
  };

  return (
    <div className={styles.body_container}>
      <SignupStepText stepText={1} title="본인 인증" />
      <div className={styles.step_container}>
        <SignupInputBox label="이름" placeholder="이름" />
        <SignupInputBox
          label="전화번호"
          placeholder="전화번호"
          showButton
          buttonLabel="인증번호 전송"
        />
        <SignupInputBox placeholder="전화번호" showButton buttonLabel="인증" />
      </div>
      <SignupStepText stepText={2} title="정보 입력" />
      <div className={styles.step_container}>
        <SignupInputBox label="아이디" placeholder="아이디" />
        <SignupInputBox label="비밀번호" placeholder="비밀번호" />
        <SignupInputBox label="비밀번호 확인" placeholder="비밀번호 확인" />

        <div className="mt-3">
          <div className={styles.input_text}>생년월일</div>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <StyledDatePicker
              value={selectedDate}
              onChange={handleDateChange} // 날짜 변경 핸들러
              format="YYYY-MM-DD"
              showDaysOutsideCurrentMonth
              views={["year", "month", "day"]}
              sx={{
                width: "100%",
              }}
              slotProps={{ toolbar: { hidden: true } }}
              shouldDisableDate={(day) => {
                return dayjs(day as Dayjs).isAfter(currentDate, "day");
              }}
            />
          </LocalizationProvider>
        </div>
        <div className={styles.gender_container}>
          <div className={styles.input_text}>성별</div>
          <div className={styles.gender_box}>
            <div>
              <Checkbox
                checked={gender === "male"}
                onChange={handleCheckboxChange}
                name="male"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                sx={{
                  "&.Mui-checked": {
                    color: "#2F3036",
                  },
                }}
              />
              <span>남</span>
            </div>
            <div className="ml-5 mr-5"></div>
            <div>
              <Checkbox
                checked={gender === "female"}
                onChange={handleCheckboxChange}
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                name="female"
                sx={{
                  "&.Mui-checked": {
                    color: "#2F3036",
                  },
                }}
              />
              <span>여</span>
            </div>
          </div>
        </div>
      </div>
      <SignupStepText stepText={3} title="약관 동의" />
      <div className={`${styles.step_container} mt-2`}>
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
      </div>
      <div className={styles.signup_button_container}>
        <button className={styles.signup_button}>회원가입</button>
      </div>
    </div>
  );
}

interface SignupInputBoxProps {
  label?: string;
  placeholder: string;
  showButton?: boolean;
  buttonLabel?: string;
}

export function SignupInputBox({
  label,
  placeholder,
  showButton,
  buttonLabel,
}: SignupInputBoxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <div className={styles.input_container}>
        <input className={styles.input_box} type="text" placeholder={placeholder} />
        {showButton && <button className={styles.input_button}>{buttonLabel}</button>}
      </div>
    </div>
  );
}

interface SignupStepTextProps {
  stepText: number;
  title: string;
}

export function SignupStepText({ stepText, title }: SignupStepTextProps) {
  return (
    <div className={styles.step_text_container}>
      <span className={styles.step_text_01}>Step{stepText}.</span>
      <span className={styles.step_text_02}>{title}</span>
    </div>
  );
}
