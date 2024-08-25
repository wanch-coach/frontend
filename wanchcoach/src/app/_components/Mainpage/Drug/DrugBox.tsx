import styles from "./Drug.module.css";
import Image from "next/image";

interface DrugBoxProps {
  drugId?: number;
  drugImage?: string;
  favorite?: number;
  itemName: string;
  prductType: string;
  onClick?: () => void;
}
export default function DrugBox({
  drugId,
  drugImage,
  favorite,
  itemName,
  prductType,
  onClick,
}: DrugBoxProps) {
  return (
    <div className={styles.drug_box} onClick={onClick}>
      <div className={styles.drug_box_image}>
        <Image
          src={drugImage ? `data:image/png;base64,${drugImage}` : "/drug_icon.png"}
          width="100"
          height="10"
          alt="Picture of the author"
        />
      </div>
      <div className={styles.drug_box_title}>{itemName}</div>
      <div className={styles.drug_box_category}>{prductType}</div>
    </div>
  );
}
