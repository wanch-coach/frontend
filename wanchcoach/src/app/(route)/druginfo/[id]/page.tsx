"use client";

import { Header } from "@/app/_components/component";
import styles from "./druginfo.module.css";
import Image from "next/image";
import { useState } from "react";

export default function DrugInfo({ params }: { params: { id: string } }) {
  const [like, setLike] = useState(false);
  const handleLikeChange = () => {
    /* 좋아요 눌렀을 때 혹은 취소했을 때 */
    setLike((prevLike) => !prevLike);
  };
  return (
    <div className={styles.container}>
      <Header title="타이레놀 정" right like={like} handleLikeChange={handleLikeChange} />
      <div className={styles.body_container}>
        <div className={styles.druginfo_body_container}>
          <div className={styles.druginfo_image_container}>
            <Image src="/logo.png" width={200} height={200} alt="Picture of the author" />
          </div>
          <DrugInfoDetailBox number="1" title="약품 명" content="타이레놀" />
          <DrugInfoDetailBox number="2" title="분류" content="타이레놀" />
          <DrugInfoDetailBox number="3" title="제조원" content="타이레놀" />
          <DrugInfoDetailBox number="4" title="보관 및 유통기한" content="타이레놀" />
          <DrugInfoDetailBox number="5" title="효능효과" content="타이레놀" />
          <DrugInfoDetailBox number="6" title="용법용량" content="타이레놀" />
          <DrugInfoDetailBox number="7" title="사용 상의 주의사항" content="타이레놀" />
        </div>
      </div>
    </div>
  );
}

interface DrugInfoDetailBoxProps {
  number: string;
  title: string;
  content: string;
}
function DrugInfoDetailBox({ number, title, content }: DrugInfoDetailBoxProps) {
  return (
    <div className={styles.druginfo_title_box}>
      <div className={styles.druginfo_title}>
        <div className={styles.druginfo_title_number}>{number}</div>
        <div className={styles.druginfo_title_text}>{title}</div>
      </div>
      <div className={styles.druginfo_content}>{content}</div>
    </div>
  );
}
