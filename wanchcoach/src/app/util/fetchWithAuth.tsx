import Cookies from "js-cookie";
import fetchWithoutAuth from "./fetchWithoutAuth";
import { redirect } from "next/navigation";
const BASE_URL = "https://wanch-coach.site/api";
// const BASE_URL = "https://d815-14-36-55-70.ngrok-free.app/api";

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let token = Cookies.get("accessToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "ngrok-skip-browser-warning": "69420",
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (response.status === 403) {
    // 엑세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 엑세스 토큰 발급
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      try {
        const refreshResponse = await fetchWithoutAuth(`${BASE_URL}/auth/updatetoken`, {
          method: "POST",
          body: JSON.stringify({ refreshToken: refreshToken }),
        });

        const refreshData = await refreshResponse.json();
        const newToken = refreshData.data.token;

        // 새로운 엑세스 토큰을 쿠키에 저장
        Cookies.set("accessToken", newToken);
        console.log("new accessToken :" + newToken);

        // 원래의 요청을 새로운 토큰으로 다시 시도
        const retryResponse = await fetch(`${BASE_URL}${url}`, {
          ...options,
          headers: {
            ...headers,
            ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (!retryResponse.ok) {
          const error = await retryResponse.json();
          throw new Error(error.message || "Something went wrong");
        }

        return retryResponse.json();
      } catch (error) {
        console.error("Failed Refresh Token:", error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("myFamilyId");
        redirect("/login");
        throw error;
      }
    } else {
      throw new Error("No refresh token available");
    }
  }

  if (!response.ok) {
    // 다른 요청 실패의 경우
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export default fetchWithAuth;

/*
 if (response.status === 401) {
      // 엑세스 토큰이 만료된 경우, 리프레시 토큰을 사용하여 새로운 엑세스 토큰 발급
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ token: refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            token = refreshData.accessToken;

            // 새로운 엑세스 토큰을 쿠키에 저장
            Cookies.set("accessToken", token);

            // 원래의 요청을 새로운 토큰으로 다시 시도
            const retryResponse = await fetch(`${BASE_URL}${url}`, {
              ...options,
              headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
              },
            });

            if (!retryResponse.ok) {
              const error = await retryResponse.json();
              throw new Error(error.message || "Something went wrong");
            }

            return retryResponse.json();
          } else {
            const error = await refreshResponse.json();
            throw new Error(error.message || "Failed to refresh token");
          }
        } catch (error) {
          throw new Error(error.message || "Failed to refresh token");
        }
      } else {
        throw new Error("No refresh token available");
      }
    } else {
      // 다른 요청 실패의 경우
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }
  }

  return response.json(); */
