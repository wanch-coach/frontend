import styles from "./Component.module.css";
import { ReactNode } from "react";
import { useSpring, animated } from "react-spring";

interface BottomSheetProps {
  children: ReactNode;
  open: boolean;
  handleBottomSheetChange: () => void;
}
export default function BottomSheet({ children, open, handleBottomSheetChange }: BottomSheetProps) {
  const animation = useSpring({
    transform: open ? "translateY(0)" : "translateY(100%)",
  });
  return (
    <>
      {open && <div className={styles.overlay} onClick={handleBottomSheetChange} />}
      <animated.div className={styles.bottomsheet_container} style={animation}>
        <div className={styles.bottomsheet_header}>
          <hr className={styles.bottomsheet_header_line} />
        </div>
        {children}
      </animated.div>
    </>
  );
}
