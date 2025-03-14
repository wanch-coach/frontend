import { Dayjs } from "dayjs";
import fetchWithAuth from "../fetch/fetchWithAuth";
import { SetStateAction } from "react";
import Cookies from "js-cookie";

interface FamilyCreateData {
  name: string;
  birthDate: string;
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
  familyId: number;
  name: string;
  birthDate: Dayjs | null;
  imageFileName: string;
  gender: string;
  color: string;
}
export async function FamilyListController() {
  try {
    const url = "/family/familiesinfo";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    console.log("Family List successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface FamilySummaryListData {
  familyId: number;
  name: string;
  color: string;
}
export async function FamilySummaryListController() {
  try {
    const url = "/family";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    console.log("Family List successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export async function FamilyDetailController(familyId: number) {
  try {
    const url = `/family/${familyId}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Family detail successful:", response.data);
    return response;
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

// FindMyFamilyIdController() : 초기 사용자의 가족 id 저장 컨트롤러
export async function FindMyFamilyIdController() {
  try {
    const url = "/family/findmyfamilyid";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    Cookies.set("myFamilyId", response.data);
    return response;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
}
