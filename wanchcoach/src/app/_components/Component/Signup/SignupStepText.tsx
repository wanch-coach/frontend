import styles from "./Signup.module.css";

interface SignupStepTextProps {
  stepText: number;
  title: string;
}

export default function SignupStepText({ stepText, title }: SignupStepTextProps) {
  return (
    <div className={styles.step_text_container}>
      <span className={styles.step_text_01}>Step{stepText}.</span>
      <span className={styles.step_text_02}>{title}</span>
    </div>
  );
}
