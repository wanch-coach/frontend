"use client";

import {
  BasicInputBox,
  DateInputBox,
  FrequentButton,
  Header,
  TwoCheckBox,
} from "@/app/_components/component";
import styles from "./familycreate.module.css";
import { useState } from "react";
import { Dayjs } from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FamilyCreateController } from "@/app/util/controller/familyController";

export default function FamilyCreate() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [gender, setGender] = useState("male");
  const [selectedColor, setSelectedColor] = useState("#FFAE81");
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };
  const handleCreateSubmit = () => {
    /* 가족 추가 API 호출 */
    const data = {
      name: name,
      birthDate: selectedDate,
      imageFileName: "",
      gender: gender,
      color: selectedColor,
    };
    FamilyCreateController(data)
      .then(() => {
        router.push("/mysetting/family");
        return;
      })
      .catch((e) => {
        console.log(e);
        return alert("유효하지 않습니다.");
      });
  };
  return (
    <div className={styles.container}>
      <Header title="가족 추가" />
      <div className={styles.body_container}>
        <div className={styles.create_container}>
          <div className={styles.padding} />
          <div className={styles.create_profile_box}>
            <Image
              src="/basic_profile.png"
              width={110}
              height={110}
              priority
              alt="Picture of the author"
            />
          </div>
          <div className={styles.padding} />
          <BasicInputBox
            type="text"
            label="이름"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.padding} />
          <DateInputBox
            label="생년월일"
            selectedDate={selectedDate}
            handleDateChange={setSelectedDate}
          />

          <div className={styles.padding} />
          <TwoCheckBox
            label="성별"
            type1="male"
            type1Text="남"
            type2="female"
            type2Text="여"
            selectedCheck={gender}
            onChange={setGender}
          />
          <div className={styles.padding} />
          <div className={styles.create_color_container}>
            <div className={styles.create_color_text}>색 고르기</div>
            <ColorSelect selectedColor={selectedColor} handleColorChange={handleColorChange} />
          </div>
          <div className={styles.padding} />
          <FrequentButton
            title="가족 추가"
            backgroundColor="#0A6847"
            onClick={handleCreateSubmit}
          />
        </div>
      </div>
    </div>
  );
}

interface ColorSelectProps {
  selectedColor: string;
  handleColorChange: (color: string) => void;
}

function ColorSelect({ selectedColor, handleColorChange }: ColorSelectProps) {
  const colors = ["#FFAE81", "#C2D2CE", "#C4D2C2", "#CDC2D2", "#EEF089"];
  return (
    <div className={styles.create_color_box}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={styles.create_color_prop}
          style={{
            backgroundColor: color,
            border: selectedColor === color ? "2px solid #757575" : "",
          }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  );
}
