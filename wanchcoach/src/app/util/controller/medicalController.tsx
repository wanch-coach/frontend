import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";

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

interface OpeningHourData {
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
