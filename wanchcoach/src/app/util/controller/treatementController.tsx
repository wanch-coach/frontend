import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";
import fetchFormData from "../fetchFormData";
// "hospitalId" : 76433,
// 	"familyId" : 1,
// 	"department" : "화공생명공학과",
// 	"date": "2024-06-26T15:30:00",
// 	"taken": false,
// 	"alarm": true,
// 	"symptom": "손이 시려움",
// 	"prescription": null
export async function AddTreatmentController(formData: FormData) {
  try{
    const url = `/treatment`;
    const response = await fetchFormData(url,{
      method: "POST",
      body: formData
    });
    console.log("addTreatment successful", response);
    return response;
  } catch (error) {
    console.error("Error add Treatment:", error);
    throw error;
  }
}
