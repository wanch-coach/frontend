import { Dayjs } from "dayjs";
import fetchWithAuth from "../fetchWithAuth";

interface FamilyCreateData {
  name: string;
  birthDate: Dayjs | null;
  imageFileName: string;
  gender: string;
  color: string;
}
export async function FamilyCreateController(formData: FamilyCreateData) {
  try {
    const url = "/family";
    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify(formData), // formData를 JSON 문자열로 변환하여 전송
    });
    console.log("Family Create successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface FamilyListData {
  name: string;
  birthDate: Dayjs | null;
  imageFileName: string;
  gender: string;
  color: string;
}
export async function FamilyListController() {
  try {
    const url = "/family";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    /* 여기서 걸림 */

    console.log("Family List successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
