"use client";

import { BasicModal } from "@/app/_components/component";
import styles from "./medical.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";
import { FaInfoCircle } from "react-icons/fa";
import HospitalSearchBox from "@/app/_components/Component/Medical/HospitalSearchBox";
import { CiPill } from "react-icons/ci";
import { MdLocalHospital } from "react-icons/md";

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
  const [searchValue, setSearchValue] = useState("");
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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
    } else {
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`;
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
            alert(`Pharmacy: ${pharmacy.name}`);
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
            alert(`Hospital: ${hospital.name}`);
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
      </div>
      <div className={styles.map_current_position_button} onClick={handleModalOpen}>
        <TbCurrentLocation size="30px" color="#9D9D9D" />
      </div>
      <BasicModal open={modalOpen} handleModalClose={handleModalClose} width="60%" height="35vh">
        <div className={styles.map_agree_modal_container}>
          <div className={styles.map_agree_modal_text_01}>위치 정보 수집 동의</div>
          <div className={styles.map_agree_modal_box}>
            <li className={styles.map_agree_modal_text_02}>
              ‘완치코치’의 위치기반서비스를 이용하기 위해 현재 위치정보 사용에 동의합니다.
            </li>
            <li className={styles.map_agree_modal_text_02}>
              위치기반서비스 이용을 위해 서비스 이용약관에 동의합니다
            </li>
            <div className={styles.map_agree_modal_text_03}>
              위치기반서비스 이용약관
              <FaInfoCircle size="13px" />
            </div>
          </div>
          <div
            className={styles.map_agree_modal_button}
            style={{ bottom: "5vh" }}
            onClick={moveToCurrentLocation}
          >
            동의
          </div>
          <div className={styles.map_agree_modal_button} onClick={handleModalClose}>
            동의하지 않음
          </div>
        </div>
      </BasicModal>
    </>
  );
}
