import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";

interface SignupData {
  loginId: string;
  pwd: string;
  name: string;
  email: string;
  birthDate: Dayjs | null;
  gender: string;
  phoneNumber: string;
}

export async function SignupController(formData: SignupData) {
  try {
    const url = `/member/signup`;
    const response = await fetchWithoutAuth(url, {
      method: "POST",
      body: JSON.stringify(formData), // formData를 JSON 문자열로 변환하여 전송
    });
    console.log("Signup successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error signing up:", error);
    throw error; // 오류 처리
  }
}

interface LoginData {
  id: string;
  pwd: string;
}
export async function LoginController(formData: LoginData) {
  try {
    const url = `/member/signin`;
    const response = await fetchWithoutAuth(url, {
      method: "POST",
      body: JSON.stringify(formData), // formData를 JSON 문자열로 변환하여 전송
    });
    Cookies.set("refreshToken", response.data.refreshToken);
    Cookies.set("accessToken", response.data.accessToken);
    console.log("Signin successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error sign in:", error);
    throw error; // 오류 처리
  }
}

interface SendSMS {
  phoneNumber: string;
}
export async function SendSMSController(phoneNumber:string) {
  try{
    const url = `/member/sendsms?phoneNumber=${phoneNumber}`;
    const response = await fetchWithoutAuth(url, {
      method: "GET"
    });
    console.log("sendSMS successful", response);
    return response;
  } catch(error) {
    alert("sms 전송에 실패하였습니다.");
    throw error; 
  }
}
interface IdCheck{
  loginId: String;
}
export async function IdCheckController(loginId:string) {
  try{
    const url = `/member/idcheck/${loginId}`
    const response = await fetchWithoutAuth(url, {
      method: "GET"
    });
    console.log("idcheck successful", response);
    
    if(response.data) alert("가입 가능한 아이디입니다.");
    else alert("이미 존재하는 아이디입니다.");
    return response;
  } catch(error) {
    alert("idcheck failed");
    throw error;
  }
  
}