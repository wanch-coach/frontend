"use client";

import { BasicModal, FrequentButton } from "@/app/_components/component";
import styles from "./medical.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";
import HospitalSearchBox from "@/app/_components/Component/Medical/HospitalSearchBox";
import { CiPill } from "react-icons/ci";
import { MdLocalHospital } from "react-icons/md";
import LocationAgree from "@/app/_components/Component/Medical/LocationAgree";
import BottomSheet from "@/app/_components/Component/BottomSheet";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import DrugBottomSheet from "@/app/_components/Component/DrugBottomSheet";
import { TfiMenuAlt } from "react-icons/tfi";

export default function Medical() {
  return (
    <div>
      <NaverMapContainer />
    </div>
  );
}

type NaverMap = naver.maps.Map;
type Lat = number;
type Lng = number;
type Coordinates = [Lat, Lng];

const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
const INITIAL_ZOOM = 10;

interface NaverMapContainerProps {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
}

interface MedicalDataProps {
  type: string;
  latitude: number;
  longitude: number;
  name: string;
}

function NaverMapContainer({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: NaverMapContainerProps) {
  const mapRef = useRef<NaverMap | null>(null);
  const markers = useRef<any[]>([]);
  const [pharmacies, setPharmacies] = useState<MedicalDataProps[]>([]);
  const [hospitals, setHospitals] = useState<MedicalDataProps[]>([]);
  const [showPharmacies, setShowPharmacies] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drugsheetOpen, setDrugSheetOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchSubmit = () => {
    /* 검색 API 호출 and */
    setSearching(true);
    setDrugSheetOpen(true);
  };
  const handleSearchClose = () => {
    setSearchValue("");
    setSearching(false);
    setDrugSheetOpen(false);
  };
  const handleBottomSheetChange = () => {
    setSheetOpen(!sheetOpen);
  };
  const handleDrugBottomSheetChange = () => {
    setDrugSheetOpen(!drugsheetOpen);
  };
  const handleGoToRegistered = () => {};

  // initializeMap()
  const initializeMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 6,
      scaleControl: true,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    // 새로운 네이버 맵 인스턴스 생성
    const map = new naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  // fetchData() : 병의원, 약국 데이터 가져오기
  const fetchData = async () => {
    // 임시 데이터
    const tempData = [
      { type: "pharmacy", latitude: 37.5665, longitude: 126.978, name: "Pharmacy 1" },
      { type: "pharmacy", latitude: 37.5655, longitude: 126.977, name: "Pharmacy 2" },
      { type: "hospital", latitude: 37.57972, longitude: 126.99889, name: "Hospital 1" },
      { type: "hospital", latitude: 37.5635, longitude: 126.975, name: "Hospital 2" },
    ];

    const pharmacies = tempData.filter((item) => item.type === "pharmacy");
    const hospitals = tempData.filter((item) => item.type === "hospital");

    setPharmacies(pharmacies);
    setHospitals(hospitals);
  };

  // useEffect() : 시작할 때
  useEffect(() => {
    // 네이버 지도 스크립트가 로드된 후 초기화 함수 호출
    if (window.naver && window.naver.maps) {
      initializeMap();
      console.log("initialized: {}", process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`;
      console.log("not initialized: {}", process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);

      return () => {
        mapRef.current?.destroy();
        document.head.removeChild(script);
      };
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      markers.current.forEach((marker) => {
        marker.setMap(null); // 맵에서 제거
      });

      pharmacies.forEach((pharmacy) => {
        if (showPharmacies) {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(pharmacy.latitude, pharmacy.longitude),
            map,
            title: pharmacy.name,
            icon: {
              url: "/icons/pharmacy.png",
              size: new naver.maps.Size(41, 55),
              origin: new naver.maps.Point(0, 0), // 아이콘 이미지 시작점
              anchor: new naver.maps.Point(20.5, 55), // 아이콘 앵커 포인트
            },
          });
          naver.maps.Event.addListener(marker, "click", () => {
            map.setCenter(marker.getPosition());
            setSheetOpen(true);
            // alert(`Pharmacy: ${pharmacy.name}`);
          });
          markers.current.push(marker);
        }
      });

      hospitals.forEach((hospital) => {
        if (showHospitals) {
          const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(hospital.latitude, hospital.longitude),
            map,
            title: hospital.name,
            icon: {
              url: "/icons/hospital.png",
              size: new naver.maps.Size(41, 55),
              origin: new naver.maps.Point(0, 0), // 아이콘 이미지 시작점
              anchor: new naver.maps.Point(20.5, 55), // 아이콘 앵커 포인트
            },
          });
          naver.maps.Event.addListener(marker, "click", () => {
            map.setCenter(marker.getPosition());
            setSheetOpen(true);
            // alert(`Hospital: ${hospital.name}`);
          });
          markers.current.push(marker); // 배열에 추가
        }
      });
    }
  }, [pharmacies, hospitals, showPharmacies, showHospitals]);

  // moveToCurrentLocation() : 현재 위치 클릭
  const moveToCurrentLocation = () => {
    handleModalClose();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: Coordinates = [latitude, longitude];
          setUserLocation(newLocation);
          if (mapRef.current) {
            const newLatLng = new naver.maps.LatLng(...newLocation);
            mapRef.current.setCenter(newLatLng);
            new naver.maps.Marker({
              position: newLatLng,
              map: mapRef.current,
              title: "현재 위치",
              icon: {
                url: "path/to/your/custom-icon.png",
                size: new naver.maps.Size(50, 50), // 아이콘 크기
                origin: new naver.maps.Point(0, 0), // 아이콘 이미지의 시작점
                anchor: new naver.maps.Point(25, 25), // 아이콘의 앵커 포인트
              },
            });
          }
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert(
                "위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 정보 접근을 허용해주세요."
              );
              break;
            case error.POSITION_UNAVAILABLE:
              alert("위치 정보를 사용할 수 없습니다.");
              break;
            case error.TIMEOUT:
              alert("위치 정보를 가져오는 데 시간이 초과되었습니다.");
              break;
            default:
              alert("알 수 없는 에러가 발생했습니다.");
              break;
          }
          console.error("Error getting user location:", error);
        }
      );
    } else {
      alert("이 브라우저에서는 위치 정보 기능을 지원하지 않습니다.");
    }
  };

  return (
    <>
      <div id={mapId} className={styles.map_container} />
      <div className={styles.map_search_box_container}>
        <HospitalSearchBox
          placeholder="이름으로 검색"
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchClose={handleSearchClose}
          readOnly={searching ? true : false}
        />
      </div>
      <div className={styles.map_category_container}>
        <div
          className={styles.map_category_button}
          onClick={() => setShowHospitals((prevState) => !prevState)}
          style={{
            backgroundColor: showHospitals ? "#ECECEC" : "white",
            boxShadow: showHospitals ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
          }}
        >
          <MdLocalHospital size="20px" color="#599468" />
          <div className={styles.map_category_text}>병원</div>
        </div>
        <div
          className={styles.map_category_button}
          onClick={() => setShowPharmacies((prevState) => !prevState)}
          style={{
            backgroundColor: showPharmacies ? "#ECECEC" : "white",
            boxShadow: showPharmacies ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
          }}
        >
          <CiPill size="20px" color="#F2CB00" />
          <div className={styles.map_category_text}>약국</div>
        </div>
        <div
          onClick={() => {
            console.log(drugsheetOpen);
            setDrugSheetOpen(true);
          }}
        >
          버튼
        </div>
      </div>
      <div className={styles.map_current_position_button} onClick={handleModalOpen}>
        <TbCurrentLocation size="30px" color="#9D9D9D" />
      </div>
      <BasicModal open={modalOpen} handleModalClose={handleModalClose} width="60%" height="35vh">
        <LocationAgree
          handleModalClose={handleModalClose}
          moveToCurrentLocation={moveToCurrentLocation}
        />
      </BasicModal>
      <BottomSheet open={sheetOpen} handleBottomSheetChange={handleBottomSheetChange}>
        <div className={styles.bottomsheet_detail_container}>
          <div className={styles.bottomsheet_detail_title}>
            <div className={styles.bottomsheet_detail_title_text}>
              <div className={styles.bottomsheet_detail_title_text_01}>서울성모병원</div>
              <div className={styles.bottomsheet_detail_title_text_02}>종합병원</div>
            </div>
            <div className={styles.bottomsheet_detail_title_distance}>500m</div>
          </div>
          <div className={styles.bottomsheet_detail_address_01}>
            <MdOutlineLocationOn size="20px" color="#CBCBCB" />
            <div className={styles.bottomsheet_detail_address_01_text}>서울 서초구 반포동</div>
          </div>
          <div className={styles.bottomsheet_detail_address_02}>신림역에서 445m 거리</div>
          <div>
            <div className={styles.bottomsheet_detail_day}>
              <IoMdTime size="18px" color="#CBCBCB" />
              <div className={styles.bottomsheet_detail_day_text_01}>월 : 10:00 ~ 18:00</div>
              <div className={styles.bottomsheet_detail_day_text_02}>점심시간 12:00 ~ 13:00</div>
            </div>
          </div>
          <div className={styles.bottomsheet_detail_phone}>
            <FaPhoneAlt size="14px" color="#CBCBCB" />
            <div className={styles.bottomsheet_detail_phone_text_01}>02-1588-1511</div>
            <div className={styles.bottomsheet_detail_phone_text_02}>전화하기</div>
          </div>
          <FrequentButton
            title="진료 등록하러 하기"
            backgroundColor="#0A6847"
            onClick={handleGoToRegistered}
          />
        </div>
      </BottomSheet>
      <DrugBottomSheet open={drugsheetOpen} handleBottomSheetChange={handleDrugBottomSheetChange}>
        {searching ? <LocationSearchList title={searchValue} /> : <LocationList />}
      </DrugBottomSheet>
    </>
  );
}

interface LocationSearchListProps {
  title: string;
}
function LocationSearchList({ title }: LocationSearchListProps) {
  return (
    <div className={styles.drugbottomsheet_search_container}>
      <div className={styles.drugbottomsheet_search_header_text}>
        <div className={styles.drugbottomsheet_search_header_text_01}>{title}</div>
        <div className={styles.drugbottomsheet_search_header_text_02}>으로 검색한 결과 (1)</div>
      </div>
      <hr className={styles.drugbottomsheet_search_header_line} />
      <LocationListProp />
    </div>
  );
}

function LocationList() {
  return (
    <div className={styles.drugbottomsheet_list_container}>
      <div className={styles.drugbottomsheet_list_header}>
        <TfiMenuAlt size="20px" />
        <div className={styles.drugbottomsheet_list_header_text}>목록 (4)</div>
      </div>
      <div className={styles.drugbottomsheet_list_body}>
        <div className={styles.drugbottomsheet_list_tail_text}>거리 순</div>
        <hr className={styles.drugbottomsheet_list_tail_line} />
        <LocationListProp />
      </div>
    </div>
  );
}

function LocationListProp() {
  return (
    <>
      <div className={styles.drugbottomsheet_list_box}>
        <div className={styles.drugbottomsheet_list_title_01}>
          <div className={styles.drugbottomsheet_list_text_01}>서울성모병원</div>
          <div className={styles.drugbottomsheet_list_text_02}>종합병원</div>
        </div>
        <div className={styles.drugbottomsheet_list_title_02}>
          <div className={styles.drugbottomsheet_list_text_03}>500m</div>
          <div className={styles.drugbottomsheet_list_text_04}>서울 서초구 반포동</div>
        </div>
      </div>
      <hr className={styles.drugbottomsheet_list_bottom_line} />
    </>
  );
}
