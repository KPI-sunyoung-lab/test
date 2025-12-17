# 철도 대시보드 애널리틱스

철도 회사에서 사용할 수 있는 현대적인 대시보드 애널리틱스 애플리케이션입니다.

## 주요 기능

- 📊 **실시간 대시보드**: 철도 운영 현황을 한눈에 파악
- 🚂 **운행 현황**: 시간대별 열차 운행 상태 모니터링
- 👥 **승객 통계**: 역별 승하차 인원 분석
- 💰 **수익 분석**: 월별 수익 추이 및 예측
- 🗺️ **노선 분석**: 노선별 성과 및 정시율
- 🔔 **알림 시스템**: 실시간 운행 알림 및 상태 업데이트

## 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Recharts** - 데이터 시각화
- **Lucide React** - 아이콘
- **Mixpanel** - 사용자 행동 분석 및 이벤트 추적

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Mixpanel 토큰을 추가하세요:

```bash
VITE_MIXPANEL_TOKEN=your_mixpanel_token_here
```

**Mixpanel 토큰 얻는 방법:**
1. [Mixpanel](https://mixpanel.com)에 가입/로그인
2. 프로젝트 생성 또는 기존 프로젝트 선택
3. Settings > Project Settings > Project Token 복사
4. `.env` 파일에 토큰 입력

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

### 4. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 프로젝트 구조

```
src/
├── components/
│   ├── Dashboard.tsx          # 메인 대시보드
│   ├── Header.tsx             # 상단 헤더
│   ├── Sidebar.tsx            # 사이드바 네비게이션
│   ├── StatCard.tsx           # 통계 카드 컴포넌트
│   ├── TrainStatusChart.tsx   # 열차 운행 현황 차트
│   ├── PassengerChart.tsx     # 승객 통계 차트
│   ├── RevenueChart.tsx       # 수익 분석 차트
│   ├── RoutePerformance.tsx   # 노선 성과 차트
│   └── RecentAlerts.tsx       # 최근 알림 컴포넌트
├── App.tsx                    # 메인 앱 컴포넌트
├── main.tsx                   # 엔트리 포인트
└── index.css                  # 글로벌 스타일
```

## 주요 컴포넌트 설명

### Dashboard
메인 대시보드로 모든 통계와 차트를 통합하여 표시합니다.

### StatCard
주요 지표를 카드 형태로 표시하는 재사용 가능한 컴포넌트입니다.

### TrainStatusChart
시간대별 열차 운행 상태를 라인 차트로 시각화합니다.

### PassengerChart
역별 승하차 인원을 바 차트로 표시합니다.

### RevenueChart
월별 수익 추이를 영역 차트로 표시하며 예측 데이터도 함께 보여줍니다.

### RoutePerformance
노선별 성과 지표(정시율, 만족도, 수익)를 비교합니다.

## Mixpanel 분석

이 프로젝트는 Mixpanel을 사용하여 사용자 행동을 추적합니다.

### 추적되는 이벤트

- **Page View**: 페이지 방문 추적 (자동)
- **Menu Item Clicked**: 사이드바 메뉴 클릭
- **Admin Menu Clicked**: 헤더의 관리자 메뉴 클릭
- **Notification Bell Clicked**: 알림 벨 클릭
- **Add User Button Clicked**: 사용자 추가 버튼 클릭
- **Edit User Clicked**: 사용자 수정 버튼 클릭
- **Delete User Clicked**: 사용자 삭제 버튼 클릭
- **System Settings Saved**: 시스템 설정 저장
- **Logout Clicked**: 로그아웃 클릭

### Mixpanel 유틸리티 사용

```typescript
import { trackEvent, identifyUser, setUserProperties } from './utils/mixpanel'

// 이벤트 추적
trackEvent('Button Clicked', { buttonName: 'Submit' })

// 사용자 식별
identifyUser('user123', { name: '홍길동', role: 'admin' })

// 사용자 속성 설정
setUserProperties({ plan: 'premium' })
```

## 커스터마이징

### 색상 테마 변경
`tailwind.config.js`에서 `primary` 색상을 수정하여 테마를 변경할 수 있습니다.

### 데이터 수정
각 차트 컴포넌트의 `data` 배열을 수정하여 실제 데이터로 교체할 수 있습니다.

## 라이선스

MIT

