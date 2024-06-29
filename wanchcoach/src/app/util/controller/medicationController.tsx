import fetchWithAuth from "../fetchWithAuth";

interface DayData {
  year: number;
  month: number;
  day: number;
}
export interface DrugData {
  drugId: number;
  itemName: string;
  productType: string;
  drugImage: string;
}
export interface PrescriptionData {
  prescrptionId: number;
  hospitalName: string;
  department: string;
  remaining: number;
  drugs: DrugData[];
}
export interface DrugTakeData {
  unTaken: PrescriptionData[];
  taken: PrescriptionData[];
}
export interface TodayTakeData {
  familyId: number;
  morning: DrugTakeData;
  noon: DrugTakeData;
  evening: DrugTakeData;
  beforeBed: DrugTakeData;
}

export async function MedicationDayController(data: DayData) {
  try {
    const url = `/medication?year=${data.year}&month=${data.month}&day=${data.day}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Signup successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
