import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";

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
    // 응답 데이터 확인
    const data = await response.json();
    console.log("Signup successful:", data);
    return data; // 예시로 데이터 반환
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
    // 응답 데이터 확인
    const data = await response.json();

    console.log("Signin successful:", data);
    return data; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error sign in:", error);
    throw error; // 오류 처리
  }
}
