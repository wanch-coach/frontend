import Cookies from "js-cookie";
const BASE_URL = "https://ce08-218-38-44-202.ngrok-free.app/api";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = Cookies.get("accessToken");
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    // 요청이 실패한 경우 에러 처리
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export default fetchWithAuth;
