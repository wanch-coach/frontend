import { Dayjs } from "dayjs";
import fetchWithAuth from "../fetch/fetchWithAuth";

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
  prescriptionId: number;
  hospitalName: string;
  department: string;
  remains: number;
  alarm: boolean;
  drugs: DrugData[];
}
export interface DrugTakeData {
  unTaken: PrescriptionData[];
  taken: PrescriptionData[];
}
export interface TodayTakeData {
  familyId: number;
  familyColor: string;
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
    console.log("Day successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface DrugRecordData {
  drugId: number;
  itemName: string;
  drugImage: string;
  prductType: string;
}

export interface PrescriptionRecordData {
  hospitalId: number;
  hospitalName: string;
  department: string;
  start: string;
  drugs: DrugRecordData[];
}

export interface DrugRecordsData {
  taking: PrescriptionRecordData[];
  end: PrescriptionRecordData[];
  familyColor: string;
}

export async function MedicationRecordController(data: { familyId: number }) {
  try {
    const url = `/medication/records/families/${data.familyId}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Record successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

interface MedicationCalendarData {
  familyId: number;
  year: number;
  month: number;
}
export interface DrugCalendarData {
  year: number;
  month: number;
  records: DrugDayCalendarData[];
}
export interface DrugDayCalendarData {
  day: number;
  morning: PrescriptionCalendarData[];
  noon: PrescriptionCalendarData[];
  evening: PrescriptionCalendarData[];
  befordBed: PrescriptionCalendarData[];
}
interface PrescriptionCalendarData {
  hospitalId: number;
  hospitalName: string;
  department: string;
  prescriptionId: number;
  start: string;
  drugs: DrugRecordData[];
}
export async function MedicationCalendarController(data: MedicationCalendarData) {
  try {
    const url = `/medication/families/${data.familyId}/year/${data.year}/month/${data.month}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Calendar successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

interface MedicationMyDrug {
  familyId: number;
  startDate: string | undefined;
  endDate: string | undefined;
}
export interface MyDrugInfoData {
  drugInfo: MyDrugInfoPropsData;
  records: MyDrugRecordData[];
}
interface MyDrugInfoPropsData {
  drugId: number;
  itemName: string;
  drugImage: string;
  prductType: string;
}
interface MyDrugRecordData {
  takenTime: string;
}

export async function MedicationMyDrugController(data: MedicationMyDrug) {
  try {
    const url = `/medication/pills/families/${data.familyId}?start-date=${data.startDate}&end-date=${data.endDate}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("My Drug successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

interface MedicationEatData {
  prescriptionId: number;
  familyId: number;
  time: string;
  takenDate: string;
}

export async function MedicationEatController(data: MedicationEatData) {
  try {
    const url = `/medication/taken/${data.prescriptionId}`;
    const response = await fetchWithAuth(url, {
      method: "POST",
      body: JSON.stringify({ familyId: data.familyId, time: data.time, takenDate: data.takenDate }),
    });
    console.log("Eat successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export async function MedicationAlarmChangeController(prescriptionId: number) {
  try {
    const url = `/medication/alarm/${prescriptionId}`;
    const response = await fetchWithAuth(url, {
      method: "PATCH",
    });
    console.log("Alarm Change successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface TodayMedicationData {
  morning: TodayPrescriptionData[];
  noon: TodayPrescriptionData[];
  evening: TodayPrescriptionData[];
  beforeBed: TodayPrescriptionData[];
}

export interface TodayPrescriptionData {
  familyColor: String;
  familyId: number;
  familyName: string;
  hospitalName: string;
  department: string;
}

export async function TodayMedicationController() {
  try {
    const url = `/medication/today`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Today Medication successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
