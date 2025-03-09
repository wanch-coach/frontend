import { Dayjs } from "dayjs";
import fetchWithoutAuth from "../fetch/fetchWithoutAuth";
import Cookies from "js-cookie";
import fetchWithAuth from "../fetch/fetchWithAuth";
import { stringify } from "querystring";

interface SignupData {
  loginId: string;
  pwd: string;
  name: string;
  email: string;
  birthDate: string;
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

interface NaverSignupData {
  code: string;
}
export async function NaverLoginController(formData: NaverSignupData) {
  try {
    const url = `/login/oauth2/code/naver`;
    const response = await fetchWithoutAuth(url, {
      method: "POST",
      body: JSON.stringify(formData), // formData를 JSON 문자열로 변환하여 전송
    });
    console.log("naverlogin successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error naver login:", error);
    throw error; // 오류 처리
  }
}

interface KakaoSignupData {
  code: string;
}
export async function KakaoLoginController(formData: KakaoSignupData) {
  try {
    const url = `/login/oauth2/code/kakao`;
    const response = await fetchWithoutAuth(url, {
      method: "POST",
      body: JSON.stringify(formData), // formData를 JSON 문자열로 변환하여 전송
    });
    console.log("kakaologin successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error naver login:", error);
    throw error; // 오류 처리
  }
}

export async function LogoutController() {
  try {
    const url = `/member/signout`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    Cookies.remove("myFamilyId");
    console.log("Logout successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}

export interface MyPageData {
  loginId: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  phoneNumber: string;
}

export async function MyPageInfoController() {
  try {
    const url = `/member/memberInfo`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });

    console.log("My page successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}

interface SendSMS {
  phoneNumber: string;
}
export async function SendSMSController(data: SendSMS) {
  try {
    const url = `/member/sendsms?phoneNumber=${data.phoneNumber}`;
    const response = await fetchWithoutAuth(url, {
      method: "GET",
    });
    console.log("sendSMS successful", response);
    return response;
  } catch (error) {
    alert("sms 전송에 실패하였습니다.");
    throw error;
  }
}
interface IdCheck {
  loginId: String;
}
export async function IdCheckController(data: IdCheck) {
  try {
    const url = `/member/idcheck/${data.loginId}`;
    const response = await fetchWithoutAuth(url, {
      method: "GET",
    });
    console.log("idcheck successful", response);

    if (response.data) alert("가입 가능한 아이디입니다.");
    else alert("이미 존재하는 아이디입니다.");
    return response;
  } catch (error) {
    alert("idcheck failed");
    throw error;
  }
}

export async function updateAlarmController(deviceToken: string) {
  try {
    const url = `/member/update-device`;
    const response = await fetchWithAuth(url, {
      method: "PATCH",
      body: JSON.stringify(deviceToken),
    });
    console.log("update device Token successful:", response);
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}

export async function updateAlarmPermissionController() {
  try {
    const url = `/member/alarm-permission`;
    const response = await fetchWithAuth(url, {
      method: "POST",
    });
    console.log("update alarm-permission successful:", response);
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}

// interface AlarmTimeData {
//   morning: Dayjs | null;
//   noon: Dayjs | null;
//   evening: Dayjs | null;
//   beforeBed: Dayjs | null;
// }
interface AlarmTimeData {
  morning: string | undefined;
  noon: string | undefined;
  evening: string | undefined;
  beforeBed: string | undefined;
}

export async function AlarmTimeUpdateController(data: AlarmTimeData) {
  try {
    const url = `/member/alarm`;
    const response = await fetchWithAuth(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    console.log("update alarm Time successful:", response);
    return response;
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}

export async function AlarmTimeListController() {
  try {
    const url = `/member/alarm`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("alarm Time list successful:", response);
    return response;
  } catch (error) {
    console.error("Error logout:", error);
    throw error; // 오류 처리
  }
}
