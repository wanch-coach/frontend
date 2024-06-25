import styles from "./Drug.module.css";
import Image from "next/image";

interface DrugBoxProps {
  title: string;
  category: string;
}
export default function DrugBox({ title, category }: DrugBoxProps) {
  return (
    <div className={styles.drug_box}>
      <div className={styles.drug_box_image}>
        <Image src={"/logo.png"} alt="완치코치 로고" fill style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.drug_box_title}>{title}</div>
      <div className={styles.drug_box_category}>{category}</div>
    </div>
  );
}
