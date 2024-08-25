"use client";

import { BasicModal, FrequentButton } from "@/app/_components/component";
import styles from "./medical.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TbCurrentLocation } from "react-icons/tb";
import HospitalSearchBox from "@/app/_components/Mainpage/Medical/HospitalSearchBox";
import { CiPill } from "react-icons/ci";
import { MdLocalHospital } from "react-icons/md";
import LocationAgree from "@/app/_components/Mainpage/Medical/LocationAgree";
import BottomSheet from "@/app/_components/Mainpage/BottomSheet";
import { MdOutlineLocationOn } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaHandHoldingMedical, FaLongArrowAltRight, FaPhoneAlt } from "react-icons/fa";
import DrugBottomSheet from "@/app/_components/Mainpage/DrugBottomSheet";
import { TfiMenuAlt } from "react-icons/tfi";
import {
  MedicalKeywordSearchController,
  NearbyMedicalController,
  OpeningHourData,
  getDayOfWeekKorean,
} from "@/app/util/controller/medicalController";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { TiPencil } from "react-icons/ti";

dayjs.extend(customParseFormat);

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
  pharmacyId: number;
  hospitalId: number;
  type: string;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  etc: string;
  openingHourItems: OpeningHourData[];
}

function NaverMapContainer({
  mapId = "map",
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: NaverMapContainerProps) {
  const router = useRouter();
  const mapRef = useRef<NaverMap | null>(null);
  const markers = useRef<any[]>([]);
  const [pharmacies, setPharmacies] = useState<MedicalDataProps[]>([]);
  const [hospitals, setHospitals] = useState<MedicalDataProps[]>([]);
  const [showPharmacies, setShowPharmacies] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [userLocation, setUserLocation] = useState<Coordinates>(initialCenter);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drugsheetOpen, setDrugSheetOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<MedicalDataProps | null>(null);
  const [isReSearch, setIsReSearch] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<naver.maps.Marker | null>(null); // 현재 위치 마커 상태

  // 위치 정보 동의 모달
  const handleModalOpen = () => {
    if (!navigator.geolocation) {
      setModalOpen(true);
    } else {
      moveToCurrentLocation();
    }
  };
  const handleModalClose = () => setModalOpen(false);
  const handleRegisterModalClose = () => setRegisterModalOpen(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchSubmit = async () => {
    if (searchValue.length < 2) {
      return alert("적어도 2자 이상 입력해 주세요.");
    }
    const data = {
      keyword: searchValue,
      lat: userLocation[0],
      lng: userLocation[1],
    };
    /* 검색 API 호출 and */
    try {
      const response = await MedicalKeywordSearchController(data);
      console.log(response);

      const pharmacies = response.data.pharmacies.map((item: MedicalDataProps) => ({
        ...item,
        type: "약국",
      }));
      const hospitals = response.data.hospitals;

      setPharmacies(pharmacies);
      setHospitals(hospitals);
    } catch (error) {
      console.error("Error fetching medical list:", error);
    }
    setSearching(true);
    setDrugSheetOpen(true);
  };
  const handleSearchClose = () => {
    setSearchValue("");
    setSearching(false);
    setDrugSheetOpen(false);
    fetchData(userLocation);
  };
  const handleBottomSheetChange = () => {
    setSheetOpen(!sheetOpen);
  };
  const handleDrugBottomSheetChange = () => {
    setDrugSheetOpen(!drugsheetOpen);
  };
  const handleGoToRegistered = (visit: boolean) => {
    if (selectedLocation) {
      if (visit) {
        router.push(
          `/register/visited?hospitalId=${selectedLocation.hospitalId}&hospitalName=${selectedLocation.name}`
        );
      } else {
        router.push(
          `/register/upcoming?hospitalId=${selectedLocation.hospitalId}&hospitalName=${selectedLocation.name}`
        );
      }
    }
  };
  const handleListSubmit = (item: MedicalDataProps) => {
    if (mapRef.current) {
      const newLatLng = new naver.maps.LatLng(item.latitude, item.longitude);
      mapRef.current.setCenter(newLatLng);
      mapRef.current.setZoom(18);
    }
    /* 바텀시트에 정보 넣고 */
    setSelectedLocation(item);
    setSheetOpen(true); // 이 때 이쪽 지도 마커로 포커싱 해야함!
    setDrugSheetOpen(false);
  };
  const handleReSearch = () => {
    /* 현위치에서 재검색 누를 시 */
    fetchData(userLocation);
    setIsReSearch(false); // 다시 버튼 닫아줌
  };

  const getTotalCount = () => {
    let count = 0;
    if (showHospitals) {
      count += hospitals.length;
    }
    if (showPharmacies) {
      count += pharmacies.length;
    }
    return count;
  };

  const formatOpeningHours = (openingHour: OpeningHourData[] = []): string => {
    console.log(openingHour);
    return openingHour
      .map((hour) => {
        const dayOfWeek = getDayOfWeekKorean(hour.dayOfWeek);
        const startTime = dayjs(hour.startTime, "HH:mm:ss").format("HH:mm");
        const endTime = dayjs(hour.endTime, "HH:mm:ss").format("HH:mm");
        return `${dayOfWeek}: ${startTime}~${endTime}`;
      })
      .join("\n");
  };

  // initializeMap()
  const initializeMap = () => {
    const mapOptions = {
      center: new naver.maps.LatLng(userLocation[0], userLocation[1]),
      zoom: 15,
      minZoom: 6,
      scaleControl: true,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };

    const map = new naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    if (onLoad) {
      onLoad(map);
    }
  };

  // moveToCurrentLocation() : 현재 위치 클릭
  const moveToCurrentLocation = () => {
    handleModalClose();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation: Coordinates = [latitude, longitude];
          fetchData(newLocation); // 현재 위치에서 주변 검색!
          setUserLocation(newLocation);
          if (mapRef.current) {
            const newLatLng = new naver.maps.LatLng(...newLocation);
            mapRef.current.setCenter(newLatLng);
            if (currentMarker) {
              currentMarker.setMap(null); // 기존 마커 제거
            }
            const marker = new naver.maps.Marker({
              position: newLatLng,
              map: mapRef.current,
              title: "현재 위치",
              icon: {
                url: "/icons/current_marker.png",
                size: new naver.maps.Size(41, 55),
                origin: new naver.maps.Point(0, 0), // 아이콘 이미지 시작점
                anchor: new naver.maps.Point(20.5, 55), // 아이콘 앵커 포인트
              },
            });
            setCurrentMarker(marker); // 현재 마커 상태 업데이트
            mapRef.current.setZoom(18); // 원하는 줌 레벨로 설정
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

  // useEffect(() => {
  //   if (userLocation) {
  //   }
  // }, [userLocation]);

  // useEffect() : 시작할 때
  useEffect(() => {
    // 네이버 지도 스크립트가 로드된 후 초기화 함수 호출
    if (window.naver && window.naver.maps) {
      initializeMap();
      fetchData(userLocation);
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
  }, []);

  // fetchData() : 병의원, 약국 데이터 가져오기
  const fetchData = async (userLocation: [number, number]) => {
    const locationData = {
      lat: userLocation[0],
      lng: userLocation[1],
    };

    try {
      const response = await NearbyMedicalController(locationData);
      console.log(response);

      const pharmacies = response.data.pharmacies.map((item: MedicalDataProps) => ({
        ...item,
        type: "약국",
      }));
      const hospitals = response.data.hospitals;

      setPharmacies(pharmacies);
      setHospitals(hospitals);
    } catch (error) {
      console.error("Error fetching medical list:", error);
    }
  };

  // useEffect(() => {
  //   if (userLocation) {
  //     fetchData(userLocation);
  //   }
  // }, [userLocation]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      markers.current.forEach((marker) => {
        marker.setMap(null); // 맵에서 제거
      });

      // 중심 좌표 변경 이벤트 핸들러
      naver.maps.Event.addListener(map, "center_changed", () => {
        const center = map.getCenter();
        const newLocation: Coordinates = [center.y, center.x];
        setUserLocation(newLocation);
        setIsReSearch(true);
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
            setSelectedLocation(pharmacy);
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
            setSelectedLocation(hospital);
            map.setCenter(marker.getPosition());
            setSheetOpen(true);
          });
          markers.current.push(marker); // 배열에 추가
        }
      });
    }
  }, [pharmacies, hospitals, showPharmacies, showHospitals]);

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
        <div className={styles.map_category_box}>
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
        <div
          className={styles.map_category_list_button}
          onClick={() => {
            console.log(drugsheetOpen);
            setDrugSheetOpen(true);
          }}
          style={{
            backgroundColor: drugsheetOpen ? "#ECECEC" : "white",
            boxShadow: drugsheetOpen ? "inset 2px 4px 4px #dddddd" : "2px 4px 4px #dddddd",
          }}
        >
          <TfiMenuAlt />
          <div className={styles.map_category_list_button_text}>목록 {getTotalCount()}</div>
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
        {selectedLocation && (
          <div className={styles.bottomsheet_detail_container}>
            <div className={styles.bottomsheet_detail_title}>
              <div className={styles.bottomsheet_detail_title_text}>
                <div className={styles.bottomsheet_detail_title_text_01}>
                  {selectedLocation.name}
                </div>
                <div className={styles.bottomsheet_detail_title_text_02}>
                  {selectedLocation.type}
                </div>
              </div>
              <div className={styles.bottomsheet_detail_title_distance}>
                {Math.round(selectedLocation.distance)}m
              </div>
            </div>
            <div className={styles.bottomsheet_detail_address_01}>
              <MdOutlineLocationOn size="20px" color="#CBCBCB" />
              <div className={styles.bottomsheet_detail_address_01_text}>
                {selectedLocation.address}
              </div>
            </div>
            <div className={styles.bottomsheet_detail_address_02}></div>
            <div>
              <div className={styles.bottomsheet_detail_day}>
                <IoMdTime size="18px" color="#CBCBCB" />
                <div className={styles.bottomsheet_detail_day_text_01}>
                  {formatOpeningHours(selectedLocation.openingHourItems)}
                </div>
                <div className={styles.bottomsheet_detail_day_text_02}>{selectedLocation.etc}</div>
              </div>
            </div>
            <div className={styles.bottomsheet_detail_phone}>
              <FaPhoneAlt size="14px" color="#CBCBCB" />
              <div className={styles.bottomsheet_detail_phone_text_01}>
                {selectedLocation.phoneNumber}
              </div>
              <div className={styles.bottomsheet_detail_phone_text_02}>전화하기</div>
            </div>
            {selectedLocation.type !== "약국" ? (
              <FrequentButton
                title="진료 등록하러 가기"
                backgroundColor="#0A6847"
                onClick={() => setRegisterModalOpen(true)}
              />
            ) : null}
          </div>
        )}
      </BottomSheet>
      <DrugBottomSheet
        open={drugsheetOpen}
        handleBottomSheetChange={handleDrugBottomSheetChange}
        reSearchButton={isReSearch}
        handleReSearch={handleReSearch}
      >
        {searching ? (
          <LocationSearchList
            title={searchValue}
            pharmacies={pharmacies}
            hospitals={hospitals}
            onClick={handleListSubmit}
            totalCount={getTotalCount()}
            showPharmacies={showPharmacies}
            showHospitals={showHospitals}
          />
        ) : (
          <LocationList
            pharmacies={pharmacies}
            hospitals={hospitals}
            onClick={handleListSubmit}
            totalCount={getTotalCount()}
            showPharmacies={showPharmacies}
            showHospitals={showHospitals}
          />
        )}
      </DrugBottomSheet>
      <BasicModal
        open={registerModalOpen}
        handleModalClose={handleRegisterModalClose}
        width="65%"
        height="23vh"
      >
        <>
          <div className={styles.modal_header}>
            <FaHandHoldingMedical color="#0A6847" size={"25px"} />
            <div className={styles.modal_header_text_01}>진료 등록</div>
            <FaLongArrowAltRight size={"23px"} />
            <div className={styles.modal_header_text_02}>진료 선택</div>
          </div>
          <div className={styles.modal_content}>
            <div
              onClick={() => handleGoToRegistered(false)}
              className={styles.modal_content_box}
              style={{ backgroundColor: "#CECECE" }}
            >
              <TiPencil size={"35px"} />
              <div className={styles.modal_content_text}>방문할 진료</div>
            </div>
            <div
              onClick={() => handleGoToRegistered(true)}
              className={styles.modal_content_box}
              style={{ backgroundColor: "#D0DBFF" }}
            >
              <TiPencil size={"35px"} />
              <div className={styles.modal_content_text}>방문한 진료</div>
            </div>
          </div>
        </>
      </BasicModal>
    </>
  );
}

