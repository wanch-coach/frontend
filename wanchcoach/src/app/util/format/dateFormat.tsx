interface formatDateByKoreanProps {
  getFullYear: () => number;
  getMonth: () => number;
  getDate: () => number;
}

export const formatDateByKorean = (date: formatDateByKoreanProps) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};
