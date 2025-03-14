# <img src="/wanchcoach/public/logo.png" height="25px"> 완치코치 — 진료 및 처방전 관리 &nbsp; <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>

#### 진료 예약 및 관리부터 처방받은 약 정보, 실제 복약 기록에 대한 관리까지 한번에 관리할 수 있는 프로젝트 입니다.

### https://wanch-coach.site/

---

### 웹앱 / 팀 프로젝트 (공모전)

### 2024.5.12 ~ 2024.7.10

<br>

> **진료관리, 복약관리, 병·의원 찾기, 약 검색 등 완치코치의 전반적인 레이아웃 설계 및 구현**

> **Typescript언어의 불필요한 any 사용을 줄이고 type alias를 활용해 타입 명확성을 높이는 방향으로 코드 구조를 개선**

> **PWA 적용 및 푸시 알림 구현**

---

### 💻 Overview

<table>
<tr>
<td align="center"><b>로그인 창</b></td>
<td align="center"><b>메인 홈</b></td>
<td align="center"><b>진료</b></td>
</tr>
<tr>
<td align="center"><img src="/screenshots/로그인.png" width="80%"></td>
<td align="center"><img src="/screenshots/홈.png" width="80%"></td>
<td align="center"><img src="/screenshots/진료-달력조회.png" width="80%"></td>
</tr>
<tr>
<td align="center"><b>복약</b></td>
<td align="center"><b>병의원찾기</b></td>
<td align="center"><b>약정보 조회</b></td>
</tr>
<tr>
<td align="center"><img src="/screenshots/복약-복약이력목록조회.png" width="80%"></td>
<td align="center"><img src="/screenshots/병의원찾기-내위치기반조회.png" width="80%"></td>
<td align="center"><img src="/screenshots/약정보조회-이름으로검색.png" width="80%"></td>
</tr>
</table>

<br>
<br>

---

<br>

## 💡 소개

**진료에서부터 복약 완료에 이르기까지 전체 과정을 보조하는 서비스** - 진료예약이나 다녀온 진료 정보를 등록할 수 있는 서비스 - 약국에서 받은 처방전을 등록하여 복약(잔여, 기간 등)을 관리할 수 있고 복용 시기에 맞춰 알림 제공 - 위치 기반 근처 병의원/약국을 조회하고, 상세정보(거리, 영업시간)를 확인 할 수 있음 - 약 상세 정보(효능/효과, 주의사항 등) 조회 가능

### 👨‍👩‍👧‍👦 팀원 (4명)

- **나종현** - Frontend
- **유호재** - Backend
- **신규람** - Backend
- **박은규** - Backend

<br>
  
## 🖇️ 기능

> ### 👨‍👩‍👧‍👦 가족 관리

- **가족 추가** ➕ : 사용자 아이콘 클릭 후 추가 버튼을 눌러 이름, 생년월일, 성별, 사진을 입력하고 가족을 추가할 수 있습니다.
- **가족 조회** : 사용자 아이콘 클릭 시 등록된 가족 목록을 확인할 수 있습니다.
- **가족 수정** : 가족 이름, 생년월일, 성별, 프로필 이미지를 수정할 수 있습니다.
- **가족 삭제** : 사용자 아이콘을 누르면 나오는 삭제 버튼을 통해 가족을 삭제할 수 있습니다.
- **가족원의 약품 조회** : 홈 탭에서 가족원들의 오늘 먹어야 할 약을 조회할 수 있고, 복약 탭에서 특정 가족원의 모든 약 정보를 확인할 수 있습니다.

> ### 📋 복약 정보 관리

- **복약 정보 조회** : 현재 복약 중인 약(처방전 단위) 조회 및 처방전 클릭 시 상세 정보를 확인할 수 있습니다.
- **복용 완료** : 먹었어요 버튼을 눌러 복약 완료가 가능합니다.
- **복약 달력** : 📅 캘린더에서 날짜별 복약 정보를 조회하고 처방전 클릭 시 해당 일자의 복용 기록 확인이 가능합니다.
- **복약 종료 & 삭제** : 🔚 복약 끝 버튼으로 복용 종료 가능, 남은 횟수 0이면 자동 삭제됩니다.
- **복약 알림** : ⏰ 처방전 단위로 복약 시간 알림 설정(ON/OFF), 기본 시간(8시, 12시, 18시, 22시) 변경 가능, 📢 팝업 알림 제공

> ### 🔎 약품 정보 검색

- **약품 검색** : 약품을 검색하여 상세 정보(이름, 증상, 제약 회사) 조회가 가능합니다.
- 효능별 카테고리 제공 (진통제, 소염제 등)
- 즐겨찾기 기능 ⭐ 을 지원합니다.

> ### 🏥 진료 관리

- **진료 등록** / 조회 / 수정 / 삭제 기능 제공
- **진료 예약 및 알람 기능**을 지원합니다.
- **처방전 및 약 정보** 📜 등록 가능
- **진료 후 재진 등록** 기능까지 제공합니다.

> ### 🌍 약국/병의원 정보 조회

- **지도 기반 검색** : 🗺️ 가까운 약국 및 병의원 조회가 가능합니다.
- **지역별 검색** : 특정 지역 약국/병의원 검색이 가능합니다.
- **전화 기능 지원** : 등록된 연락처를 통해 전화 연결이 가능합니다.

<br>

## ⚒️ 개발 환경

#### **FrontEnd**

- **node.js** : 20.14.0
- **React** : 18.3.1
- **Next.js** : 14.2.3
- **TypeScript**
- **PWA**

#### **BackEnd**

- Spring Boot | JPA | QueryDSL | JWT | Redis | MySQL

#### **Infra**

- AWS | Nginx | Docker-compose | Jenkins

<br>

## ⚒️ 사용 기술

#### 📡 공공데이터 활용 API

- 공공데이터포털 (https://www.data.go.kr/index.do) 에서 제공하는 API를 활용하여 의약품 및 병·의원 정보를 조회하고 데이터베이스에 저장하여 서비스에 활용
- 식품의약품안전처 API : 의약품 개요정보(e약은요), 의약품 제품 허가정보 활용
- 국립중앙의료원 API : 전국 약국 정보 조회, 전국 병·의원 찾기 서비스 연동

#### 🏥 처방전 OCR

- 처방전 촬영 후 OCR 기능을 활용하여 약품 정보를 자동으로 추출하여 데이터화
- 텍스트 분석을 통해 처방전 내 약품 정보를 인식하고, 정확한 데이터로 변환하여 수기 입력 없이 등록 가능

## 활동

- 2024 부산시 공공빅데이터 활용 창업경진대회 공모 - 예선 8팀 선정
