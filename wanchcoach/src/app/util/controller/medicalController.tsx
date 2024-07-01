import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";

interface MedicalKeywordSearchData {
  keyword: string;
  lng: string;
  lat: string;
}
export interface MedicalKeywordResultData {
  hospitalId: number;
  name: string;
  type: string;
  address: string;
}
export interface PharmacyResultData {
  pharmacyId: number;
  name: string;
  address: string;
}

export interface HospitalDetailData {
  hospitalId: number;
  name: string;
  type: string;
  address: string;
  phoneNumber: string;
  distance: number;
  latitude: number;
  longitude: number;
  openingHour: OpeningHourData[];
}

export interface PharmacyDetailData {
  pharmacyId: number;
  name: string;
  address: string;
  phoneNumber: string;
  distance: number;
  latitude: number;
  longitude: number;
  openingHour: OpeningHourData[];
}

export interface OpeningHourData {
  dayOfWeek: number;
  startTime: Dayjs;
  endTime: Dayjs;
}

export interface LocationData {
  lat: number;
  lng: number;
}

interface queryData {
  medicalId: number;
  location: LocationData;
}

interface MedicalKeywordSearchData {
  keyword: string;
  lng: string;
  lat: string;
}
export interface MedicalKeywordResultData {
  hospitalId: number;
  name: string;
  type: string;
  address: string;
}
export interface PharmacyResultData {
  pharmacyId: number;
  name: string;
  address: string;
}

export async function NearbyMedicalController(data: LocationData) {
  try {
    const url = `/medical/location-search?lng=${data.lng}&lat=${data.lat}`;
    const response = await fetchWithoutAuth(url, {
      method: "GET",
    });
    console.log("find Nearby Medicals successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export async function MedicalKeywordSearchController(data: MedicalKeywordSearchData) {
  try {
    const url = `/medical/detail?keyword=${data.keyword}&lng=${data.lng}&lat=${data.lat}`;
    const response = await fetchWithoutAuth(url, {
      method: "GET",
    });
    console.log("keyword search success");
    console.log(response);
    return response;
  } catch (error) {
    console.error("error keyowrd search", error);
    throw error;
  }
}

export function getDayOfWeekKorean(dayOfWeek: number) {
  switch (dayOfWeek) {
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    case 7:
      return "일";
    case 8:
      return "공휴일";
    default:
      return "";
  }
}
