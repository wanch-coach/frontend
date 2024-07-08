import styles from "./Component.module.css";
import { ReactNode, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { MdSettingsBackupRestore } from "react-icons/md";

interface DrugBottomSheetProps {
  children: ReactNode;
  open: boolean;
  reSearchButton: boolean;
  handleReSearch: () => void;
  handleBottomSheetChange: () => void;
}
export default function DrugBottomSheet({
  children,
  open,
  reSearchButton,
  handleReSearch,
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
        {reSearchButton ? (
          <div className={styles.drugbottomsheet_re_search}>
            <div className={styles.drugbottomsheet_re_search_button} onClick={handleReSearch}>
              <MdSettingsBackupRestore size="17px" />
              <div className={styles.drugbottomsheet_re_search_text}>현위치에서 재검색</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.drugbottomsheet_body}>
          <div className={styles.bottomsheet_header} {...bind()} onClick={handleBottomSheetChange}>
            <hr className={styles.bottomsheet_header_line} />
          </div>
          {children}
        </div>
      </animated.div>
    </>
  );
}
