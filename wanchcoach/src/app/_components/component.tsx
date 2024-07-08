"use client";

import {
  ReactElement,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import styles from "./component.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

// 새창에 있는 헤더
interface HeaderProps {
  title: string;
  right?: boolean;
  like?: boolean;
  handleLikeChange?: () => void;
}
export function Header({ title, right, like, handleLikeChange }: HeaderProps) {
  const router = useRouter();
  const truncateTitle = (str: string, num: number) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <div className={styles.header}>
      <span className={styles.header_backicon} onClick={() => router.back()}>
        <IoMdArrowBack size="30px" />
      </span>
      <span className={styles.header_text}>{title}</span>
      <span className={styles.header_staricon} onClick={handleLikeChange}>
        {right ? (
          like ? (
            <FaStar size="23px" color="#FFE500" />
          ) : (
            <CiStar size="23px" color="#DDDDDD" />
          )
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

// 일반적인 Input Box
interface BasicInputBoxProps {
  type: string;
  label?: string;
  placeholder: string;
  disabledInput?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  disabledButton?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export function BasicInputBox({
  type,
  label,
  placeholder,
  disabledInput,
  showButton,
  buttonLabel,
  disabledButton,
  value,
  onChange,
  onClick,
}: BasicInputBoxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <div className={styles.input_container}>
        <input
          className={styles.input_box}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabledInput}
          style={{ color: disabledInput ? "#DDDDDD" : "#000000" }}
        />
        {showButton && (
          <button
            className={styles.input_button}
            onClick={onClick}
            style={{ backgroundColor: disabledButton ? "#545454" : "#f3ca52" }}
            disabled={disabledButton}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// List 생성 Input Box
interface ListInputBoxProps {
  type: string;
  label?: string;
  placeholder: string;
  disabledInput?: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  drugsData: (input: string) => SimpleDrugData[];
  drugSearching: boolean;
  handleDrugValueSubmit: (index: number, drug: SimpleDrugData) => void;
  prescriptionIndex: number;
}

export function ListInputBox({
  type,
  label,
  placeholder,
  disabledInput,
  value,
  onChange,
  drugsData,
  drugSearching,
  handleDrugValueSubmit,
  prescriptionIndex,
}: ListInputBoxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <div className={styles.input_container}>
        <input
          className={styles.input_box}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabledInput}
          style={{ color: disabledInput ? "#DDDDDD" : "#000000" }}
        />
      </div>
      <div className={styles.input_suggestion_container}>
        <ul className={styles.input_suggestion_list}>
          {value &&
            drugSearching &&
            drugsData(value).map((drug, index) => (
              <li
                key={index}
                className={styles.input_suggestion_text}
                onClick={() => handleDrugValueSubmit(prescriptionIndex, drug)}
              >
                {drug.itemName}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

// 모달 이용해서 찾는 Input Box
import { IoMdSearch } from "react-icons/io";

interface HospitalModalInputBoxProps {
  label: string;
  placeholder: string;
  value: MedicalKeywordResultData;
  handleHospitalChange: (result: MedicalKeywordResultData) => void;
  isButtonDisabled?: boolean;
}
export function HospitalModalInputBox({
  label,
  placeholder,
  value,
  handleHospitalChange,
  isButtonDisabled,
}: // handleValueChange,
HospitalModalInputBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [fixedKeyword, setFixedKeyword] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setKeywordSearchResponse] = useState<MedicalKeywordResultData[]>([]);

  const handleModalOpen = () => {
    setKeywordSearchResponse([]);
    setKeyword("");
    setSearching(false);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleSearch = () => {
    const data = {
      keyword: keyword,
      lng: 127.0851566,
      lat: 37.48813256,
    };
    MedicalKeywordSearchController(data)
      .then((response) => {
        setFixedKeyword(keyword);
        setSearching(true);
        setKeywordSearchResponse(response.data.hospitals);
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const selectHospital = (result: MedicalKeywordResultData) => {
    handleHospitalChange(result);
    handleModalClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작을 막음 (필요한 경우)
      handleSearch();
    }
  };
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
            value={value?.name}
            onChange={() => handleHospitalChange}
          />
          <button
            className={styles.modal_input_button}
            onClick={handleModalOpen}
            disabled={isButtonDisabled}
          >
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
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.modal_input_button} onClick={handleSearch}>
              <IoMdSearch size={"25px"} color="#0A6847" />
            </button>
          </div>
          {searching ? (
            <>
              <div className="pt-4">
                * {fixedKeyword}으로 검색한 결과 ({searchResult.length})
              </div>
              <div className="pt-2">
                <hr className={styles.search_modal_headline} />
                <div className={styles.search_modal_content}>
                  {searchResult.map((result, index) => (
                    <div
                      key={index}
                      className={styles.search_modal_box}
                      onClick={() => selectHospital(result)}
                    >
                      <div>
                        <span className={styles.search_modal_text_01}>{result.name}</span>
                        <span className={styles.search_modal_text_02}>{result.type}</span>
                      </div>
                      <div className={styles.search_modal_text_03}>{result.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4">* {label}으로 검색하세요.</div>
          )}
        </div>
      </BasicModal>
    </>
  );
}
//--------------------------------------------약국 모달
interface PharmacyModalInputBoxProps {
  label: string;
  placeholder: string;
  value: PharmacyResultData;
  handlePharmacyChange: (result: PharmacyResultData) => void;
}
export function PharmacyModalInputBox({
  label,
  placeholder,
  value,
  handlePharmacyChange,
}: PharmacyModalInputBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [fixedKeyword, setFixedKeyword] = useState<string>("");
  const [searchResult, setKeywordSearchResponse] = useState<PharmacyResultData[]>([]);

  const handleModalOpen = () => {
    setKeywordSearchResponse([]);
    setKeyword("");
    setSearching(false);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);
  const handleSearch = () => {
    const data = {
      keyword: keyword,
      lng: 127.0851566,
      lat: 37.48813256,
    };
    MedicalKeywordSearchController(data)
      .then((response) => {
        setFixedKeyword(keyword);
        setSearching(true);
        setKeywordSearchResponse(response.data.pharmacies);
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const selectPharmacy = (result: PharmacyResultData) => {
    handlePharmacyChange(result);
    handleModalClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작을 막음 (필요한 경우)
      handleSearch();
    }
  };

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
            value={value?.name}
            onChange={() => handlePharmacyChange}
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
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <button className={styles.modal_input_button} onClick={handleSearch}>
              <IoMdSearch size={"25px"} color="#0A6847" />
            </button>
          </div>
          {searching ? (
            <>
              <div className="pt-4">
                * {fixedKeyword}으로 검색한 결과 ({searchResult.length})
              </div>
              <div className="pt-2">
                <hr className={styles.search_modal_headline} />
                <div className={styles.search_modal_content}>
                  {searchResult.map((result, index) => (
                    <div
                      key={index}
                      className={styles.search_modal_box}
                      onClick={() => selectPharmacy(result)}
                    >
                      <div>
                        <span className={styles.search_modal_text_01}>{result.name}</span>
                        <span className={styles.search_modal_text_02}>{result.type}</span>
                      </div>
                      <div className={styles.search_modal_text_03}>{result.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4">* {label}으로 검색하세요.</div>
          )}
        </div>
      </BasicModal>
    </>
  );
}

interface SelectInputbox {
  label: string;
  handleVisitorChange: (selectedFamily: FamilySummaryListData) => void;
  value: FamilySummaryListData;
  firstName?: string | undefined;
  isDisabled?: boolean;
}
// 가족 Select box
export function SelectInputbox({
  label,
  handleVisitorChange,
  value,
  firstName,
  isDisabled,
}: SelectInputbox) {
  const [selectedValue, setSelectedValue] = useState<string>(firstName || "none");
  const [searchResult, setSearchResult] = useState<FamilySummaryListData[]>([]);
  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedValue(event.target.value);
  // };
  const handleSearch = () => {
    FamilySummaryListController()
      .then((response) => {
        setSearchResult(response.data);
        return console.log("가족 리스트 검색 완료");
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);

    const selectedFamily = searchResult.find((family) => family.name == selectedValue);
    if (selectedFamily) {
      handleVisitorChange(selectedFamily);
    }
  };
  // const selectVisitor = (family : FamilySummaryListData) => {
  //   console.log("===================================")
  //   alert(family);
  // }
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <select
        name=""
        id=""
        className={`${styles.input_box} ${styles.select_box}`}
        value={selectedValue}
        onChange={handleSelectChange}
        onClick={handleSearch}
        style={{ color: selectedValue === "none" ? "#8F9098" : "black" }}
        disabled={isDisabled}
      >
        <option value="none" hidden>
          {isDisabled ? firstName : "가족"}
        </option>
        {searchResult.map((family) => (
          <option key={family.familyId} value={family.name} className={styles.default_text}>
            {family.name}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextAreaInputboxProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
}

// TextArea Input box
export function TextAreaInputbox({ label, value, onChange, isDisabled }: TextAreaInputboxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <textarea
        className={styles.input_area_box}
        value={value}
        onChange={onChange}
        placeholder="내용을 입력하세요"
        disabled={isDisabled}
      />
    </div>
  );
}

// 숫자 선택 Select Box
interface NumberSelectInputboxProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export function NumberSelectInputbox({ label, value, onChange }: NumberSelectInputboxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <select
        name=""
        id=""
        className={`${styles.number_input_box} ${styles.select_box}`}
        value={value.toString()}
        onChange={onChange}
        style={{ color: value === 0 ? "#8F9098" : "black" }}
      >
        <option value="0" hidden>
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
  rightLabel?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function NumberInputbox({
  label,
  placeholder,
  rightLabel,
  value,
  onChange,
}: NumberInputboxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <div className={styles.input_container}>
        <input
          className={styles.input_box}
          style={{ width: "18vw", height: "45px", textAlign: "center" }}
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span className={styles.number_input_text}>{rightLabel}</span>
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

interface DateInputBoxProps {
  label?: string;
  selectedDate?: Dayjs | null;
  handleDateChange?: Dispatch<SetStateAction<Dayjs | null>>;
  small?: boolean;
  future?: boolean;
  isDisabled?: boolean;
}

export function DateInputBox({
  label,
  selectedDate,
  handleDateChange,
  small,
  future,
  isDisabled,
}: DateInputBoxProps) {
  const currentDate = dayjs();
  const StyledDatePicker = styled(DatePicker)({
    "& .MuiInputBase-root": {
      backgroundColor: "white",
      borderRadius: "10px",
      height: small ? "35px" : "50px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#C5C6CC", // 테두리 색상
        borderRadius: "10px",
      },
    },
    "& .MuiInputBase-input": {
      padding: small ? "10px" : "15px",
      paddingTop: 0,
      paddingBottom: 0,
      fontSize: small ? "13px" : "16px",
    },
  });

  return (
    <div className={small ? "" : "mt-3"}>
      <div className={styles.input_text}>{label}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <StyledDatePicker
          value={selectedDate}
          onChange={(date: Dayjs | null) => {
            if (handleDateChange) {
              handleDateChange(date); // handleDateChange가 정의된 경우 호출
            }
          }}
          disabled={isDisabled}
          format="YYYY-MM-DD"
          showDaysOutsideCurrentMonth
          views={["year", "month", "day"]}
          sx={{
            width: small ? "90%" : "100%",
          }}
          slotProps={{ toolbar: { hidden: true } }}
          shouldDisableDate={(day) => {
            return future
              ? dayjs(day as Dayjs).isBefore(currentDate, "day")
              : dayjs(day as Dayjs).isAfter(currentDate, "day");
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
  selectedCheck: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export function TwoCheckBox({
  label,
  type1,
  type1Text,
  type2,
  type2Text,
  selectedCheck,
  onChange,
}: TwoCheckBoxProps) {
  const handleCheckboxChange = () => {
    onChange((prevGender) => (prevGender === type1 ? type2 : type1));
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
interface DayCheckBoxProps {
  selectedChecks: boolean[];
  handleCheckboxChange: (index: number, isChecked: boolean) => void;
}
export function DayCheckBox({ selectedChecks, handleCheckboxChange }: DayCheckBoxProps) {
  // const [selectedChecks, setSelectedChecks] = useState<string[]>([]);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name } = event.target;
  //   setSelectedChecks((prev) =>
  //     prev.includes(name) ? prev.filter((check) => check !== name) : [...prev, name]
  //   );
  //   console.log(selectedChecks);
  // };
  const handleCheckChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    handleCheckboxChange(index, event.target.checked);
  };
  return (
    <div className="mt-4">
      <div className={styles.input_text}>복용 시간</div>
      <div className={styles.daycheck_container}>
        {["아침", "점심", "저녁", "취침 전"].map((label, index) => (
          <div className={styles.daycheck_box} key={index}>
            <Checkbox
              checked={selectedChecks[index]}
              onChange={handleCheckChange(index)}
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
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 시간 Input Box
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimeInputBoxProps {
  label: string;
  selectedTime?: Dayjs | null;
  handleTimeChange?: Dispatch<SetStateAction<Dayjs | null>>;
  isDisabled?: boolean;
}
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

export function TimeInputBox({
  label,
  selectedTime,
  handleTimeChange,
  isDisabled,
}: TimeInputBoxProps) {
  return (
    <div className="mt-3">
      <div className={styles.input_text}>{label}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <StyledTimePicker
          format="A hh:mm"
          ampm={false}
          minutesStep={10}
          disabled={isDisabled}
          sx={{
            width: "100%",
          }}
          value={selectedTime}
          onChange={(time: Dayjs | null) => {
            if (handleTimeChange) {
              handleTimeChange(time);
            }
          }}
          slotProps={{ textField: { placeholder: "--:--" } }}
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
  small?: boolean;
}
export function FrequentButton({ title, backgroundColor, onClick, small }: FrequentButtonProps) {
  return (
    <div
      className={styles.frequent_button}
      style={{ backgroundColor: backgroundColor, margin: small ? "2vh 40%" : "2vh 20%" }}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

// 기본적인 Modal
import { Modal } from "@mui/material";

import {
  FamilySummaryListController,
  FamilySummaryListData,
} from "../util/controller/familyController";
import {
  MedicalKeywordResultData,
  MedicalKeywordSearchController,
  PharmacyResultData,
} from "../util/controller/medicalController";
import { DrugData, SimpleDrugData } from "../util/controller/drugController";

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
