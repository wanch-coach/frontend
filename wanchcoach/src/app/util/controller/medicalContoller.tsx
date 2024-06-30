import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";

interface MedicalKeywordSearchData{
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
export interface PharmacyResultData{
  pharmacyId: number;
  name: string;
  address: string;
}

export async function MedicalKeywordSearchController(data:MedicalKeywordSearchData){
  try{
    const url = `/medical/detail?keyword=${data.keyword}&lng=${data.lng}&lat=${data.lat}`
    const response = await fetchWithoutAuth(url, {
      method: "GET",
    });
    console.log("keyword search success");
    console.log(response);
    return response;
  } catch(error){
    console.error("error keyowrd search", error);
    throw error;
  }
}