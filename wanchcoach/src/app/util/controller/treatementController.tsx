import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";
// "hospitalId" : 76433,
// 	"familyId" : 1,
// 	"department" : "화공생명공학과",
// 	"date": "2024-06-26T15:30:00",
// 	"taken": false,
// 	"alarm": true,
// 	"symptom": "손이 시려움",
// 	"prescription": null
interface AddTreatmentData{
  hospitalId : number,
  familyId : number,
  department : string,
  date: string,
  taken: boolean,
  alarm: boolean,
  symptom: string,
  prescription: String;
}
export async function AddTreatmentController(formData: AddTreatmentData) {
  try{
    const url = `/treatment`;
    const response = await fetchWithoutAuth(url,{
      method: "POST",
      body: JSON.stringify(formData)
    });
    console.log("addTreatment successful", response);
    return response;
  } catch (error) {
    console.error("Error add Treatment:", error);
    throw error;
  }
}
