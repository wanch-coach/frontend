import { cookies } from "next/headers";
const BASE_URL = "http://localhost:8081/api";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("refreshToken");
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
