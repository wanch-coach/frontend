import { Dayjs } from "dayjs";
import fetchWithAuth from "../fetch/fetchWithAuth";
import { SetStateAction } from "react";
import Cookies from "js-cookie";

interface SearchData {
  type: string;
  keyword: string;
}

export interface DrugData {
  drugId: number;
  itemName: string;
  prductType: string;
  drugImage: string;
  favorite: number;
}

export async function SearchDrugByKeyword(data: SearchData) {
  try {
    const url = `/drug?type=${data.type}&keyword=${data.keyword}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
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
  favoriteId: number;
}

export async function SearchDrugDetail(drugId: number) {
  try {
    const url = `/drug/${drugId}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Drug Detail Search successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
export async function SearchFavorites() {
  try {
    const url = "/drug/favorites";
    const response = await fetchWithAuth(url, {
      method: "GET",
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
    const response = await fetchWithAuth(url, {
      method: "POST",
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
    const response = await fetchWithAuth(url, {
      method: "DELETE",
    });
    console.log("Delete Favorites successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}

export interface SimpleDrugData {
  drugId: number;
  itemName: string;
}
export async function SimpleSearchDrugByKeyword(keyword: string) {
  try {
    const url = `/drug/search?keyword=${keyword}`;
    const response = await fetchWithAuth(url, {
      method: "GET",
    });
    console.log("Simple Drug Search successful:", response);
    return response; // 예시로 데이터 반환
  } catch (error) {
    console.error("Error :", error);
    throw error; // 오류 처리
  }
}