interface LocationSearchListProps {
  title: string;
  pharmacies: MedicalDataProps[];
  hospitals: MedicalDataProps[];
  onClick: (item: MedicalDataProps) => void;
  totalCount: number;
  showPharmacies: boolean;
  showHospitals: boolean;
}
function LocationSearchList({
  title,
  pharmacies,
  hospitals,
  showPharmacies,
  showHospitals,
  totalCount,
  onClick,
}: LocationSearchListProps) {
  const combinedList = [
    ...pharmacies.filter((pharmacy) => showPharmacies),
    ...hospitals.filter((hospital) => showHospitals),
  ].sort((a, b) => a.distance - b.distance);
  return (
    <div className={styles.drugbottomsheet_search_container}>
      <div className={styles.drugbottomsheet_search_header_text}>
        <div className={styles.drugbottomsheet_search_header_text_01}>{title}</div>
        <div className={styles.drugbottomsheet_search_header_text_02}>
          으로 검색한 결과 ({totalCount})
        </div>
      </div>
      <hr className={styles.drugbottomsheet_search_header_line} />
      <div className={styles.drugbottomsheet_search_body}>
        {combinedList.map((item, index) => (
          <LocationListProp key={index} item={item} onClick={onClick} />
        ))}
      </div>
    </div>
  );
}

