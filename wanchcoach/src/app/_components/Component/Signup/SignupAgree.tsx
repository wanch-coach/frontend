import styles from "./Signup.module.css";
import { Checkbox } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface SignupAgree {
  agree1: boolean;
  agree2: boolean;
  agreeAll: boolean;
  handleAgreeChange: (type: string, checked: boolean) => void;
}

export default function SignupAgree({ agree1, agree2, agreeAll, handleAgreeChange }: SignupAgree) {
  return (
    <>
      <div>
        <Checkbox
          checked={agree1}
          onChange={(e) => handleAgreeChange("agree1", e.target.checked)}
          icon={<CheckIcon sx={{ fontSize: 20 }} />}
          checkedIcon={<CheckIcon sx={{ fontSize: 20, color: "green" }} />}
        />
        <span>[필수] 완치코치 서비스 이용 약관</span>
      </div>
      <div>
        <Checkbox
          checked={agree2}
          onChange={(e) => handleAgreeChange("agree2", e.target.checked)}
          icon={<CheckIcon sx={{ fontSize: 20 }} />}
          checkedIcon={<CheckIcon sx={{ fontSize: 20, color: "green" }} />}
        />
        <span>[필수] 개인정보 수집 및 이용에 대한 동의</span>
      </div>
      <hr />
      <div className={styles.agree_box}>
        <Checkbox
          checked={agreeAll}
          onChange={(e) => handleAgreeChange("all", e.target.checked)}
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleOutlineIcon sx={{ color: "green" }} />}
        />
        <span>전체 동의</span>
      </div>
    </>
  );
}
