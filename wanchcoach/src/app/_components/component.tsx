"use client";

import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./component.module.css";
import { IoMdArrowBack } from "react-icons/io";

// 새창에 있는 헤더
interface HeaderProps {
  title: string;
}
export function Header({ title }: HeaderProps) {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <span className={styles.header_backicon} onClick={() => router.back()}>
        <IoMdArrowBack size={"30px"} />
      </span>
      <span className={styles.header_text}>{title}</span>
    </div>
  );
}

// 일반적인 Input Box
interface BasicInputBoxProps {
  label?: string;
  placeholder: string;
  showButton?: boolean;
  buttonLabel?: string;
}

export function BasicInputBox({ label, placeholder, showButton, buttonLabel }: BasicInputBoxProps) {
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

// 모달 이용해서 찾는 Input Box
import { IoMdSearch } from "react-icons/io";

interface ModalInputBoxProps {
  label: string;
  placeholder: string;
  // value: string;
  // handleValueChange: () => void;
}
export function ModalInputBox({
  label,
  placeholder,
}: // value,
// handleValueChange,
ModalInputBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSearch = () => {};
  return (
    <>
      <div className="mt-3">
        <div className={styles.input_text}>{label}</div>
        <div className={styles.modal_input_container}>
          <input
            className={styles.modal_input_box}
            type="text"
            readOnly
            placeholder={placeholder}
            // value={value}
            // onChange={handleValueChange}
          />
          <button className={styles.modal_input_button} onClick={handleModalOpen}>
            <IoMdSearch size={"25px"} color="#0A6847" />
          </button>
        </div>
      </div>
      <BasicModal open={modalOpen} handleModalClose={handleModalClose} width="80%" height="70vh">
        <div className={styles.search_modal_container}>
          <div className="pt-4" />
          <div className={styles.modal_input_container}>
            <input
              className={styles.modal_input_box}
              type="text"
              placeholder={placeholder}
              // value={value}
              // onChange={handleValueChange}
            />
            <button className={styles.modal_input_button} onClick={handleSearch}>
              <IoMdSearch size={"25px"} color="#0A6847" />
            </button>
          </div>
          <div className="pt-4">* {label}으로 검색하세요.</div>
          <div className="pt-2">
            <hr className={styles.search_modal_headline} />
            <div className={styles.search_modal_box}>
              <div>
                <span className={styles.search_modal_text_01}>서울성모병원</span>
                <span className={styles.search_modal_text_02}>종합병원</span>
              </div>
              <div className={styles.search_modal_text_03}>서울 서초구 반포동</div>
            </div>
          </div>
        </div>
      </BasicModal>
    </>
  );
}

// 가족 Select box
export function SelectInputbox({ label }: { label: string }) {
  const [selectedValue, setSelectedValue] = useState<string>("none");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected Value:", event.target.value); // 선택된 값 출력
  };
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <select
        name=""
        id=""
        className={`${styles.input_box} ${styles.select_box}`}
        value={selectedValue}
        onChange={handleSelectChange}
        style={{ color: selectedValue === "none" ? "#8F9098" : "black" }}
      >
        <option value="none" hidden>
          가족
        </option>
        <option value="나종현" className={styles.default_text}>
          나종현
        </option>
        <option value="나호재" className={styles.default_text}>
          나호재
        </option>
        <option value="나규람" className={styles.default_text}>
          나규람
        </option>
        <option value="나은규" className={styles.default_text}>
          나은규
        </option>
      </select>
    </div>
  );
}

// TextArea Input box
export function TextAreaInputbox({ label }: { label: string }) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <textarea className={styles.input_area_box} placeholder="내용을 입력하세요" />
    </div>
  );
}

// 숫자 선택 Select Box
export function NumberSelectInputbox({ label }: { label: string }) {
  const [selectedValue, setSelectedValue] = useState<string>("none");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    console.log("Selected Value:", event.target.value); // 선택된 값 출력
  };
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <select
        name=""
        id=""
        className={`${styles.number_input_box} ${styles.select_box}`}
        value={selectedValue}
        onChange={handleSelectChange}
        style={{ color: selectedValue === "none" ? "#8F9098" : "black" }}
      >
        <option value="none" hidden>
          회
        </option>
        <option value="1" className={styles.default_text}>
          1
        </option>
        <option value="2" className={styles.default_text}>
          2
        </option>
        <option value="3" className={styles.default_text}>
          3
        </option>
        <option value="4" className={styles.default_text}>
          4
        </option>
      </select>
    </div>
  );
}

// 숫자 Input Box
interface NumberInputboxProps {
  label: string;
  placeholder: string;
}
export function NumberInputbox({ label, placeholder }: NumberInputboxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <div className={styles.input_container}>
        <input
          className={styles.input_box}
          style={{ width: "18vw", height: "45px", textAlign: "center" }}
          type="number"
          placeholder={placeholder}
        />
        <span className={styles.number_input_text}>일</span>
      </div>
    </div>
  );
}

