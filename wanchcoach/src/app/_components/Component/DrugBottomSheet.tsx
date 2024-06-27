import styles from "./Component.module.css";
import { ReactNode, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

interface DrugBottomSheetProps {
  children: ReactNode;
  open: boolean;
  handleBottomSheetChange: () => void;
}
export default function DrugBottomSheet({
  children,
  open,
  handleBottomSheetChange,
}: DrugBottomSheetProps) {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 높이 설정

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initialY = windowHeight - 170;
  const startY = 200;

  const [{ y }, api] = useSpring(
    () => ({
      y: open ? startY : initialY,
      config: { tension: 300, friction: 30 },
    }),
    [open, initialY]
  );

  useEffect(() => {
    if (open) {
      api.start({ y: startY });
    } else {
      api.start({ y: initialY });
    }
  }, [open, initialY, api]);

  const bind = useDrag(
    ({ down, movement: [, my], direction: [, dy], velocity, memo = y.get() }) => {
      const trigger = Math.abs(my) > initialY / 2;
      if (!down && trigger) {
        api.start({ y: dy > startY ? initialY : startY });
        handleBottomSheetChange();
      } else {
        api.start({ y: down ? memo + my : open ? startY : initialY });
      }
      return memo;
    }
  );
  if (windowHeight === 0) {
    return null;
  }
  return (
    <>
      {open && <div className={styles.overlay} onClick={handleBottomSheetChange} />}
      <animated.div
        className={styles.drugbottomsheet_container}
        style={{ transform: y.to((y) => `translateY(${y}px)`) }}
        {...bind()}
      >
        <div className={styles.bottomsheet_header} {...bind()}>
          <hr className={styles.bottomsheet_header_line} />
        </div>
        {children}
      </animated.div>
    </>
  );
}
