import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetchWithoutAuth";
import Cookies from "js-cookie";
import fetchWithAuth from "../fetchWithAuth";

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
    console.log(response.data.accessToken);
    Cookies.set("accessToken", response.data.accessToken);
    console.log("Signin successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error sign in:", error);
    throw error; // 오류 처리
  }
}

export async function LogoutController(formData: LoginData) {
  try {
    const url = `/member/logout`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    console.log("Logout successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}