interface LocationListProps {
  pharmacies: MedicalDataProps[];
  hospitals: MedicalDataProps[];
  onClick: (item: MedicalDataProps) => void;
  totalCount: number;
  showPharmacies: boolean;
  showHospitals: boolean;
}
function LocationList({
  pharmacies,
  hospitals,
  onClick,
  totalCount,
  showPharmacies,
  showHospitals,
}: LocationListProps) {
  const combinedList = [
    ...pharmacies.filter((pharmacy) => showPharmacies),
    ...hospitals.filter((hospital) => showHospitals),
  ].sort((a, b) => a.distance - b.distance);

  return (
    <div className={styles.drugbottomsheet_list_container}>
      <div className={styles.drugbottomsheet_list_header}>
        <TfiMenuAlt size="20px" />
        <div className={styles.drugbottomsheet_list_header_text}>목록 {totalCount}</div>
      </div>
      <div className={styles.drugbottomsheet_list_body}>
        <div className={styles.drugbottomsheet_list_tail_text}>거리 순</div>
        <hr className={styles.drugbottomsheet_list_tail_line} />
        <div className={styles.drugbottomsheet_list_content}>
          {combinedList.map((item, index) => (
            <LocationListProp key={index} item={item} onClick={onClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LocationListPropProps {
  item: MedicalDataProps;
  onClick: (item: MedicalDataProps) => void;
}
function LocationListProp({ item, onClick }: LocationListPropProps) {
  return (
    <>
      <div className={styles.drugbottomsheet_list_box} onClick={() => onClick(item)}>
        <div className={styles.drugbottomsheet_list_title_01}>
          <div className={styles.drugbottomsheet_list_text_01}>{item.name}</div>
          <div className={styles.drugbottomsheet_list_text_02}>{item.type}</div>
        </div>
        <div className={styles.drugbottomsheet_list_title_02}>
          <div className={styles.drugbottomsheet_list_text_03}>{Math.round(item.distance)}m</div>
          <div className={styles.drugbottomsheet_list_text_04}>{item.address}</div>
        </div>
      </div>
      <hr className={styles.drugbottomsheet_list_bottom_line} />
    </>
  );
}