// 날짜 Input Box
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material";
import "dayjs/locale/ko"; // 이거 선언 해야 한글형식 적용 됨!

export function DateInputBox({ label }: { label: string }) {
  const currentDate = dayjs();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
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

  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <StyledDatePicker
          value={selectedDate}
          onChange={handleDateChange}
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
  );
}

// 두개 중 하나 선택할 수 있는 Check Box
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox } from "@mui/material";

interface TwoCheckBoxProps {
  label: string;
  type1: string;
  type1Text: string;
  type2: string;
  type2Text: string;
}

export function TwoCheckBox({ label, type1, type1Text, type2, type2Text }: TwoCheckBoxProps) {
  const [selectedCheck, setSelectedCheck] = useState(type1);

  const handleCheckboxChange = () => {
    setSelectedCheck((prevGender) => (prevGender === type1 ? type2 : type1));
  };
  return (
    <div className={styles.twocheck_container}>
      <div className={styles.input_text}>{label}</div>
      <div className={styles.twocheck_box}>
        <div>
          <Checkbox
            checked={selectedCheck === type1}
            onChange={handleCheckboxChange}
            name="type1"
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            sx={{
              "&.Mui-checked": {
                color: "#2F3036",
              },
            }}
          />
          <span>{type1Text}</span>
        </div>
        <div className="ml-5 mr-5"></div>
        <div>
          <Checkbox
            checked={selectedCheck === type2}
            onChange={handleCheckboxChange}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            name="type2"
            sx={{
              "&.Mui-checked": {
                color: "#2F3036",
              },
            }}
          />
          <span>{type2Text}</span>
        </div>
      </div>
    </div>
  );
}

// 아침, 점심, 저녁, 취침 전 Check Box
export function DayCheckBox() {
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setSelectedChecks((prev) =>
      prev.includes(name) ? prev.filter((check) => check !== name) : [...prev, name]
    );
    console.log(selectedChecks);
  };
  return (
    <div className={styles.daycheck_container}>
      <div className={styles.daycheck_box}>
        <Checkbox
          checked={selectedChecks.includes("morning")}
          onChange={handleCheckboxChange}
          name="morning"
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          size="small"
          sx={{
            padding: "5px",
            "&.Mui-checked": {
              color: "#2F3036",
            },
          }}
        />
        <span>아침</span>
      </div>
      <div className={styles.daycheck_box}>
        <Checkbox
          checked={selectedChecks.includes("noon")}
          onChange={handleCheckboxChange}
          name="noon"
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          size="small"
          sx={{
            padding: "5px",
            "&.Mui-checked": {
              color: "#2F3036",
            },
          }}
        />
        <span>점심</span>
      </div>
      <div className={styles.daycheck_box}>
        <Checkbox
          checked={selectedChecks.includes("evening")}
          onChange={handleCheckboxChange}
          name="evening"
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          size="small"
          sx={{
            padding: "5px",
            "&.Mui-checked": {
              color: "#2F3036",
            },
          }}
        />
        <span>저녁</span>
      </div>
      <div className={styles.daycheck_box}>
        <Checkbox
          checked={selectedChecks.includes("beforeBed")}
          onChange={handleCheckboxChange}
          name="beforeBed"
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
          size="small"
          sx={{
            padding: "5px",
            "&.Mui-checked": {
              color: "#2F3036",
            },
          }}
        />
        <span>취침 전</span>
      </div>
    </div>
  );
}

// 시간 Input Box
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export function TimeInputBox({ label }: { label: string }) {
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const handleTimeChange = (time: Dayjs | null) => {
    setSelectedTime(time);
    console.log(time);
  };
  const StyledTimePicker = styled(TimePicker)({
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

  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <StyledTimePicker
          format="A hh:mm"
          minutesStep={1}
          sx={{
            width: "100%",
          }}
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </LocalizationProvider>
    </div>
  );
}

// 자주 사용하는 button
interface FrequentButtonProps {
  title: string;
  backgroundColor: string;
  onClick: () => void;
}
export function FrequentButton({ title, backgroundColor, onClick }: FrequentButtonProps) {
  return (
    <div
      className={styles.frequent_button}
      style={{ backgroundColor: backgroundColor }}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

// 기본적인 Modal
import { Modal } from "@mui/material";

interface BasicModalProps {
  open: boolean;
  handleModalClose: () => void;
  width: string;
  height: string;
  children: ReactElement;
}

export function BasicModal({ open, handleModalClose, width, height, children }: BasicModalProps) {
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
    >
      <div className={styles.modal_container} style={{ width: width, height: height }}>
        {children}
      </div>
    </Modal>
  );
}
