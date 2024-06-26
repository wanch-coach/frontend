const BASE_URL = "https://ce08-218-38-44-202.ngrok-free.app/api";

const fetchWithoutAuth = async (url: string, options: RequestInit = {}) => {
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
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

export default fetchWithoutAuth;
