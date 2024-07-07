import fetchFormData from "../fetchFormData";
import fetchWithAuth from "../fetchWithAuth";

export async function AddTreatmentController(formData: FormData) {
  try {
    const url = `/treatment`;
    const response = await fetchFormData(url, {
      method: "POST",
      body: formData,
    });
    console.log("addTreatment successful", response);
    return response;
  } catch (error) {
    console.error("Error add Treatment:", error);
    throw error;
  }
}

export interface PrescriptionData {
  familyId: number;
  pharmacyId: number;
  morning: boolean;
  noon: boolean;
  evening: boolean;
  beforeBed: boolean;
  prescribedDrugs: PrescriptionDrugData[];
}

export interface PrescriptionDrugData {
  drugId: number;
  quantity: number;
  frequency: number;
  day: number;
  direction: string;
}

export interface TreatmentTotalItems {
  upcoming: TreatmentItems[];
  past: TreatmentItems[];
}
export interface TreatmentItems {
  id: number;
  familyId: number;
  familyName: string;
  familyColor: string;
  hospitalId: number;
  hospitalName: string;
  prescriptionId: null;
  department: string;
  date: string;
  taken: boolean;
  alarm: boolean;
  symptom: string;
}

export async function TreatmentTotalController() {
  try {
    const url = "/treatment";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Treatment Total successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface TreatmentHospital {
  treatmentHospitalItems: TreatmentHospitalItems;
}

export interface TreatmentHospitalItems {
  hospitalId: number;
  hospitalName: string;
  treatmentItems: TreatmentItems[];
}

export async function TreatmentHospitalController(): Promise<{
  data: { treatmentHospitalItems: TreatmentHospitalItems[] };
}> {
  try {
    const url = "/treatment/hospitals";
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Hospital Total successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

interface TreatmentCalendarData {
  familyId: number;
  year: number;
  month: number;
}
export interface TreatmentCalendar {
  treatmentDateItems: TreatmentCalendarItems[];
}
export interface TreatmentCalendarItems {
  date: string;
  treatmentItems: TreatmentItems[];
}
export async function TreatmentCalendarController(data: TreatmentCalendarData) {
  try {
    const url = `/treatment/date/families/${data.familyId}?year=${data.year}&month=${data.month}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("treatment Calendar Total successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

interface TreatmentTotalDayData {
  year: number;
  month: number;
  day: number;
}

export async function TreatmentTotalDayController(data: TreatmentTotalDayData) {
  try {
    const url = `/treatment/date?year=${data.year}&month=${data.month}&day=${data.day}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Treatment day successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export async function OCRAddPrescriptionController(formData: FormData) {
  try {
    const url = `/treatment/prescription-info`;
    const response = await fetchFormData(url, {
      method: "POST",
      body: formData,
    });
    console.log("addOCRTreatment successful", response);
    return response;
  } catch (error) {
    console.error("Error add Treatment:", error);
    throw error;
  }
}
