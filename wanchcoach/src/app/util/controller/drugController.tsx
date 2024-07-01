import { Dayjs } from "dayjs";
import fetchWithAuth from "../fetchWithAuth";
import { SetStateAction } from "react";
import Cookies from "js-cookie";
import fetchWithoutAuth from "../fetchWithoutAuth";

interface SearchData {
  type: string;
  keyword: string;
}

export async function SearchDrugByKeyword(data: SearchData) {
  try {
    const url = `/drug?type=${data.type}&keyword=${data.keyword}`;
    const response = await fetchWithAuth(url, {
      method: "Get",
    });
    console.log("Drug Search successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface DrugDetailData {
  drugId: number;
  itemName: string; //제품명
  itemEngName: string; //제품 영문명
  entpName: string; //업체명
  spcltyPblc: string; //약품 구분(전문 or 일반)
  prductType: string; //약품 타입
  itemIngrName: string; //약품 재료
  storageMethod: string; //보관 방법
  validTerm: string; //유통기한
  eeDocData: string; //효능 효과 DATA
  udDocData: string; //용법 용량 DATA
  nbDocData: string; //사용상의 주의사항 DATA
  drugImage: string; //약 이미지
}
export async function SearchDrugDetail(drugId: number) {
  try {
    const url = `/drug/${drugId}`;
    const response = await fetchWithoutAuth(url, {
      method: "Get",
    });
    console.log("Drug Detail Search successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
export async function SearchFavorites(drugId: number) {
  try {
    const url = "/favorites";
    const response = await fetchWithoutAuth(url, {
      method: "Get",
    });
    console.log("Favorite List successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
export async function ToFavorite(drugId: number) {
  try {
    const url = `/drug/${drugId}/favorites`;
    const response = await fetchWithoutAuth(url, {
      method: "Post",
    });
    console.log("Favorite making successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
export async function DeleteFavorite(favoriteId: number) {
  try {
    const url = `/drug/favorites/${favoriteId}`;
    const response = await fetchWithoutAuth(url, {
      method: "Delete",
    });
    console.log("Delete Favorites successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
