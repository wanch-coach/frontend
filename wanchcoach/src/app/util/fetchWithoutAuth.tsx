<<<<<<< HEAD
const BASE_URL = "https://a645-14-36-55-70.ngrok-free.app/api";
=======

const BASE_URL = "https://888b-222-112-228-17.ngrok-free.app/api";
>>>>>>> fe7ab82b845c26cfdd0c68acad8ffa2a8156f3c4


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
